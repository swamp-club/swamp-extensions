import { assertEquals } from "jsr:@std/assert@1.0.19";
import {
  absolutePath,
  canonicalPath,
  isWithin,
  type PathFlavor,
  resetPathFlavor,
  samePath,
  setPathFlavor,
} from "./paths.ts";

/**
 * A flavor whose filesystem is `existing`: each key (as given) resolves to
 * its value, anything else is absent. Windows lookups ignore case, as NTFS
 * does.
 */
function fakeFlavor(
  windows: boolean,
  cwd: string,
  existing: Record<string, string>,
): PathFlavor {
  const fold = (p: string) => windows ? p.toLowerCase() : p;
  const table = new Map(
    Object.entries(existing).map(([k, v]) => [fold(k), v]),
  );
  return {
    windows,
    cwd: () => cwd,
    realPath: (path) => {
      const hit = table.get(fold(path));
      if (hit === undefined) throw new Deno.errors.NotFound(path);
      return hit;
    },
  };
}

function withFlavor(flavor: PathFlavor, fn: () => void): void {
  setPathFlavor(flavor);
  try {
    fn();
  } finally {
    resetPathFlavor();
  }
}

// The reporter's layout: cwd C:\repos\factory, worktrees under work\.
const FACTORY = {
  "C:\\": "C:\\",
  "C:\\repos": "C:\\repos",
  "C:\\repos\\factory": "C:\\repos\\factory",
};
const CWD = "C:\\repos\\factory";

Deno.test("windows: drive-letter, drive-less, and relative paths resolve to the requested location", () => {
  withFlavor(fakeFlavor(true, CWD, FACTORY), () => {
    for (
      const input of [
        "C:/repos/factory/work/ITEM",
        "C:\\repos\\factory\\work\\ITEM",
        "/repos/factory/work/ITEM",
        "work/ITEM",
        "work\\ITEM",
        "C:/repos/factory/work/./x/../ITEM",
      ]
    ) {
      assertEquals(
        canonicalPath(input, CWD),
        "C:\\repos\\factory\\work\\ITEM",
        input,
      );
    }
  });
});

Deno.test("windows: an existing worktree stays inside its root on reuse", () => {
  // Once the directory exists, realPath returns a backslash path; the root
  // check used to compare it against a forward-slash prefix and fail.
  const existing = {
    ...FACTORY,
    "C:\\repos\\factory\\work": "C:\\repos\\factory\\work",
    "C:\\repos\\factory\\work\\ITEM": "C:\\repos\\factory\\work\\ITEM",
  };
  withFlavor(fakeFlavor(true, CWD, existing), () => {
    const target = canonicalPath("C:/repos/factory/work/ITEM", CWD);
    const root = canonicalPath("C:/repos/factory/work", CWD);
    assertEquals(target, "C:\\repos\\factory\\work\\ITEM");
    assertEquals(isWithin(target, root), true);
  });
});

Deno.test("windows: comparisons ignore separator and case", () => {
  withFlavor(fakeFlavor(true, CWD, {}), () => {
    assertEquals(samePath("C:/Repos/X", "c:\\repos\\x"), true);
    assertEquals(samePath("\\\\?\\C:\\repos\\x", "C:/repos/x"), true);
    assertEquals(samePath("C:\\repos\\x", "C:\\repos\\y"), false);
    assertEquals(isWithin("c:/repos/x/y", "C:\\Repos\\X"), true);
    assertEquals(isWithin("C:\\repos\\xy", "C:\\repos\\x"), false);
    assertEquals(isWithin("C:\\repos\\x", "C:/REPOS/X"), false);
    assertEquals(isWithin("C:\\a", "C:\\"), true);
    assertEquals(isWithin("D:\\a", "C:\\"), false);
  });
});

Deno.test("windows: a symlinked ancestor is resolved and the missing tail re-appended", () => {
  const existing = { ...FACTORY, "C:\\repos\\link": "D:\\target" };
  withFlavor(fakeFlavor(true, CWD, existing), () => {
    assertEquals(
      canonicalPath("C:/repos/link/wt/new", CWD),
      "D:\\target\\wt\\new",
    );
    assertEquals(canonicalPath("C:/", CWD), "C:\\");
  });
});

Deno.test("windows: UNC paths are absolute, not cwd-prefixed", () => {
  withFlavor(fakeFlavor(true, CWD, FACTORY), () => {
    assertEquals(
      canonicalPath("\\\\server\\share\\dir\\x", CWD),
      "\\\\server\\share\\dir\\x",
    );
    assertEquals(
      isWithin("\\\\server\\share\\dir\\x", "\\\\SERVER\\share\\dir"),
      true,
    );
  });
});

Deno.test("posix: canonicalPath resolves symlinked ancestors and keeps case", () => {
  const existing = { "/": "/", "/tmp": "/private/tmp", "/srv": "/srv" };
  withFlavor(fakeFlavor(false, "/srv", existing), () => {
    assertEquals(canonicalPath("/tmp/wt/x", "/srv"), "/private/tmp/wt/x");
    assertEquals(canonicalPath("wt//./a/../b", "/srv"), "/srv/wt/b");
    assertEquals(canonicalPath("/", "/srv"), "/");
    assertEquals(canonicalPath("/nope/x", "/srv"), "/nope/x");
    assertEquals(samePath("/A", "/a"), false);
    assertEquals(samePath("/a\\b", "/a/b"), false);
    assertEquals(isWithin("/a/b", "/"), true);
    assertEquals(isWithin("/ab", "/a"), false);
  });
});

Deno.test("posix: absolutePath leaves '..' for the kernel to resolve", () => {
  withFlavor(fakeFlavor(false, "/srv", {}), () => {
    assertEquals(absolutePath("../x", "/base"), "/base/../x");
    assertEquals(absolutePath("/abs", "/base"), "/abs");
    // A drive-letter path is only a path on Windows.
    assertEquals(absolutePath("C:/x", "/base"), "/base/C:/x");
  });
});
