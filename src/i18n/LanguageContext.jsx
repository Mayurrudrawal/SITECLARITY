import React, { createContext, useContext, useState, useEffect } from 'react';
import { UI_LANGUAGES, translations } from './translations.js';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  direction: 'ltr',
  t: (key, fallback) => fallback || key,
  languages: UI_LANGUAGES,
  currentLanguageObj: UI_LANGUAGES.find(l => l.code === 'en') || UI_LANGUAGES[0]
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('sc_ui_language') || 'en';
    } catch {
      return 'en';
    }
  });

  const currentLanguageObj = UI_LANGUAGES.find(l => l.code === language) || UI_LANGUAGES.find(l => l.code === 'en') || UI_LANGUAGES[0];
  const direction = currentLanguageObj.direction || 'ltr';

  useEffect(() => {
    try {
      document.documentElement.dir = direction;
      document.documentElement.lang = language;
    } catch (e) {
      // safe fallback
    }
  }, [language, direction]);

  const setLanguage = (langCode) => {
    const target = UI_LANGUAGES.find(l => l.code === langCode);
    const validCode = target ? target.code : 'en';
    setLanguageState(validCode);
    try {
      localStorage.setItem('sc_ui_language', validCode);
    } catch (e) {
      console.warn("Could not persist language preference", e);
    }
  };

  const t = (key, fallback = '') => {
    if (!key && !fallback) return '';
    const lookupKey = key || fallback;
    const langDict = translations[language] || translations.hi || translations.en || {};

    // 1. Direct key match in active language
    if (langDict[lookupKey] !== undefined) {
      return langDict[lookupKey];
    }

    // 2. Case-insensitive / trimmed match
    const cleanKey = String(lookupKey).trim();
    if (langDict[cleanKey] !== undefined) {
      return langDict[cleanKey];
    }
    const lowerKey = cleanKey.toLowerCase();
    for (const [k, v] of Object.entries(langDict)) {
      if (k.toLowerCase() === lowerKey) {
        return v;
      }
    }

    // 3. If fallback was provided, check if active language has a translation for fallback text
    if (fallback && fallback !== key) {
      const cleanFallback = String(fallback).trim();
      if (langDict[cleanFallback] !== undefined) {
        return langDict[cleanFallback];
      }
      const lowerFallback = cleanFallback.toLowerCase();
      for (const [k, v] of Object.entries(langDict)) {
        if (k.toLowerCase() === lowerFallback) {
          return v;
        }
      }
    }

    // 4. Fallback to English dictionary if available
    const enDict = translations.en || {};
    if (enDict[lookupKey] !== undefined) {
      return enDict[lookupKey];
    }

    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        t,
        languages: UI_LANGUAGES,
        currentLanguageObj
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  return useContext(LanguageContext);
}
