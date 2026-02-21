import { motion } from "motion/react";
import { Clock, ListChecks, Info, ArrowRight } from "lucide-react";
import { Test } from "../data/tests";
import { useLanguage } from "../contexts/LanguageContext";

interface TestIntroProps {
  test: Test;
  onStart: () => void;
  onBack: () => void;
}

export function TestIntro({ test, onStart, onBack }: TestIntroProps) {
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto py-12">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors font-medium text-sm"
      >
        <ArrowRight size={16} className="rotate-180" />
        {t('test.back')}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-pink-50/50 border border-white"
      >
        {test.coverImage && (
          <div className="h-64 w-full">
            <img 
              src={test.coverImage} 
              alt={test.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8 md:p-12">
          <h1 className="font-sans font-black text-3xl md:text-5xl text-neutral-900 mb-6 tracking-tight leading-tight">
            {test.title}
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed mb-10">
            {test.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-neutral-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <Clock className="text-pink-500 mb-2" size={24} />
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">{t('intro.duration')}</span>
              <span className="text-lg font-bold text-neutral-800">{test.duration}</span>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <ListChecks className="text-pink-500 mb-2" size={24} />
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">{t('intro.count')}</span>
              <span className="text-lg font-bold text-neutral-800">{test.questions.length}</span>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Info size={18} className="text-pink-500" />
              <h3 className="font-bold text-neutral-900">{t('intro.tips')}</h3>
            </div>
            <ul className="space-y-3">
              {test.instructions.map((instruction, idx) => (
                <li key={idx} className="flex items-start gap-3 text-neutral-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-300 mt-2 flex-shrink-0" />
                  {instruction}
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={onStart}
            className="w-full py-5 bg-neutral-900 text-white rounded-2xl text-lg font-bold hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            {t('intro.start')}
            <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
