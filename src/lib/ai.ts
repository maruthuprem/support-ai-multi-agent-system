import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateAIResponse(prompt: string) {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt,
  });

  return text;
}