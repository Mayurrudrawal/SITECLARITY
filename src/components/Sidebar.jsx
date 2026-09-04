import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  UploadCloud,
  Cpu,
  GitMerge,
  TrendingUp,
  AlertTriangle,
  FileCheck,
  Database,
  Globe
} from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function Sidebar({
  activeTab,
  onSelectTab,
  delayedCount = 7,
  evidenceCount = 142,
  scheduleCount = 125,
  isOpen = false,
  onClose,
  id
}) {
  const { t } = useI18n();

  const navSections = [
    {
      title: t('navProject', 'PROJECT'),
      items: [
        { id: 'dashboard', label: t('navDashboard', 'Dashboard'), icon: LayoutDashboard, badge: null },
        { id: 'schedule', label: t('navSchedule', 'Schedule'), icon: Calendar, badge: `${scheduleCount}` },
      ]
    },
    {
      title: t('navSiteExecution', 'SITE EXECUTION'),
      items: [
        { id: 'multilingual-intelligence', label: t('navMultilingual', 'Multilingual Intelligence'), icon: Globe, badge: '22+ Lang' },
        { id: 'execution', label: t('navExecution', 'Site Evidence'), icon: UploadCloud, badge: null },
        { id: 'ai-analysis', label: t('navAiAnalysis', 'AI Extraction'), icon: Cpu, badge: 'NLP' },
        { id: 'matching', label: t('navMatching', 'Matching'), icon: GitMerge, badge: '95%' },
      ]
    },
    {
      title: t('navProjectControl', 'PROJECT CONTROL'),
      items: [
        { id: 'progress', label: t('navProgress', 'Progress'), icon: TrendingUp, badge: null },
        { id: 'delays', label: t('navDelays', 'Delays & Alerts'), icon: AlertTriangle, badge: `${delayedCount}`, badgeColor: 'critical' },
        { id: 'traceability', label: t('navTraceability', 'Evidence Vault'), icon: FileCheck, badge: `${evidenceCount}` },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop - starts below the 56px top header so the top bar remains cleanly visible */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed top-14 inset-x-0 bottom-0 bg-[#17212B]/30 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        id={id}
        className={`fixed top-14 bottom-0 left-0 z-40 w-60 bg-white border-r border-[#D8E1E8] flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation Groups */}
        <div className="py-4 px-3 space-y-5 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 text-[10px] font-mono font-bold tracking-wider text-[#91A0AE] uppercase">
                {section.title}
              </div>

              <div className="space-y-0.5 mt-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        if (onClose) onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors group relative cursor-pointer ${
                        isActive
                          ? 'bg-[#E7F5F4] text-[#087F8C] font-semibold'
                          : 'text-[#617386] hover:text-[#17212B] hover:bg-[#F5F7F9]'
                      }`}
                    >
                      {/* Left indicator bar for active navigation */}
                      {isActive && (
                        <span className="absolute left-0 top-1 bottom-1 w-1 bg-[#087F8C] rounded-r" />
                      )}

                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon
                          size={15}
                          className={`shrink-0 ${
                            isActive ? 'text-[#087F8C]' : 'text-[#617386] group-hover:text-[#17212B]'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-medium ${
                            item.badgeColor === 'critical'
                              ? 'bg-[#FDECEC] text-[#C93636] border border-[#C93636]/20'
                              : isActive
                              ? 'bg-white text-[#087F8C] border border-[#087F8C]/20 font-semibold'
                              : 'bg-[#F5F7F9] text-[#617386] border border-[#D8E1E8]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer / Deterministic Pipeline Architecture */}
        <div className="p-3 border-t border-[#D8E1E8] bg-[#F5F7F9]/70">
          <div className="px-2.5 py-2 rounded-md bg-white border border-[#D8E1E8] text-[10px] font-mono text-[#617386]">
            <div className="flex items-center space-x-1.5 text-[#16324F] font-semibold">
              <Database size={12} className="text-[#087F8C]" />
              <span>{t('deterministicPipelineTitle', 'DETERMINISTIC PIPELINE')}</span>
            </div>
            <div className="text-[9px] text-[#91A0AE] mt-1 leading-tight tracking-tight">
              {t('pipelineArchitectureSteps', 'PLAN → CAPTURE → UNDERSTAND → MATCH → MEASURE → VERIFY')}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
