import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { Brain, Menu, X } from "lucide-react";
import { useState, ReactNode } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface LayoutProps {
  children: ReactNode;
  onNavigate: (view: string) => void;
}

export function Layout({ children, onNavigate }: LayoutProps) {
  const { t } = useLanguage();

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
        </div>
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
