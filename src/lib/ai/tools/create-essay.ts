import { openai } from "@ai-sdk/openai";
import { DataStreamWriter, generateObject, tool } from "ai";
import { z } from "zod";
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
  return `Information on the student.
  
  The student would describe themselves (and be described by friends or family) as: Altruistic, Collaborative, Self-starter, Resilient, Hard-working.

  Here are their answers to a questionnaire:
  1. What motivates you the most in life?
  A) Intellectual curiosity – I love learning and exploring new ideas
  2. How do you typically approach challenges?
  A) I analyze them logically and strategize solutions
  3. Which of these best describes your leadership style?
  A) Visionary – I inspire people with new ideas and big goals
  4. What type of extracurricular activities are you most involved in?
  B) Business, finance, or entrepreneurship ventures
  5. How do you want colleges to see you?
  B) As a leader who makes a meaningful impact
  6. What’s your preferred storytelling style for essays?
  B) Reflective – Deeply personal and introspective
  7. What personal qualities do you want emphasized in your essays?
  C) Leadership and initiative
  8. What kind of impact do you hope to make in the future?
  B) Creating a successful business or organization
  D) Solving social justice or global issues
  E) Inspiring or mentoring others
  9. What is your biggest strength in academic or professional settings?
  A) Critical thinking and problem-solving
  B) Communication and public speaking
  C) Teamwork and collaboration
  D) Creativity and adaptability
  E) Discipline and work ethic
  10. How do you prefer to introduce yourself in an essay?
  A) A personal anecdote that highlights my character
  B) A bold statement that grabs attention immediately

  Here are the student's answers to further questions:
  1. Now, take a moment to think about an event or experience that has played a major role in shaping the person you are today. You may have several, but focus on one that stands out as particularly meaningful. Jot down the key details—without analyzing or reflecting on them just yet. Treat it like a journal entry, simply noting what happened.

  I built a board game for elderly people to help them improve their memory. I later worked with my brother to adapt it to a computer game.

  2. Now, zero in on a pivotal five-second moment within your experience—an instant that marked a shift in your perspective, emotions, or actions. This could be the exact second you made a decision, had a breakthrough realization, or felt a surge of emotion. Describe this moment vividly, capturing the details that made it impactful.

  The moment we came back to the retirement home where we left the first few demo games for the elderly residents to trial, and were met with overwhelmingly positive feedback on how fun the game was and how it had already helped a few senior better remember little daily things, I knew we were on the right track. 

  1. Now, take a step back and reflect on the moments you’ve captured. What made this experience meaningful? What did it reveal about you? How did it influence your perspective or shape the path you’re on today? Answer the following questions to uncover the deeper significance of your story.
  In what ways did this experience shape your future aspirations?
  Answer: This experience instilled within me the self confidence that I can build impressive hardware and software solutions, learn advanced programming concepts of my own and work efficiently within a team setting to bring ideas to life. It also showed me the joy to be derived from public service. More than anything else, it made it clear that I want to pursue a career in entrepreneurship with an eye towards impact. 
  Did this experience challenge or change any of your beliefs? If so, how?
  Answer: This experience showed that there's a lot to be learned from building something in practice rather than just imagining/sketching it in theory. While before I prized theoretical knowledge more highly, believing that learning the theory would enough to make me understand something fully, I now understood that studying just the theory left gaps in my understanding. Attempting to practically solve a problem perfectly pointed them out and helped me enhance my learning efficiency by giving me clear subproblems that I can focus on. 
  Why was this event so impactful, and what lasting effect did it have on you?
  Answer: I learned a lot about building a product/business, a customer-centric approach to development. I also came to see that no matter my status, education or position, I could make a difference by simply doing. `;
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
