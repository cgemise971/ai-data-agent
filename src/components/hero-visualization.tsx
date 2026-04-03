"use client";

import { motion } from "framer-motion";

const BARS = [
  { h: 45, delay: 0 }, { h: 72, delay: 0.1 }, { h: 55, delay: 0.2 },
  { h: 88, delay: 0.3 }, { h: 65, delay: 0.4 }, { h: 95, delay: 0.5 },
  { h: 78, delay: 0.6 }, { h: 60, delay: 0.7 }, { h: 82, delay: 0.8 },
  { h: 70, delay: 0.9 }, { h: 92, delay: 1.0 }, { h: 50, delay: 1.1 },
];

const LINE_POINTS = "0,80 40,65 80,70 120,45 160,55 200,30 240,40 280,20 320,25 360,10";

export function HeroVisualization() {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Background glow */}
      <div
        className="absolute -inset-16 -z-10 rounded-full"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.14) 0%, rgba(6,182,212,0.06) 40%, transparent 70%)", filter: "blur(40px)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 6 }}
        animate={{ opacity: 1, y: 0, rotateX: 2 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
      >
        <div
          className="rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5),0_0_50px_rgba(99,102,241,0.06)]"
          style={{ background: "linear-gradient(135deg, rgba(25,37,64,0.7), rgba(15,23,42,0.9))", border: "1px solid rgba(148,163,184,0.08)", transform: "rotateX(1deg)" }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#22C55E]/60" />
            </div>
            <div className="flex-1 mx-4">
              <div className="h-6 rounded-md bg-white/5 flex items-center px-3">
                <span className="text-[10px] text-[#475569]">app.datapulse.ai/analyze</span>
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="flex" style={{ height: "400px" }}>
            {/* Left — upload area */}
            <div className="w-72 shrink-0 border-r border-white/5 p-6 flex flex-col" style={{ background: "rgba(15,23,42,0.5)" }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-5 w-5 rounded-md" style={{ background: "linear-gradient(135deg, #6366F1, #06B6D4)" }} />
                <span className="text-[11px] font-bold text-white/80">DataPulse AI</span>
              </div>

              {/* File loaded state */}
              <div className="rounded-xl border-2 border-dashed border-[#34D399]/30 bg-[#34D399]/5 p-5 text-center mb-4">
                <div className="h-8 w-8 mx-auto mb-2 rounded-lg bg-[#34D399]/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#34D399" strokeWidth="1.5" /><path d="M14 2v6h6" stroke="#34D399" strokeWidth="1.5" /><path d="M9 15l2 2 4-4" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <p className="text-[10px] font-bold text-[#34D399]">sales_data.csv</p>
                <p className="text-[9px] text-[#64748B] mt-0.5">14 lignes · 7 colonnes</p>
              </div>

              {/* Column chips */}
              <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Colonnes detectees</p>
              <div className="flex flex-wrap gap-1">
                {["revenue", "users", "churn_rate", "plan", "region"].map((col) => (
                  <span key={col} className="rounded-full bg-[#1E293B] border border-[#334155]/50 px-2 py-0.5 text-[9px] text-[#94A3B8]">{col}</span>
                ))}
              </div>

              <div className="mt-auto">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                  className="h-1 rounded-full"
                  style={{ background: "linear-gradient(90deg, #6366F1, #06B6D4)" }}
                />
                <p className="text-[9px] text-[#34D399] mt-1.5 font-medium">Analyse terminee</p>
              </div>
            </div>

            {/* Right — results */}
            <div className="flex-1 p-6 overflow-hidden">
              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="rounded-xl p-4 mb-4"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.04))", border: "1px solid rgba(99,102,241,0.12)" }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#818CF8]" />
                  <span className="text-[9px] font-bold text-[#818CF8] uppercase tracking-widest">Resume IA</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-full bg-white/5 rounded-full" />
                  <div className="h-2 w-4/5 bg-white/5 rounded-full" />
                </div>
              </motion.div>

              {/* Charts side by side */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Bar chart */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="rounded-xl p-4"
                  style={{ background: "rgba(30,41,59,0.3)", border: "1px solid rgba(148,163,184,0.05)" }}
                >
                  <p className="text-[9px] font-bold text-white/60 mb-3">Revenue par semaine</p>
                  <div className="flex items-end gap-[3px] h-20">
                    {BARS.map((bar, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${bar.h}%` }}
                        transition={{ duration: 0.7, delay: 1.4 + bar.delay * 0.15, ease: "easeOut" }}
                        className="flex-1 rounded-t-sm"
                        style={{
                          background: `linear-gradient(180deg, ${i >= 8 ? "#34D399" : "#818CF8"} 0%, ${i >= 8 ? "#34D39930" : "#818CF830"} 100%)`,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Line chart */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="rounded-xl p-4"
                  style={{ background: "rgba(30,41,59,0.3)", border: "1px solid rgba(148,163,184,0.05)" }}
                >
                  <p className="text-[9px] font-bold text-white/60 mb-3">Tendance utilisateurs</p>
                  <svg viewBox="0 0 360 90" className="w-full h-20">
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C084FC" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.polygon
                      points={`0,90 ${LINE_POINTS} 360,90`}
                      fill="url(#lineGrad)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    />
                    <motion.polyline
                      points={LINE_POINTS}
                      fill="none"
                      stroke="#C084FC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1.6, ease: "easeOut" }}
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Insight cards */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="rounded-lg p-3"
                  style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.1)" }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                    <span className="text-[9px] font-bold text-[#34D399]">Croissance</span>
                  </div>
                  <p className="text-[8px] text-[#94A3B8]">Revenue en hausse de +73% sur la periode</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.15 }}
                  className="rounded-lg p-3"
                  style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.1)" }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#FBBF24]" />
                    <span className="text-[9px] font-bold text-[#FBBF24]">Attention</span>
                  </div>
                  <p className="text-[8px] text-[#94A3B8]">Pic de churn detecte semaine du 22 janv.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
        className="absolute -bottom-6 -left-4 rounded-xl px-4 py-3 shadow-2xl flex items-center gap-3"
        style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(52,211,153,0.15)", backdropFilter: "blur(16px)", animation: "float-mid 10s ease-in-out infinite" }}
      >
        <div className="text-lg font-bold text-[#34D399]">5</div>
        <div>
          <p className="text-[9px] text-[#64748B]">Insights detectes</p>
          <p className="text-[10px] font-bold text-white">en 12 secondes</p>
        </div>
      </motion.div>
    </div>
  );
}
