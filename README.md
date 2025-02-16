The Mental Health Chatbot, Easy Therapy, is a web-based application built with Next.js, Framer Motion, and AI-powered conversational capabilities. It provides a supportive, non-judgmental space for users seeking mental health guidance. The chatbot does not offer medical advice but encourages professional consultation for serious issues.
Features
AI-powered chatbot for mental health support
Interactive and animated UI with Framer Motion
Chat history for tracking conversations
Responsive layout for mobile and desktop
Uses AI SDK's GROQ LLaMA 3 model for generating empathetic responses
Implements streaming responses for a smooth chat experience
Technologies Used
Next.js: Server-side rendering and API handling
Typescript: Type Safety
React: Component-based frontend
Framer Motion: Smooth animations
AI SDK & GROQ: Natural language processing
Tailwind CSS: Modern and responsive UI styling

Installation & Setup
Clone the repository:
 git clone https://github.com/your-repo/mental-health-chatbot.git
cd mental-health-chatbot

Install dependencies:
 npm install

Run the development server:
 npm run dev

Open http://localhost:3000 in your browser.

Key Components
Home Page (page.tsx)
Displays landing page with animations using Framer Motion
Uses <Landing/> component for introductory content
Chat Interface (ChatInterface.tsx)
Handles user input and chatbot responses
Uses useChat hook for API communication
Implements typing indicators and smooth scrolling
Chat API (/api/chat.ts)
Accepts POST requests with user messages
Uses groq AI model (llama3-70b-8192)
Returns streamed chatbot responses with delay simulation

API Endpoint
POST /api/chat
Request Body:
{
  "messages": [
    { "role": "user", "content": "I feel anxious." }
  ]
}

Response:
{
  "role": "assistant",
  "content": "I'm here for you. Would you like to talk about what's on your mind?"
}


Deployment
Vercel (Recommended):
 npm run build
vercel deploy

Self-hosting:
 npm run build
npm start


Contributors
Ifeanyi Hope - Developer & Project Lead