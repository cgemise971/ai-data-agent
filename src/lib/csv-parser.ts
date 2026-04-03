import Papa from "papaparse";
import type { DataColumn, DataSummary } from "@/types";

function detectType(values: string[]): DataColumn["type"] {
  const nonEmpty = values.filter((v) => v.trim() !== "");
  if (nonEmpty.length === 0) return "string";

  const numCount = nonEmpty.filter((v) => !isNaN(Number(v))).length;
  if (numCount / nonEmpty.length > 0.8) return "number";

  const dateCount = nonEmpty.filter((v) => !isNaN(Date.parse(v))).length;
  if (dateCount / nonEmpty.length > 0.8) return "date";

  const boolCount = nonEmpty.filter((v) =>
    ["true", "false", "0", "1", "yes", "no", "oui", "non"].includes(v.toLowerCase())
  ).length;
  if (boolCount / nonEmpty.length > 0.8) return "boolean";

  return "string";
}

export function parseCSV(content: string): DataSummary {
  const result = Papa.parse(content, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });

  const rows = result.data as Record<string, string>[];
  const headers = result.meta.fields || [];

  const columns: DataColumn[] = headers.map((name) => {
    const values = rows.map((r) => r[name] || "");
    const unique = new Set(values.filter((v) => v.trim() !== ""));
    return {
      name,
      type: detectType(values),
      sample: values.slice(0, 5),
      nullCount: values.filter((v) => v.trim() === "").length,
      uniqueCount: unique.size,
    };
  });

  return {
    rowCount: rows.length,
    columnCount: headers.length,
    columns,
    preview: rows.slice(0, 8),
  };
}

export function buildAnalysisPrompt(summary: DataSummary, csvSnippet: string): string {
  const colDesc = summary.columns
    .map(
      (c) =>
        `- "${c.name}" (${c.type}): ${c.uniqueCount} valeurs uniques, ${c.nullCount} valeurs manquantes, exemples: [${c.sample.slice(0, 3).join(", ")}]`
    )
    .join("\n");

  return `Analyse ce jeu de donnees CSV.

STRUCTURE :
- ${summary.rowCount} lignes, ${summary.columnCount} colonnes
${colDesc}

ECHANTILLON DES DONNEES :
${csvSnippet}

INSTRUCTIONS :
1. Fournis un RESUME general des donnees (2-3 phrases)
2. Identifie 3-5 INSIGHTS cles (tendances, anomalies, correlations)
3. Suggere 2-4 GRAPHIQUES pertinents au format JSON

Reponds en JSON valide avec cette structure exacte :
{
  "summary": "Resume general...",
  "insights": [
    { "title": "Titre court", "description": "Explication detaillee", "severity": "info|warning|success", "metric": "chiffre cle optionnel" }
  ],
  "charts": [
    { "type": "bar|line|pie|area", "title": "Titre du graphique", "xKey": "nom_colonne_x", "yKey": "nom_colonne_y", "color": "#818CF8" }
  ]
}

IMPORTANT : Reponds UNIQUEMENT avec le JSON, pas de texte avant ou apres. Tous les textes doivent etre en francais.`;
}
