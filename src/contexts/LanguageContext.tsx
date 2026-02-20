import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  zh: {
    'app.name': 'InnerSpace',
    'nav.tests': '测评',
    'nav.about': '关于',
    'nav.resources': '资源',
    'nav.start': '开始体验',
    'hero.tag': '专业心理测评',
    'hero.title.1': '探索内心，',
    'hero.title.2': '遇见更好的自己',
    'hero.desc': '专业的心理学工具，助你在纷繁复杂的世界中通过自我探索，获得内心的平静与力量。',
    'hero.button': '探索测评',
    'tests.title': '精选测评',
    'tests.count': '个测评可用',
    'tests.start': '开始测试',
    'tests.duration': '分钟',
    'test.back': '返回列表',
    'test.question': '问题',
    'result.label': '测试结果',
    'result.retry': '重新测试',
    'result.home': '返回首页',
    'result.disclaimer': '本测评结果仅供参考，不构成医疗建议。',
    'footer.rights': '© 2024 InnerSpace. 保留所有权利。',
  },
  en: {
    'app.name': 'InnerSpace',
    'nav.tests': 'Tests',
    'nav.about': 'About',
    'nav.resources': 'Resources',
    'nav.start': 'Get Started',
    'hero.tag': 'Science-backed assessments',
    'hero.title.1': 'Understand your mind,',
    'hero.title.2': 'unlock your potential',
    'hero.desc': 'Professional psychological tools to help you gain clarity, reduce stress, and build resilience in a complex world.',
    'hero.button': 'Explore Tests',
    'tests.title': 'Available Assessments',
    'tests.count': 'tests available',
    'tests.start': 'Start',
    'tests.duration': 'min',
    'test.back': 'Back to tests',
    'test.question': 'Question',
    'result.label': 'Your Result',
    'result.retry': 'Retake Test',
    'result.home': 'Back to Home',
    'result.disclaimer': 'This assessment is for informational purposes only and does not constitute medical advice.',
    'footer.rights': '© 2024 InnerSpace. All rights reserved.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['zh']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
