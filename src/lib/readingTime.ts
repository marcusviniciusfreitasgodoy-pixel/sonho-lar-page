export function readingTimeMinutes(text: string | null | undefined): number {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function readingTimeLabel(text: string | null | undefined): string {
  return `Leitura de ${readingTimeMinutes(text)} min`;
}
