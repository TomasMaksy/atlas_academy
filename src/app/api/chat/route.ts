import { type Message, createDataStreamResponse, streamText } from "ai";

import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { systemPrompt } from "@/lib/ai/prompts";
import { createEssay } from "@/lib/ai/tools/create-essay";

const model = openai("gpt-4o");

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const {
      essay,
      messages,
    }: {
      essay: string | null;
      messages: Array<Message>;
    } = await request.json();

    return createDataStreamResponse({
      execute: (dataStream) => {
        const result = streamText({
          model,
          system: systemPrompt,
          messages,
          maxSteps: 5,
          experimental_activeTools: essay ? [] : ["createEssay"],
          tools: {
            createEssay: createEssay({ dataStream }),
            // rewriteEssay: rewriteEssay({ dataStream }),
            // requestSuggestions: requestSuggestions({ dataStream }),
            // requestAntiAiSuggest: requestAntiAiSuggest({ dataStream }),
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
