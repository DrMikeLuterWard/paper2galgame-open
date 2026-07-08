import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { en } from './en';
import { ru } from './ru';
import { zh } from './zh';

// Supported UI languages. To add one: create a new dictionary file matching the
// shape of en.ts and register it in `dictionaries` and `LANGUAGES` below.
export type Language = 'en' | 'ru' | 'zh';

// The translation shape, derived from the English dictionary (source of truth).
export type Translations = typeof en;

const dictionaries: Record<Language, Translations> = { en, ru, zh };

// Shown in the language switcher (label is written in its own language).
export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'zh', label: '中文' },
];

const STORAGE_KEY = 'ui-language';

function detectInitialLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (saved && dictionaries[saved]) return saved;

  const nav = navigator.language.toLowerCase();
  if (nav.startsWith('ru')) return 'ru';
  if (nav.startsWith('zh')) return 'zh';
  return 'en';
}

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  /** Current dictionary, e.g. t.upload.heading */
  t: Translations;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(detectInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>');
  return ctx;
}
