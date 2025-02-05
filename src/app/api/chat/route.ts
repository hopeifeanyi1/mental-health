import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

   
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ 
        error: "Invalid request format: messages must be an array"
      }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const result = await streamText({
      model: groq('llama3-70b-8192'), 
      system: `
        You are a compassionate mental health companion.
        Provide supportive, non-judgmental responses.
        Never give medical advice. 
        Encourage professional help for serious issues.
        Respond in short, conversational paragraphs.
      `,
      messages,
    });

    const response = result.toDataStreamResponse();
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({
      error: "Internal server error",
      details: error.message || 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}