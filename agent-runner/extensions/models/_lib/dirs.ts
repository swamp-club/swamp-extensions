import { resolve } from "jsr:@std/path@1.1.4";

/**
 * Resolves a directory the agent works in or is given access to. A relative
 * path is resolved against the swamp repo. The directory must exist, so a
 * typo fails before anything is downloaded or run.
 */
export async function resolveDir(
  path: string,
  repoDir: string,
  label: string,
): Promise<string> {
  const absolute = resolve(repoDir, path);
  let info: Deno.FileInfo;
  try {
    info = await Deno.stat(absolute);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new Error(
        `${label} '${path}' does not exist (resolved to ${absolute})`,
      );
    }
    throw error;
  }
  if (!info.isDirectory) {
    throw new Error(
      `${label} '${path}' is not a directory (resolved to ${absolute})`,
    );
  }
  return absolute;
}

/** Resolves each of the directories as resolveDir does. */
export async function resolveDirs(
  paths: readonly string[],
  repoDir: string,
  label: string,
): Promise<string[]> {
  const resolved: string[] = [];
  for (const path of paths) {
    resolved.push(await resolveDir(path, repoDir, label));
  }
  return resolved;
}
