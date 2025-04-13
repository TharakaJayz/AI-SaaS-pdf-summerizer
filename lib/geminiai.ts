import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_AI_KEY });

export const generateSummaryFromGeminai = async (pdfText: string) => {
  try {
    const prompt = [
      {
        role: "user",
        parts: [
          {
            text: SUMMARY_SYSTEM_PROMPT,
          },
          {
            text: `Transform this document into an engaging easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
          },
        ],
      },
    ];

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        maxOutputTokens: 500,
        temperature: 0.1,
      },
    });
    console.log("gemini response", result.text);

    const resultData = result.text;

    if (!resultData) throw new Error("Empty response from Gemini API");

    return resultData;
  } catch (error) {
    console.error("Error generating summary with Gemini:", error);
    throw error;
  }
};
