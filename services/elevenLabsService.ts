import { GoogleGenAI } from "@google/genai";

const VOICE_MAP: Record<string, string> = {
  'Rachel (American, Calm)': '21m00Tcm4TlvDq8ikWAM',
  'Domi (American, Strong)': 'AZnzlk1XvdvUeBnXmlld',
  'Bella (American, Soft)': 'EXAVITQu4vr4xnSDxMaL',
  'Antoni (American, Well-rounded)': 'ErXwobaYiN019PkySvjV',
  'Josh (American, Deep)': 'TxGEqnHWrfWFTfGW9XjX'
};

export const generateSpeech = async (text: string, voiceName: string): Promise<string> => {
  const apiKey = process.env.ELEVEN_LABS_API_KEY;
  if (!apiKey) throw new Error("ElevenLabs API Key missing in environment variables (ELEVEN_LABS_API_KEY)");

  const voiceId = VOICE_MAP[voiceName] || '21m00Tcm4TlvDq8ikWAM'; // Default to Rachel if not found

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("ElevenLabs API Error", errorData);
      throw new Error("Failed to generate speech. Please check your API Key and Quota.");
    }

    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("ElevenLabs Service Error:", error);
    throw error;
  }
};