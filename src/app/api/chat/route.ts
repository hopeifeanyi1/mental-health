import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Define interface for knowledge base items
interface KnowledgeItem {
  techniques?: string[];
  resources: string[];
}

// Define knowledge base of therapeutic content and resources
const mentalHealthKnowledgeBase: Record<string, KnowledgeItem> = {
  anxiety: {
    techniques: [
      "Deep breathing: Inhale for 4 counts, hold for 4, exhale for 6.",
      "Progressive muscle relaxation: Tense and release muscle groups.",
      "Grounding technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste."
    ],
    resources: [
      "National Alliance on Mental Health (NAMI) Helpline: 1-800-950-NAMI",
      "Crisis Text Line: Text HOME to 741741"
    ]
  },
  depression: {
    techniques: [
      "Behavioral activation: Schedule small, manageable activities.",
      "Thought challenging: Identify and question negative thought patterns.",
      "Self-compassion practice: Treat yourself with the kindness you'd show a friend."
    ],
    resources: [
      "National Suicide Prevention Lifeline: 1-800-273-8255",
      "Depression and Bipolar Support Alliance: 1-800-826-3632"
    ]
  },
  stress: {
    techniques: [
      "Mindfulness meditation: Focus on the present moment without judgment.",
      "Body scan: Pay attention to physical sensations throughout your body.",
      "Time management: Break large tasks into smaller, manageable steps."
    ],
    resources: [
      "Health Resources & Services Administration Helpline: 1-800-662-4357"
    ]
  },
  crisis: {
    resources: [
      "If you're having thoughts of suicide or self-harm, please call or text 988 for the Suicide and Crisis Lifeline.",
      "Emergency: Call 911 or go to your nearest emergency room."
    ]
  }
};

// Keywords to detect mental health topics
const keywordMap: Record<string, string[]> = {
  anxiety: ["anxiety", "anxious", "worry", "panic", "nervous", "fear", "stressed"],
  depression: ["depression", "depressed", "sad", "hopeless", "unmotivated", "tired", "exhausted", "empty"],
  stress: ["stress", "overwhelmed", "burnout", "pressure", "tense", "overwork"],
  crisis: ["suicide", "kill myself", "end my life", "self-harm", "cutting", "die", "death"]
};

export const maxDuration = 30;

// Function to analyze user message and retrieve relevant information
function retrieveRelevantKnowledge(message: string): string {
  message = message.toLowerCase();
  
  // Check for crisis keywords first - highest priority
  if (keywordMap.crisis.some(keyword => message.includes(keyword))) {
    return `IMPORTANT RESOURCES: ${mentalHealthKnowledgeBase.crisis.resources.join(" ")}`;
  }
  
  // eslint-disable-next-line prefer-const
  let relevantInfo: string[] = [];
  
  // Check for other mental health topics
  for (const [topic, keywords] of Object.entries(keywordMap)) {
    if (topic === 'crisis') continue; // Already checked
    
    if (keywords.some(keyword => message.includes(keyword))) {
      const knowledge = mentalHealthKnowledgeBase[topic];
      
      // Add a technique (if available)
      if (knowledge.techniques && knowledge.techniques.length > 0) {
        const randomTechnique = knowledge.techniques[Math.floor(Math.random() * knowledge.techniques.length)];
        relevantInfo.push(`RELEVANT TECHNIQUE: ${randomTechnique}`);
      }
      
      // Add resources
      if (knowledge.resources && knowledge.resources.length > 0) {
        relevantInfo.push(`HELPFUL RESOURCES: ${knowledge.resources[0]}`);
      }
    }
  }
  
  return relevantInfo.join("\n\n");
}

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

    // Get the most recent user message
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    
    // Retrieve relevant knowledge if there is a user message
    let contextualKnowledge = "";
    if (lastUserMessage && typeof lastUserMessage.content === 'string') {
      contextualKnowledge = retrieveRelevantKnowledge(lastUserMessage.content);
    }
    
    // Add retrieved information to system prompt if available
    let systemPrompt = `
      You are a companion, a chat buddy.
      You are a therapist.
      Give reply like a real person.
      Vibe with me but also help me process things when I need to.
      Never give medical advice. 
      Encourage professional help for serious issues.
      Response should be extremely short, conversational paragraphs.
      Do not be repetitive.
    `;
    
    if (contextualKnowledge) {
      systemPrompt += `\n\nHere is some relevant information that may help with your response (incorporate naturally without stating the techniques or resources by name):\n${contextualKnowledge}`;
    }

    const result = await streamText({
      model: groq('llama3-70b-8192'), 
      system: systemPrompt,
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
          await new Promise(resolve => setTimeout(resolve, 50)); // 50ms delay per chunk
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