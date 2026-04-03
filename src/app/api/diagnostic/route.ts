import { anthropic } from "@ai-sdk/anthropic";
import { streamText, generateText } from "ai";
import { SECTORS } from "@/lib/sectors";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { type, sectorId, messages, conversationHistory } = await req.json();
  const sector = SECTORS.find((s) => s.id === sectorId);
  const sectorName = sector?.name || sectorId;

  if (type === "question") {
    const systemPrompt = `Tu es un consultant senior en transformation IA. Tu realises un diagnostic pour une entreprise du secteur "${sectorName}".

CONTEXTE DU SECTEUR:
Problemes typiques: ${sector?.problems.join(", ")}
Opportunites IA: ${sector?.aiOpportunities.join(", ")}

TON ROLE:
- Pose UNE question a la fois, courte et precise
- Adapte tes questions aux reponses precedentes
- Creuse les douleurs concretes (temps perdu, couts, erreurs)
- Demande des chiffres quand possible (nombre d'employes, volume, temps passe)
- Sois chaleureux mais professionnel
- Reponds en francais
- Maximum 2-3 phrases par message

C'est la question ${messages.length > 0 ? Math.floor(messages.length / 2) + 1 : 1} sur 5.
${messages.length >= 8 ? "C'est ta DERNIERE question. Termine par: 'Merci pour ces informations precieuses. Je vais maintenant generer votre diagnostic personnalise.'" : ""}`;

    const result = streamText({
      model: anthropic("claude-sonnet-4-20250514"),
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });
    return result.toTextStreamResponse();
  }

  if (type === "diagnostic") {
    const prompt = `Tu es un consultant senior IA. Genere un diagnostic complet base sur cette conversation avec une entreprise du secteur "${sectorName}".

CONVERSATION:
${conversationHistory}

Genere un JSON avec cette structure EXACTE:
{
  "summary": "Resume executif en 3-4 phrases",
  "maturityScores": [
    { "dimension": "Automatisation", "score": 35, "max": 100 },
    { "dimension": "Data", "score": 45, "max": 100 },
    { "dimension": "IA Predictive", "score": 20, "max": 100 },
    { "dimension": "IA Generative", "score": 15, "max": 100 },
    { "dimension": "Culture Tech", "score": 50, "max": 100 }
  ],
  "opportunities": [
    { "title": "Nom de l'opportunite", "impact": "Fort", "effort": "Moyen", "roi": "4.2x", "description": "Description detaillee" }
  ],
  "roadmap": [
    { "phase": "Quick Wins", "duration": "4 semaines", "actions": ["Action 1", "Action 2"] },
    { "phase": "Fondations", "duration": "8 semaines", "actions": ["Action 1", "Action 2"] },
    { "phase": "Scale", "duration": "12 semaines", "actions": ["Action 1", "Action 2"] }
  ],
  "roiEstimate": { "invested": "15 000 EUR", "saved": "63 000 EUR/an", "ratio": "4.2x en 6 mois" }
}

IMPORTANT:
- Reponds UNIQUEMENT avec le JSON
- Base les scores sur les reponses reelles du client
- Les opportunites doivent etre SPECIFIQUES au secteur et aux reponses
- Le ROI doit etre calcule a partir des chiffres donnes par le client
- Tout en francais`;

    const { text } = await generateText({
      model: anthropic("claude-sonnet-4-20250514"),
      prompt,
      maxOutputTokens: 4096,
    });

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON");
      return Response.json(JSON.parse(jsonMatch[0]));
    } catch {
      return Response.json({ error: "Failed to parse diagnostic" }, { status: 500 });
    }
  }

  return Response.json({ error: "Invalid type" }, { status: 400 });
}
