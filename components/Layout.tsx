import React from 'react';
import { Icon } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
  currentView: 'dashboard' | 'generator' | 'history';
  onNavigate: (view: 'dashboard' | 'history') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-indigo-500">AI</span> ContentCraft
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
              currentView === 'dashboard' || currentView === 'generator' 
                ? 'bg-indigo-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Icon name="Home" className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onNavigate('history')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
              currentView === 'history' 
                ? 'bg-indigo-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Icon name="Clock" className="w-5 h-5" />
            <span>History</span>
          </button>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 text-slate-400 text-sm">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              U
            </div>
            <div>
              <p className="text-white">User Account</p>
              <p className="text-xs">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 p-4 md:hidden flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800">AI ContentCraft</h1>
          <button className="p-2 text-slate-600">
            <Icon name="Settings" className="w-6 h-6" />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};