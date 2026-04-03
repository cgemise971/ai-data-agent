"use client";

import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Zap, Clock, ArrowRight, RefreshCw } from "lucide-react";
import type { DiagnosticResult } from "@/lib/store";
import { useDiagnosticStore } from "@/lib/store";
import { SECTORS } from "@/lib/sectors";

interface ResultsViewProps {
  result: DiagnosticResult;
}

export function ResultsView({ result }: ResultsViewProps) {
  const { sectorId, reset } = useDiagnosticStore();
  const sector = SECTORS.find((s) => s.id === sectorId);

  const radarData = result.maturityScores.map((item) => ({
    dimension: item.dimension,
    score: item.score,
    fullMark: item.max,
  }));

  const phaseColors = ["#D97706", "#10B981", "#06B6D4"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-16"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
          style={{ background: "rgba(217,119,6,0.1)", border: "1px solid rgba(217,119,6,0.2)" }}>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-amber-500 font-[family-name:var(--font-geist-sans)]">
            Diagnostic IA — {sector?.name}
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl md:text-4xl text-white mb-2">
          Votre diagnostic est pret
        </h2>
        <p className="text-zinc-400 font-[family-name:var(--font-geist-sans)] text-sm">
          Analyse personnalisee basee sur votre conversation
        </p>
      </motion.div>

      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="animated-border glow-amber rounded-2xl p-6"
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(217,119,6,0.15)" }}>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="font-[family-name:var(--font-syne)] font-bold text-white text-lg">
            Resume executif
          </h3>
        </div>
        <p className="text-zinc-300 font-[family-name:var(--font-geist-sans)] text-sm leading-relaxed">
          {result.summary}
        </p>
      </motion.div>

      {/* Radar chart + ROI side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Radar chart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="font-[family-name:var(--font-syne)] font-bold text-white mb-4">
            Maturite IA
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <defs>
                <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D97706" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#FBBF24" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{
                  fill: "#A1A1AA",
                  fontSize: 11,
                  fontFamily: "var(--font-geist-sans)",
                }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: "#52525B", fontSize: 9 }}
                tickCount={4}
                stroke="rgba(255,255,255,0.04)"
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#D97706"
                strokeWidth={2}
                fill="url(#radarGradient)"
                dot={{ fill: "#FBBF24", strokeWidth: 0, r: 4 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ROI card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="glass-card rounded-2xl p-6 flex flex-col justify-between"
        >
          <h3 className="font-[family-name:var(--font-syne)] font-bold text-white mb-6">
            Projection ROI
          </h3>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-[family-name:var(--font-geist-sans)] mb-1">
                  Investissement estime
                </p>
                <p className="text-2xl font-[family-name:var(--font-syne)] font-bold text-white">
                  {result.roiEstimate.invested}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(99,102,241,0.15)" }}>
                <Zap className="w-5 h-5" style={{ color: "#818CF8" }} />
              </div>
            </div>
            <div className="h-px bg-white/5" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-[family-name:var(--font-geist-sans)] mb-1">
                  Economies annuelles
                </p>
                <p className="text-2xl font-[family-name:var(--font-syne)] font-bold" style={{ color: "#10B981" }}>
                  {result.roiEstimate.saved}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(16,185,129,0.15)" }}>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <div className="h-px bg-white/5" />
            <div className="glass rounded-xl p-4 text-center"
              style={{ border: "1px solid rgba(217,119,6,0.2)" }}>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-[family-name:var(--font-geist-sans)] mb-1">
                Ratio ROI
              </p>
              <p className="text-3xl font-[family-name:var(--font-syne)] font-extrabold gradient-text">
                {result.roiEstimate.ratio}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="font-[family-name:var(--font-syne)] font-bold text-white text-xl mb-2">
          Opportunites identifiees
        </h3>
        <p className="text-zinc-500 text-sm font-[family-name:var(--font-geist-sans)] mb-6">
          Classees par impact potentiel sur votre activite
        </p>
        <div className="space-y-4">
          {result.opportunities.map((opp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              {/* Title + ROI */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                    style={{ background: `rgba(217,119,6,${0.15 - i * 0.02})` }}>
                    <span className="text-amber-500 font-[family-name:var(--font-syne)] text-sm font-bold">{i + 1}</span>
                  </div>
                  <h4 className="font-[family-name:var(--font-syne)] font-bold text-white text-base">
                    {opp.title}
                  </h4>
                </div>
                <span
                  className="flex-shrink-0 px-3 py-1 rounded-lg text-xs font-bold font-[family-name:var(--font-syne)]"
                  style={{ background: "rgba(217,119,6,0.15)", color: "#FBBF24" }}
                >
                  ROI {opp.roi}
                </span>
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-sm font-[family-name:var(--font-geist-sans)] leading-relaxed mb-4 ml-11">
                {opp.description}
              </p>

              {/* Impact / Effort meters */}
              <div className="grid grid-cols-2 gap-4 ml-11">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-[family-name:var(--font-geist-sans)] mb-1.5">
                    Impact
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: opp.impact.toLowerCase() === "fort" ? "90%" : opp.impact.toLowerCase() === "moyen" ? "60%" : "30%",
                          background: opp.impact.toLowerCase() === "fort" ? "#10B981" : opp.impact.toLowerCase() === "moyen" ? "#F59E0B" : "#6366F1",
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium font-[family-name:var(--font-geist-sans)]"
                      style={{
                        color: opp.impact.toLowerCase() === "fort" ? "#10B981" : opp.impact.toLowerCase() === "moyen" ? "#F59E0B" : "#6366F1",
                      }}>
                      {opp.impact}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-[family-name:var(--font-geist-sans)] mb-1.5">
                    Effort requis
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: opp.effort.toLowerCase() === "fort" || opp.effort.toLowerCase() === "eleve" ? "90%" : opp.effort.toLowerCase() === "moyen" ? "55%" : "25%",
                          background: "#06B6D4",
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#06B6D4] font-[family-name:var(--font-geist-sans)]">
                      {opp.effort}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <h3 className="font-[family-name:var(--font-syne)] font-bold text-white text-xl mb-4">
          Plan d&apos;action
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.roadmap.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: phaseColors[i] || phaseColors[2] }}
                />
                <h4
                  className="font-[family-name:var(--font-syne)] font-bold text-sm"
                  style={{ color: phaseColors[i] || phaseColors[2] }}
                >
                  {phase.phase}
                </h4>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <Clock className="w-3 h-3 text-zinc-600" />
                <span className="text-[10px] text-zinc-500 font-[family-name:var(--font-geist-sans)]">
                  {phase.duration}
                </span>
              </div>
              <ul className="space-y-2">
                {phase.actions.map((action, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <ArrowRight
                      className="w-3 h-3 mt-0.5 flex-shrink-0"
                      style={{ color: phaseColors[i] || phaseColors[2] }}
                    />
                    <span className="text-xs text-zinc-300 font-[family-name:var(--font-geist-sans)] leading-tight">
                      {action}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA + Reset */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 pt-4"
      >
        <a
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="animated-border flex-1 py-4 px-6 rounded-xl font-[family-name:var(--font-syne)] font-bold text-sm text-white text-center transition-all hover:opacity-90 flex items-center justify-center gap-2"
          style={{ background: "rgba(217,119,6,0.2)" }}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          Discutons de votre transformation
        </a>
        <button
          onClick={reset}
          className="py-4 px-6 rounded-xl font-[family-name:var(--font-syne)] font-semibold text-sm text-zinc-400 transition-all hover:text-white hover:bg-zinc-800 flex items-center justify-center gap-2"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <RefreshCw className="w-4 h-4" />
          Nouveau diagnostic
        </button>
      </motion.div>
    </motion.div>
  );
}
