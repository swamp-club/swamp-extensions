/**
 * Redaction and call text for agent session records. A record never holds
 * transcript content: a call's text is only its target (a command line, a
 * path, a skill name or a URL), chosen per tool by an allowlist, then
 * redacted and capped. The rules follow the agent observation prototype's
 * `redact()`, generalised off its author's machine.
 *
 * @module
 */

import { actionTarget, type CallAction } from "./classify/action.ts";
import { AGENT_SESSION_LIMITS } from "./contract/session_record.ts";

/** Where a session ran, so its paths can be made relative or masked. */
export interface RedactContext {
  /** The session's working directory; paths under it become relative. */
  readonly cwd: string;
  /** The user's home directory; it becomes `~`. */
  readonly home?: string;
  /** The harnesses' transcript roots; paths under them become `$HARNESS_LOGS/…`. */
  readonly logDirs?: readonly string[];
}

const REDACTED = "‹redacted›";

// A heredoc and its body, as the prototype's strip_heredocs matches it: the
// body is file content, so only the marker and the rest of its line stay. An
// empty body matches too. `<<<` is a here-string, not a heredoc.
// A shift inside shell arithmetic, $((1<<n)), is not a heredoc.
const HEREDOC =
  /(?<!<|\$\(\([^)\n]*)<<(?!<)-?\s*['"]?([A-Za-z_]\w*)['"]?([^\n]*)\n(?:.*?\n)?[ \t]*\1[ \t]*(?=\n|$)/gs;

// A heredoc left without its terminator (an interrupted command): its body
// runs to the end, so everything after its line is dropped.
const OPEN_HEREDOC =
  /(?<!<|\$\(\([^)\n]*)<<(?!<|EOF …)-?\s*['"]?([A-Za-z_]\w*)['"]?([^\n]*)\n[\s\S]*$/;

// The harness's per-session scratch folder, e.g.
// /tmp/nix-shell.ABC/claude-1000/<project>/<session>/scratchpad/x.txt.
const SCRATCH =
  /(?:\/tmp|\/var\/folders\/[^\s'"]+?)\/(?:[\w.-]+\/)?claude-\d+\/[^\s'"]+/g;

// A 40-hex string is shortened where it reads as a git SHA (a git command,
// a ref after @ or #, a /commit/ URL, sha1:); elsewhere it may be a key, and
// is redacted. A 64-hex string is shortened only as a sha256 digest. A longer
// hex run (a URL signature) is always redacted.
const SHA1_HEX = /\b[0-9a-f]{40}\b/g;
const SHA_CONTEXT = /(?:^|[\s;&|(])(?:git|gh|jj)\s/;
const SHA_PREFIX = /(?:[@#]|\/commits?\/|sha1:|\.\.)$/;
const SHA256_HEX = /(sha256:)?\b([0-9a-f]{64})\b/gi;
const LONG_HEX = /\b[0-9a-f]{65,}\b/gi;

// A secret's value: a quoted string or one word.
const VALUE = `(?:'[^']*'|"[^"]*"|[^\\s'"]+)`;

// An HTTP credential in a header or after a scheme name.
const AUTH_HEADER =
  /\b(authorization:\s*|proxy-authorization:\s*)(bearer|basic|token|digest)?\s*[^\s'"]+/gi;
const BEARER = /\bbearer\s+[A-Za-z0-9._~+/=-]{8,}/gi;

// Any other header whose name says it carries a secret: X-Api-Key: …,
// PRIVATE-TOKEN: …, x-goog-api-key: ….
const KEY_HEADER =
  /\b([\w-]*(?:api-?key|token|secret|password|session|x-auth)[\w-]*:\s*)[^\s'"]+/gi;

// A cookie header's whole value, which is a list: Cookie: a=1; b=2.
const COOKIE_HEADER = /\b((?:set-)?cookie:\s*)[^'"\n]+/gi;

// A secret in a JSON body, quoted or with escaped quotes inside a shell
// string: -d '{"password":"x"}', -d "{\"token\": \"x\"}".
const JSON_SECRET =
  /("(?:[\w-]*(?:password|passwd|token|secret|api_?key|apikey|access_?key|private_?key|cookie)[\w-]*)"\s*:\s*)"(?:[^"\\]|\\.)*"/gi;
const ESCAPED_JSON_SECRET =
  /(\\"(?:[\w-]*(?:password|passwd|token|secret|api_?key|apikey|access_?key|private_?key|cookie)[\w-]*)\\"\s*:\s*)\\"(?:[^"\\]|\\[^"])*\\"/gi;

// curl's cookie flag: -b 'session=x', --cookie x.
const CURL_COOKIE =
  /(\bcurl\b[^\n|;&]*?\s(?:-b|--cookie)(?:\s+|=))(?:'[^']*'|"[^"]*"|[^\s'"]+)/g;

// A secret passed as a flag's value, quoted or not, including flags that
// only end in a secret's name: --password x, --client-secret 'x', --db-password=x.
const SECRET_FLAG = new RegExp(
  `((?:^|\\s)--?(?:[A-Za-z0-9]+[-_])*(?:password|passwd|token|secret|api-?key|access-?key|private-?key))(\\s+|=)(?![-<])${VALUE}`,
  "gi",
);

// An assignment to a secret-named variable, quoted or not:
// DB_PASSWORD="correct horse", -e POSTGRES_PASSWORD='two words', AUTH=x.
const KEY_VALUE = new RegExp(
  `(token|secret|passwd|password|pass|credentials?|auth|key|signature|sig)=${VALUE}`,
  "gi",
);

// curl and friends: -u user:password, --user=user:password.
const USER_PASS =
  /((?:^|\s)(?:-u|--user)(?:\s+|=))(['"]?)([^\s:'"]+):[^\s'"]+\2/g;

// A password in a URL: postgres://admin:hunter2@host/db.
// It runs to the last @ of the URL, so a password holding / or @ is masked
// whole.
const URL_PASSWORD = /\b([a-z][a-z0-9+.-]*:\/\/[^\s:/@'"]+:)[^\s'"]*@/gi;

// A here-string feeds its word to stdin, often a token: gh auth login <<< ghp_…
const HERE_STRING = /<<<\s*(?:'[^']*'|"[^"]*"|\S+)/g;

// A password glued to -p, or after it: mysql -psecret, docker login -p x,
// sshpass -p x.
const DASH_P_PASSWORD = new RegExp(
  `(\\b(?:mysql|mysqldump|mysqladmin|mariadb|sshpass|login)\\b[^\\n|;&]*?\\s-p)(\\s*)(?!-)${VALUE}`,
  "g",
);

// Secrets given as a positional value: aws configure set aws_secret_access_key
// x, npm config set //host/:_authToken x, gh secret set NAME --body x, and
// every key=value of vault kv put or vault write.
const CONFIG_SET = new RegExp(
  `(\\b(?:configure|config)\\s+set\\s+[^\\s=]*(?:secret|password|passwd|token|key)[^\\s=]*\\s+)(?![-<])${VALUE}`,
  "gi",
);
const GH_SECRET_BODY = new RegExp(
  `(\\bsecret\\s+set\\s+\\S+\\s+(?:--body|-b)(?:\\s+|=))${VALUE}`,
  "g",
);
const VAULT_WRITE = /\bvault\s+(?:kv\s+put|kv\s+patch|write)\b[^\n|;&]*/g;
const VAULT_PAIR = new RegExp(`(\\s[\\w.-]+=)(?!@)${VALUE}`, "g");

// Well-known provider token shapes, wherever they appear.
const PROVIDER_TOKEN =
  /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-ant-[A-Za-z0-9_-]{10,}|sk-[A-Za-z0-9_-]{20,}|xox[abposr]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|glpat-[A-Za-z0-9_-]{20,})/g;

// A path ends where no file-name character follows, so <cwd>-two or
// /home/alicebob is not the cwd or the home it starts with.
const PATH_END = "(?![\\w.-])";

// The domain must start with a letter and end in a letter TLD, so a versioned
// specifier such as zod@4.6.7 or @std/path@1.1.4 is not an email.
const EMAIL = /[\w.+-]+@[A-Za-z][\w-]*(?:\.[\w-]+)*\.[A-Za-z]{2,}\b/g;

// A login at an IP address (ssh user@10.0.2.2), which names a local user as
// an email names a person.
const USER_AT_IP = /[\w.+-]+@(?:\d{1,3}\.){3}\d{1,3}\b/g;

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function trimSlash(p: string): string {
  return p.length > 1 ? p.replace(/[\\/]+$/, "") : p;
}

/** Replaces heredoc bodies with `<<EOF … EOF`, keeping the rest of the line. */
export function stripHeredocs(text: string): string {
  return text
    .replace(HEREDOC, (_m, _tag, rest) => `<<EOF … EOF${rest}`)
    .replace(OPEN_HEREDOC, (_m, _tag, rest) => `<<EOF …${rest}`);
}

/** Applies every redaction rule to one piece of call text. */
export function redact(text: string, ctx: RedactContext): string {
  let s = text;
  // The harness's own folders first: they can sit under the cwd or home.
  s = s.replace(SCRATCH, () => "$SCRATCH");
  for (const dir of ctx.logDirs ?? []) {
    const root = trimSlash(dir);
    if (root.length <= 1) continue;
    s = s.replace(
      new RegExp(`${escapeRegExp(root)}(?:/[^\\s'"]*)?`, "g"),
      () => "$HARNESS_LOGS/…",
    );
  }
  s = s.replace(
    /~\/(?:\.claude\/projects|\.codex\/sessions)\/[^\s'"]+/g,
    () => "$HARNESS_LOGS/…",
  );
  const cwd = trimSlash(ctx.cwd);
  if (cwd.length > 1) {
    // Only at a path boundary, so a sibling such as <cwd>-two is left alone.
    s = s.replace(
      new RegExp(`${escapeRegExp(cwd)}(?:/|${PATH_END})`, "g"),
      (m) => m.endsWith("/") ? "" : ".",
    );
  }
  if (ctx.home && trimSlash(ctx.home).length > 1) {
    s = s.replace(
      new RegExp(
        `${escapeRegExp(trimSlash(ctx.home))}(?:(?=/)|${PATH_END})`,
        "g",
      ),
      () => "~",
    );
  }
  const gitLine = SHA_CONTEXT.test(s);
  s = s.replace(
    SHA1_HEX,
    (m, offset: number, whole: string) =>
      gitLine || SHA_PREFIX.test(whole.slice(Math.max(0, offset - 8), offset))
        ? m.slice(0, 10)
        : REDACTED,
  );
  s = s.replace(LONG_HEX, () => REDACTED);
  s = s.replace(
    SHA256_HEX,
    (_m, digest, hex) => digest ? `${digest}${hex.slice(0, 10)}` : REDACTED,
  );
  s = s.replace(
    AUTH_HEADER,
    (_m, header, scheme) => `${header}${scheme ? `${scheme} ` : ""}${REDACTED}`,
  );
  s = s.replace(BEARER, `Bearer ${REDACTED}`);
  s = s.replace(COOKIE_HEADER, (_m, header) => `${header}${REDACTED}`);
  s = s.replace(KEY_HEADER, (_m, header) => `${header}${REDACTED}`);
  s = s.replace(JSON_SECRET, (_m, key) => `${key}"${REDACTED}"`);
  s = s.replace(ESCAPED_JSON_SECRET, (_m, key) => `${key}\\"${REDACTED}\\"`);
  s = s.replace(CURL_COOKIE, (_m, flag) => `${flag}${REDACTED}`);
  s = s.replace(HERE_STRING, () => `<<< ${REDACTED}`);
  s = s.replace(SECRET_FLAG, (_m, flag, sep) => `${flag}${sep}${REDACTED}`);
  s = s.replace(
    USER_PASS,
    (_m, flag, quote, user) => `${flag}${quote}${user}:${REDACTED}${quote}`,
  );
  s = s.replace(URL_PASSWORD, (_m, before) => `${before}${REDACTED}@`);
  s = s.replace(CONFIG_SET, (_m, before) => `${before}${REDACTED}`);
  s = s.replace(GH_SECRET_BODY, (_m, before) => `${before}${REDACTED}`);
  s = s.replace(
    VAULT_WRITE,
    (m) => m.replace(VAULT_PAIR, (_p, key) => `${key}${REDACTED}`),
  );
  s = s.replace(DASH_P_PASSWORD, (_m, flag, sep) => `${flag}${sep}${REDACTED}`);
  s = s.replace(PROVIDER_TOKEN, () => REDACTED);
  s = s.replace(KEY_VALUE, (_m, key) => `${key}=${REDACTED}`);
  s = s.replace(EMAIL, "‹email›");
  s = s.replace(USER_AT_IP, "‹email›");
  return s;
}

/** A call's stored text, cut to the record's cap. */
export interface CallText {
  readonly text: string;
  readonly truncated?: true;
}

/** Cuts text to the record's 1000-character cap, marking it when it was cut. */
export function capText(text: string): CallText {
  const max = AGENT_SESSION_LIMITS.textLength;
  if (text.length <= max) return { text };
  let cut = text.slice(0, max - 1);
  // Never leave half a surrogate pair at the cut.
  const last = cut.charCodeAt(cut.length - 1);
  if (last >= 0xd800 && last <= 0xdbff) cut = cut.slice(0, -1);
  return { text: `${cut}…`, truncated: true };
}

// Every regex runs on a bounded prefix, so a call holding a huge blob (a
// minified one-liner, an inline hex dump, a giant heredoc) cannot make them
// slow. Heredocs are stripped from a larger prefix, since their bodies are
// what is dropped; redaction then reads a smaller one, with room over the
// stored cap for paths that redaction shortens.
const HEREDOC_INPUT_LIMIT = AGENT_SESSION_LIMITS.textLength * 16;
const REDACT_INPUT_LIMIT = AGENT_SESSION_LIMITS.textLength * 4;

/**
 * Cuts text to a limit, dropping a short word the cut splits, so no partial
 * token too short for the token rules to recognise stays. A cut through a
 * long blob keeps the blob's start.
 */
function cutAt(text: string, limit: number): string {
  return text.length > limit
    ? text.slice(0, limit).replace(/(^|\s)\S{1,200}$/, "$1")
    : text;
}

// Free text a command line carries: a commit message, a PR body, an inline
// script, what `echo` writes. Per program, the flags whose quoted value is
// text, not a target; `*` means every quoted argument.
const TEXT_FLAGS: ReadonlyMap<RegExp, ReadonlySet<string>> = new Map([
  [/^git$/, new Set(["-m", "--message"])],
  [/^gh$/, new Set(["--body", "-b", "--title", "-t", "--notes", "-n"])],
  [/^python(\d+(\.\d+)?)?$/, new Set(["-c"])],
  [/^node$/, new Set(["-e", "--eval", "-p", "--print"])],
  [/^deno$/, new Set(["eval"])],
  [/^ruby$/, new Set(["-e"])],
  [/^perl$/, new Set(["-e", "-E"])],
  [/^(echo|printf)$/, new Set(["*"])],
]);
// Words that run the next word as the program, and shell keywords that can
// stand before it (`then echo "x"`, `{ git commit -m 'x'; }`).
const WRAPPERS = new Set([
  "sudo",
  "env",
  "time",
  "nohup",
  "command",
  "exec",
  "nice",
  "timeout",
]);
const KEYWORDS = new Set([
  "if",
  "then",
  "else",
  "elif",
  "do",
  "while",
  "until",
  "{",
  "!",
]);
// Wrapper options that take the next word as their value (`sudo -u root`).
const WRAPPER_VALUE_OPTIONS: ReadonlyMap<string, ReadonlySet<string>> = new Map(
  [
    [
      "sudo",
      new Set(["-u", "-g", "-C", "-D", "-h", "-p", "-r", "-t", "-U", "-T"]),
    ],
    ["env", new Set(["-u", "-C", "-S", "--unset", "--chdir"])],
    ["nice", new Set(["-n"])],
    ["timeout", new Set(["-s", "-k", "--signal", "--kill-after"])],
  ],
);
const ASSIGNMENT = /^[A-Za-z_][A-Za-z0-9_]*=/;
const REDIRECT = /^(\d*[<>]{1,2}|&>{1,2})$/;
const SHORT_CLUSTER = /^-[A-Za-z]+$/;

function textFlagsOf(program: string): ReadonlySet<string> | undefined {
  const name = program.replace(/^.*[\\/]/, "").replace(/\.exe$/i, "");
  for (const [re, flags] of TEXT_FLAGS) if (re.test(name)) return flags;
  return undefined;
}

/** Whether `flag` (a word, or a word's start glued to a quote) names text. */
function isTextFlag(flags: ReadonlySet<string>, flag: string): boolean {
  if (flags.has(flag.replace(/=$/, ""))) return true;
  // A short-option cluster ending in a text flag: `-am`, `-qam`, `-m'x'`.
  return SHORT_CLUSTER.test(flag) && flags.has(`-${flag.at(-1)}`);
}

/** One simple command's scan state; a subshell or `$(…)` has its own. */
interface CommandState {
  words: string[];
  word: string;
  flags: ReadonlySet<string> | undefined;
  programSeen: boolean;
  // The wrapper last read, the words its options still take, and whether
  // timeout's duration is still to come.
  wrapper: string;
  wrapperValues: number;
  afterTimeout: boolean;
  // Where the current word's elided text starts in the output, and its length.
  textStart: number;
  textLen: number;
}

function freshCommand(): CommandState {
  return {
    words: [],
    word: "",
    flags: undefined,
    programSeen: false,
    wrapper: "",
    wrapperValues: 0,
    afterTimeout: false,
    textStart: -1,
    textLen: 0,
  };
}

/**
 * Replaces the quoted free text of a shell command line (see `TEXT_FLAGS`)
 * with its length, so a record keeps that text was there but not what it
 * said. Once part of a word is text, the rest of that word is too, so a
 * message written `'it'\''s'` is dropped whole. Comments are free text as
 * well. A quoted string may span lines; one left open runs to the end of the
 * text, so an unbalanced quote is dropped rather than kept. Unquoted words,
 * redirect targets and the commands of `sh -c` are kept: they are targets.
 */
export function elideQuotedText(text: string): string {
  let out = "";
  let i = 0;
  const stack: CommandState[] = [];
  let st = freshCommand();
  const placeholder = (n: number) => `‹text, ${n} chars›`;
  // Adds `n` characters of text to the current word's elided run.
  const addText = (n: number) => {
    if (st.textStart < 0) {
      st.textStart = out.length;
      st.textLen = n;
    } else {
      out = out.slice(0, st.textStart);
      st.textLen += n;
    }
    out += placeholder(st.textLen);
    st.word += "‹text›";
  };
  const endWord = () => {
    st.textStart = -1;
    const w = st.word;
    st.word = "";
    if (w === "") return;
    st.words.push(w);
    if (st.programSeen) return;
    if (st.wrapperValues > 0) {
      st.wrapperValues--;
      return;
    }
    if (ASSIGNMENT.test(w) || KEYWORDS.has(w)) return;
    if (WRAPPERS.has(w)) {
      st.wrapper = w;
      st.afterTimeout = w === "timeout";
      return;
    }
    if (w.startsWith("-") && st.wrapper !== "") {
      if (WRAPPER_VALUE_OPTIONS.get(st.wrapper)?.has(w)) st.wrapperValues = 1;
      return;
    }
    if (st.afterTimeout) {
      // timeout's duration.
      st.afterTimeout = false;
      return;
    }
    st.programSeen = true;
    st.flags = textFlagsOf(w);
  };
  const endCommand = () => {
    endWord();
    st = freshCommand();
  };
  // Whether a quote starting now is free text: an argument of echo, or the
  // value of a text flag (`-m 'x'`, `--body='x'`, `-m'x'`), never a
  // redirect's target.
  const isText = (): boolean => {
    if (st.textStart >= 0) return true;
    if (st.flags === undefined || !st.programSeen) return false;
    if (/[<>]$/.test(st.word)) return false;
    const prev = st.words.at(-1) ?? "";
    if (st.word === "" && REDIRECT.test(prev)) return false;
    if (st.flags.has("*")) return true;
    return isTextFlag(st.flags, st.word === "" ? prev : st.word);
  };
  while (i < text.length) {
    const c = text[i];
    const ansi = c === "$" && text[i + 1] === "'";
    if (c === "'" || c === '"' || ansi) {
      const quote = ansi ? "'" : c;
      let j = i + (ansi ? 2 : 1);
      while (j < text.length && text[j] !== quote) {
        if (text[j] === "\\" && (quote === '"' || ansi)) j++;
        j++;
      }
      const closed = j < text.length && text[j] === quote;
      const body = text.slice(i + (ansi ? 2 : 1), Math.min(j, text.length));
      const end = closed ? j + 1 : text.length;
      if (isText()) addText(body.length);
      else {
        out += text.slice(i, end);
        st.word += text.slice(i, end);
      }
      i = end;
      continue;
    }
    if (c === "\\" && i + 1 < text.length) {
      if (st.textStart >= 0) addText(1);
      else {
        out += text.slice(i, i + 2);
        st.word += text.slice(i, i + 2);
      }
      i += 2;
      continue;
    }
    // A comment is free text to the end of its line.
    if (c === "#" && st.word === "") {
      endWord();
      let j = i + 1;
      while (j < text.length && text[j] !== "\n") j++;
      out += j > i + 1 ? `#${placeholder(j - i - 1)}` : "#";
      i = j;
      continue;
    }
    // `&` in a redirection (`2>&1`, `>&2`, `&>f`) is part of the word.
    const redirectAmp = c === "&" &&
      (/[<>]$/.test(st.word) || text[i + 1] === ">");
    if (c === " " || c === "\t") endWord();
    else if (c === "(") {
      endWord();
      stack.push(st);
      st = freshCommand();
    } else if (c === ")") {
      endWord();
      st = stack.pop() ?? freshCommand();
      st.textStart = -1;
    } else if (";|&\n`".includes(c) && !redirectAmp) endCommand();
    else if (st.textStart >= 0) {
      // Unquoted text glued to an elided part of the same word.
      addText(1);
      i++;
      continue;
    } else st.word += c;
    out += c;
    i++;
  }
  return out;
}

/** A call's stored text: its allowed target, redacted and capped. */
export function callText(action: CallAction, ctx: RedactContext): CallText {
  const target = actionTarget(action);
  let cut = target.length > HEREDOC_INPUT_LIMIT;
  let text = cutAt(target, HEREDOC_INPUT_LIMIT);
  if (action.kind === "shell") text = elideQuotedText(stripHeredocs(text));
  cut ||= text.length > REDACT_INPUT_LIMIT;
  text = cutAt(text, REDACT_INPUT_LIMIT);
  const capped = capText(redact(text, ctx));
  return cut && !capped.truncated
    ? { text: capped.text, truncated: true }
    : capped;
}
