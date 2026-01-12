# Gemini 2.5 Flash Preview Image Integration

This document explains how the **Gemini 2.5 Flash Preview Image** model has been integrated into AI ContentCraft for multi-modal image generation.

## Overview

The project now uses **Google's Gemini 2.5 Flash Preview Image** model instead of Hugging Face for image generation. This provides:

- ✅ **Higher quality images** with better prompt understanding
- ✅ **Multi-modal capabilities** from Google's latest generative AI
- ✅ **Unified API** - Same Google GenAI SDK for text and images
- ✅ **Better reliability** and faster generation times

## What Changed

### 1. New Service Created
**File**: `services/geminiImageService.ts`

This new service handles image generation using the `gemini-2.5-flash-image` model. It includes:
- Enhanced prompt construction with style and aspect ratio
- Base64 image data URL response
- Comprehensive error handling
- Support for text overlays

### 2. Updated Components
**File**: `components/Generator.tsx`

Changed the import from:
```typescript
import { generateImage } from '../services/huggingFaceService';
```

To:
```typescript
import { generateImage } from '../services/geminiImageService';
```

### 3. Test Script
**File**: `test-gemini-image.ts`

A new test script to verify the Gemini image generation is working correctly.

## Environment Variables

Make sure your `.env.local` file contains your Google Gemini API key:

```env
API_KEY=your_google_gemini_api_key_here
ELEVEN_LABS_API_KEY=your_elevenlabs_api_key_here
```

## How to Get a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env.local` file

## Testing the Integration

### Option 1: Run the Test Script

```bash
npx tsx test-gemini-image.ts
```

This will:
- Generate a test image using Gemini
- Save it as `gemini-test-output.png` (or .jpg)
- Display detailed logs about the generation process

### Option 2: Use the Web Interface

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Image Generator template
3. Enter a prompt and select style/aspect ratio
4. Click "Generate Image"

## API Features

The `generateImage` function supports:

### Parameters
- **prompt** (string): Description of the image to generate
- **style** (string): Art style (e.g., "Realistic", "3D Render", "Anime", "Watercolor")
- **aspectRatio** (string): Image dimensions (e.g., "1:1", "16:9", "9:16")
- **textOverlay** (string, optional): Text to include in the image

### Example Usage

```typescript
import { generateImage } from './services/geminiImageService';

const imageDataUrl = await generateImage(
  "A futuristic city at sunset",
  "3D Render",
  "16:9",
  "Welcome to the Future"
);

// imageDataUrl is a base64 data URL: "data:image/png;base64,..."
```

## Aspect Ratio Support

The service automatically enhances prompts based on aspect ratio:

| Aspect Ratio | Description | Best For |
|--------------|-------------|----------|
| 1:1 | Square composition | Social media posts, avatars |
| 16:9 | Wide landscape | Desktop wallpapers, presentations |
| 9:16 | Tall portrait | Mobile wallpapers, stories |
| 4:3 | Standard landscape | Traditional photos |
| 3:4 | Standard portrait | Portraits, posters |

## Error Handling

The service provides helpful error messages for common issues:

- **Missing API Key**: "Invalid or missing Gemini API key"
- **Quota Exceeded**: "API quota exceeded"
- **Model Unavailable**: "Model not available with your API key"

## Model Information

**Model Name**: `gemini-2.5-flash-image`

This is Google's latest multi-modal generative model that can:
- Generate images from text descriptions
- Understand complex prompts with style and composition requirements
- Produce high-quality, detailed images
- Support various aspect ratios and artistic styles

## Troubleshooting

### Issue: "API Key missing"
**Solution**: Ensure `.env.local` has `API_KEY=your_key_here`

### Issue: "Model not available"
**Solution**: Verify your API key has access to the preview model. You may need to enable it in Google AI Studio.

### Issue: "No image data found"
**Solution**: Check the console logs. The API might be returning an error or the model might be temporarily unavailable.

### Issue: Images not displaying
**Solution**: Check browser console for CORS or data URL errors. The service returns base64 data URLs which should work in all browsers.

## Performance Notes

- **Generation Time**: Typically 3-10 seconds depending on complexity
- **Image Quality**: High resolution, professional quality
- **Rate Limits**: Check your Google AI Studio quota
- **Cost**: Refer to [Google AI Pricing](https://ai.google.dev/pricing)

## Migration from Hugging Face

Hugging Face integration has been **completely removed** from this project:

1. ✅ The API signature remains the same - no changes needed in your components
2. ✅ `huggingFaceService.ts` has been deleted
3. ✅ `test-image-gen.ts` has been deleted
4. ✅ No need for `HUGGING_FACE_API_KEY` in `.env.local`

## Next Steps

- Test image generation with various prompts and styles
- Adjust prompt templates in `constants.ts` if needed
- Monitor API usage in Google AI Studio
- Consider implementing caching for frequently generated images

## Support

For issues with:
- **This integration**: Check the code in `services/geminiImageService.ts`
- **Gemini API**: Visit [Google AI Documentation](https://ai.google.dev/docs)
- **API Keys**: Go to [Google AI Studio](https://aistudio.google.com/)

---

**Last Updated**: 2025-11-26
**Model Version**: gemini-2.5-flash-image
**SDK Version**: @google/genai ^1.30.0
