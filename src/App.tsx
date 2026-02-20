/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { Hero } from "./components/Hero";
import { TestCard } from "./components/TestCard";
import { TestTaker } from "./components/TestTaker";
import { ResultCard } from "./components/ResultCard";
import { getTests, Test } from "./data/tests";
import { motion, AnimatePresence } from "motion/react";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

type ViewState = "home" | "test" | "result";

function AppContent() {
  const [view, setView] = useState<ViewState>("home");
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [score, setScore] = useState<number>(0);
  const { language, t } = useLanguage();
  
  const tests = getTests(language);

  // Reset active test when language changes if we are on home screen
  // If in test, we might want to warn or just switch (switching might lose progress if questions differ order/count, but here they map 1:1)
  // For simplicity, if language changes, we just reload the current test data if active
  useEffect(() => {
    if (activeTest) {
      const updatedTest = tests.find(t => t.id === activeTest.id);
      if (updatedTest) {
        setActiveTest(updatedTest);
      }
    }
  }, [language, tests]);

  const handleStartTest = (testId: string) => {
    const test = tests.find((t) => t.id === testId);
    if (test) {
      setActiveTest(test);
      setView("test");
      window.scrollTo(0, 0);
    }
  };

  const handleCompleteTest = (finalScore: number) => {
    setScore(finalScore);
    setView("result");
    window.scrollTo(0, 0);
  };

  const handleNavigate = (target: string) => {
    if (target === "home") {
      setView("home");
      setActiveTest(null);
      setScore(0);
    }
  };

  return (
    <Layout onNavigate={handleNavigate}>
      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero onStart={() => {
              const element = document.getElementById('tests-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }} />
            
            <div id="tests-section" className="py-12">
              <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="font-sans font-bold text-2xl text-neutral-800">{t('tests.title')}</h2>
                <span className="text-neutral-400 text-sm font-medium">{tests.length} {t('tests.count')}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tests.map((test, index) => (
                  <TestCard 
                    key={test.id} 
                    test={test} 
                    onSelect={handleStartTest} 
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {view === "test" && activeTest && (
          <motion.div
            key="test"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TestTaker 
              test={activeTest} 
              onComplete={handleCompleteTest}
              onCancel={() => handleNavigate("home")}
            />
          </motion.div>
        )}

        {view === "result" && activeTest && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <ResultCard 
              test={activeTest} 
              score={score} 
              onRetry={() => setView("test")}
              onHome={() => handleNavigate("home")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
