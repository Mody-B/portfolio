/** Simulate token streaming without a network/API. */
export async function streamText(
  text: string,
  onChunk: (full: string) => void,
  opts?: { signal?: AbortSignal; msPerChar?: number }
): Promise<string> {
  const ms = opts?.msPerChar ?? 12;
  let full = "";
  for (const ch of text) {
    if (opts?.signal?.aborted) break;
    full += ch;
    onChunk(full);
    await new Promise((r) => setTimeout(r, ms));
  }
  return full;
}

export function matchChatReply(
  question: string,
  pairs: { triggers: string[]; answer: string }[],
  fallback: string
): string {
  const q = question.toLowerCase();
  for (const pair of pairs) {
    if (pair.triggers.some((t) => q.includes(t))) return pair.answer;
  }
  return fallback;
}
