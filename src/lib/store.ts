import { create } from "zustand";
import type { DataSummary, AnalysisResult } from "@/types";

interface AnalysisState {
  csvContent: string | null;
  fileName: string | null;
  summary: DataSummary | null;
  result: AnalysisResult | null;
  isAnalyzing: boolean;
  error: string | null;
  setCSV: (content: string, fileName: string) => void;
  setSummary: (summary: DataSummary) => void;
  setResult: (result: AnalysisResult) => void;
  setAnalyzing: (v: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  csvContent: null,
  fileName: null,
  summary: null,
  result: null,
  isAnalyzing: false,
  error: null,
  setCSV: (content, fileName) => set({ csvContent: content, fileName, result: null, error: null }),
  setSummary: (summary) => set({ summary }),
  setResult: (result) => set({ result, isAnalyzing: false }),
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setError: (error) => set({ error, isAnalyzing: false }),
  reset: () => set({ csvContent: null, fileName: null, summary: null, result: null, isAnalyzing: false, error: null }),
}));
