# Testing Guide

## Overview

This guide covers testing strategies for AI ContentCraft.

## Testing Scripts

### Test Image Generation

```bash
npx tsx test-gemini-image.ts
```

This will:
- Test the Gemini image generation API
- Generate a sample image
- Save it as `gemini-test-output.png`

### Verify All Models

```bash
npx tsx verify-all-models.ts
```

This will:
- Check all available Gemini models
- Verify API connectivity
- Display model capabilities

## Manual Testing Checklist

### Text Generation
- [ ] Blog post generation works
- [ ] Social media post generation works
- [ ] Email generation works
- [ ] Product description generation works
- [ ] Generated content is relevant and coherent
- [ ] Error handling works for invalid inputs

### Image Generation
- [ ] Image generation completes successfully
- [ ] Different styles produce different results
- [ ] Aspect ratios are respected
- [ ] Images can be downloaded
- [ ] Error messages are clear

### Audio Generation
- [ ] Text-to-speech works
- [ ] Different voices are available
- [ ] Audio can be downloaded
- [ ] Audio quality is acceptable

### UI/UX Testing
- [ ] All templates are accessible
- [ ] Form validation works
- [ ] Loading states are displayed
- [ ] Error messages are user-friendly
- [ ] Responsive design works on mobile
- [ ] Copy/download buttons work

## Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Performance Testing

- [ ] Initial load time < 3 seconds
- [ ] Text generation < 5 seconds
- [ ] Image generation < 15 seconds
- [ ] Audio generation < 10 seconds
- [ ] No memory leaks during extended use

## API Testing

### Test API Keys

```typescript
// Test Gemini API
const testGemini = async () => {
  try {
    const result = await generateContent({ prompt: "Test" });
    console.log("✓ Gemini API working");
  } catch (error) {
    console.error("✗ Gemini API failed:", error);
  }
};

// Test ElevenLabs API
const testElevenLabs = async () => {
  try {
    const audio = await generateSpeech({ text: "Test" });
    console.log("✓ ElevenLabs API working");
  } catch (error) {
    console.error("✗ ElevenLabs API failed:", error);
  }
};
```

## Error Scenarios

Test these error cases:
- [ ] Missing API key
- [ ] Invalid API key
- [ ] Rate limit exceeded
- [ ] Network timeout
- [ ] Invalid input data
- [ ] Large file handling

## Regression Testing

Before each release:
1. Run all test scripts
2. Complete manual testing checklist
3. Test on all supported browsers
4. Verify all documentation is up to date
5. Check for console errors
6. Test deployment build

## Reporting Issues

When reporting bugs, include:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Console error messages
- Screenshots if applicable

## Future Testing Improvements

- Add unit tests with Vitest
- Add E2E tests with Playwright
- Set up CI/CD testing pipeline
- Add automated visual regression testing
- Implement API mocking for tests
