import { Template } from './types';

export const TEMPLATES: Template[] = [
  {
    id: 'blog-post',
    name: 'Blog Post Writer',
    description: 'Generate SEO-optimized blog posts with proper structure.',
    icon: 'PenTool',
    color: 'bg-blue-100 text-blue-600',
    type: 'text',
    promptTemplate: 'Write a comprehensive and engaging blog post about "${topic}". \n\nTone: ${tone}.\nTarget Audience: ${audience}.\n\nThe blog post should include a catchy title, an introduction, several subheadings covering key points, and a conclusion. Ensure the content is SEO-friendly.',
    fields: [
      { name: 'topic', label: 'Blog Topic', type: 'text', placeholder: 'e.g., The Future of AI in Healthcare', required: true },
      { name: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., Tech enthusiasts, Doctors', required: true },
      { name: 'tone', label: 'Tone of Voice', type: 'select', options: ['Professional', 'Casual', 'Humorous', 'Authoritative', 'Inspirational'], required: true }
    ]
  },
  {
    id: 'social-media',
    name: 'Social Media Post',
    description: 'Create engaging captions for Instagram, Twitter, or LinkedIn.',
    icon: 'Hash',
    color: 'bg-pink-100 text-pink-600',
    type: 'text',
    promptTemplate: 'Write 3 variations of a social media post for ${platform} about "${content}".\n\nTone: ${tone}.\n\nInclude relevant hashtags and emojis. Keep it engaging and suitable for the platform.',
    fields: [
      { name: 'platform', label: 'Platform', type: 'select', options: ['Instagram', 'Twitter / X', 'LinkedIn', 'Facebook'], required: true },
      { name: 'content', label: 'What is your post about?', type: 'textarea', placeholder: 'Describe the image or the update you want to share...', required: true },
      { name: 'tone', label: 'Tone', type: 'select', options: ['Excited', 'Professional', 'Witty', 'Minimalist'], required: true }
    ]
  },
  {
    id: 'youtube-script',
    name: 'YouTube Video Script',
    description: 'Generate a structured script for your next video.',
    icon: 'Video',
    color: 'bg-red-100 text-red-600',
    type: 'text',
    promptTemplate: 'Create a YouTube video script for a video titled "${title}".\n\nVideo Description: ${description}.\n\nStructure the response with: \n1. Hook (0-30s)\n2. Intro\n3. Main Content Points\n4. Call to Action\n5. Outro.',
    fields: [
      { name: 'title', label: 'Video Title', type: 'text', placeholder: 'e.g., How to learn coding in 2024', required: true },
      { name: 'description', label: 'Video Description/Key Points', type: 'textarea', placeholder: 'Briefly explain what the video covers.', required: true }
    ]
  },
  {
    id: 'email-writer',
    name: 'Cold Email Generator',
    description: 'Write professional cold emails that get responses.',
    icon: 'Mail',
    color: 'bg-amber-100 text-amber-600',
    type: 'text',
    promptTemplate: 'Write a cold email to "${recipient}" proposing "${proposition}".\n\nGoal: ${goal}.\n\nKeep it concise, professional, and persuasive. Create a compelling subject line.',
    fields: [
      { name: 'recipient', label: 'Recipient Role/Industry', type: 'text', placeholder: 'e.g., Marketing Manager at a SaaS startup', required: true },
      { name: 'proposition', label: 'What are you offering?', type: 'textarea', placeholder: 'e.g., Our new AI SEO tool', required: true },
      { name: 'goal', label: 'Goal of the email', type: 'select', options: ['Schedule a demo', 'Get a reply', 'Partnership inquiry'], required: true }
    ]
  },
  {
    id: 'product-desc',
    name: 'Product Description',
    description: 'Compelling product descriptions for e-commerce.',
    icon: 'ShoppingBag',
    color: 'bg-green-100 text-green-600',
    type: 'text',
    promptTemplate: 'Write a persuasive product description for "${productName}".\n\nFeatures: ${features}.\n\nTarget Audience: ${audience}.\n\nFocus on benefits, not just features.',
    fields: [
      { name: 'productName', label: 'Product Name', type: 'text', placeholder: 'e.g., ErgoChair Pro', required: true },
      { name: 'features', label: 'Key Features', type: 'textarea', placeholder: 'List the main specs and features...', required: true },
      { name: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., Office workers', required: false }
    ]
  },
  {
    id: 'rewrite',
    name: 'Content Rewriter',
    description: 'Rewrite existing content to improve clarity or change tone.',
    icon: 'RefreshCw',
    color: 'bg-purple-100 text-purple-600',
    type: 'text',
    promptTemplate: 'Rewrite the following text to make it ${style}.\n\nOriginal Text:\n"${originalText}"\n\nMaintain the original meaning but improve flow and vocabulary.',
    fields: [
      { name: 'originalText', label: 'Content to Rewrite', type: 'textarea', placeholder: 'Paste your text here...', required: true },
      { name: 'style', label: 'New Style', type: 'select', options: ['Simpler', 'More Professional', 'More Engaging', 'Shorter (Summarize)', 'Longer (Expand)'], required: true }
    ]
  },
  {
    id: 'image-gen',
    name: 'AI Image Generator',
    description: 'Turn text into stunning visual art.',
    icon: 'Image',
    color: 'bg-pink-100 text-pink-600',
    type: 'image',
    promptTemplate: '${prompt}',
    fields: [
      { name: 'prompt', label: 'Image Prompt', type: 'textarea', placeholder: 'A futuristic city with flying cars, neon lights, 4k render...', required: true },
      { name: 'style', label: 'Art Style', type: 'select', options: ['Photorealistic', 'Anime', 'Cyberpunk', 'Oil Painting', '3D Render', 'Minimalist'], required: true },
      { name: 'aspectRatio', label: 'Aspect Ratio', type: 'select', options: ['1:1 (Square)', '16:9 (Landscape)', '9:16 (Portrait)', '4:3 (Standard)', '3:4 (Vertical)'], required: true },
      { name: 'textOverlay', label: 'Text Overlay (Optional)', type: 'text', placeholder: 'Text to appear on the image (e.g., "Summer Sale")', required: false }
    ]
  },
  {
    id: 'voice-gen',
    name: 'AI Voice Generator',
    description: 'Turn text into lifelike speech using ElevenLabs.',
    icon: 'Volume2',
    color: 'bg-orange-100 text-orange-600',
    type: 'audio',
    promptTemplate: '${text}',
    fields: [
      { name: 'text', label: 'Text to Speak', type: 'textarea', placeholder: 'Enter the text you want to convert to speech...', required: true },
      { name: 'voiceId', label: 'Voice', type: 'select', options: ['Rachel (American, Calm)', 'Domi (American, Strong)', 'Bella (American, Soft)', 'Antoni (American, Well-rounded)', 'Josh (American, Deep)'], required: true }
    ]
  }
];