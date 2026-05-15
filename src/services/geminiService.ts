import { GoogleGenAI } from "@google/genai";

const getAPIKey = () => {
  // Use a temporary key if missing just to prevent the SDK from crashing on init
  // But we will handle the actual missing key check in the action calls
  return process.env.GEMINI_API_KEY || "";
};

export const startGeminiChat = () => {
  const apiKey = getAPIKey();
  
  // Only handle empty key check here if we want to throw a custom error
  if (!apiKey || apiKey === "") {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });
  return ai.chats.create({
    model: "gemini-flash-latest",
    config: {
      systemInstruction: "You are LocalPride AI, a smart city companion for Jakarta and other cities in Indonesia. You help users find local opportunities, jobs, events, and community activities. You are friendly, helpful, and speak in a mix of formal Indonesian and casual 'Anak Jakarta' slang where appropriate. Your goal is to empower the local workforce and creators.",
    },
  });
};

export const getGeminiResponse = async (prompt: string) => {
  const apiKey = getAPIKey();
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });
  return response.text;
};
