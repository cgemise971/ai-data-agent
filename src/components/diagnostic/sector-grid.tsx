"use client";

import { motion } from "framer-motion";
import { SECTORS } from "@/lib/sectors";

interface SectorGridProps {
  onSelect: (id: string) => void;
}

export function SectorGrid({ onSelect }: SectorGridProps) {
  return (
    <div className="w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.07, delayChildren: 0.1 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {SECTORS.map((sector) => (
          <motion.div
            key={sector.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(sector.id)}
            className="glass-card rounded-2xl p-6 cursor-pointer group relative overflow-hidden transition-all duration-300 hover:border-amber-600/30 hover:glow-amber"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Hover background gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 0%, rgba(217,119,6,0.08) 0%, transparent 70%)" }}
            />

            <div className="relative z-10">
              <div className="text-4xl mb-4">{sector.icon}</div>
              <h3 className="font-[family-name:var(--font-syne)] font-bold text-sm text-white mb-2 leading-tight">
                {sector.name}
              </h3>
              <p className="text-xs text-zinc-500 font-[family-name:var(--font-geist-sans)] mb-3">
                {sector.problems.length} problemes resolus par l&apos;IA
              </p>
              <ul className="space-y-1">
                {sector.problems.slice(0, 3).map((problem) => (
                  <li key={problem} className="flex items-start gap-1.5">
                    <span className="text-amber-600 mt-0.5 flex-shrink-0 text-xs">•</span>
                    <span className="text-xs text-zinc-400 font-[family-name:var(--font-geist-sans)] leading-tight">
                      {problem}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-[family-name:var(--font-geist-sans)]">
                  Selectionner
                </span>
                <motion.span
                  className="text-amber-600 text-sm"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  →
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
