import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Command,
  Play,
  FileText,
  AlertTriangle,
  Layers,
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  X,
  Sparkles,
  MapPin,
  TrendingUp,
  Globe
} from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function CommandPalette({
  isOpen,
  onClose,
  onSelectTab,
  onNavigate,
  onSelectActivity,
  onRunAutoDemo,
  onRunDemo,
  onResetDemo,
  onOpenEvidence,
  activities = [],
  evidenceList = []
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const navigateTo = (tab) => {
    if (onSelectTab) onSelectTab(tab);
    else if (onNavigate) onNavigate(tab);
  };

  const triggerDemo = () => {
    if (onRunAutoDemo) onRunAutoDemo();
    else if (onRunDemo) onRunDemo();
  };

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Primary action commands
  const primaryCommands = [
    {
      id: 'cmd-golden-demo',
      type: 'action',
      title: 'Run 9-Step Golden Demo Workflow',
      subtitle: 'Simulate full end-to-end evidence ingestion to progress update',
      icon: Play,
      badge: 'Interactive',
      badgeColor: 'bg-[#E7F5F4] text-[#087F8C] border-[#087F8C]/30',
      action: () => {
        onClose();
        triggerDemo();
      }
    },
    {
      id: 'cmd-upload',
      type: 'navigation',
      title: 'Upload Daily Site Report (PDF / Image)',
      subtitle: 'Open execution capture and run multi-modal AI extraction',
      icon: UploadCloud,
      badge: 'Capture',
      badgeColor: 'bg-[#EAF2F8] text-[#16324F] border-[#D8E1E8]',
      action: () => {
        onClose();
        navigateTo('execution');
      }
    },
    {
      id: 'cmd-matching',
      type: 'navigation',
      title: 'Inspect Activity Matching & AI Confidence',
      subtitle: 'View 5-vector scoring breakdown for latest site execution',
      icon: Sparkles,
      badge: 'AI Engine',
      badgeColor: 'bg-[#E7F5F4] text-[#087F8C] border-[#087F8C]/30',
      action: () => {
        onClose();
        navigateTo('matching');
      }
    },
    {
      id: 'cmd-delays',
      type: 'navigation',
      title: 'View Delayed & Critical Activities',
      subtitle: 'Prioritized schedule slippage matrix and bottlenecks',
      icon: AlertTriangle,
      badge: 'Alerts',
      badgeColor: 'bg-[#FFF5DD] text-[#C98200] border-[#C98200]/30',
      action: () => {
        onClose();
        navigateTo('delays');
      }
    },
    {
      id: 'cmd-progress',
      type: 'navigation',
      title: 'View Progress Control & Audit Ledger',
      subtitle: 'Mathematical bridge and verified cumulative quantities',
      icon: TrendingUp,
      badge: 'Progress',
      badgeColor: 'bg-[#E8F5EF] text-[#16845B] border-[#16845B]/30',
      action: () => {
        onClose();
        navigateTo('progress');
      }
    },
    {
      id: 'cmd-vault',
      type: 'navigation',
      title: 'Open Evidence Traceability Vault',
      subtitle: 'Cryptographic lineage linking progress to certified site proof',
      icon: FileText,
      badge: 'Traceability',
      badgeColor: 'bg-[#EAF2F8] text-[#3977A9] border-[#3977A9]/30',
      action: () => {
        onClose();
        navigateTo('traceability');
      }
    },
    {
      id: 'cmd-reset',
      type: 'action',
      title: 'Reset Demo State to Clean Baseline',
      subtitle: 'Restore A101 to 6,800 m³ and clear pending matches',
      icon: Command,
      badge: 'Reset',
      badgeColor: 'bg-[#F5F7F9] text-[#617386] border-[#D8E1E8]',
      action: () => {
        onClose();
        if (onResetDemo) onResetDemo();
      }
    }
  ];

  // Activity search results
  const activityItems = activities.map((act) => ({
    id: `act-${act.id || act.activity_code}`,
    type: 'activity',
    title: `${act.activity_code} — ${act.name}`,
    subtitle: `${act.wbs} • ${act.chainage_range || act.location} • Status: ${act.status}`,
    icon: Layers,
    badge: act.activity_code,
    badgeColor: act.status === 'Critical'
      ? 'bg-[#FDECEC] text-[#C93636] border-[#C93636]/30'
      : act.status === 'Delayed'
      ? 'bg-[#FFF5DD] text-[#C98200] border-[#C98200]/30'
      : 'bg-[#E8F5EF] text-[#16845B] border-[#16845B]/30',
    action: () => {
      onClose();
      onSelectActivity(act.activity_code);
    }
  }));

  // Evidence search results
  const evidenceItems = evidenceList.map((evi) => ({
    id: `evi-${evi.id}`,
    type: 'evidence',
    title: evi.file_name,
    subtitle: `${evi.source_type} • Linked: ${evi.activity?.activity_code || 'A101'} • Verified`,
    icon: FileText,
    badge: 'Verified Proof',
    badgeColor: 'bg-[#E8F5EF] text-[#16845B] border-[#16845B]/30',
    action: () => {
      onClose();
      if (onOpenEvidence) onOpenEvidence(evi);
    }
  }));

  const { languages, setLanguage, language: currentLang } = useI18n();

  // Language selection commands
  const languageCommands = (languages || []).map((lang) => ({
    id: `lang-${lang.code}`,
    type: 'language',
    title: `Switch Language: ${lang.nativeName} (${lang.name})`,
    subtitle: `Change entire UI text and navigation to ${lang.name}`,
    icon: Globe,
    badge: lang.code.toUpperCase(),
    badgeColor: currentLang === lang.code
      ? 'bg-[#E7F5F4] text-[#087F8C] border-[#087F8C]/30 font-bold'
      : 'bg-[#F5F7F9] text-[#617386] border-[#D8E1E8]',
    action: () => {
      setLanguage(lang.code);
      onClose();
    }
  }));

  // Combined and filtered items
  const allItems = [...primaryCommands, ...languageCommands, ...activityItems, ...evidenceItems];

  const filteredItems = query.trim() === ''
    ? primaryCommands
    : allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        (item.badge && item.badge.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#16324F]/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl bg-white border border-[#D8E1E8] rounded-xl shadow-2xl overflow-hidden z-10 font-sans animate-in zoom-in-95 duration-150">
        {/* Search Bar Header */}
        <div className="flex items-center px-4 py-3 border-b border-[#D8E1E8] bg-[#F5F7F9]">
          <Search size={18} className="text-[#087F8C] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands, activities (A101), documents, or zones..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-sm text-[#17212B] placeholder-[#91A0AE] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-[#91A0AE] hover:text-[#17212B] mr-2"
            >
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-[#617386] bg-white border border-[#D8E1E8] rounded shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#F5F7F9]">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#E7F5F4] text-[#16324F]'
                      : 'hover:bg-[#F5F7F9] text-[#17212B]'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-md shrink-0 ${
                        isSelected
                          ? 'bg-[#087F8C] text-white'
                          : 'bg-[#F5F7F9] text-[#087F8C] border border-[#D8E1E8]'
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#617386] truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 ml-3">
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-medium ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isSelected && (
                      <ArrowRight size={13} className="text-[#087F8C]" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-[#617386] font-mono">
              No matching commands or activities found for "{query}"
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-[#D8E1E8] bg-[#F5F7F9] flex items-center justify-between text-[11px] text-[#617386] font-mono">
          <div className="flex items-center space-x-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-[#D8E1E8] rounded text-[10px]">↑</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-white border border-[#D8E1E8] rounded text-[10px]">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-[#D8E1E8] rounded text-[10px]">↵</kbd> to select
            </span>
          </div>
          <span className="text-[#087F8C] font-medium">Site Clarity Command Center</span>
        </div>
      </div>
    </div>
  );
}
