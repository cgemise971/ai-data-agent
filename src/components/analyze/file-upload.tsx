"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSpreadsheet, X, Loader2 } from "lucide-react";
import { useAnalysisStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { setCSV, fileName, isAnalyzing } = useAnalysisStore();

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith(".csv")) {
        alert("Seuls les fichiers CSV sont acceptes.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCSV(content, file.name);
      };
      reader.readAsText(file);
    },
    [setCSV]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
      }}
      onClick={() => fileRef.current?.click()}
      className={cn(
        "relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300",
        isDragging
          ? "border-[#818CF8] bg-[#818CF8]/5 scale-[1.01]"
          : fileName
            ? "border-[#34D399]/30 bg-[#34D399]/5"
            : "border-[#334155] bg-[#1E293B]/20 hover:border-[#475569] hover:bg-[#1E293B]/40"
      )}
    >
      <input
        ref={fileRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))" }}>
                <Loader2 className="h-7 w-7 text-[#818CF8] animate-spin" />
              </div>
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-30" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }} />
            </div>
            <div>
              <p className="font-[family-name:var(--font-syne)] text-lg font-bold text-white">Analyse en cours...</p>
              <p className="text-sm text-[#94A3B8] mt-1">L&apos;IA examine vos donnees</p>
            </div>
          </motion.div>
        ) : fileName ? (
          <motion.div
            key="loaded"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="h-16 w-16 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(6,182,212,0.15))" }}>
              <FileSpreadsheet className="h-7 w-7 text-[#34D399]" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-syne)] text-lg font-bold text-white">{fileName}</p>
              <p className="text-sm text-[#34D399] mt-1">Fichier charge — pret pour l&apos;analyse</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="h-16 w-16 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))" }}>
              <Upload className="h-7 w-7 text-[#818CF8]" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-syne)] text-lg font-bold text-white">
                Deposez votre fichier CSV
              </p>
              <p className="text-sm text-[#94A3B8] mt-1">
                ou cliquez pour parcourir vos fichiers
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              {["Excel", "Google Sheets", "Stripe", "HubSpot"].map((src) => (
                <span key={src} className="rounded-full bg-[#1E293B] border border-[#334155]/50 px-3 py-1 text-[10px] text-[#64748B]">
                  {src}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
