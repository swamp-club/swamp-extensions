/**
 * Wording the agent CLIs use when a run stops because the account or the API
 * is out of capacity, rather than because the work failed: a subscription
 * usage limit, an API rate limit (HTTP 429), or an overloaded API (HTTP 529).
 * Only checked against output from a run that errored, so a successful reply
 * that merely talks about rate limits is never flagged.
 */
const CAPACITY_PATTERNS: readonly RegExp[] = [
  /usage limit/i,
  /rate[ _-]?limit/i,
  /hit your (?:usage )?limit/i,
  /(?:5-hour|weekly|session) limit/i,
  /too many requests/i,
  /overloaded/i,
  /api error:\s*(?:429|529)\b/i,
  /status:?\s*(?:429|529)\b/i,
];

/** Whether an error message says the run stopped on a capacity limit. */
export function isCapacityMessage(text: string): boolean {
  return CAPACITY_PATTERNS.some((pattern) => pattern.test(text));
}
