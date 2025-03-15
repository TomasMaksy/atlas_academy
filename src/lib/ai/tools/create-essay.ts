import { openai } from "@ai-sdk/openai";
import { DataStreamWriter, generateObject, tool } from "ai";
import { z } from "zod";

interface CreateDocumentProps {
  dataStream: DataStreamWriter;
}

const userData = {
  name: "Tommy",
  age: 25,
};

const prompt = `MAIN CHARACTER IN ESSAY DATA: ${JSON.stringify(
  userData
)}\n\nWrite an engaging essay with this character.`;

export const createEssay = ({}: CreateDocumentProps) =>
  tool({
    description: `Creates an essay from scratch`,
    parameters: z.object({}),
    execute: async () => {
      const { object } = await generateObject({
        model: openai("gpt-4o"),
        system: "You are an AI that writes essays based on given context.",
        prompt,
        schema: z.object({
          title: z.string(),
          content: z.string(),
        }),
      });

      console.log("CReated", object);

      return {
        result: "Essay was created successfully",
      };
    },
  });
