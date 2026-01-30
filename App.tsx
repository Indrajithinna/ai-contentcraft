import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Dashboard } from './components/Dashboard';
import { Generator } from './components/Generator';
import { History } from './components/History';
import { Template, HistoryItem } from './types';
import { TEMPLATES } from './constants';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'generator' | 'history'>('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('contentcraft_history', []);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentView('generator');
  };

  const handleSaveToHistory = (content: string, templateName: string, inputs: Record<string, any>) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      templateName,
      content,
      createdAt: new Date().toISOString(),
      inputs
    };
    setHistory(prev => [newItem, ...prev]);
  };

  const handleNavigate = (view: 'dashboard' | 'history') => {
    setCurrentView(view);
    if (view === 'dashboard') {
      setSelectedTemplate(null);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your entire history? This action cannot be undone.')) {
      setHistory([]);
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={handleNavigate}>
      {currentView === 'dashboard' && (
        <Dashboard templates={TEMPLATES} onSelect={handleTemplateSelect} />
      )}
      {currentView === 'generator' && selectedTemplate && (
        <Generator
          template={selectedTemplate}
          onBack={() => setCurrentView('dashboard')}
          onSave={handleSaveToHistory}
        />
      )}
      {currentView === 'history' && (
        <History history={history} onClearHistory={handleClearHistory} />
      )}
    </Layout>
  );
}