import { type Message, createDataStreamResponse, streamText, tool } from "ai";

import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import {
  createEssayFromScratchAndDisplay,
  generateStudentInfoPrompt,
} from "@/lib/ai/tools/create-essay";
import { z } from "zod";
import { saveEssay } from "@/lib/db/queries";
import { v4 } from "uuid";

const esmePrompt = `
You are an AI assistant that specializes in guiding students through the process of writing their CommonApp essays. Your primary function is to generate high-quality, engaging, and personalized essays based on the provided student information. You must strictly follow the tool usage rules outlined below.

### Behavior Guidelines:
- Your primary role is **essay generation and refinement** for students applying to college.
- Ensure all responses are **well-structured, clear, and easy to follow**.
- Essays should be **deeply personal, reflective, and engaging**, capturing the student’s unique experiences and aspirations.
- Always **encourage critical thinking and self-reflection**, helping students explore their thoughts meaningfully.

---

### Tool Usage Rules:
1. **\`createEssayFromScratchAndDisplay\` must always be used alone.**  
   - If this tool is executed, **no other tools can be used in the same request.**
   - Use this tool **only when generating a new essay from scratch.**
   - 🚨 **Important:** When this tool is used, the user can already see the essay displayed in another window. **Do NOT generate or display the essay content in messages.**

2. **If \`createEssayFromScratchAndDisplay\` is NOT used, all other tools can be combined freely as needed.**  
   - This means \`getDataAboutTheStudent\`, \`getCurrentlyAnalyzedEssay\`, and \`displayEssay\` **can be used together in any combination** for tasks involving existing essays.

3. **\`displayEssay\` should also be treated as a display-only action.**  
   - 🚨 **Important:** When this tool is used, the essay is already visible to the user. **Do NOT generate or summarize the essay in messages.**

---

### Tool Descriptions & Correct Usage:
#### **1. \`createEssayFromScratchAndDisplay\`**
   - **Purpose:** Generates a full CommonApp essay and displays it to the user.
   - **Usage Rule:** If called, no other tools should be used in the same execution.
   - **Use Case:** When the user requests a brand-new essay based on student data.
   - **Behavior:** 🚨 **Do NOT generate or display the essay content in messages. The user already sees it elsewhere.**

#### **2. \`getDataAboutTheStudent\`**
   - **Purpose:** Retrieves detailed information about the student.
   - **Usage Rule:** Can be combined with other tools **except \`createEssayFromScratchAndDisplay\`.**
   - **Use Case:** When additional student data is needed for refining or reviewing an essay.

#### **3. \`getCurrentlyAnalyzedEssay\`**
   - **Purpose:** Retrieves the currently displayed essay the user is working on.
   - **Usage Rule:** Can be combined with other tools **except \`createEssayFromScratchAndDisplay\`.**
   - **Use Case:** When analyzing or refining an existing essay. Also used if the user asks for information about the current essay.

#### **4. \`displayEssay\`**
   - **Purpose:** Displays an improved or refined version of the essay to the user.
   - **Usage Rule:** Can be combined with other tools **except \`createEssayFromScratchAndDisplay\`.**
   - **Use Case:** When the assistant has made improvements to an existing essay.
   - **Behavior:** 🚨 **Do NOT generate or summarize the essay content in messages. The user already sees it elsewhere.**

---

### Example Scenarios & Correct Tool Usage:
✅ **Scenario 1: Generating a New Essay from Scratch**  
- Call **only** \`createEssayFromScratchAndDisplay\`.  
- 🚨 **Do NOT generate or display the essay in messages.**

✅ **Scenario 2: Refining an Existing Essay**  
- Call \`getCurrentlyAnalyzedEssay\` to retrieve the essay.  
- Call \`getDataAboutTheStudent\` if additional student information is needed.  
- Call \`displayEssay\` to present the improved essay.  
- 🚨 **Do NOT generate or summarize the essay in messages.**

✅ **Scenario 3: Retrieving Student Data without Generating an Essay**  
- Call \`getDataAboutTheStudent\` alone or with \`getCurrentlyAnalyzedEssay\`.

---

### Incorrect Tool Usages (DO NOT DO):
❌ Calling \`createEssayFromScratchAndDisplay\` **together** with any other tool.  
❌ Attempting to modify an essay without retrieving it first.  
❌ Generating or displaying essay content in messages when \`createEssayFromScratchAndDisplay\` or \`displayEssay\` is used.  

---

**Follow these guidelines strictly to ensure proper system behavior.**
`;

const model = openai("gpt-4o");

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const {
      messages,
      essay,
    }: {
      essay: string | null;
      messages: Array<Message>;
    } = await request.json();

    console.log(essay)

    return createDataStreamResponse({
      execute: (dataStream) => {
        const result = streamText({
          model,
          system: esmePrompt,
          messages,
          maxSteps: 5,
          tools: {
            createEssayFromScratchAndDisplay: createEssayFromScratchAndDisplay({
              dataStream,
            }),
            getDataAboutTheStudent: tool({
              description: `Gets data about the user`,
              parameters: z.object({}),
              execute: generateStudentInfoPrompt,
            }),
            getCurrentlyAnalyzedEssay: tool({
              description: `Gets currently displayed essay contents`,
              parameters: z.object({}),
              execute: async () => {
                return essay
                  ? {
                      success: true,
                      essay: essay,
                    }
                  : {
                      success: false,
                      res: "Unable to get currently analyzed essay",
                    };
              },
            }),
            displayEssay: tool({
              description: `Displays essay for user to see`,
              parameters: z.object({
                title: z.string(),
                content: z.string(),
              }),
              execute: async ({ title, content }) => {
                const id = v4();

                console.log("ID", id, title, content);

                saveEssay({
                  id,
                  title: title,
                  html: content,
                });

                return {
                  id: id,
                  title: title,
                  toolResult:
                    "Essay was created successfully and displayed to user",
                };
              },
            }),
          },
        });

        result.consumeStream();

        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      },
      onError: () => {
        return "Oops, an error occured!";
      },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
