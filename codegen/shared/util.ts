/**
 * Converts HTML/CloudFormation description text to a clean single-line description.
 * Handles <br> tags, CF-style markdown formatting, and collapses to single line.
 */
export function htmlToMarkdown(
  text: string | null | undefined,
): string | null {
  if (!text) return text ?? null;

  // Replace <br>, <br/>, <br /> with spaces
  let result = text.replace(/<br\s*\/?>/gi, " ");

  // Replace CF-style double backticks ``foo`` with just the text, preserving word boundaries
  result = result.replace(/``([^`]+)``/g, " $1 ");

  // Remove CF-style list markers like "\n  +  " or "\n + "
  result = result.replace(/\n\s*\+\s*/g, " ");

  // Collapse all newlines and surrounding whitespace to single space
  result = result.replace(/\s*\n\s*/g, " ");

  // Collapse multiple spaces
  result = result.replace(/\s{2,}/g, " ");

  // Remove space before punctuation
  result = result.replace(/\s+([.,;:!?)])/g, "$1");

  // Remove HTML tags
  result = result.replace(/<[^>]+>/g, "");

  // Trim
  result = result.trim();

  return result;
}

/**
 * Converts a PCRE pattern from the CloudFormation schema into a JS RegExp.
 * Not exhaustive — designed for the patterns in published AWS CF schemas.
 *
 * Generated models compile the result at import time, so a pattern JS rejects
 * makes the whole module unimportable. The result is compiled here first: one
 * that only compiles with the u flag (astral ranges written as literal
 * characters or surrogate pairs) gains it, and one that never compiles is
 * skipped.
 */
export function pcreToRegexp(
  pattern: string,
): { pattern: string; flags: string } | undefined {
  const converted = pattern in BROKEN_REGEXES
    ? BROKEN_REGEXES[pattern]
    : translatePcre(pattern);
  if (!converted) return undefined;
  if (compiles(converted.pattern, converted.flags)) return converted;
  if (
    !converted.flags.includes("u") &&
    compiles(converted.pattern, converted.flags + "u")
  ) {
    return { pattern: converted.pattern, flags: converted.flags + "u" };
  }
  return undefined;
}

function compiles(pattern: string, flags: string): boolean {
  try {
    new RegExp(pattern, flags);
    return true;
  } catch {
    return false;
  }
}

function translatePcre(
  pattern: string,
): { pattern: string; flags: string } | undefined {
  let flags = "";
  const matchFlags = pattern.match(/^\(\?([ims]+)\)/);
  if (matchFlags) {
    flags += matchFlags[1];
    pattern = pattern.slice(matchFlags[0].length);
  }

  const replacements: { start: number; end: number; replacement: string }[] =
    [];

  for (let index = 0; index < pattern.length; index++) {
    switch (pattern[index]) {
      case "(":
        if (pattern[index + 1] === "?") {
          switch (pattern[index + 2]) {
            case ":":
            case "=":
            case "!":
            case "<":
              break;
            case "-":
              if (pattern.slice(index).startsWith("(?-s:.*)")) {
                replacements.push({
                  start: index,
                  end: index + "(?-s:.*)".length,
                  replacement: "[^\\r\\n]*",
                });
                index += "(?-s:.*)".length - 1;
              } else {
                // Unsupported subpattern — skip this regex
                return undefined;
              }
              break;
            default:
              // Unsupported subpattern — skip
              return undefined;
          }
        }
        break;
      case "\\":
        switch (pattern[index + 1]) {
          case "A":
            replacements.push({
              start: index,
              end: index + 2,
              replacement: "^",
            });
            break;
          case "Z":
            replacements.push({
              start: index,
              end: index + 2,
              replacement: "$",
            });
            break;
          case "p":
            if (!flags.includes("u")) flags += "u";
            break;
        }
        index++;
        break;
      case "[":
        index++; // skip opening [
        while (index < pattern.length && pattern[index] !== "]") {
          if (pattern[index] === "\\" && index + 1 < pattern.length) {
            switch (pattern[index + 1]) {
              case "p":
                if (!flags.includes("u")) flags += "u";
                break;
            }
            index++; // skip escaped char
          }
          index++;
        }
        break;
    }
  }

  // Apply replacements in reverse order
  while (replacements.length > 0) {
    const { start, end, replacement } = replacements.pop()!;
    pattern = pattern.substring(0, start) + replacement +
      pattern.substring(end);
  }

  return { pattern, flags: flags === "" ? "" : flags };
}

const BROKEN_REGEXES: Record<
  string,
  { pattern: string; flags: string } | undefined
> = {
  "^[a-zA-Z-0-9-:\\/]*{1,1000}$": {
    pattern: "^[a-zA-Z-0-9-:\\/]{1,1000}$",
    flags: "",
  },
  "^[a-zA-Z-0-9-:\\/.]*{1,1000}$": {
    pattern: "^[a-zA-Z-0-9-:\\/.]{1,1000}$",
    flags: "",
  },
  "[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\t]*": {
    pattern: "[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDFFF\t]*",
    flags: "",
  },
  "[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\t]*": {
    pattern: "[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDFFF\\t]*",
    flags: "",
  },
  "^(?! )[\\p{L}\\p{N}\\p{Z}-_]*(?<! )$": {
    pattern: "^(?! )[\\p{L}\\p{N}\\p{Z}\\-_]*(?<! )$",
    flags: "u",
  },
  "^(?!(?i)aws)[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$": {
    pattern: "^(?!aws)[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
    flags: "i",
  },
  // Doesn't compile
  "[ -퟿-�𐀀-􏿿\r\n\t]*": undefined,
  "[\\p{Graph}\\x20]*": undefined,
};
