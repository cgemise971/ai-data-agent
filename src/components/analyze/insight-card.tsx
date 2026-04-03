"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Info } from "lucide-react";
import type { Insight } from "@/types";

const iconMap = {
  success: TrendingUp,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.15)", text: "#34D399", icon: "#34D399" },
  warning: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.15)", text: "#FBBF24", icon: "#F59E0B" },
  info: { bg: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.15)", text: "#818CF8", icon: "#818CF8" },
};

export function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  const Icon = iconMap[insight.severity];
  const colors = colorMap[insight.severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-xl p-5 transition-all hover:scale-[1.01]"
      style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          <Icon className="h-4 w-4" style={{ color: colors.icon }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-[family-name:var(--font-syne)] text-sm font-bold text-white truncate">
              {insight.title}
            </h4>
            {insight.metric && (
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
              >
                {insight.metric}
              </span>
            )}
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed">{insight.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
