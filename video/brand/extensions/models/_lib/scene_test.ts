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

import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  type BrowserProcess,
  checkStageSize,
  connectScene,
  type SceneOptions,
  StderrTail,
  stopBrowser,
  waitForDevtools,
} from "./scene.ts";

/**
 * A browser on the far side of the DevTools socket, in memory: it answers
 * every command, and fires the page's load event unless told to hang.
 */
class FakeBrowser
  implements Pick<WebSocket, "send" | "close" | "onmessage" | "onclose"> {
  onmessage: WebSocket["onmessage"] = null;
  onclose: WebSocket["onclose"] = null;
  methods: string[] = [];
  closed = false;
  /** What the browser does when the page is navigated. */
  onNavigate: "load" | "hang" | "close" = "load";
  /** Never answer this command. */
  hangOn = "";
  #exit = Promise.withResolvers<Deno.CommandStatus>();
  killed = false;

  readonly process: BrowserProcess = {
    status: this.#exit.promise,
    kill: () => {
      this.killed = true;
      this.exit(143);
    },
  };

  exit(code: number) {
    this.#exit.resolve({ success: code === 0, code, signal: null });
  }

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    const { id, method } = JSON.parse(String(data));
    this.methods.push(method);
    if (method === this.hangOn) return;
    const result: Record<string, unknown> = {
      "Target.getTargets": { targetInfos: [{ targetId: "t1", type: "page" }] },
      "Target.attachToTarget": { sessionId: "s1" },
      "Page.captureScreenshot": { data: btoa("png") },
    }[method as string] ?? {};
    queueMicrotask(() => {
      this.#deliver({ id, result });
      if (method !== "Page.navigate") return;
      if (this.onNavigate === "load") {
        this.#deliver({ method: "Page.loadEventFired", params: {} });
      } else if (this.onNavigate === "close") {
        this.dropConnection();
      }
    });
  }

  close() {
    this.closed = true;
  }

  dropConnection() {
    this.onclose?.call(
      this as unknown as WebSocket,
      new CloseEvent("close"),
    );
  }

  #deliver(message: unknown) {
    this.onmessage?.call(
      this as unknown as WebSocket,
      new MessageEvent("message", { data: JSON.stringify(message) }),
    );
  }
}

const TIMEOUT_MS = 100;

async function open(
  browser: FakeBrowser,
  extra: Partial<SceneOptions> = {},
) {
  const profileDir = await Deno.makeTempDir();
  const opts: SceneOptions = {
    chromium: "chromium",
    page: "/scenes/intro.html",
    width: 1920,
    height: 1080,
    transparent: false,
    ...extra,
  };
  const started = Date.now();
  const stopped: string[] = [];
  const scene = connectScene(browser, browser.process, profileDir, opts, {
    timeoutMs: TIMEOUT_MS,
    tail: () => "\nchromium stderr:\nboom",
    // An explicit undefined must not drop the scene's own signal.
    signal: undefined,
  }, () => stopped.push(browser.killed ? "after exit" : "before exit"));
  return { scene, profileDir, started, stopped };
}

async function gone(path: string): Promise<boolean> {
  try {
    await Deno.stat(path);
    return false;
  } catch {
    return true;
  }
}

Deno.test("scene: a loaded page captures frames, then closes the browser", async () => {
  const browser = new FakeBrowser();
  const { scene, profileDir, stopped } = await open(browser);
  const s = await scene;
  assertEquals(new TextDecoder().decode(await s.frame(1.5)), "png");
  await s.close();
  assert(browser.killed && browser.closed);
  assertEquals(stopped, ["after exit"], "stderr reading stops after exit");
  assert(await gone(profileDir), "profile removed");
  assertEquals(browser.methods.slice(-2), [
    "Runtime.evaluate",
    "Page.captureScreenshot",
  ]);
});

Deno.test("scene: a page that never loads fails within the timeout", async () => {
  const browser = new FakeBrowser();
  browser.onNavigate = "hang";
  const { scene, profileDir, started } = await open(browser);
  const err = await assertRejects(
    () => scene,
    Error,
    `chromium did not load the scene page within ${TIMEOUT_MS}ms`,
  );
  assertStringIncludes(err.message, "boom");
  assert(Date.now() - started < TIMEOUT_MS * 10);
  assert(browser.killed, "the browser is stopped");
  assert(await gone(profileDir));
});

Deno.test("scene: the connection dropping mid-load fails at once with stderr", async () => {
  const browser = new FakeBrowser();
  browser.onNavigate = "close";
  const { scene, started } = await open(browser);
  const err = await assertRejects(
    () => scene,
    Error,
    "chromium closed the DevTools connection",
  );
  assertStringIncludes(err.message, "boom");
  assert(Date.now() - started < TIMEOUT_MS, "not left to time out");
  assert(browser.killed);
});

Deno.test("scene: the browser exiting mid-load fails at once", async () => {
  const browser = new FakeBrowser();
  browser.onNavigate = "hang";
  const { scene, started } = await open(browser);
  setTimeout(() => browser.exit(1), 10);
  await assertRejects(() => scene, Error, "chromium exited (code 1)");
  assert(Date.now() - started < TIMEOUT_MS, "not left to time out");
});

Deno.test("scene: cancelling reaches the page-load wait", async () => {
  const browser = new FakeBrowser();
  browser.onNavigate = "hang";
  const abort = new AbortController();
  const { scene, started } = await open(browser, { signal: abort.signal });
  setTimeout(() => abort.abort(new Error("run cancelled")), 10);
  await assertRejects(() => scene, Error, "run cancelled");
  assert(Date.now() - started < TIMEOUT_MS, "not left to time out");
  assert(browser.killed);
});

Deno.test("scene: cancelling reaches a hung frame capture", async () => {
  const browser = new FakeBrowser();
  const abort = new AbortController();
  const { scene } = await open(browser, { signal: abort.signal });
  const s = await scene;
  browser.hangOn = "Page.captureScreenshot";
  const started = Date.now();
  setTimeout(() => abort.abort(new Error("run cancelled")), 10);
  await assertRejects(() => s.frame(0), Error, "run cancelled");
  assert(Date.now() - started < TIMEOUT_MS, "not left to time out");
  await s.close();
});

Deno.test("devtools: a browser that exits before its port fails at once with stderr", async () => {
  const dir = await Deno.makeTempDir();
  try {
    const started = Date.now();
    const err = await assertRejects(
      () =>
        waitForDevtools(
          dir,
          Promise.resolve({ success: false, code: 1, signal: null }),
          () => "\nchromium stderr:\nmissing libnss3.so",
        ),
      Error,
      "chromium exited (code 1) before exposing DevTools",
    );
    assertStringIncludes(err.message, "missing libnss3.so");
    assert(Date.now() - started < 1000, "not the 15s wait");
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("devtools: the port file gives the socket URL; a silent browser times out", async () => {
  const dir = await Deno.makeTempDir();
  try {
    const running = new Promise<Deno.CommandStatus>(() => {});
    await assertRejects(
      () => waitForDevtools(dir, running, () => "", undefined, 150),
      Error,
      "did not expose a DevTools port",
    );
    await Deno.writeTextFile(
      `${dir}/DevToolsActivePort`,
      "9222\n/devtools/browser/abc\n",
    );
    assertEquals(
      await waitForDevtools(dir, running, () => ""),
      "ws://127.0.0.1:9222/devtools/browser/abc",
    );
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("stderr tail keeps the last 15 lines", async () => {
  const text = Array.from({ length: 40 }, (_, i) => `line ${i}`).join("\n");
  const tail = new StderrTail(
    new Blob([new TextEncoder().encode(text)]).stream(),
  );
  await tail.done;
  const lines = tail.text().split("\n");
  assertEquals(lines[1], "chromium stderr:");
  assertEquals(
    lines.slice(2),
    Array.from({ length: 15 }, (_, i) => `line ${i + 25}`),
  );
  const silent = new StderrTail(new Blob([]).stream());
  await silent.done;
  assertEquals(silent.text(), "");
});

Deno.test("output sizes are exactly 16:9 and even", () => {
  for (
    const [w, h] of [[1280, 720], [1920, 1080], [2560, 1440], [3840, 2160]]
  ) {
    checkStageSize(w, h);
  }
  for (
    const [w, h] of [[1919, 1079], [3842, 2162], [1366, 768], [1080, 1080]]
  ) {
    assertThrows(() => checkStageSize(w, h), Error, "exactly 16:9");
  }
  assertThrows(
    () => checkStageSize(1936, 1089),
    Error,
    "even width and height",
  );
});

Deno.test("a browser that ignores SIGTERM is killed after the grace period", async () => {
  const sent: string[] = [];
  const exit = Promise.withResolvers<Deno.CommandStatus>();
  const process: BrowserProcess = {
    status: exit.promise,
    kill: (signal) => {
      sent.push(String(signal));
      if (signal === "SIGKILL") {
        exit.resolve({ success: false, code: 137, signal: "SIGKILL" });
      }
    },
  };
  const started = Date.now();
  await stopBrowser(process, 20);
  assertEquals(sent, ["SIGTERM", "SIGKILL"]);
  assert(Date.now() - started < 1000);

  const polite = new FakeBrowser();
  await stopBrowser(polite.process, 20);
  assert(polite.killed);
});

Deno.test("stderr tail bounds a line that never ends", async () => {
  const tail = new StderrTail(
    new Blob([new TextEncoder().encode("x".repeat(100_000))]).stream(),
  );
  await tail.done;
  assert(tail.text().length < 5_000);
});

Deno.test("stopping the stderr tail ends a pipe a helper still holds open", async () => {
  const pipe = new TransformStream<Uint8Array, Uint8Array>();
  const writer = pipe.writable.getWriter();
  const tail = new StderrTail(pipe.readable);
  await writer.write(new TextEncoder().encode("still running\n"));
  await new Promise((resolve) => setTimeout(resolve, 10));
  tail.stop();
  await tail.done;
  assertStringIncludes(tail.text(), "still running");
  await writer.abort().catch(() => {});
});
