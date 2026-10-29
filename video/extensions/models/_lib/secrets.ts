// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Things that look like credentials in OCR'd screen text, from Adam's
 * swamp-video prototype. OCR misreads a character now and then, so the
 * patterns stay loose: a false positive costs a blurred word, a miss leaks a
 * key.
 *
 * @module
 */

const SECRET_PATTERNS: [string, RegExp][] = [
  ["aws-key", /\b(AKIA|ASIA)[A-Z0-9]{16}\b/],
  ["github-token", /\b(gh[pousr]_[A-Za-z0-9]{30,}|github_pat_\w{30,})/],
  ["api-key", /\bsk-\S{20,}/],
  ["slack-token", /\bxox[abprs]-[A-Za-z0-9-]{10,}/],
  ["google-key", /\bAIza[0-9A-Za-z_-]{30,}/],
  ["jwt", /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/],
];
const SECRET_ASSIGNMENT =
  /(api[_-]?key|token|secret|passw(or)?d|private[_-]?key)["']?\s*[:=]/i;

/** The kind of secret a word looks like, or undefined. */
export function secretKind(
  word: string,
  line: string,
  allow: string[] = [],
): string | undefined {
  if (allow.some((a) => a && word.includes(a))) return undefined;
  for (const [kind, pattern] of SECRET_PATTERNS) {
    if (pattern.test(word)) return kind;
  }
  // Long mixed-case-and-digit strings are likely keys; plain hex (commit
  // hashes) and UUIDs are not.
  const bare = word.replace(/^["'`(]+|["'`),;.]+$/g, "");
  if (
    bare.length >= 32 && /^[A-Za-z0-9+/_=-]+$/.test(bare) &&
    /[a-z]/.test(bare) && /[A-Z]/.test(bare) && /\d/.test(bare)
  ) {
    return "high-entropy";
  }
  // KEY=value in one word, or the value after "token:" on the same line.
  const assigned = word.match(SECRET_ASSIGNMENT);
  if (assigned) {
    const value = word.slice(assigned.index! + assigned[0].length);
    if (value.replace(/["'`]/g, "").length >= 8) return "assigned-secret";
  } else if (
    bare.length >= 8 && SECRET_ASSIGNMENT.test(line) &&
    line.indexOf(word) > line.search(SECRET_ASSIGNMENT)
  ) {
    return "assigned-secret";
  }
  return undefined;
}
