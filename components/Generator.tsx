import React, { useState, useEffect } from 'react';
import { Template } from '../types';
import { Icon } from './Icons';
import { generateContent } from '../services/geminiService';
import { generateSpeech } from '../services/elevenLabsService';
import { generateImage } from '../services/geminiImageService';

interface GeneratorProps {
  template: Template;
  onBack: () => void;
  onSave: (content: string, templateName: string, inputs: any) => void;
}

export const Generator: React.FC<GeneratorProps> = ({ template, onBack, onSave }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Initialize defaults when template changes
  useEffect(() => {
    const defaults: Record<string, string> = {};
    template.fields.forEach(field => {
      if (field.type === 'select' && field.options && field.options.length > 0) {
        defaults[field.name] = field.options[0];
      }
    });
    setFormData(defaults);
    setOutput('');
  }, [template]);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');

    // Construct prompt for text generation
    let prompt = template.promptTemplate;
    for (const [key, value] of Object.entries(formData)) {
      prompt = prompt.replace(`\${${key}}`, value || '');
    }

    try {
      let result = '';
      if (template.type === 'audio') {
        result = await generateSpeech(formData['text'], formData['voiceId']);
      } else if (template.type === 'image') {
        result = await generateImage(formData['prompt'], formData['style'], formData['aspectRatio'], formData['textOverlay']);
      } else {
        result = await generateContent(prompt);
      }
      setOutput(result);
      onSave(result, template.name, formData);
    } catch (error) {
      console.error("Generation Error:", error);
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = output;
    let ext = 'txt';
    if (output.startsWith('data:audio')) ext = 'mp3';
    if (output.startsWith('data:image')) ext = 'png';

    link.download = `generated-${Date.now()}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAudio = template.type === 'audio';
  const isImage = template.type === 'image';
  const hasOutput = !!output;
  const isMediaOutput = hasOutput && (output.startsWith('data:image') || output.startsWith('data:audio'));

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-6rem)]">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <Icon name="ArrowLeft" className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{template.name}</h2>
          <p className="text-slate-500 text-sm">Fill in the details to generate content.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Input Form */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-y-auto">
          <form onSubmit={handleGenerate} className="space-y-5">
            {template.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    required={field.required}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow resize-none"
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  />
                ) : field.type === 'select' ? (
                  <div className="relative">
                    <select
                      required={field.required}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow appearance-none bg-white"
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                    >
                      <option value="" disabled>Select option</option>
                      {field.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                ) : (
                  <input
                    type="text"
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow"
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Icon name="Sparkles" className="w-5 h-5" />
                  <span>
                    {isAudio ? 'Generate Speech' : isImage ? 'Generate Image' : 'Generate Content'}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Display */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden h-[500px] lg:h-auto">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-semibold text-slate-700">Generated Result</h3>
            {hasOutput && !loading && (
              <>
                {isMediaOutput ? (
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    <Icon name="Download" className="w-4 h-4" />
                    Download
                  </button>
                ) : (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    {copied ? <Icon name="Check" className="w-4 h-4" /> : <Icon name="Copy" className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                )}
              </>
            )}
          </div>

          <div className="flex-1 p-6 overflow-y-auto bg-white flex flex-col items-center">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
                  <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 w-24 bg-slate-200 rounded"></div>
                </div>
              </div>
            ) : hasOutput ? (
              isMediaOutput ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100 p-6">
                  {output.startsWith('data:image') ? (
                    <img src={output} alt="Generated" className="max-w-full max-h-full object-contain rounded-lg shadow-sm" />
                  ) : (
                    <div className="w-full max-w-md text-center">
                      <div className="bg-indigo-50 p-6 rounded-full inline-block mb-4">
                        <Icon name="Volume2" className="w-12 h-12 text-indigo-600" />
                      </div>
                      <audio controls src={output} className="w-full" />
                      <p className="mt-4 text-slate-500 text-sm">Audio generated successfully!</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full prose prose-slate max-w-none">
                  <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-left">
                    {output}
                  </div>
                </div>
              )
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <Icon name="Sparkles" className="w-8 h-8 text-slate-300" />
                </div>
                <p>Your generated content will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};