"use client";

import { useEffect } from "react";
import { ResultsView } from "@/components/diagnostic/results-view";
import { useDiagnosticStore } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const MOCK_RESULT = {
  summary:
    "Votre entreprise dans le secteur logistique presente un niveau de maturite IA modere. Les processus manuels de traitement des bons de commande et la planification des tournees representent les plus gros gisements d'optimisation. Avec 3 personnes dediees a la saisie et un taux d'erreur de 8%, l'automatisation par IA permettrait des gains significatifs des les premieres semaines.",
  maturityScores: [
    { dimension: "Automatisation", score: 30, max: 100 },
    { dimension: "Data", score: 45, max: 100 },
    { dimension: "IA Predictive", score: 15, max: 100 },
    { dimension: "IA Generative", score: 10, max: 100 },
    { dimension: "Culture Tech", score: 55, max: 100 },
  ],
  opportunities: [
    {
      title: "Automatisation des bons de commande",
      impact: "Fort",
      effort: "Moyen",
      roi: "4.2x",
      description:
        "Remplacement de la saisie manuelle par un pipeline OCR + LLM. Extraction automatique des donnees des bons de commande PDF/papier, validation croisee avec la base produits, et injection directe dans l'ERP. Reduction estimee du temps de traitement de 85%.",
    },
    {
      title: "Optimisation des tournees de livraison",
      impact: "Fort",
      effort: "Eleve",
      roi: "3.1x",
      description:
        "Algorithme d'optimisation des itineraires prenant en compte les contraintes horaires, la capacite vehicule, et le trafic en temps reel. Reduction du kilometrage de 15-20% et du temps de livraison de 25%.",
    },
    {
      title: "Chatbot support client",
      impact: "Moyen",
      effort: "Faible",
      roi: "5.8x",
      description:
        "Deploiement d'un assistant IA entraine sur votre base de connaissances pour repondre aux questions frequentes des clients (suivi colis, delais, reclamations). Resolution automatique de 70% des demandes niveau 1.",
    },
    {
      title: "Prevision de la demande",
      impact: "Fort",
      effort: "Eleve",
      roi: "2.5x",
      description:
        "Modele de machine learning analysant l'historique des commandes, la saisonnalite, et les tendances marche pour anticiper les volumes. Reduction des ruptures de stock de 40% et du surstockage de 30%.",
    },
  ],
  roadmap: [
    {
      phase: "Quick Wins",
      duration: "4 semaines",
      actions: [
        "Deployer le chatbot support client",
        "Automatiser l'extraction des bons de commande simples",
        "Former l'equipe aux outils IA de base",
      ],
    },
    {
      phase: "Fondations",
      duration: "8 semaines",
      actions: [
        "Pipeline OCR complet pour tous types de documents",
        "Integration ERP automatisee",
        "Collecte et structuration des donnees historiques",
      ],
    },
    {
      phase: "Scale",
      duration: "12 semaines",
      actions: [
        "Lancement de l'optimisation des tournees",
        "Deploiement du modele de prevision de demande",
        "Dashboard temps reel pour le monitoring IA",
      ],
    },
  ],
  roiEstimate: {
    invested: "18 000 EUR",
    saved: "75 000 EUR/an",
    ratio: "4.2x en 6 mois",
  },
};

export default function DiagnosticPreview() {
  const { setSector, setResult, setStep } = useDiagnosticStore();

  useEffect(() => {
    setSector("logistique");
    setResult(MOCK_RESULT);
    setStep("results");
  }, [setSector, setResult, setStep]);

  return (
    <div className="min-h-screen relative" style={{ background: "#09090B" }}>
      {/* Grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(217,119,6,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-20 z-0"
        style={{ background: "radial-gradient(ellipse, #D97706, transparent)" }}
      />

      {/* Nav */}
      <nav
        className="relative z-10 flex items-center justify-between px-6 py-5 border-b"
        style={{ borderColor: "rgba(255,255,255,0.04)", background: "rgba(9,9,11,0.8)", backdropFilter: "blur(16px)" }}
      >
        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
        <div className="font-[family-name:var(--font-syne)] font-bold text-lg text-white">
          <span className="gradient-text">AI</span> Diagnostic
          <span className="ml-2 text-xs text-zinc-600 font-normal">(preview)</span>
        </div>
        <div className="w-16" />
      </nav>

      {/* Results */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <ResultsView result={MOCK_RESULT} />
      </main>
    </div>
  );
}
