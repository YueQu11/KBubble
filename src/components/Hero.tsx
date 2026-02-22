import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-20 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 text-pink-500 text-xs font-bold uppercase tracking-wider shadow-sm border border-pink-100">
          <Sparkles size={12} className="text-pink-400" />
          {t('hero.tag')}
        </div>
        
        <h1 className="font-sans text-5xl md:text-7xl font-bold text-neutral-900 leading-[1.1] tracking-tight">
          {t('hero.title.1')} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">
            {t('hero.title.2')}
          </span>
        </h1>
        
        <div className="pt-4">
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 !text-white rounded-full text-lg font-bold hover:bg-neutral-800 transition-all hover:pr-10 shadow-xl shadow-neutral-200 hover:shadow-2xl hover:-translate-y-1 z-10"
          >
            {t('hero.button')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
