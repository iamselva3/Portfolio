// LLM integration using Groq or Cohere (fallback to HuggingFace)
import { portfolioData } from "../data/portfolioData";

// Retrieve API keys from environment variables
const groqApiKey = import.meta.env.VITE_GROQ_API_KEY; // Groq API key
const cohereApiKey = import.meta.env.VITE_COHERE_API_KEY; // Cohere API key (optional)

// Choose provider – default to Groq if key is present, else Cohere, else fallback
const provider = groqApiKey ? "groq" : cohereApiKey ? "cohere" : null;

// System prompt embedding the portfolio data
const systemInstruction = `
You are Selvaganesh's personal AI assistant for his portfolio website.
Your goal is to answer questions about Selvaganesh in a friendly, professional, and concise manner.
You should act as if you are representing him, but clearly state you are his AI assistant if asked.

Here is all the information you know about Selvaganesh:
${JSON.stringify(portfolioData, null, 2)}

Guidelines:
1. Be concise and to the point.
2. If asked about something not in the data, politely say you don't have that information but they can contact Selvaganesh directly at ${portfolioData.contact.email}.
3. Highlight his MERN stack skills and project experience when relevant.
4. Keep the tone enthusiastic but professional.
`;

// Helper for Groq API call
const callGroq = async (message) => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${groqApiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    }),
  });
  const data = await response.json();
  return data?.choices?.[0]?.message?.content || "";
};

// Helper for Cohere API call
const callCohere = async (message) => {
  const response = await fetch("https://api.cohere.com/v1/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cohereApiKey}`,
    },
    body: JSON.stringify({
      model: "command-r",
      message: systemInstruction + "\n\n" + message,
      temperature: 0.7,
    }),
  });
  const data = await response.json();
  return data?.message?.content || "";
};

// Fallback to free HuggingFace inference when no API key is set
const fallbackModelUrl = "https://api-inference.huggingface.co/models/google/flan-t5-base";
const fallbackRequest = async (prompt) => {
  const response = await fetch(fallbackModelUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: prompt }),
  });
  const data = await response.json();
  return data?.generated_text || "";
};

/**
 * Returns a minimal chat session object compatible with the existing Chatbot component.
 * The object exposes a `sendMessage` method that resolves to an object with a `response.text()` async function.
 */
export const getChatSession = () => {
  return {
    sendMessage: async (msg) => {
      let answer = "";
      if (provider === "groq") {
        answer = await callGroq(msg);
      } else if (provider === "cohere") {
        answer = await callCohere(msg);
      } else {
        console.warn("No LLM API key provided; using HuggingFace free inference as fallback.");
        answer = await fallbackRequest(msg);
      }
      return { response: { text: async () => answer } };
    },
  };
};
