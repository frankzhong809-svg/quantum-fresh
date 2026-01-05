
import React, { useState, useEffect, useCallback } from 'react';
import { QuantumTheory, ObservationReport } from './types';
import { EXAMPLE_QUESTIONS } from './constants';
import { generateQuantumReport } from './services/gemini';
import QuantumReportModal from './components/QuantumReportModal';
import Guide from './components/Guide';

const App: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [report, setReport] = useState<ObservationReport | null>(null);
  const [placeholder, setPlaceholder] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);

  // Set randomized placeholder on mount
  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * EXAMPLE_QUESTIONS.length);
    setPlaceholder(EXAMPLE_QUESTIONS[randomIdx]);
  }, []);

  const loadingMessages = [
    "正在初始化量子纠缠引擎...",
    "校准海森堡测不准参数...",
    "观测坍缩中的波函数...",
    "生成平行时空报告...",
    "解析量子概率分布..."
  ];

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 800);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleObserve = useCallback(async () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      alert('请输入你的问题。');
      return;
    }

    setIsLoading(true);

    // Randomly pick a theory
    const theories = Object.values(QuantumTheory);
    const theory = theories[Math.floor(Math.random() * theories.length)];

    try {
      // Simulate computation delay
      const [geminiResult] = await Promise.all([
        generateQuantumReport(trimmedQuestion, theory),
        new Promise(resolve => setTimeout(resolve, 3000))
      ]);

      const newReport: ObservationReport = {
        id: Math.random().toString(36).substr(2, 9),
        question: trimmedQuestion,
        theory,
        interpretation: geminiResult.interpretation,
        observationIndex: geminiResult.observationIndex,
        timestamp: new Date().toLocaleString()
      };

      setReport(newReport);
      setQuestion(''); // Clear input
    } catch (error) {
      console.error("Quantum computation failed:", error);
      alert('量子坍缩异常，请重试。');
    } finally {
      setIsLoading(false);
    }
  }, [question]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[150px] rounded-full" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-2xl px-6 py-12 flex flex-col items-center flex-1">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-1 px-3 mb-4 rounded-full border border-cyan-500/30 bg-cyan-900/20 text-cyan-400 text-[10px] uppercase tracking-widest font-mono">
            实验性观测终端 v2.5 / EXPERIMENTAL TERMINAL
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 flex items-center justify-center">
            量子占卜翻译器
          </h1>
          <p className="text-cyan-500/80 font-mono text-sm tracking-widest">
            QUANTUM DIVINATION TRANSLATOR
          </p>
        </div>

        {/* Form Area */}
        <div className="w-full space-y-8">
          {showGuide && <Guide onClose={() => setShowGuide(false)} />}

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#0d1435] border border-cyan-500/20 rounded-xl p-6 shadow-2xl">
              <label className="block text-cyan-500/70 font-mono text-xs uppercase mb-3 tracking-widest font-bold">
                输入查询 (用户问题) / INPUT QUERY
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`例如：${placeholder}`}
                className="w-full bg-[#161d3f] border border-cyan-500/10 rounded-lg p-4 text-white placeholder-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 min-h-[120px] transition-all"
                disabled={isLoading}
              />
              <div className="mt-6">
                <button
                  onClick={handleObserve}
                  disabled={isLoading || !question.trim()}
                  className={`w-full py-4 rounded-lg font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-3
                    ${isLoading || !question.trim() 
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-900/40 active:scale-[0.98]'
                    }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{loadingMessages[loadingStep]}</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
                      <span>执行量子观测 / START OBSERVATION</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-auto pt-12 text-center">
          <p className="text-cyan-900 text-[10px] font-mono uppercase tracking-[0.3em]">
            非决定性算法 • 熵驱动逻辑 / NON-DETERMINISTIC ALGORITHM
          </p>
        </div>
      </main>

      {/* Result Modal */}
      <QuantumReportModal 
        report={report} 
        onClose={() => setReport(null)} 
      />

      {/* Aesthetic Overlay Grid */}
      <div className="fixed inset-0 pointer-events-none border-[1px] border-cyan-500/5 m-4 rounded-2xl z-20" />
    </div>
  );
};

export default App;
