# Frequently Asked Questions (FAQ)

## General Questions

### What is AI ContentCraft?
AI ContentCraft is a multi-modal AI content generation platform that uses Google Gemini 2.5 Flash for text and image generation, and ElevenLabs for audio generation.

### Is it free to use?
The application itself is free and open-source. However, you need API keys from Google (Gemini) and ElevenLabs, which may have their own pricing based on usage.

### What can I generate with AI ContentCraft?
- **Text**: Blog posts, social media content, emails, product descriptions
- **Images**: AI-generated images in various styles and aspect ratios
- **Audio**: Text-to-speech conversion

## Setup Questions

### How do I get API keys?
- **Google Gemini**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
- **ElevenLabs**: Sign up at [ElevenLabs](https://elevenlabs.io/)

### Where do I put my API keys?
Create a `.env.local` file in the project root and add:
```env
API_KEY=your_google_gemini_api_key
ELEVEN_LABS_API_KEY=your_elevenlabs_api_key
```

### The app says "API Key missing". What do I do?
1. Ensure `.env.local` exists in the project root
2. Check that the variable names are exactly `API_KEY` and `ELEVEN_LABS_API_KEY`
3. Restart the development server after adding keys

## Usage Questions

### How long does image generation take?
Typically 3-10 seconds, depending on complexity and server load.

### Can I customize the templates?
Yes! Edit `constants.ts` to add or modify templates.

### Can I save my generated content?
Yes, use the download/copy buttons to save your generated content.

### What image styles are available?
- Realistic
- 3D Render
- Anime
- Watercolor
- Oil Painting
- Sketch

### What aspect ratios are supported?
1:1, 16:9, 9:16, 4:3, 3:4

## Technical Questions

### What technologies does this use?
- React 19.2.0
- TypeScript 5.8.2
- Vite 6.2.0
- Google Gemini AI
- ElevenLabs API

### Can I deploy this to production?
Yes! See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guides.

### Does it work offline?
No, it requires internet connection to access the AI APIs.

### Can I use this commercially?
Yes, the project is MIT licensed. However, check the terms of service for Gemini and ElevenLabs APIs.

## Troubleshooting

### Image generation fails
- Verify your Gemini API key has access to the preview model
- Check your API quota in Google AI Studio
- Ensure your prompt is appropriate (no prohibited content)

### Audio generation fails
- Verify your ElevenLabs API key is correct
- Check your ElevenLabs quota
- Ensure text length is within limits

### Build fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version (18+ required)
- Review error messages in the console

### The app is slow
- Check your internet connection
- Verify API service status
- Consider implementing caching for repeated requests

## API Questions

### How much do the APIs cost?
- **Gemini**: Check [Google AI pricing](https://ai.google.dev/pricing)
- **ElevenLabs**: Check [ElevenLabs pricing](https://elevenlabs.io/pricing)

### Are there rate limits?
Yes, both APIs have rate limits. Check your respective dashboards for details.

### Can I use different AI models?
The code is designed for Gemini 2.5 Flash. You can modify the service files to use other models, but this may require code changes.

## Contributing Questions

### How can I contribute?
See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### I found a bug. What should I do?
Please create an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Can I request features?
Yes! Create a feature request issue on GitHub.

## Privacy & Security

### Is my data stored?
No, the application doesn't store your generated content. Everything is processed in real-time.

### Are my API keys safe?
API keys are stored in `.env.local` which is gitignored. Never commit API keys to version control.

### What data is sent to the APIs?
Only the prompts and parameters you specify are sent to the respective AI services.

## Still Have Questions?

- Check the [README.md](./README.md)
- Review the [API Documentation](./API_DOCUMENTATION.md)
- Open an issue on GitHub
- Check existing issues for similar questions
