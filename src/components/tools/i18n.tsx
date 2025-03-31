// i18n/I18nProvider.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode
} from 'react';

// 类型定义
type Language = 'en' | 'zh' ;
type TranslationKey = 'greeting' | 'button' | 'currentLang';

interface I18nContextType {
  t: (key: TranslationKey, params?: Record<string, any>) => string;
  currentLang: Language;
  setLanguage: (lang: Language) => void;
}

interface I18nProviderProps {
  children: ReactNode;
  resources: Record<Language, Record<TranslationKey, string>>;
  defaultLang?: Language;
}

// 创建上下文
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// 主Provider组件
export const I18nProvider = ({
  children,
  resources,
  defaultLang = 'en'
}: I18nProviderProps) => {
  const [currentLang, setCurrentLang] = useState<Language>(defaultLang);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, any>) => {
      let template = resources[currentLang]?.[key] || key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          template = template.replace(new RegExp(`{${k}}`, 'g'), v);
        });
      }
      return template;
    },
    [currentLang, resources]
  );

  const value = useMemo(
    () => ({ t, currentLang, setLanguage: setCurrentLang }),
    [t, currentLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

// Hook组件
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// 语言切换组件
export const LanguageSwitcher = () => {
  const { currentLang, setLanguage } = useI18n();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="language-switcher">
      <button onClick={() => setShowDropdown(!showDropdown)}>
        {currentLang.toUpperCase()}
      </button>
      {showDropdown && (
        <div className="dropdown-menu">
          {Object.keys(resources).map((lang) => (
            <button
              key={lang}
              disabled={lang === currentLang}
              onClick={() => {
                setLanguage(lang as Language);
                setShowDropdown(false);
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// 默认资源文件
const resources = {
  en: {
    greeting: 'Hello, {name}!',
    button: 'Switch Language',
    currentLang: 'Current Language'
  },
  zh: {
    greeting: '你好，{name}！',
    button: '切换语言',
    currentLang: '当前语言'
  },
};

// 默认导出可直接使用的组件
export default {
  Provider: ({ children }: { children: ReactNode }) => (
    <I18nProvider resources={resources}>{children}</I18nProvider>
  ),
  Switcher: LanguageSwitcher,
  Text: ({ k, params }: { k: TranslationKey; params?: Record<string, any> }) => {
    const { t } = useI18n();
    return <>{t(k, params)}</>;
  }
};