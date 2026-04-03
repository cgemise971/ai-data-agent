export interface DataColumn {
  name: string;
  type: "number" | "string" | "date" | "boolean";
  sample: string[];
  nullCount: number;
  uniqueCount: number;
}

export interface DataSummary {
  rowCount: number;
  columnCount: number;
  columns: DataColumn[];
  preview: Record<string, string>[];
}

export interface ChartConfig {
  type: "bar" | "line" | "pie" | "area";
  title: string;
  xKey: string;
  yKey: string;
  data: Record<string, string | number>[];
  color: string;
}

export interface Insight {
  title: string;
  description: string;
  severity: "info" | "warning" | "success";
  metric?: string;
}

export interface AnalysisResult {
  summary: string;
  insights: Insight[];
  charts: ChartConfig[];
}
