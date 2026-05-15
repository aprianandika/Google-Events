import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  // In Vite, process.env is usually not available in the browser unless shimmed.
  // The platform instructions say to use process.env.GEMINI_API_KEY.
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const startGeminiChat = () => {
  const ai = getAI();
  if (!ai) {
    throw new Error("API_KEY_MISSING");
  }

  return ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are LocalPride AI, a smart city companion for Jakarta and other cities in Indonesia. You help users find local opportunities, jobs, events, and community activities. You are friendly, helpful, and speak in a mix of formal Indonesian and casual 'Anak Jakarta' slang where appropriate. Your goal is to empower the local workforce and creators.",
    },
  });
};
