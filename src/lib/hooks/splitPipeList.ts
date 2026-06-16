export function splitPipeList(text: string): string[] {
  return text.split("|").filter(Boolean);
}
