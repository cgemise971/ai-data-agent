"use client";

import Link from "next/link";
import { ArrowLeft, Play, RotateCcw } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { FileUpload } from "@/components/analyze/file-upload";
import { ResultsPanel } from "@/components/analyze/results-panel";
import { useAnalysisStore } from "@/lib/store";
import { parseCSV } from "@/lib/csv-parser";

export default function AnalyzePage() {
  const { csvContent, fileName, summary, result, isAnalyzing, error, setSummary, setResult, setAnalyzing, setError, reset } =
    useAnalysisStore();

  async function handleAnalyze() {
    if (!csvContent) return;
    setAnalyzing(true);
    setError(null);

    const dataSummary = parseCSV(csvContent);
    setSummary(dataSummary);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvContent }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'analyse");

      const data = await res.json();
      setSummary(data.summary);
      setResult(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0F172A]">
      <AnimatedBackground />

      {/* Header */}
      <header className="glass sticky top-0 z-50">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="flex h-7 w-7 items-center justify-center rounded-lg text-[#64748B] transition-colors hover:bg-[#1E293B] hover:text-white">
                <ArrowLeft className="h-4 w-4" />
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M21 12V7H5a2 2 0 010-4h14v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 5v14a2 2 0 002 2h16v-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M18 12a2 2 0 000 4h4v-4h-4z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-[family-name:var(--font-syne)] text-sm font-bold text-white">DataPulse AI</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {fileName && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 rounded-lg border border-[#334155]/50 bg-[#1E293B]/30 px-3 py-1.5 text-xs text-[#94A3B8] transition-all hover:bg-[#1E293B]"
              >
                <RotateCcw className="h-3 w-3" />
                Nouveau fichier
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-white mb-2">
            {result ? "Resultats de l'analyse" : "Analysez vos donnees"}
          </h1>
          <p className="text-sm text-[#94A3B8]">
            {result
              ? `${fileName} — analyse terminee`
              : "Uploadez un CSV pour obtenir des insights IA instantanes"}
          </p>
        </div>

        {!result && <FileUpload />}

        {csvContent && !result && !isAnalyzing && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleAnalyze}
              className="group flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(99,102,241,0.2)] transition-all hover:scale-[1.02] hover:shadow-[0_0_48px_rgba(99,102,241,0.3)]"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
            >
              <Play className="h-4 w-4" />
              Lancer l&apos;analyse IA
            </button>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-4 text-center text-sm text-[#FCA5A5]">
            {error}
          </div>
        )}

        {(result || isAnalyzing) && summary && <ResultsPanel />}
      </main>
    </div>
  );
}
