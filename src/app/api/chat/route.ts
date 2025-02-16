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
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
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
        Respond in very short, conversational paragraphs.
        Do not be repetitive.
        Act like a therapist.
      `,
      messages,
    });

    // Convert the AI response to a readable stream
    const aiStream = result.toDataStream();
    
    const slowStream = new ReadableStream({
      async start(controller) {
        const reader = aiStream.getReader();

        async function readChunk() {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            return;
          }

          controller.enqueue(value);
          await new Promise(resolve => setTimeout(resolve, 50)); // 100ms delay per chunk
          readChunk();
        }

        readChunk();
      }
    });

    return new Response(slowStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });

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
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}
