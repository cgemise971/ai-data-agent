"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ChartConfig } from "@/types";

const COLORS = ["#818CF8", "#C084FC", "#67E8F9", "#34D399", "#FBBF24", "#F472B6"];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg px-3 py-2 text-xs shadow-xl" style={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(148,163,184,0.1)" }}>
      <p className="text-[#94A3B8]">{label}</p>
      <p className="font-bold text-white">{payload[0].value}</p>
    </div>
  );
}

export function ChartCard({ config, index }: { config: ChartConfig; index: number }) {
  if (!config.data.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="font-[family-name:var(--font-syne)] text-sm font-bold text-white mb-4">
        {config.title}
      </h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          {config.type === "bar" ? (
            <BarChart data={config.data}>
              <XAxis dataKey={config.xKey} tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={config.yKey} fill={config.color || "#818CF8"} radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : config.type === "line" ? (
            <LineChart data={config.data}>
              <XAxis dataKey={config.xKey} tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey={config.yKey} stroke={config.color || "#818CF8"} strokeWidth={2} dot={false} />
            </LineChart>
          ) : config.type === "area" ? (
            <AreaChart data={config.data}>
              <XAxis dataKey={config.xKey} tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={config.color || "#818CF8"} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={config.color || "#818CF8"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey={config.yKey} stroke={config.color || "#818CF8"} strokeWidth={2} fill={`url(#gradient-${index})`} />
            </AreaChart>
          ) : (
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie data={config.data} dataKey={config.yKey} nameKey={config.xKey} cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                {config.data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
