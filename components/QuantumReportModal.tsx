
import React from 'react';
import { ObservationReport } from '../types';

interface QuantumReportModalProps {
  report: ObservationReport | null;
  onClose: () => void;
}

const QuantumReportModal: React.FC<QuantumReportModalProps> = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#0d1435] border border-cyan-500/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-cyan-900/20 px-6 py-4 border-b border-cyan-500/20 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <h2 className="text-cyan-400 font-mono text-sm tracking-widest uppercase font-bold">量子观测报告 / QUANTUM REPORT</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-cyan-500/50 hover:text-cyan-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4 text-xs font-mono text-cyan-500/70">
            <div>
              <p className="uppercase mb-1">观测编号 / ID</p>
              <p className="text-cyan-300">{report.observationIndex}</p>
            </div>
            <div>
              <p className="uppercase mb-1">观测时间 / TIMESTAMP</p>
              <p className="text-cyan-300">{report.timestamp}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-mono text-cyan-500/70 uppercase font-bold">初始态 (提问) / INITIAL STATE</h3>
            <div className="bg-[#1a234a] p-4 rounded border border-cyan-500/10">
              <p className="text-white text-lg">"{report.question}"</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-mono text-cyan-500/70 uppercase font-bold">理论框架 / THEORETICAL FRAMEWORK</h3>
            <p className="text-cyan-400 font-bold">{report.theory}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-mono text-cyan-500/70 uppercase font-bold">观测结论 / OBSERVATION OUTCOME</h3>
            <div className="text-cyan-100 leading-relaxed space-y-4">
              {report.interpretation.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-cyan-900/10 px-6 py-6 border-t border-cyan-500/20 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold transition-all shadow-lg shadow-cyan-900/40 uppercase tracking-widest text-sm"
          >
            确认并稳定波函数
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantumReportModal;
