
import { GoogleGenAI, Modality } from "@google/genai";

// Fix: Remove 'as string' cast. The API key is assumed to be present per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateSpeech(prompt: string, voiceName: string): Promise<string | null> {
  // Fix: Remove redundant API key check per guidelines.
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voiceName },
            },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio) {
      return base64Audio;
    } else {
      console.error("No audio data in API response:", response);
      throw new Error("API did not return audio data.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate speech: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating speech.");
  }
}
