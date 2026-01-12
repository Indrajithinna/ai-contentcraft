import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';

// Manual .env parser
const parseEnv = () => {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (!fs.existsSync(envPath)) return {};
        const content = fs.readFileSync(envPath, 'utf-8');
        const env: Record<string, string> = {};
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                env[match[1].trim()] = match[2].trim();
            }
        });
        return env;
    } catch (e) {
        console.error("Error reading .env.local", e);
        return {};
    }
};

const env = parseEnv();
const apiKey = env.API_KEY;

if (!apiKey) {
    console.error("No API_KEY found in .env.local");
    console.log("Please add your Google Gemini API key to .env.local as:");
    console.log("API_KEY=your_gemini_api_key_here");
    process.exit(1);
}

console.log("Found API Key:", apiKey.substring(0, 10) + "...");

const run = async () => {
    const model = "gemini-2.5-flash-image";
    console.log(`\nTesting image generation with model: ${model}\n`);

    try {
        const ai = new GoogleGenAI({ apiKey });

        const prompt = "A cute robot painting a canvas in a modern art studio, digital art. Art Style: 3D Render. High quality, detailed, professional. Square composition.";

        console.log("Prompt:", prompt);
        console.log("\nGenerating image...\n");

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        console.log("Response received!");
        console.log("Number of candidates:", response.candidates?.length || 0);

        if (!response.candidates || response.candidates.length === 0) {
            throw new Error("No image generated from Gemini API");
        }

        const candidate = response.candidates[0];
        console.log("Candidate parts:", candidate.content?.parts?.length || 0);

        // Extract image data
        if (candidate.content?.parts) {
            for (const part of candidate.content.parts) {
                if (part.inlineData) {
                    const { mimeType, data } = part.inlineData;
                    console.log(`\nImage found! MIME type: ${mimeType}`);
                    console.log(`Data length: ${data.length} characters`);

                    // Save the image
                    const buffer = Buffer.from(data, 'base64');
                    const ext = mimeType.split('/')[1] || 'png';
                    const outputPath = path.resolve(process.cwd(), `gemini-test-output.${ext}`);

                    fs.writeFileSync(outputPath, buffer);
                    console.log(`\n✅ Image saved successfully to: ${outputPath}`);

                    return;
                }
            }
        }

        console.error("❌ No image data found in response");
        console.log("Full response:", JSON.stringify(response, null, 2));

    } catch (error: any) {
        console.error("\n❌ Error generating image:");
        console.error("Message:", error.message);
        if (error.response) {
            console.error("Response:", error.response);
        }
        if (error.stack) {
            console.error("Stack:", error.stack);
        }
    }
};

run();
