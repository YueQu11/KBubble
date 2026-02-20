import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { Brain, Menu, X, Globe } from "lucide-react";
import { useState, ReactNode } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface LayoutProps {
  children: ReactNode;
  onNavigate: (view: string) => void;
}

export function Layout({ children, onNavigate }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-800 font-sans selection:bg-pink-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-200">
              <Brain size={18} />
            </div>
            <span className="font-bold text-xl tracking-tight text-neutral-900">{t('app.name')}</span>
          </button>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-500">
            <button onClick={() => onNavigate('home')} className="hover:text-pink-500 transition-colors">{t('nav.tests')}</button>
            <button className="hover:text-pink-500 transition-colors">{t('nav.about')}</button>
            <button className="hover:text-pink-500 transition-colors">{t('nav.resources')}</button>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-600"
            >
              <Globe size={16} />
              <span>{language === 'zh' ? 'EN' : '中'}</span>
            </button>

            <button className="px-5 py-2.5 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg text-xs font-bold tracking-wide">
              {t('nav.start')}
            </button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleLanguage}
              className="p-2 text-neutral-600"
            >
              <span className="font-bold text-xs">{language === 'zh' ? 'EN' : '中'}</span>
            </button>
            <button 
              className="p-2 -mr-2 text-neutral-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-neutral-100 p-6 shadow-xl rounded-b-3xl"
          >
            <div className="flex flex-col gap-4 text-lg font-medium text-neutral-600">
              <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}>{t('nav.tests')}</button>
              <button onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</button>
              <button onClick={() => setIsMenuOpen(false)}>{t('nav.resources')}</button>
            </div>
          </motion.div>
        )}
      </nav>

      <main className="pt-24 pb-16 px-6 max-w-5xl mx-auto">
        {children}
      </main>

      <footer className="border-t border-neutral-100 py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-400 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-neutral-200 rounded-lg flex items-center justify-center text-white">
              <Brain size={12} />
            </div>
            <span className="font-bold text-neutral-600">{t('app.name')}</span>
          </div>
          <p>{t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  );
}
