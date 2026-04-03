"use client";

import { motion } from "framer-motion";
import { useAnalysisStore } from "@/lib/store";
import { InsightCard } from "./insight-card";
import { ChartCard } from "./chart-card";
import { Database, Columns3, Rows3, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function ResultsPanel() {
  const { summary, result } = useAnalysisStore();

  if (!summary || !result) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Data summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <MetricBox
          icon={<Rows3 className="h-4 w-4 text-[#818CF8]" />}
          label="Lignes"
          value={summary.rowCount}
          color="#818CF8"
        />
        <MetricBox
          icon={<Columns3 className="h-4 w-4 text-[#C084FC]" />}
          label="Colonnes"
          value={summary.columnCount}
          color="#C084FC"
        />
        <MetricBox
          icon={<Database className="h-4 w-4 text-[#67E8F9]" />}
          label="Insights"
          value={result.insights.length}
          color="#67E8F9"
        />
      </div>

      {/* AI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl p-5"
        style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))", border: "1px solid rgba(99,102,241,0.12)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-[#818CF8]" />
          <h3 className="font-[family-name:var(--font-syne)] text-sm font-bold text-white">Resume de l&apos;analyse</h3>
        </div>
        <p className="text-sm text-[#CBD5E1] leading-relaxed">{result.summary}</p>
      </motion.div>

      {/* Insights */}
      {result.insights.length > 0 && (
        <div>
          <h3 className="font-[family-name:var(--font-syne)] text-sm font-bold text-white mb-3">Insights cles</h3>
          <div className="space-y-3">
            {result.insights.map((insight, i) => (
              <InsightCard key={i} insight={insight} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Charts */}
      {result.charts.length > 0 && (
        <div>
          <h3 className="font-[family-name:var(--font-syne)] text-sm font-bold text-white mb-3">Visualisations</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {result.charts.map((chart, i) => (
              <ChartCard key={i} config={chart} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Data preview */}
      <div className="glass-card rounded-2xl p-5 overflow-hidden">
        <h3 className="font-[family-name:var(--font-syne)] text-sm font-bold text-white mb-3">Apercu des donnees</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/5">
                {summary.columns.slice(0, 6).map((col) => (
                  <th key={col.name} className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {summary.preview.slice(0, 5).map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02]"
                >
                  {summary.columns.slice(0, 6).map((col) => (
                    <td key={col.name} className="px-3 py-2 text-[#CBD5E1]">
                      {row[col.name] || "—"}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function MetricBox({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="glass-card rounded-xl p-4 text-center"
    >
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-2xl font-bold text-white">
        <AnimatedCounter value={value} duration={1} className="text-2xl font-bold text-white" />
      </p>
      <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color }}>{label}</p>
    </motion.div>
  );
}
