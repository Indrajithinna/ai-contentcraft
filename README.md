# AI ContentCraft

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)
![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-orange)

A powerful multi-modal AI content generation platform using **Google Gemini 2.5 Flash** models.

## ✨ Features

- 📝 **Text Generation** - Blog posts, social media, emails, and more
- 🎨 **Image Generation** - Using Gemini 2.5 Flash Preview Image
- 🎙️ **Audio Generation** - Text-to-speech with ElevenLabs
- 🎯 **Multiple Templates** - Pre-built templates for various content types
- 💾 **Save & Export** - Download and save your generated content

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the template file and add your API keys:

```bash
# Copy the template
copy .env.template .env.local

# Or on Mac/Linux
cp .env.template .env.local
```

Edit `.env.local` and add your API keys:

```env
API_KEY=your_google_gemini_api_key_here
ELEVEN_LABS_API_KEY=your_elevenlabs_api_key_here
```

#### Get Your API Keys:

- **Google Gemini**: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- **ElevenLabs**: [https://elevenlabs.io/](https://elevenlabs.io/)

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎨 Image Generation with Gemini 2.5

This project uses **Gemini 2.5 Flash Preview Image** for state-of-the-art image generation.

### Features:
- ✅ High-quality, detailed images
- ✅ Multiple art styles (Realistic, 3D Render, Anime, Watercolor, etc.)
- ✅ Custom aspect ratios (1:1, 16:9, 9:16, etc.)
- ✅ Text overlay support
- ✅ Fast generation (3-10 seconds)

### Test Image Generation:

```bash
npx tsx test-gemini-image.ts
```

This will generate a test image and save it to `gemini-test-output.png`.

For detailed documentation, see [GEMINI_IMAGE_SETUP.md](./GEMINI_IMAGE_SETUP.md)

## 📁 Project Structure

```
ai-contentcraft/
├── components/          # React components
│   ├── Generator.tsx   # Main content generator
│   ├── Icons.tsx       # Icon components
│   └── ...
├── services/           # API service integrations
│   ├── geminiService.ts       # Text generation (Gemini)
│   ├── geminiImageService.ts  # Image generation (Gemini)
│   └── elevenLabsService.ts   # Audio generation (ElevenLabs)
├── constants.ts        # Template definitions
├── types.ts           # TypeScript types
└── .env.local         # Environment variables (create this!)
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npx tsx test-gemini-image.ts` - Test image generation

## 🔧 Configuration

### Supported Content Types

1. **Text** - Blog posts, social media, emails, product descriptions
2. **Image** - AI-generated images with custom styles
3. **Audio** - Text-to-speech conversion

### Customizing Templates

Edit `constants.ts` to add or modify content templates:

```typescript
{
  id: 'custom-template',
  name: 'Custom Template',
  type: 'text',
  promptTemplate: 'Your prompt template here with ${variables}',
  fields: [
    { name: 'variable', label: 'Label', type: 'text', required: true }
  ]
}
```

## 🎯 Usage Examples

### Generate an Image

1. Select "Image Generator" template
2. Enter your prompt: "A futuristic city at sunset"
3. Choose style: "3D Render"
4. Select aspect ratio: "16:9"
5. Click "Generate Image"

### Generate Text Content

1. Select any text template (e.g., "Blog Post")
2. Fill in the required fields
3. Click "Generate Content"
4. Copy or download the result

### Generate Audio

1. Select "Text to Speech" template
2. Enter your text
3. Choose a voice
4. Click "Generate Speech"
5. Download the audio file

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `API_KEY` | Yes | Google Gemini API key |
| `ELEVEN_LABS_API_KEY` | Yes | ElevenLabs API key for audio |

## 🐛 Troubleshooting

### "API Key missing" error
- Ensure `.env.local` exists and contains `API_KEY=your_key`
- Restart the dev server after adding the key

### Image generation fails
- Verify your Gemini API key has access to the preview model
- Check your API quota in Google AI Studio
- See [GEMINI_IMAGE_SETUP.md](./GEMINI_IMAGE_SETUP.md) for detailed troubleshooting

### Audio generation fails
- Verify your ElevenLabs API key is correct
- Check your ElevenLabs quota

## 📚 Documentation

### Getting Started
- [README](./README.md) - This file
- [Quick Reference](./QUICK_REFERENCE.md) - Quick start guide
- [FAQ](./FAQ.md) - Frequently asked questions

### Setup & Configuration
- [Gemini Image Setup](./GEMINI_IMAGE_SETUP.md) - Detailed image generation setup
- [API Documentation](./API_DOCUMENTATION.md) - API integration guide
- [Environment Variables](./.env.template) - Configuration template

### Development
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- [Testing Guide](./TESTING.md) - Testing strategies and tools
- [Performance Guide](./PERFORMANCE.md) - Optimization tips
- [Example Prompts](./examples/PROMPTS.md) - Sample prompts to get started

### Deployment & Production
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to various platforms
- [Security Policy](./SECURITY.md) - Security best practices

### Project Management
- [Changelog](./CHANGELOG.md) - Version history
- [Code of Conduct](./CODE_OF_CONDUCT.md) - Community guidelines
- [License](./LICENSE) - MIT License

### External Resources
- [Google AI Documentation](https://ai.google.dev/docs)
- [ElevenLabs API Docs](https://elevenlabs.io/docs)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Vercel/Netlify

1. Connect your repository
2. Add environment variables in the platform settings
3. Deploy!

**Important**: Don't forget to add your API keys as environment variables in your deployment platform.

## 🔄 Recent Updates

### v1.0.0 - Gemini 2.5 Integration
- ✅ Migrated from Hugging Face to Gemini 2.5 Flash Preview Image
- ✅ Completely removed Hugging Face dependencies
- ✅ Improved image quality and generation speed
- ✅ Added comprehensive error handling
- ✅ Created test scripts and documentation

## 📝 License

MIT License - feel free to use this project for your own purposes!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Tips

- **Image Prompts**: Be specific and descriptive for best results
- **API Costs**: Monitor your usage in Google AI Studio
- **Performance**: Image generation takes 3-10 seconds on average
- **Styles**: Experiment with different art styles for varied results

## 🆘 Support

For issues or questions:
1. Check the [GEMINI_IMAGE_SETUP.md](./GEMINI_IMAGE_SETUP.md) guide
2. Review the troubleshooting section above
3. Check the browser console for error messages
4. Verify your API keys are correct

---

**Built with**: React, TypeScript, Vite, Google Gemini AI, ElevenLabs

**Last Updated**: 2025-11-26
