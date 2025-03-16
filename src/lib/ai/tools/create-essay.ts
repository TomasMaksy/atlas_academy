import { openai } from "@ai-sdk/openai";
import { DataStreamWriter, generateObject, tool } from "ai";
import { z } from "zod";
// import { getUserData, saveEssay } from "@/lib/db/queries";
import { saveEssay } from "@/lib/db/queries";
import { v4 } from "uuid";
// import { UserData } from "@/lib/db/schema";

interface CreateDocumentProps {
  dataStream: DataStreamWriter;
}

const systemPrompt = `You are an AI that writes a 650 word CommonApp Essays using information about the student. You're free to select one of the following prompts that you think are the best fit to tell the student's story based on the profile described below.

1. Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.
2. The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?
3. Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?
4. Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?
5. Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.
6. Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?
7. Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design.

`;
export async function generateStudentInfoPrompt() {
  return `Information on the student:
  
  Student's name is Martin.

  Here are their answers to a questionnaire:

  Question: Now, take a moment to think about an event or experience that has played a major role in shaping the person you are today. You may have several, but focus on one that stands out as particularly meaningful. Jot down the key details—without analyzing or reflecting on them just yet. Treat it like a journal entry, simply noting what happened.
  Answer: I started a student programming club at my school.

  Question: Now, zero in on a pivotal five-second moment within your experience—an instant that marked a shift in your perspective, emotions, or actions. This could be the exact second you made a decision, had a breakthrough realization, or felt a surge of emotion. Describe this moment vividly, capturing the details that made it impactful.
  Answer: The moment many of our students won the national informatics olympiad, I knew that the program and curriculum we built in our club really made a difference.

  Question: Now, take a step back and reflect on the moments you’ve captured. What made this experience meaningful? What did it reveal about you? How did it influence your perspective or shape the path you’re on today? Answer the following questions to uncover the deeper significance of your story.
  In what ways did this experience shape your future aspirations? Tell if this experience challenged or changed any of your beliefs? If so, how?
  Did this experience challenge or change any of your beliefs? If so, how? Why was this event so impactful, and what lasting effect did it have on you?
  Answer: I then knew that I want to continue bringing people together around programming and build a software business in the future.`;

  // const userData = await getUserData();
  // return `Information on the student. Student's name is ${userData.name}.

  // The student would describe themselves (and be described by friends or family) as: Altruistic, Collaborative, Self-starter, Resilient, Hard-working.

  // Here are their answers to a questionnaire:

  // Question: How would your friends describe you?
  // Answer: ${userData.friendDescriptions}

  // Question: What motivates you the most in life?
  // Answer: ${userData.motivations}

  // Question: How do you typically approach challenges?
  // Answer: ${userData.challenges}

  // Question: Which of these best describes your leadership style?
  // Answer: ${userData.leadership}

  // Question: What type of extracurricular activities are you most involved in?
  // Answer: ${userData.extracurriculars}

  // Question: How do you want colleges to see you?
  // Answer: ${userData.seeYou}

  // Question: What’s your preferred storytelling style for essays?
  // Answer: ${userData.storyStyle}

  // Question: What personal qualities do you want emphasized in your essays?
  // Answer: ${userData.personalQualities}

  // Question: What kind of impact do you hope to make in the future?
  // Answer: ${userData.futureImpact}

  // Question: What is your biggest strength in academic or professional settings?
  // Answer: ${userData.academicStrenght}

  // Question: How do you prefer to introduce yourself in an essay?
  // Answer: ${userData.introduction}

  // Question: Now, take a moment to think about an event or experience that has played a major role in shaping the person you are today. You may have several, but focus on one that stands out as particularly meaningful. Jot down the key details—without analyzing or reflecting on them just yet. Treat it like a journal entry, simply noting what happened.
  // Answer: ${userData.keyMoments}

  // Question: Now, zero in on a pivotal five-second moment within your experience—an instant that marked a shift in your perspective, emotions, or actions. This could be the exact second you made a decision, had a breakthrough realization, or felt a surge of emotion. Describe this moment vividly, capturing the details that made it impactful.
  // Answer: ${userData.fiveSec}

  // Question: Now, take a step back and reflect on the moments you’ve captured. What made this experience meaningful? What did it reveal about you? How did it influence your perspective or shape the path you’re on today? Answer the following questions to uncover the deeper significance of your story.
  // In what ways did this experience shape your future aspirations? Tell if this experience challenged or changed any of your beliefs? If so, how?
  // Did this experience challenge or change any of your beliefs? If so, how? Why was this event so impactful, and what lasting effect did it have on you?
  // Answer: ${userData.digDeeper}`;
}

export const createEssayFromScratchAndDisplay = ({}: CreateDocumentProps) =>
  tool({
    description: `Creates an essay from scratch and displays it to the user`,
    parameters: z.object({}),
    execute: async (args, { messages }) => {
      console.log(messages);
      const { object } = await generateObject({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: await generateStudentInfoPrompt(),
        schema: z.object({
          title: z.string(),
          content: z.string(),
        }),
      });

      const id = v4();

      console.log("ID", id, object.title, object.content);

      saveEssay({
        id,
        title: object.title,
        html: object.content,
      });

      return {
        id: id,
        title: object.title,
        toolResult: "Essay was created successfully and displayed to user",
      };
    },
  });
