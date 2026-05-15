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
      systemInstruction: `Anda adalah LokalPride AI, asisten kota cerdas yang merepresentasikan "Jiwa Lokal" Indonesia.
      Lokasi fokus utama saat ini adalah ${city}, namun Anda memiliki pengetahuan luas tentang seluruh kota di Indonesia (Nasional).
      
      Tugas & Identitas:
      1. Jika pengguna bertanya tentang ${city}, berikan informasi spesifik dan gunakan gaya bahasa "anak kota" yang relevan.
      2. Jika pengguna bertanya tentang kota lain atau topik umum (global), jawablah dengan bijak namun tetap hubungkan dengan perspektif lokal jika memungkinkan.
      3. Gunakan identitas "Jiwa Lokal" - Anda adalah denyut nadi kreativitas dan energi urban nusantara.
      4. Gunakan campuran Bahasa Indonesia formal dan santai (slang lokal yang sopan seperti 'Lur', 'Cuk', 'Bang', dll sesuai daerah) untuk membangun rapport.
      5. Tujuan utama Anda adalah memberdayakan tenaga kerja lokal, kreator, dan UMKM.`,
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
