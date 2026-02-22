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
import { TestIntro } from "./components/TestIntro";
import { KeyVerificationModal } from "./components/KeyVerificationModal";
import { getTests, Test } from "./data/tests";
import { motion, AnimatePresence } from "motion/react";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

type ViewState = "home" | "intro" | "test" | "result";

function AppContent() {
  const [view, setView] = useState<ViewState>("home");
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [unlockedTests, setUnlockedTests] = useState<string[]>([]);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const { language, t } = useLanguage();
  
  const tests = getTests(language);

  useEffect(() => {
    const saved = localStorage.getItem('unlockedTests');
    if (saved) {
      try {
        setUnlockedTests(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse unlocked tests", e);
      }
    }
  }, []);

  // Reset active test when language changes if we are on home screen
  useEffect(() => {
    if (activeTest) {
      const updatedTest = tests.find(t => t.id === activeTest.id);
      if (updatedTest) {
        setActiveTest(updatedTest);
      }
    }
  }, [language, tests]);

  const handleSelectTest = (testId: string) => {
    const test = tests.find((t) => t.id === testId);
    if (test) {
      setActiveTest(test);
      setView("intro");
      window.scrollTo(0, 0);
    }
  };

  const handleStartTest = () => {
    if (!activeTest) return;

    if (unlockedTests.includes(activeTest.id)) {
      setView("test");
      window.scrollTo(0, 0);
    } else {
      setShowKeyModal(true);
    }
  };

  const handleKeyVerified = () => {
    if (activeTest) {
      const newUnlocked = [...unlockedTests, activeTest.id];
      setUnlockedTests(newUnlocked);
      localStorage.setItem('unlockedTests', JSON.stringify(newUnlocked));
      setShowKeyModal(false);
      setView("test");
      window.scrollTo(0, 0);
    }
  };

  const handleCompleteTest = (finalAnswers: Record<string, number>) => {
    setAnswers(finalAnswers);
    setView("result");
    window.scrollTo(0, 0);
  };

  const handleNavigate = (target: string) => {
    if (target === "home") {
      setView("home");
      setActiveTest(null);
      setAnswers({});
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
                    onSelect={handleSelectTest} 
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {view === "intro" && activeTest && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TestIntro 
              test={activeTest} 
              onStart={handleStartTest}
              onBack={() => handleNavigate("home")}
            />
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
              answers={answers} 
              onRetry={() => setView("intro")}
              onHome={() => handleNavigate("home")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {activeTest && (
        <KeyVerificationModal
          isOpen={showKeyModal}
          testId={activeTest.id}
          testTitle={activeTest.title}
          onClose={() => setShowKeyModal(false)}
          onVerified={handleKeyVerified}
        />
      )}
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
