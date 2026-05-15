import { GoogleGenAI } from "@google/genai";

const getAPIKey = () => {
  // Use a temporary key if missing just to prevent the SDK from crashing on init
  // But we will handle the actual missing key check in the action calls
  return process.env.GEMINI_API_KEY || "";
};

export const startGeminiChat = (city: string = "Jakarta") => {
  const apiKey = getAPIKey();
  
  // Only handle empty key check here if we want to throw a custom error
  if (!apiKey || apiKey === "") {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });
  return ai.chats.create({
    model: "gemini-flash-latest",
    config: {
      systemInstruction: `You are LocalPride AI, a smart city companion for ${city} and all cities in Indonesia. 
      Your primary focus right now is ${city}, but you are a 'Jiwa Lokal' (Local Soul) who knows about all Indonesian urban landscapes.
      You help users find local opportunities, jobs, events, and community activities. 
      
      Instructions:
      1. If the user asks about ${city}, provide specific context and helpful 'anak kota' advice.
      2. If the user asks about other cities or global topics, use your general knowledge but relate it back to how it might impact their local experience if relevant.
      3. Use 'Jiwa Lokal' as your identity - you represent the pulse and energy of Indonesian urbanism.
      4. Speak in a mix of formal Indonesian and casual local slang (like 'Anak Jakarta' or appropriate regional slang) to build rapport.
      5. Your goal is to empower the local workforce and creators.`,
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
