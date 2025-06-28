import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-2.0-flash";

export function getGeminiModel(apiKey?: string): GenerativeModel {
  if (!apiKey) throw new Error("GOOGLE_API_KEY is not configured");
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: MODEL_NAME });
}

export async function testGeminiConnection(apiKey: string) {
  const model = getGeminiModel(apiKey);
  await model.generateContent(["Test connection"]);
  // If no error, connection is good
}
