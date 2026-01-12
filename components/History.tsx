import React from 'react';
import { HistoryItem } from '../types';
import { Icon } from './Icons';

interface HistoryProps {
  history: HistoryItem[];
}

export const History: React.FC<HistoryProps> = ({ history }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const handleDownload = (content: string) => {
    const link = document.createElement('a');
    link.href = content;
    const isAudio = content.startsWith('data:audio');
    const ext = isAudio ? 'mp3' : 'png';
    link.download = `history-generated-${Date.now()}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="bg-slate-100 p-6 rounded-full mb-4">
          <Icon name="Clock" className="w-12 h-12 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No History Yet</h3>
        <p className="text-slate-500 max-w-xs">Generate some content to see your history here.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">History</h2>
      <div className="space-y-4">
        {history.map((item) => {
            const isImage = item.content.startsWith('data:image');
            const isAudio = item.content.startsWith('data:audio');
            const isMedia = isImage || isAudio;
            
            return (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                      {item.templateName}
                    </span>
                    <span className="text-slate-400 text-xs">
                      {new Date(item.createdAt).toLocaleDateString()} • {new Date(item.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  {isMedia ? (
                     <button 
                        onClick={() => handleDownload(item.content)}
                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                        title="Download"
                      >
                        <Icon name="Download" className="w-5 h-5" />
                      </button>
                  ) : (
                    <button 
                      onClick={() => handleCopy(item.content, item.id)}
                      className="text-slate-400 hover:text-indigo-600 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedId === item.id ? <Icon name="Check" className="w-5 h-5 text-green-500" /> : <Icon name="Copy" className="w-5 h-5" />}
                    </button>
                  )}
                </div>
                
                {isImage ? (
                    <div className="mt-2 bg-slate-50 rounded-lg p-2 border border-slate-100 inline-block">
                        <img src={item.content} alt="Generated History" className="h-48 rounded-lg object-cover" />
                        <div className="mt-2 text-xs text-slate-500 px-1">
                            Prompt: {item.inputs.prompt || 'Image generation'}
                        </div>
                    </div>
                ) : isAudio ? (
                    <div className="mt-2 bg-slate-50 rounded-lg p-4 border border-slate-100 inline-block w-full max-w-md">
                        <div className="flex items-center gap-3 mb-2">
                           <Icon name="Volume2" className="w-5 h-5 text-indigo-600" />
                           <span className="text-sm font-medium text-slate-700">Audio Generated</span>
                        </div>
                        <audio controls src={item.content} className="w-full" />
                        <div className="mt-2 text-xs text-slate-500 px-1">
                            Text: {item.inputs.text ? (item.inputs.text.substring(0, 50) + (item.inputs.text.length > 50 ? '...' : '')) : 'Voice Generation'}
                        </div>
                    </div>
                ) : (
                    <div className="bg-slate-50 rounded-lg p-4 text-slate-700 text-sm whitespace-pre-wrap line-clamp-3 hover:line-clamp-none cursor-pointer transition-all">
                      {item.content}
                    </div>
                )}
              </div>
            );
        })}
      </div>
    </div>
  );
};