import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { parseCSV, buildAnalysisPrompt } from "@/lib/csv-parser";
import type { AnalysisResult, ChartConfig } from "@/types";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { csvContent } = await req.json();

  if (!csvContent || typeof csvContent !== "string") {
    return Response.json({ error: "CSV content is required" }, { status: 400 });
  }

  const summary = parseCSV(csvContent);

  // Build a snippet of first 15 rows for context
  const lines = csvContent.split("\n");
  const snippet = lines.slice(0, Math.min(16, lines.length)).join("\n");

  const prompt = buildAnalysisPrompt(summary, snippet);

  const { text } = await generateText({
    model: anthropic("claude-sonnet-4-20250514"),
    prompt,
    maxOutputTokens: 4096,
  });

  // Parse Claude's JSON response
  let analysis: AnalysisResult;
  try {
    // Extract JSON from response (Claude sometimes wraps in markdown)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");
    const parsed = JSON.parse(jsonMatch[0]);

    // Compute chart data from actual CSV data
    const rows = summary.preview;
    const charts: ChartConfig[] = (parsed.charts || []).map(
      (chart: Omit<ChartConfig, "data">) => {
        // Aggregate data for charts from the full preview
        const data = rows
          .filter((r) => r[chart.xKey] && r[chart.yKey])
          .map((r) => ({
            [chart.xKey]: r[chart.xKey],
            [chart.yKey]: isNaN(Number(r[chart.yKey]))
              ? r[chart.yKey]
              : Number(r[chart.yKey]),
          }));

        return { ...chart, data };
      }
    );

    analysis = {
      summary: parsed.summary || "Analyse terminee.",
      insights: parsed.insights || [],
      charts,
    };
  } catch {
    analysis = {
      summary: text.slice(0, 500),
      insights: [],
      charts: [],
    };
  }

  return Response.json({ summary, analysis });
}
