import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  UploadCloud,
  GitMerge,
  TrendingUp,
  AlertTriangle,
  FileCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export function Navbar({ activeTab, onSelectTab, onResetDemo, projectName = "NH-XX Highway Development", id }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'schedule', label: 'Schedule Import', icon: Calendar },
    { id: 'execution', label: 'Capture & AI', icon: UploadCloud },
    { id: 'matching', label: 'Activity Matching', icon: GitMerge },
    { id: 'progress', label: 'Progress Engine', icon: TrendingUp },
    { id: 'delays', label: 'Delays & Alerts', icon: AlertTriangle },
    { id: 'traceability', label: 'Evidence Trace', icon: FileCheck },
  ];

  return (
    <header id={id} className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Project Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-cyan-500/20">
              NH
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm sm:text-base text-slate-100 tracking-tight">
                  {projectName}
                </span>
                <span className="text-[10px] uppercase font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.2 rounded">
                  SIH 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Schedule → Site Evidence → AI Extraction → Matching → Traceability
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onResetDemo}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs transition-colors flex items-center space-x-1"
              title="Reset Demo State"
            >
              <RotateCcw size={14} />
              <span className="hidden md:inline text-xs font-medium">Reset Data</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="lg:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-800/80 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900'
                }`}
              >
                <Icon size={13} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
