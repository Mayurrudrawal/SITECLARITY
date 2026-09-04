import React from 'react';
import {
  RotateCcw,
  Bell,
  Play,
  Menu,
  X,
  ChevronDown,
  Search,
  Command
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function Header({
  projectName = "NH-XX Highway Development",
  variance = -9,
  onResetDemo,
  onRunAutoDemo,
  isAutoRunning = false,
  onToggleSidebar,
  sidebarOpen = false,
  activeTab,
  onSelectTab,
  onOpenCommandPalette,
  onLanguageChanged,
  id
}) {
  const { t } = useI18n();

  return (
    <header id={id} className="sticky top-0 z-50 bg-white border-b border-[#D8E1E8] h-14">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Mobile hamburger & Brand + Project Selector */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-1.5 rounded-md text-[#617386] hover:text-[#17212B] hover:bg-[#F5F7F9] focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <div
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-md bg-[#16324F] flex items-center justify-center text-white font-bold text-sm tracking-tight transition-colors">
              SC
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center space-x-1.5 leading-none">
                <span className="font-bold text-sm tracking-tight text-[#16324F] uppercase">
                  {t('appName', 'SITE CLARITY')}
                </span>
                <span className="text-[10px] uppercase font-mono font-medium bg-[#F5F7F9] text-[#617386] px-1.5 py-0.5 rounded border border-[#D8E1E8]">
                  {t('version', 'v2.6')}
                </span>
              </div>
              <span className="text-[10px] text-[#617386] font-medium tracking-tight block mt-0.5">
                {t('appSubtitle', 'PROGRESS INTELLIGENCE')}
              </span>
            </div>
          </div>

          <div className="hidden md:block h-5 w-px bg-[#D8E1E8] mx-1" />

          {/* Project Selector Chip */}
          <div className="hidden md:flex items-center space-x-2 bg-[#F5F7F9] border border-[#D8E1E8] px-2.5 py-1 rounded-md text-xs">
            <span className="text-[#617386]">{t('projectLabel', 'Project')}:</span>
            <span className="font-semibold text-[#16324F] truncate max-w-[180px] lg:max-w-none">
              {projectName}
            </span>
            <span className="text-[10px] font-mono text-[#617386] bg-white px-1.5 py-0.5 rounded border border-[#D8E1E8]">
              CH 00+000 – 40+000
            </span>
          </div>

          {/* Project Status Pill */}
          <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-medium bg-[#FFF5DD] text-[#C98200] border-[#C98200]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C98200]" />
            <span className="hidden sm:inline">{t('statusLabel', 'STATUS')}:</span>
            <span>{t('statusAtRisk', 'AT RISK')} ({variance}%)</span>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 text-xs">
          {/* Global Command Palette Trigger Button (Ctrl+K / Cmd+K) */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center space-x-2 bg-[#F5F7F9] hover:bg-[#EAF2F8] text-[#617386] hover:text-[#16324F] border border-[#D8E1E8] px-3 py-1.5 rounded-md transition-colors cursor-pointer"
            title="Open Command Palette (⌘K or Ctrl+K)"
          >
            <Search size={13} className="text-[#087F8C]" />
            <span className="text-xs truncate max-w-[130px] lg:max-w-none">{t('quickSearchPlaceholder', 'Quick search or actions...')}</span>
            <kbd className="text-[10px] font-mono bg-white px-1.5 py-0.2 rounded border border-[#D8E1E8] text-[#617386] flex items-center space-x-0.5">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </button>

          {/* Global Language Selector Dropdown */}
          <LanguageSelector id="header-language-selector" onLanguageChanged={onLanguageChanged} />

          {/* Calendar Date Indicator */}
          <div className="hidden xl:flex items-center space-x-1.5 text-[#617386] font-mono bg-[#F5F7F9] border border-[#D8E1E8] px-2.5 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16845B]" />
            <span className="text-[#17212B]">04 Sep 2026</span>
          </div>

          {/* 1-Click Golden Demo Runner Button */}
          <button
            onClick={onRunAutoDemo}
            disabled={isAutoRunning}
            className="px-3 py-1.5 bg-[#087F8C] hover:bg-[#076f7b] disabled:opacity-50 text-white font-semibold rounded-md flex items-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
            title="Execute 9-Step Golden Demo Workflow"
          >
            <Play size={12} className="fill-current" />
            <span className="hidden sm:inline">
              {isAutoRunning ? t('demoRunning', 'Demo Running...') : t('runGoldenDemo', 'Run Golden Demo')}
            </span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* Reset Baseline Data */}
          <button
            onClick={onResetDemo}
            className="p-1.5 rounded-md bg-white hover:bg-[#F5F7F9] text-[#16324F] border border-[#D8E1E8] transition-colors cursor-pointer"
            title={t('resetBaseline', 'Reset to clean baseline data')}
          >
            <RotateCcw size={14} />
          </button>

          {/* Notification Alert Indicator */}
          <div className="relative">
            <button
              onClick={() => onSelectTab('delays')}
              className="p-1.5 rounded-md bg-white hover:bg-[#F5F7F9] text-[#617386] hover:text-[#16324F] border border-[#D8E1E8] transition-colors relative cursor-pointer"
              title={t('criticalAlerts', 'Critical Schedule Alerts')}
            >
              <Bell size={14} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C93636] rounded-full border-2 border-white" />
            </button>
          </div>

          {/* User Profile Badge */}
          <div className="hidden 2xl:flex items-center space-x-2 pl-2 border-l border-[#D8E1E8]">
            <div className="w-6 h-6 rounded-full bg-[#EAF2F8] border border-[#D8E1E8] flex items-center justify-center text-[10px] font-mono font-bold text-[#16324F]">
              RE
            </div>
            <div className="text-left leading-none">
              <span className="block text-[11px] font-semibold text-[#17212B]">R. Sharma</span>
              <span className="text-[9px] text-[#617386]">{t('residentEngineer', 'Resident Eng.')}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
