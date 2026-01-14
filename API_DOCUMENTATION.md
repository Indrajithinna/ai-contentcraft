# API Documentation

## Overview

AI ContentCraft uses multiple AI services to generate content. This document describes the API integrations and how to use them.

## Services

### 1. Google Gemini API

#### Text Generation
- **Model**: `gemini-2.5-flash`
- **Purpose**: Generate text content (blog posts, emails, social media, etc.)
- **Rate Limits**: Check your Google AI Studio quota

#### Image Generation
- **Model**: `gemini-2.5-flash-preview-image`
- **Purpose**: Generate AI images from text prompts
- **Supported Styles**: Realistic, 3D Render, Anime, Watercolor, Oil Painting, Sketch
- **Aspect Ratios**: 1:1, 16:9, 9:16, 4:3, 3:4

### 2. ElevenLabs API

- **Purpose**: Text-to-speech audio generation
- **Supported Voices**: Multiple voice options available
- **Output Format**: MP3

## Environment Variables

```env
API_KEY=your_google_gemini_api_key
ELEVEN_LABS_API_KEY=your_elevenlabs_api_key
```

## Usage Examples

### Text Generation

```typescript
import { generateContent } from './services/geminiService';

const result = await generateContent({
  prompt: 'Write a blog post about AI',
  maxTokens: 1000
});
```

### Image Generation

```typescript
import { generateImage } from './services/geminiImageService';

const imageUrl = await generateImage({
  prompt: 'A futuristic city at sunset',
  style: '3D Render',
  aspectRatio: '16:9'
});
```

### Audio Generation

```typescript
import { generateSpeech } from './services/elevenLabsService';

const audioBlob = await generateSpeech({
  text: 'Hello, world!',
  voice: 'default'
});
```

## Error Handling

All API calls include comprehensive error handling:

- **API Key Missing**: Returns clear error message
- **Rate Limit Exceeded**: Provides retry information
- **Invalid Input**: Validates input before API call
- **Network Errors**: Handles connection issues gracefully

## Rate Limits

- **Gemini API**: Check your quota in Google AI Studio
- **ElevenLabs**: Depends on your subscription plan

## Best Practices

1. Always validate user input before API calls
2. Implement proper error handling
3. Monitor API usage and costs
4. Cache responses when appropriate
5. Use environment variables for API keys
6. Never expose API keys in client-side code

## Support

For API-specific issues:
- **Gemini**: [Google AI Documentation](https://ai.google.dev/docs)
- **ElevenLabs**: [ElevenLabs API Docs](https://elevenlabs.io/docs)
