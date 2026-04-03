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

function ImpactBadge({ value }: { value: string }) {
  const colorMap: Record<string, string> = {
    fort: "rgba(16,185,129,0.2)",
    moyen: "rgba(245,158,11,0.2)",
    faible: "rgba(99,102,241,0.2)",
  };
  const textMap: Record<string, string> = {
    fort: "#10B981",
    moyen: "#F59E0B",
    faible: "#818CF8",
  };
  const key = value.toLowerCase();
  return (
    <span
      className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-geist-sans)]"
      style={{ background: colorMap[key] || colorMap.moyen, color: textMap[key] || textMap.moyen }}
    >
      {value}
    </span>
  );
}

function EffortBadge({ value }: { value: string }) {
  return (
    <span
      className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-geist-sans)]"
      style={{ background: "rgba(6,182,212,0.15)", color: "#06B6D4" }}
    >
      {value}
    </span>
  );
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
        <h3 className="font-[family-name:var(--font-syne)] font-bold text-white text-xl mb-4">
          Opportunites identifiees
        </h3>
        <div className="space-y-3">
          {result.opportunities.map((opp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-[family-name:var(--font-syne)] font-bold text-white text-sm">
                    {opp.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <ImpactBadge value={opp.impact} />
                  <EffortBadge value={opp.effort} />
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest font-[family-name:var(--font-geist-sans)]"
                    style={{ background: "rgba(217,119,6,0.15)", color: "#FBBF24" }}
                  >
                    ROI {opp.roi}
                  </span>
                </div>
              </div>
              <p className="text-zinc-400 text-xs font-[family-name:var(--font-geist-sans)] leading-relaxed">
                {opp.description}
              </p>
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
