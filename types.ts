
export enum QuantumTheory {
  SCHRODINGER = '薛定谔的猫 (叠加态)',
  HEISENBERG = '海森堡不确定性原理',
  ENTANGLEMENT = '量子纠缠'
}

export interface ObservationReport {
  question: string;
  theory: QuantumTheory;
  interpretation: string;
  timestamp: string;
  id: string;
  observationIndex: string;
}

export interface GeminiResponse {
  interpretation: string;
  observationIndex: string;
}
