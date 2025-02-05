import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Add your system prompt for mental health
  const systemMessage = {
    role: 'system',
    content: `
      You are a compassionate mental health companion. Provide supportive,
      non-judgmental responses. Never give medical advice. Encourage
      professional help for serious issues. Respond in short,
      conversational paragraphs.
    `
  };

  const result = await streamText({
    model: groq('llama-3.3-70b-versatile'),
    messages: [systemMessage, ...messages],
  });

  return result.toDataStreamResponse();
}