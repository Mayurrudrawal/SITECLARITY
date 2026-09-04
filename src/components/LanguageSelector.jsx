import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function LanguageSelector({ variant = "header", id, onLanguageChanged }) {
  const { language, setLanguage, languages, currentLanguageObj, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (code, nativeName) => {
    setLanguage(code);
    setIsOpen(false);
    if (onLanguageChanged) {
      onLanguageChanged(code, nativeName);
    }
  };

  if (variant === "compact") {
    return (
      <div id={id} ref={dropdownRef} className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1.5 px-2 py-1 text-xs rounded-md bg-[#F5F7F9] hover:bg-[#EAF2F8] text-[#16324F] border border-[#D8E1E8] transition-colors cursor-pointer"
          title={t('languageSelect', 'Language')}
          aria-expanded={isOpen}
        >
          <Globe size={13} className="text-[#087F8C]" />
          <span className="font-semibold">{currentLanguageObj.nativeName}</span>
          <ChevronDown size={11} className="text-[#617386]" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-44 rounded-lg bg-white border border-[#D8E1E8] shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="px-2.5 py-1 border-b border-[#D8E1E8] text-[10px] font-mono font-bold text-[#617386] uppercase tracking-wider">
              {t('languageSelect', 'Select Language')}
            </div>
            <div className="max-h-60 overflow-y-auto py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code, lang.nativeName)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-[#F5F7F9] cursor-pointer transition-colors ${
                    language === lang.code ? 'font-bold text-[#087F8C] bg-[#E7F5F4]' : 'text-[#17212B]'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded bg-[#F5F7F9] text-[9px] font-mono font-bold text-[#3977A9] flex items-center justify-center border border-[#D8E1E8]">
                      {lang.code.toUpperCase()}
                    </span>
                    <div>
                      <span className="block leading-tight font-semibold">{lang.nativeName}</span>
                      <span className="text-[10px] text-[#617386] block">{lang.name}</span>
                    </div>
                  </div>
                  {language === lang.code && <Check size={13} className="text-[#087F8C]" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Header default variant
  return (
    <div id={id} ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs rounded-md bg-[#F5F7F9] hover:bg-[#EAF2F8] text-[#16324F] border border-[#D8E1E8] transition-colors cursor-pointer group"
        title={t('languageSelect', 'Switch Interface Language')}
        aria-expanded={isOpen}
      >
        <Globe size={13} className="text-[#087F8C] group-hover:rotate-12 transition-transform duration-200" />
        <span className="font-semibold text-[11px] sm:text-xs">
          {currentLanguageObj.nativeName}
        </span>
        <span className="hidden xl:inline text-[10px] text-[#617386] uppercase font-mono">
          ({currentLanguageObj.code})
        </span>
        <ChevronDown size={12} className={`text-[#617386] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-52 rounded-lg bg-white border border-[#D8E1E8] shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 border-b border-[#D8E1E8] flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#617386] uppercase tracking-wider">
              {t('languageSelect', 'Interface Language')}
            </span>
            <span className="text-[10px] text-[#087F8C] font-semibold bg-[#E7F5F4] px-1.5 py-0.5 rounded">
              22 Scheduled + Eng
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto py-1 divide-y divide-[#F5F7F9]">
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code, lang.nativeName)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-[#F5F7F9] cursor-pointer transition-colors ${
                    isSelected ? 'font-bold text-[#087F8C] bg-[#E7F5F4]' : 'text-[#17212B]'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded bg-[#F5F7F9] text-[10px] font-mono font-bold text-[#3977A9] flex items-center justify-center border border-[#D8E1E8]">
                      {lang.code.toUpperCase()}
                    </span>
                    <div>
                      <div className="leading-tight text-xs font-semibold">{lang.nativeName}</div>
                      <div className="text-[10px] text-[#617386] leading-none mt-0.5">{lang.name}</div>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="flex items-center space-x-1 text-[#087F8C] text-[10px] font-bold">
                      <Check size={14} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
