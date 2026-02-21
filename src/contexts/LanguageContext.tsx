import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh';

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
}

const translations = {
  zh: {
    'app.name': 'KBubble',
    'nav.tests': '趣味测评',
    'nav.about': '关于我们',
    'nav.resources': '更多好玩',
    'nav.start': '开始探索',
    'hero.tag': '✨时尚者的自我探索指南',
    'hero.title.1': '心之所隐，',
    'hero.title.2': ' 皆为答案',
    'hero.desc': '',
    'hero.button': '开启探索',
    'tests.title': '热门测试',
    'tests.count': '个测试在线',
    'tests.start': '去测测',
    'tests.duration': '分钟',
    'test.back': '返回',
    'test.question': '第',
    'test.question_suffix': '题',
    'test.prev': '上一题',
    'intro.title': '测试说明',
    'intro.start': '开始测试',
    'intro.duration': '预计用时',
    'intro.count': '题目数量',
    'intro.tips': '温馨提示',
    'result.label': '你的天选女团',
    'result.retry': '再测一次',
    'result.home': '更多测试',
    'result.disclaimer': '测试结果仅供娱乐参考，保持开心最重要！',
    'footer.rights': '© 2024 InnerSpace. All rights reserved.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language: Language = 'zh';

  const t = (key: string) => {
    return translations['zh'][key as keyof typeof translations['zh']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t }}>
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
