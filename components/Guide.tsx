
import React from 'react';

interface GuideProps {
  onClose: () => void;
}

const Guide: React.FC<GuideProps> = ({ onClose }) => {
  return (
    <div className="bg-[#161d3f]/60 border border-cyan-500/20 rounded-lg p-6 mb-8 relative">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-cyan-500/50 hover:text-cyan-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
      <h3 className="text-cyan-400 font-bold mb-3 flex items-center">
        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        量子占卜协议指南
      </h3>
      <ul className="text-sm text-cyan-100/80 space-y-2">
        <li className="flex items-start">
          <span className="text-cyan-400 mr-2">•</span>
          输入任何你犹豫不决或想要预测的日常生活问题。
        </li>
        <li className="flex items-start">
          <span className="text-cyan-400 mr-2">•</span>
          系统将随机应用一种量子物理理论来观测你的现实分支。
        </li>
        <li className="flex items-start">
          <span className="text-cyan-400 mr-2">•</span>
          注意：观测行为本身会改变量子态，结论仅供娱乐参考。
        </li>
      </ul>
    </div>
  );
};

export default Guide;
