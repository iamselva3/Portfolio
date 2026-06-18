// Portfolio AI assistant powered by Groq (Llama). Your portfolio data is
// injected into the system prompt below, so the model answers as "you"
// grounded in real facts — no fine-tuning/training required. To update what
// the assistant knows, just edit src/data/portfolioData.js.
import { portfolioData } from "../data/portfolioData";

const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

// Fast + free on Groq's tier. Swap for "llama-3.1-8b-instant" if you hit limits.
const GROQ_MODEL = "llama-3.3-70b-versatile";

// System prompt embedding the portfolio data as grounding context.
const systemInstruction = `
You are Selvaganesh's personal AI assistant on his portfolio website.
Answer questions about Selvaganesh in a friendly, professional, and concise way.
Represent him warmly, but clearly say you are his AI assistant if asked directly.

Here is everything you know about Selvaganesh (treat this as the source of truth):
${JSON.stringify(portfolioData, null, 2)}

Guidelines:
1. Be concise and to the point — a few sentences unless more detail is asked for.
2. If asked something not in the data, politely say you don't have that detail and
   suggest contacting Selvaganesh directly at ${portfolioData.contact.email}.
3. Highlight his MERN stack skills and project experience when relevant.
4. Keep the tone enthusiastic but professional. Never invent facts.
`;

const callGroq = async (history) => {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: systemInstruction },
          ...history,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    }
  );

  if (!response.ok) {
    // Surface the real reason instead of failing silently.
    let detail = "";
    try {
      const errBody = await response.json();
      detail = errBody?.error?.message || "";
    } catch {
      /* ignore parse errors */
    }
    throw new Error(
      `Groq API error ${response.status}${detail ? `: ${detail}` : ""}`
    );
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || "";
};

/**
 * Returns a stateful chat session. It keeps the running conversation in memory
 * so the assistant remembers earlier turns within the session. The returned
 * object stays compatible with the Chatbot component: sendMessage(msg) resolves
 * to { response: { text: async () => string } }.
 */
export const getChatSession = () => {
  if (!groqApiKey) {
    // Fail loudly and helpfully if the key is missing.
    return {
      sendMessage: async () => ({
        response: {
          text: async () =>
            "The assistant isn't configured yet — add VITE_GROQ_API_KEY to your .env file and restart the dev server.",
        },
      }),
    };
  }

  const history = []; // [{ role: "user" | "assistant", content: string }]

  return {
    sendMessage: async (msg) => {
      history.push({ role: "user", content: msg });
      const answer = await callGroq(history);
      history.push({ role: "assistant", content: answer });
      return { response: { text: async () => answer } };
    },
  };
};
