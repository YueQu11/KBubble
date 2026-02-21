import { motion } from "motion/react";
import { Clock, ArrowRight } from "lucide-react";
import { Test } from "../data/tests";
import { JSX } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface TestCardProps {
  test: Test;
  onSelect: (testId: string) => void;
  index: number;
}

export function TestCard({ test, onSelect, index }: TestCardProps): JSX.Element {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 border border-neutral-100 hover:border-pink-100 flex flex-col h-full"
    >
      {test.coverImage && (
        <div className="h-48 w-full overflow-hidden">
          <img 
            src={test.coverImage} 
            alt={test.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-sans text-2xl font-bold text-neutral-800 mb-3 group-hover:text-pink-500 transition-colors">
          {test.title}
        </h3>
        
        <p className="text-neutral-500 mb-8 flex-grow leading-relaxed font-medium text-sm">
          {test.description}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-neutral-50 mt-auto">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-bold uppercase tracking-wide">
            <Clock size={14} />
            <span>{test.duration}</span>
          </div>
          
          <button 
            onClick={() => onSelect(test.id)}
            className="flex items-center gap-2 text-neutral-900 font-bold text-sm hover:gap-3 transition-all hover:text-pink-500"
          >
            {t('tests.start')}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
