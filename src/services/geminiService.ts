import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getGeminiResponse = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are LocalPride AI, a smart city companion for Jakarta and other cities in Indonesia. You help users find local opportunities, jobs, events, and community activities. You are friendly, helpful, and speak in a mix of formal Indonesian and casual 'Anak Jakarta' slang where appropriate. Your goal is to empower the local workforce and creators.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const startGeminiChat = (history: any[] = []) => {
  return ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are LocalPride AI, a smart city companion for Jakarta and other cities in Indonesia. You help users find local opportunities, jobs, events, and community activities. You are friendly, helpful, and speak in a mix of formal Indonesian and casual 'Anak Jakarta' slang where appropriate. Your goal is to empower the local workforce and creators.",
    },
    // history: history // Note: @google/genai chat history format might differ, check if needed
  });
};
