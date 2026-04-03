export interface Sector {
  id: string;
  name: string;
  icon: string;
  problems: string[];
  aiOpportunities: string[];
}

export const SECTORS: Sector[] = [
  {
    id: "ecommerce",
    name: "E-commerce / Retail",
    icon: "🛒",
    problems: ["Gestion des stocks", "SAV repetitif", "Personalisation faible", "Pricing statique"],
    aiOpportunities: ["Prevision de demande", "Chatbot support", "Recommandations personnalisees", "Pricing dynamique"],
  },
  {
    id: "fintech",
    name: "Fintech / Banque",
    icon: "💳",
    problems: ["KYC manuel", "Detection de fraude", "Conformite reglementaire", "Analyse de risque lente"],
    aiOpportunities: ["OCR + verification auto", "Detection anomalies temps reel", "Audit automatise", "Scoring IA"],
  },
  {
    id: "logistique",
    name: "Logistique / Supply Chain",
    icon: "🚛",
    problems: ["Bons de commande manuels", "Optimisation routes", "Prevision demande", "Suivi temps reel"],
    aiOpportunities: ["Extraction OCR", "Route optimizer", "Demand forecasting", "Tracking intelligent"],
  },
  {
    id: "rh",
    name: "RH / Recrutement",
    icon: "👥",
    problems: ["Tri de CV chronophage", "Entretiens non structures", "Onboarding lent", "Retention difficile"],
    aiOpportunities: ["Screening IA", "Scoring candidats", "Assistant onboarding", "Predicteur de turnover"],
  },
  {
    id: "sante",
    name: "Sante / MedTech",
    icon: "🏥",
    problems: ["Admin patient lourd", "Comptes-rendus manuels", "Planification complexe", "Suivi patient discontinu"],
    aiOpportunities: ["NLP medical", "Transcription auto", "Scheduling intelligent", "Monitoring patient IA"],
  },
  {
    id: "immobilier",
    name: "Immobilier / PropTech",
    icon: "🏠",
    problems: ["Estimation approximative", "Qualification leads faible", "Visites inutiles", "Documents juridiques"],
    aiOpportunities: ["Modeles estimation IA", "Chatbot qualification", "Visite virtuelle IA", "Generation contrats"],
  },
  {
    id: "legal",
    name: "Legal / LegalTech",
    icon: "⚖️",
    problems: ["Revue contrats longue", "Recherche jurisprudence", "Redaction repetitive", "Due diligence manuelle"],
    aiOpportunities: ["Analyse documentaire IA", "RAG juridique", "Generation de contrats", "Extraction de clauses"],
  },
  {
    id: "education",
    name: "Education / EdTech",
    icon: "📚",
    problems: ["Correction chronophage", "Cours non personnalises", "Suivi eleves difficile", "Contenu obsolete"],
    aiOpportunities: ["Auto-grading", "Parcours adaptatif", "Analytics apprenant", "Generation de contenu"],
  },
];
