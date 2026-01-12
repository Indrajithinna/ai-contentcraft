import React, { useState } from 'react';
import { Template } from '../types';
import { Icon } from './Icons';

interface DashboardProps {
  templates: Template[];
  onSelect: (template: Template) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ templates, onSelect }) => {
  const [search, setSearch] = useState('');

  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">What would you like to create?</h2>
        <p className="text-slate-500 mt-2">Choose from our popular AI tools to get started.</p>
        
        <div className="mt-6 relative max-w-md">
          <input 
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <button 
            key={template.id}
            onClick={() => onSelect(template)}
            className="group text-left bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col h-full"
          >
            <div className={`w-12 h-12 rounded-xl ${template.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <Icon name={template.icon} className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{template.name}</h3>
            <p className="text-slate-500 text-sm flex-1">{template.description}</p>
          </button>
        ))}
      </div>
      
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No templates found matching "{search}"</p>
        </div>
      )}
    </div>
  );
};