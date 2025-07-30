import { getGeminiModel } from "@/src/lib/genai/models/gemini";

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY; // Or use a safer method for RN/Expo

const analyzeFood = async (prompt: string) => {
  const model = getGeminiModel(apiKey);
  return await model.generateContent([prompt]);
};

export { analyzeFood };
