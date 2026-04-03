import { create } from "zustand";

export interface DiagnosticMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface DiagnosticResult {
  summary: string;
  maturityScores: { dimension: string; score: number; max: number }[];
  opportunities: { title: string; impact: string; effort: string; roi: string; description: string }[];
  roadmap: { phase: string; duration: string; actions: string[] }[];
  roiEstimate: { invested: string; saved: string; ratio: string };
}

interface DiagnosticState {
  sectorId: string | null;
  step: "sector" | "conversation" | "analyzing" | "results";
  messages: DiagnosticMessage[];
  questionCount: number;
  result: DiagnosticResult | null;
  setSector: (id: string) => void;
  addMessage: (msg: DiagnosticMessage) => void;
  incrementQuestion: () => void;
  setStep: (step: DiagnosticState["step"]) => void;
  setResult: (result: DiagnosticResult) => void;
  reset: () => void;
}

export const useDiagnosticStore = create<DiagnosticState>((set) => ({
  sectorId: null,
  step: "sector",
  messages: [],
  questionCount: 0,
  result: null,
  setSector: (sectorId) => set({ sectorId, step: "conversation" }),
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  incrementQuestion: () => set((s) => ({ questionCount: s.questionCount + 1 })),
  setStep: (step) => set({ step }),
  setResult: (result) => set({ result, step: "results" }),
  reset: () => set({ sectorId: null, step: "sector", messages: [], questionCount: 0, result: null }),
}));
