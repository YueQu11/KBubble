import { motion } from "motion/react";
import { RefreshCw, Home } from "lucide-react";
import { Test } from "../data/tests";
import { useLanguage } from "../contexts/LanguageContext";

interface ResultCardProps {
  test: Test;
  score: number;
  onRetry: () => void;
  onHome: () => void;
}

export function ResultCard({ test, score, onRetry, onHome }: ResultCardProps) {
  const result = test.scoring(score);
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl shadow-pink-100/50 border border-white"
      >
        <div className="mb-8">
          <span className="inline-block px-5 py-2 rounded-full bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-neutral-200">
            {t('result.label')}
          </span>
        </div>

        <h2 className="font-sans font-black text-4xl md:text-6xl text-neutral-900 mb-8 tracking-tight">
          {result.level}
        </h2>

        <div className="w-20 h-1.5 bg-gradient-to-r from-pink-400 to-rose-500 mx-auto mb-10 rounded-full" />

        <p className="text-xl text-neutral-600 leading-relaxed mb-14 font-medium">
          {result.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={onRetry}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-neutral-100 hover:border-pink-200 hover:bg-pink-50 text-neutral-700 font-bold transition-all"
          >
            <RefreshCw size={18} />
            {t('result.retry')}
          </button>
          <button 
            onClick={onHome}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800 font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Home size={18} />
            {t('result.home')}
          </button>
        </div>
      </motion.div>

      <div className="mt-8 text-neutral-400 text-xs font-medium">
        <p>{t('result.disclaimer')}</p>
      </div>
    </div>
  );
}
