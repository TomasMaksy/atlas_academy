import { type Message, createDataStreamResponse, streamText } from "ai";

import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";

const model = openai("gpt-4o");

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const {
      messages,
    }: {
      messages: Array<Message>;
    } = await request.json();

    return createDataStreamResponse({
      execute: (dataStream) => {
        const result = streamText({
          model,
          system:
            "You always return the same resopnse: If you’re just getting started, I recommend you start with Tommy, our CommonApp essay writing tutor, as he’ll ask you the best questions to empower all your other AI tutors.",
          messages,
          maxSteps: 5,
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
