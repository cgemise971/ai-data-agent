"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDiagnosticStore } from "@/lib/store";
import { SectorGrid } from "@/components/diagnostic/sector-grid";
import { ChatDiagnostic } from "@/components/diagnostic/chat-diagnostic";
import { ResultsView } from "@/components/diagnostic/results-view";
import { SECTORS } from "@/lib/sectors";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function DiagnosticPage() {
  const { step, sectorId, setSector, result } = useDiagnosticStore();
  const sector = SECTORS.find((s) => s.id === sectorId);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#09090B" }}
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(217,119,6,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-20 z-0"
        style={{ background: "radial-gradient(ellipse, #D97706, transparent)" }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 border-b"
        style={{ borderColor: "rgba(255,255,255,0.04)", background: "rgba(9,9,11,0.8)", backdropFilter: "blur(16px)" }}>
        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-[family-name:var(--font-geist-sans)]">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
        <div className="font-[family-name:var(--font-syne)] font-bold text-lg text-white">
          <span className="gradient-text">AI</span> Diagnostic
        </div>
        <div className="w-16" />
      </nav>

      {/* Main content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <AnimatePresence mode="wait">
          {/* Sector selection */}
          {step === "sector" && (
            <motion.div
              key="sector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-10">
                <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl md:text-5xl text-white mb-3 tracking-tight">
                  Choisissez votre{" "}
                  <span className="gradient-text">secteur</span>
                </h1>
                <p className="text-zinc-400 font-[family-name:var(--font-geist-sans)] text-sm md:text-base max-w-xl mx-auto">
                  Selectionnez votre industrie pour que notre IA adapte le diagnostic a vos enjeux specifiques.
                </p>
              </div>
              <SectorGrid onSelect={setSector} />
            </motion.div>
          )}

          {/* Conversation */}
          {step === "conversation" && (
            <motion.div
              key="conversation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
                    style={{ background: "rgba(217,119,6,0.1)", border: "1px solid rgba(217,119,6,0.2)" }}>
                    <span className="text-2xl">{sector?.icon}</span>
                    <span className="text-xs uppercase tracking-widest text-amber-500 font-[family-name:var(--font-geist-sans)]">
                      {sector?.name}
                    </span>
                  </div>
                  <h2 className="font-[family-name:var(--font-syne)] font-bold text-2xl text-white mb-2">
                    Votre consultant IA est pret
                  </h2>
                  <p className="text-zinc-500 text-sm font-[family-name:var(--font-geist-sans)]">
                    Repondez a 5 questions pour obtenir votre diagnostic personnalise
                  </p>
                </div>
                <ChatDiagnostic />
              </div>
            </motion.div>
          )}

          {/* Analyzing */}
          {step === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <div className="relative mb-8">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(217,119,6,0.1)", border: "1px solid rgba(217,119,6,0.2)" }}
                >
                  <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "2px solid rgba(217,119,6,0.3)" }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <h2 className="font-[family-name:var(--font-syne)] font-bold text-2xl text-white mb-3">
                Generation du diagnostic en cours...
              </h2>
              <p className="text-zinc-500 font-[family-name:var(--font-geist-sans)] text-sm max-w-sm">
                Notre IA analyse vos reponses et prepare un rapport personnalise avec recommandations et projections ROI.
              </p>
              <div className="mt-8 flex gap-2">
                {["Analyse des reponses", "Calcul ROI", "Redaction du rapport"].map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.4 }}
                    className="px-3 py-1.5 rounded-full text-xs font-[family-name:var(--font-geist-sans)]"
                    style={{ background: "rgba(217,119,6,0.1)", color: "#FBBF24", border: "1px solid rgba(217,119,6,0.2)" }}
                  >
                    {label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Results */}
          {step === "results" && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ResultsView result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
