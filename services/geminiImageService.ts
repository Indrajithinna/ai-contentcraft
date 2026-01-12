import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export const getAiClient = () => {
    if (!aiClient) {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            console.error("API_KEY is missing in environment variables.");
            throw new Error("API Key missing");
        }
        aiClient = new GoogleGenAI({ apiKey });
    }
    return aiClient;
};

/**
 * Generate an image using Gemini 2.5 Flash Image model
 * @param prompt - The text prompt describing the image to generate
 * @param style - Art style (e.g., "Realistic", "3D Render", "Anime", etc.)
 * @param aspectRatio - Aspect ratio (e.g., "1:1", "16:9", "9:16")
 * @param textOverlay - Optional text to overlay on the image
 * @returns Base64 encoded image data URL
 */
export const generateImage = async (
    prompt: string,
    style: string,
    aspectRatio: string,
    textOverlay?: string
): Promise<string> => {
    try {
        const ai = getAiClient();

        // Enhanced prompt construction with style and text overlay
        let finalPrompt = `${prompt}. Art Style: ${style}. High quality, detailed, professional.`;
        if (textOverlay) {
            finalPrompt += ` Include text overlay: "${textOverlay}"`;
        }

        // Add aspect ratio guidance to the prompt
        const aspectRatioMap: Record<string, string> = {
            "1:1": "square composition",
            "16:9": "wide landscape composition",
            "9:16": "tall portrait composition",
            "4:3": "standard landscape composition",
            "3:4": "standard portrait composition",
        };

        if (aspectRatioMap[aspectRatio]) {
            finalPrompt += ` ${aspectRatioMap[aspectRatio]}.`;
        }

        console.log("Generating image with Gemini 2.5 Flash Image...");
        console.log("Prompt:", finalPrompt);

        // Use gemini-2.5-flash-image for image generation (CORRECT MODEL NAME)
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: finalPrompt,
        });

        // Check if the response contains image data
        if (!response.candidates || response.candidates.length === 0) {
            throw new Error("No image generated from Gemini API");
        }

        const candidate = response.candidates[0];

        // Extract image data from the response
        // The Gemini API returns images in the parts array
        if (candidate.content?.parts) {
            for (const part of candidate.content.parts) {
                // Check for inline data (image)
                if (part.inlineData) {
                    const { mimeType, data } = part.inlineData;
                    // Return as data URL
                    return `data:${mimeType};base64,${data}`;
                }
            }
        }

        // If no image data found, throw error
        throw new Error("No image data found in Gemini response");

    } catch (error: any) {
        console.error("Gemini Image Generation Error:", error);

        // Provide more helpful error messages
        if (error.message?.includes("API Key")) {
            throw new Error("Invalid or missing Gemini API key. Please check your .env.local file.");
        } else if (error.message?.includes("quota")) {
            throw new Error("API quota exceeded. Please check your Gemini API usage limits.");
        } else if (error.message?.includes("model") || error.message?.includes("NOT_FOUND")) {
            throw new Error("Model not available. Ensure gemini-2.5-flash-image is accessible with your API key.");
        }

        throw new Error(`Image generation failed: ${error.message || String(error)}`);
    }
};
