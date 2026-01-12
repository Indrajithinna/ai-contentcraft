import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export const getAiClient = () => {
  if (!aiClient) {
    // In a real app, you'd likely handle missing keys more gracefully or prompt UI
    // For this setup, we assume the environment variable is present as per instructions.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing in environment variables.");
      throw new Error("API Key missing");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const generateContent = async (prompt: string): Promise<string> => {
  try {
    const ai = getAiClient();

    // Using gemini-2.5-flash for text generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};