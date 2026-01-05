
import { QuantumTheory } from './types';

export const THEORY_DESCRIPTIONS: Record<QuantumTheory, string> = {
  [QuantumTheory.SCHRODINGER]: '在测量之前，事物处于多种可能性的叠加状态。',
  [QuantumTheory.HEISENBERG]: '某些物理属性（如位置和动量）无法同时被精确知晓。',
  [QuantumTheory.ENTANGLEMENT]: '无论距离多远，两个粒子之间存在着一种超越时空的关联。'
};

export const EXAMPLE_QUESTIONS = [
  "我现在该喝咖啡还是再等等？",
  "今天中午吃什么好？",
  "我的代码能一次运行成功吗？",
  "这个周末适合去旅行吗？",
  "现在是开启新项目的好时机吗？"
];
