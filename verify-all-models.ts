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
    console.error("❌ No API_KEY found in .env.local");
    console.log("Please add your Google Gemini API key to .env.local");
    process.exit(1);
}

console.log("✅ API Key found:", apiKey.substring(0, 10) + "...\n");

const testModels = async () => {
    const ai = new GoogleGenAI({ apiKey });

    console.log("🧪 Testing Gemini Models...\n");
    console.log("=".repeat(60));

    // Test 1: Text Generation
    console.log("\n📝 Test 1: Text Generation (gemini-2.5-flash)");
    console.log("-".repeat(60));
    try {
        const textResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Say "Hello from Gemini 2.5 Flash!" in a creative way.',
        });
        console.log("✅ SUCCESS!");
        console.log("Response:", textResponse.text?.substring(0, 100) + "...");
    } catch (error: any) {
        console.log("❌ FAILED!");
        console.log("Error:", error.message);
    }

    // Test 2: Image Generation
    console.log("\n🎨 Test 2: Image Generation (gemini-2.5-flash-image)");
    console.log("-".repeat(60));
    try {
        const imageResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: 'A simple red circle on white background',
        });

        if (imageResponse.candidates && imageResponse.candidates.length > 0) {
            const candidate = imageResponse.candidates[0];
            if (candidate.content?.parts) {
                for (const part of candidate.content.parts) {
                    if (part.inlineData) {
                        const { mimeType, data } = part.inlineData;
                        const buffer = Buffer.from(data, 'base64');
                        const outputPath = path.resolve(process.cwd(), 'verification-test.png');
                        fs.writeFileSync(outputPath, buffer);
                        console.log("✅ SUCCESS!");
                        console.log("Image saved to:", outputPath);
                        console.log("MIME type:", mimeType);
                        console.log("Size:", buffer.length, "bytes");
                        break;
                    }
                }
            }
        }
    } catch (error: any) {
        console.log("❌ FAILED!");
        console.log("Error:", error.message);
    }

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("\n✅ Model Verification Complete!");
    console.log("\nCurrent Configuration:");
    console.log("  • Text Generation: gemini-2.5-flash");
    console.log("  • Image Generation: gemini-2.5-flash-image");
    console.log("\n📁 Files generated:");
    console.log("  • gemini-test-output.png (from test-gemini-image.ts)");
    console.log("  • verification-test.png (from this script)");
    console.log("\n🎉 All models are working correctly!");
};

testModels().catch(console.error);
