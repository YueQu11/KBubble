import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Check, ChevronLeft } from "lucide-react";
import { Test } from "../data/tests";
import { cn } from "../lib/utils";
import { useLanguage } from "../contexts/LanguageContext";

interface TestTakerProps {
  test: Test;
  onComplete: (answers: Record<string, number>) => void;
  onCancel: () => void;
}

export function TestTaker({ test, onComplete, onCancel }: TestTakerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [direction, setDirection] = useState(1);
  const { t } = useLanguage();

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  // Shuffle options when currentQuestion changes
  const shuffledOptions = useMemo(() => {
    return [...currentQuestion.options].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (currentQuestionIndex < test.questions.length - 1) {
      setDirection(1);
      setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 250);
    } else {
      // Pass full answers object
      const finalAnswers = { ...answers, [currentQuestion.id]: value };
      onComplete(finalAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onCancel}
          className="flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors font-medium text-sm"
        >
          <ArrowLeft size={16} />
          {t('test.back')}
        </button>

        {currentQuestionIndex > 0 && (
          <button 
            onClick={handlePrevious}
            className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors font-bold text-sm"
          >
            <ChevronLeft size={16} />
            {t('test.prev')}
          </button>
        )}
      </div>

      <div className="mb-10">
        <div className="flex justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
          <span>{t('test.question')} {currentQuestionIndex + 1} / {test.questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentQuestion.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-pink-50/50 border border-white"
        >
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-neutral-800 mb-10 leading-tight">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            {shuffledOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.value)}
                className={cn(
                  "w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group",
                  answers[currentQuestion.id] === option.value
                    ? "border-pink-500 bg-pink-50/50"
                    : "border-transparent bg-neutral-50 hover:bg-white hover:border-pink-200 hover:shadow-md"
                )}
              >
                <span className={cn(
                  "text-lg font-medium transition-colors",
                  answers[currentQuestion.id] === option.value ? "text-pink-600" : "text-neutral-600 group-hover:text-neutral-900"
                )}>
                  {option.text}
                </span>
                {answers[currentQuestion.id] === option.value && (
                  <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
