import * as windows from "jsr:@std/path@1.1.4/windows";

/**
 * The platform rules every worktree and local-remote path goes through. git
 * for Windows prints `C:/...` while Deno returns `C:\...`, and NTFS ignores
 * case, so on Windows both sides of a comparison are reduced to one key.
 */
export interface PathFlavor {
  windows: boolean;
  /** The directory relative paths resolve against. */
  cwd(): string;
  /** Symlink-resolved form of an existing path; throws when it is absent. */
  realPath(path: string): string;
}

/** `\\?\C:\x` → `C:\x`, `\\?\UNC\server\share` → `\\server\share`. */
function stripVerbatim(path: string): string {
  if (path.startsWith("\\\\?\\UNC\\")) return `\\\\${path.slice(8)}`;
  if (path.startsWith("\\\\?\\")) return path.slice(4);
  return path;
}

function hostFlavor(): PathFlavor {
  const isWindows = Deno.build.os === "windows";
  return {
    windows: isWindows,
    cwd: () => Deno.cwd(),
    realPath: isWindows
      ? (path) => stripVerbatim(Deno.realPathSync(path))
      : (path) => Deno.realPathSync(path),
  };
}

let flavor: PathFlavor = hostFlavor();

/** Replaces the platform rules — tests use it to run Windows paths anywhere. */
export function setPathFlavor(next: PathFlavor): void {
  flavor = next;
}

export function resetPathFlavor(): void {
  flavor = hostFlavor();
}

export function isWindows(): boolean {
  return flavor.windows;
}

export function currentDir(): string {
  return flavor.cwd();
}

/**
 * `path` made absolute against `base`. On POSIX the path is otherwise left
 * as written, so a `..` is still resolved by the kernel; on Windows `C:/x`,
 * `C:\x` and drive-less `\x` are all absolute and come back in `C:\x` form.
 */
export function absolutePath(path: string, base: string): string {
  if (flavor.windows) return windows.resolve(base, path);
  return path.startsWith("/") ? path : `${base}/${path}`;
}

export function realPathOrSelf(path: string): string {
  try {
    return flavor.realPath(path);
  } catch {
    return path;
  }
}

/** Resolves `.` and `..` segments and repeated separators. */
function normaliseSegments(path: string): string[] {
  const parts: string[] = [];
  for (const part of path.split(flavor.windows ? /[\\/]/ : "/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return parts;
}

/**
 * Absolute, symlink-resolved form of `path`, even when it does not exist yet:
 * the nearest existing ancestor is resolved and the missing tail re-appended.
 * git lists worktrees symlink-resolved (macOS /tmp is /private/tmp), so every
 * worktree path comparison goes through this on both sides.
 */
export function canonicalPath(path: string, base: string): string {
  const sep = flavor.windows ? "\\" : "/";
  const absolute = absolutePath(path, base);
  const root = flavor.windows ? windows.parse(absolute).root : "/";
  const parts = normaliseSegments(absolute.slice(root.length));
  for (let i = parts.length; i >= 0; i--) {
    let real: string;
    try {
      real = flavor.realPath(`${root}${parts.slice(0, i).join(sep)}`);
    } catch {
      continue;
    }
    const tail = parts.slice(i);
    if (tail.length === 0) return real;
    return `${real.endsWith(sep) ? real : real + sep}${tail.join(sep)}`;
  }
  return `${root}${parts.join(sep)}`;
}

/** What two paths are compared by: case and separator folded on Windows. */
export function pathKey(path: string): string {
  if (!flavor.windows) return path;
  return windows.normalize(stripVerbatim(path).replaceAll("/", "\\"))
    .toLowerCase();
}

export function samePath(a: string, b: string): boolean {
  return pathKey(a) === pathKey(b);
}

/** True when `child` is strictly inside `parent` (both canonical). */
export function isWithin(child: string, parent: string): boolean {
  const c = pathKey(child);
  const p = pathKey(parent);
  if (c === p) return false;
  const sep = flavor.windows ? "\\" : "/";
  return c.startsWith(p.endsWith(sep) ? p : `${p}${sep}`);
}

/** A `file://` URL as a Windows path: `file:///C:/x` → `C:\x`. */
export function windowsFileUrlPath(url: string): string {
  // A malformed percent escape is kept as-is, as decodePath does on POSIX.
  return windows.fromFileUrl(url.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
