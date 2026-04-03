"use client";

import { motion } from "framer-motion";

const BARS = [
  { h: 40, color: "rgba(192,193,255,0.25)" },
  { h: 70, color: "rgba(76,215,246,0.35)" },
  { h: 55, color: "rgba(192,193,255,0.25)" },
  { h: 90, color: "rgba(76,215,246,0.45)" },
  { h: 45, color: "rgba(192,193,255,0.25)" },
  { h: 80, color: "rgba(76,215,246,0.35)" },
];

export function HeroVisualization() {
  return (
    <div
      className="relative w-full aspect-square max-w-[560px] mx-auto lg:mx-0"
      style={{ animation: "hero-float 6s ease-in-out infinite" }}
    >
      {/* Dot grid background circle */}
      <div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(192,193,255,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(76,215,246,0.08) 0%, rgba(99,102,241,0.06) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {/* Main holographic visualization plate */}
        <motion.div
          initial={{ opacity: 0, rotateY: -15, rotateX: 10 }}
          animate={{ opacity: 1, rotateY: -12, rotateX: 8 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-[85%] h-[68%] rounded-2xl flex flex-col p-6 shadow-2xl overflow-hidden"
          style={{
            background: "rgba(45,52,73,0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(192,193,255,0.2)",
            transform: "perspective(800px) rotateX(8deg) rotateY(-12deg)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(76,215,246,0.06)",
          }}
        >
          {/* Window chrome */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#FFB4AB]/40" />
              <div className="w-3 h-3 rounded-full bg-[#4CD7F6]/40" />
              <div className="w-3 h-3 rounded-full bg-[#45DFA4]/40" />
            </div>
            <div className="h-2 w-32 bg-[#2D3449] rounded-full" />
          </div>

          {/* Bar chart */}
          <div className="flex-1 flex items-end gap-3 px-4">
            {BARS.map((bar, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${bar.h}%` }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                className="w-full rounded-t-lg"
                style={{ background: bar.color }}
              />
            ))}
          </div>

          {/* Inline floating +24.8% badge on the plate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.4 }}
            className="absolute top-1/4 right-8 w-24 h-12 rounded-lg flex items-center justify-center"
            style={{
              background: "rgba(45,52,73,0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(69,223,164,0.3)",
            }}
          >
            <span
              className="text-[10px] font-[family-name:var(--font-syne)] font-bold tracking-widest"
              style={{ color: "#45DFA4" }}
            >
              +24.8%
            </span>
          </motion.div>
        </motion.div>

        {/* Circular progress ring — top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute -top-8 -right-2 w-48 h-48 rounded-full flex flex-col items-center justify-center p-4 shadow-xl"
          style={{
            background: "rgba(45,52,73,0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(76,215,246,0.2)",
          }}
        >
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r="50"
              fill="transparent"
              stroke="rgba(76,215,246,0.1)"
              strokeWidth="8"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="50"
              fill="transparent"
              stroke="#4CD7F6"
              strokeWidth="8"
              strokeDasharray="314"
              strokeDashoffset="314"
              strokeLinecap="round"
              animate={{ strokeDashoffset: 88 }}
              transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
            />
          </svg>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="absolute text-xl font-[family-name:var(--font-syne)] font-bold"
            style={{ color: "#DAE2FD" }}
          >
            72%
          </motion.span>
        </motion.div>

        {/* Anomaly floating card — bottom left */}
        <motion.div
          initial={{ opacity: 0, x: -20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 -left-8 w-56 h-32 rounded-xl p-4 shadow-xl flex flex-col gap-2"
          style={{
            background: "rgba(45,52,73,0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(192,193,255,0.2)",
          }}
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 shrink-0"
              style={{ color: "#C0C1FF" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
            <span
              className="text-[10px] font-[family-name:var(--font-geist-sans)] uppercase tracking-widest"
              style={{ color: "#C7C4D7" }}
            >
              Anomalies détectées
            </span>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="text-3xl font-[family-name:var(--font-syne)] font-bold"
              style={{ color: "#DAE2FD" }}
            >
              14
            </motion.span>
            <span
              className="text-[10px] font-[family-name:var(--font-geist-sans)]"
              style={{ color: "#FFB4AB" }}
            >
              Risque élevé
            </span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
