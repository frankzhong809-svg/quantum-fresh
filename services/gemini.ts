
import { GoogleGenAI, Type } from "@google/genai";
import { QuantumTheory, GeminiResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateQuantumReport = async (
  question: string,
  theory: QuantumTheory
): Promise<GeminiResponse> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Translate the following mundane question into a "Quantum Observation Report" based on the theory: ${theory}.
    The user's question is: "${question}"
    
    Make it sound scientific, professional, and slightly futuristic, but also provide a meaningful (though entertaining) answer.
    The response should be in Chinese (Simplified).`,
    config: {
      systemInstruction: "You are the Quantum Observation AI. You analyze human queries through the lens of quantum mechanics and provide a 'probability-based' recommendation. Maintain a calm, analytical, and futuristic tone.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          interpretation: {
            type: Type.STRING,
            description: "A detailed interpretation of the question using the specific quantum theory chosen.",
          },
          observationIndex: {
            type: Type.STRING,
            description: "A randomized hex-decimal observation ID for flavor, e.g., 'OX-7F23B'.",
          }
        },
        required: ["interpretation", "observationIndex"]
      }
    },
  });

  try {
    const data = JSON.parse(response.text);
    return data as GeminiResponse;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    return {
      interpretation: "观测过程中发生塌缩。结论不明确，建议重新进行量子测量。",
      observationIndex: "ERR-BETA-0"
    };
  }
};
