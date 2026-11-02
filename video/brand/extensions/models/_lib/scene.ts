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
 * Headless Chromium over the DevTools protocol, so a scene's CSS animations
 * can be paused at any time and captured one frame at a time (Adam's
 * prototype renderer). A one-shot `--screenshot`, as @swamp/video's simple
 * card uses, can't seek. Tests swap the launcher for a fake, so no browser
 * starts under test.
 *
 * @module
 */

import { STAGE_HEIGHT, STAGE_WIDTH } from "./templates.ts";

/** How long any one DevTools step may take, the page load included. */
export const CDP_TIMEOUT_MS = 30_000;
/** Chromium's last stderr lines kept for errors; exec.ts keeps as many. */
const STDERR_TAIL_LINES = 15;
const DEVTOOLS_WAIT_MS = 15_000;
/** Longest stderr line kept, so output with no newlines stays bounded. */
const STDERR_LINE_MAX = 4096;
/** How long Chromium gets to exit on SIGTERM before it is killed. */
export const KILL_GRACE_MS = 5_000;

export interface SceneOptions {
  chromium: string;
  /** The scene page on disk. */
  page: string;
  width: number;
  height: number;
  /** Transparent background, for overlays. */
  transparent: boolean;
  /** Cancels the launch, the page load and any frame capture. */
  signal?: AbortSignal;
}

/** A loaded scene: capture it at any time into its timeline. */
export interface Scene {
  frame(seconds: number): Promise<Uint8Array>;
  close(): Promise<void>;
}

export type SceneLauncher = (opts: SceneOptions) => Promise<Scene>;

/** A file:// URL for a path, with #, ? and spaces encoded. */
export function fileUrl(path: string): string {
  const url = new URL("file:///");
  url.pathname = path;
  return url.href;
}

/**
 * Output sizes must be exactly 16:9, the stage's shape, and even on both
 * sides, as the H.264 cards need. Checked before any frame is captured.
 */
export function checkStageSize(width: number, height: number): void {
  if (width * STAGE_HEIGHT !== height * STAGE_WIDTH) {
    throw new Error(
      `output size ${width}x${height} must be exactly 16:9, e.g. 1280x720, 1920x1080 or 3840x2160`,
    );
  }
  if (width % 2 !== 0 || height % 2 !== 0) {
    throw new Error(
      `output size ${width}x${height} must have an even width and height`,
    );
  }
}

/** The last lines of a stream, read to its end so the writer never blocks. */
export class StderrTail {
  #lines: string[] = [];
  #partial = "";
  #reader: ReadableStreamDefaultReader<string>;
  readonly done: Promise<void>;

  constructor(stream: ReadableStream<Uint8Array>) {
    this.#reader = stream.pipeThrough(new TextDecoderStream()).getReader();
    this.done = this.#read().catch(() => {});
  }

  /**
   * Stop reading, so a helper process still holding the pipe open cannot
   * keep the run alive once the browser is gone.
   */
  stop(): void {
    this.#reader.cancel().catch(() => {});
  }

  async #read(): Promise<void> {
    while (true) {
      const { done, value: chunk } = await this.#reader.read();
      if (done) return;
      const parts = (this.#partial + chunk).split("\n");
      this.#partial = (parts.pop() ?? "").slice(-STDERR_LINE_MAX);
      this.#lines.push(...parts);
      if (this.#lines.length > STDERR_TAIL_LINES) {
        this.#lines.splice(0, this.#lines.length - STDERR_TAIL_LINES);
      }
    }
  }

  /** The tail so far, ready to append to an error; empty when silent. */
  text(): string {
    const lines = [...this.#lines, this.#partial]
      .filter((line) => line.trim() !== "")
      .slice(-STDERR_TAIL_LINES);
    return lines.length ? `\nchromium stderr:\n${lines.join("\n")}` : "";
  }
}

/** The DevTools socket, as the session uses it. */
export type CdpSocket = Pick<
  WebSocket,
  "send" | "close" | "onmessage" | "onclose"
>;

/** The browser process, as a scene uses it. */
export type BrowserProcess = Pick<Deno.ChildProcess, "status" | "kill">;

export interface SessionOptions {
  /** Defaults to CDP_TIMEOUT_MS; tests shorten it. */
  timeoutMs?: number;
  signal?: AbortSignal;
  /** Chromium's stderr tail, for errors. */
  tail?: () => string;
}

type Waiter = {
  resolve: (value: Record<string, unknown>) => void;
  reject: (error: unknown) => void;
};

/**
 * One DevTools connection. Every command and awaited event is bounded by
 * the timeout, and all of them fail at once when the socket closes, the
 * browser exits, or the signal aborts, so nothing waits on a dead browser.
 */
export class CdpSession {
  #socket: CdpSocket;
  #timeoutMs: number;
  #tail: () => string;
  #sessionId = "";
  #nextId = 1;
  #waiters = new Set<Waiter>();
  #pending = new Map<number, Waiter>();
  #events = new Map<string, Waiter[]>();
  #failure: unknown;
  #failed = false;
  #unlisten = () => {};

  constructor(socket: CdpSocket, opts: SessionOptions = {}) {
    this.#socket = socket;
    this.#timeoutMs = opts.timeoutMs ?? CDP_TIMEOUT_MS;
    this.#tail = opts.tail ?? (() => "");
    socket.onmessage = (event) => this.#receive(String(event.data));
    socket.onclose = () =>
      this.fail(
        new Error(`chromium closed the DevTools connection${this.#tail()}`),
      );
    const signal = opts.signal;
    if (signal) {
      if (signal.aborted) this.fail(signal.reason);
      else {
        const onAbort = () => this.fail(signal.reason);
        signal.addEventListener("abort", onAbort, { once: true });
        this.#unlisten = () => signal.removeEventListener("abort", onAbort);
      }
    }
  }

  set sessionId(id: string) {
    this.#sessionId = id;
  }

  /** Reject every wait now and refuse new ones; the first error sticks. */
  fail(error: unknown): void {
    if (this.#failed) return;
    this.#failed = true;
    this.#failure = error;
    this.#unlisten();
    for (const waiter of [...this.#waiters]) waiter.reject(error);
  }

  close(): void {
    this.fail(new Error("the scene is closed"));
    try {
      this.#socket.close();
    } catch { /* already closed */ }
  }

  send(
    method: string,
    params: Record<string, unknown> = {},
  ): Promise<Record<string, unknown>> {
    const id = this.#nextId++;
    const message: Record<string, unknown> = { id, method, params };
    if (this.#sessionId) message.sessionId = this.#sessionId;
    return this.#wait(
      `CDP ${method} timed out after ${this.#timeoutMs}ms`,
      (waiter) => {
        this.#pending.set(id, waiter);
        this.#socket.send(JSON.stringify(message));
      },
      () => this.#pending.delete(id),
    );
  }

  /** The next time the browser fires `event`, within the timeout. */
  once(event: string, what: string): Promise<void> {
    let entry: Waiter | undefined;
    return this.#wait(
      `chromium did not ${what} within ${this.#timeoutMs}ms`,
      (waiter) => {
        entry = waiter;
        const list = this.#events.get(event) ?? [];
        list.push(waiter);
        this.#events.set(event, list);
      },
      () => {
        const list = this.#events.get(event)?.filter((w) => w !== entry);
        if (list?.length) this.#events.set(event, list);
        else this.#events.delete(event);
      },
    ).then(() => {});
  }

  #wait(
    timeoutMessage: string,
    register: (waiter: Waiter) => void,
    unregister: () => void,
  ): Promise<Record<string, unknown>> {
    if (this.#failed) return Promise.reject(this.#failure);
    return new Promise((resolve, reject) => {
      const settle = () => {
        clearTimeout(timer);
        this.#waiters.delete(waiter);
        unregister();
      };
      const waiter: Waiter = {
        resolve: (value) => {
          settle();
          resolve(value);
        },
        reject: (error) => {
          settle();
          reject(error);
        },
      };
      const timer = setTimeout(
        () => waiter.reject(new Error(`${timeoutMessage}${this.#tail()}`)),
        this.#timeoutMs,
      );
      this.#waiters.add(waiter);
      try {
        register(waiter);
      } catch (err) {
        waiter.reject(err);
      }
    });
  }

  #receive(raw: string) {
    let message;
    try {
      message = JSON.parse(raw);
    } catch {
      return;
    }
    if (typeof message.id === "number") {
      const pending = this.#pending.get(message.id);
      if (!pending) return;
      if (message.error) {
        pending.reject(new Error(`CDP error: ${message.error.message}`));
      } else {
        pending.resolve(message.result ?? {});
      }
      return;
    }
    const listeners = this.#events.get(message.method);
    if (listeners) {
      for (const listener of [...listeners]) listener.resolve({});
    }
  }
}

/** Point the browser's tab at the scene page and wait until it is ready. */
async function attach(session: CdpSession, opts: SceneOptions): Promise<void> {
  // The browser's own foreground tab: tabs made with Target.createTarget
  // start in the background and never paint.
  const { targetInfos } = await session.send("Target.getTargets") as {
    targetInfos: Array<{ targetId: string; type: string }>;
  };
  const page = targetInfos.find((t) => t.type === "page");
  if (!page) throw new Error("chromium started without a page target");
  const { sessionId } = await session.send("Target.attachToTarget", {
    targetId: page.targetId,
    flatten: true,
  });
  session.sessionId = String(sessionId);
  await session.send("Page.enable");
  await session.send("Page.bringToFront");
  await session.send("Emulation.setFocusEmulationEnabled", { enabled: true });
  await session.send("Emulation.setDeviceMetricsOverride", {
    width: STAGE_WIDTH,
    height: STAGE_HEIGHT,
    deviceScaleFactor: opts.width / STAGE_WIDTH,
    mobile: false,
  });
  if (opts.transparent) {
    await session.send("Emulation.setDefaultBackgroundColorOverride", {
      color: { r: 0, g: 0, b: 0, a: 0 },
    });
  }
  const loaded = session.once("Page.loadEventFired", "load the scene page");
  // A navigate that fails leaves `loaded` to time out on its own; don't
  // let that rejection go unhandled.
  loaded.catch(() => {});
  await session.send("Page.navigate", { url: fileUrl(opts.page) });
  await loaded;
  await evaluate(session, "document.fonts.ready.then(() => true)");
}

async function evaluate(session: CdpSession, expression: string) {
  const result = await session.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
  });
  if (result.exceptionDetails) {
    throw new Error(
      `scene script failed: ${JSON.stringify(result.exceptionDetails)}`,
    );
  }
}

/**
 * Stop the browser: SIGTERM, then SIGKILL if it has not exited within the
 * grace period, so a wedged browser cannot hang the teardown.
 */
export async function stopBrowser(
  process: BrowserProcess,
  graceMs = KILL_GRACE_MS,
): Promise<void> {
  const signal = (name: Deno.Signal) => {
    try {
      process.kill(name);
    } catch { /* already exited */ }
  };
  signal("SIGTERM");
  let timer: ReturnType<typeof setTimeout> | undefined;
  const exited = await Promise.race([
    process.status.then(() => true),
    new Promise<false>((resolve) => {
      timer = setTimeout(() => resolve(false), graceMs);
    }),
  ]);
  clearTimeout(timer);
  if (!exited) signal("SIGKILL");
  await process.status;
}

/** Remove a browser profile; helper processes can still be flushing it. */
async function removeProfile(dir: string): Promise<void> {
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      await Deno.remove(dir, { recursive: true });
      return;
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) return;
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }
}

class CdpScene implements Scene {
  #session: CdpSession;
  #process: BrowserProcess;
  #profileDir: string;
  #afterStop: () => void;

  constructor(
    session: CdpSession,
    process: BrowserProcess,
    profileDir: string,
    afterStop: () => void,
  ) {
    this.#session = session;
    this.#process = process;
    this.#profileDir = profileDir;
    this.#afterStop = afterStop;
  }

  async frame(seconds: number): Promise<Uint8Array> {
    await evaluate(this.#session, `window.__seek(${seconds})`);
    // captureScreenshot composites a fresh frame, so the seek is painted.
    const { data } = await this.#session.send("Page.captureScreenshot", {
      format: "png",
    });
    return Uint8Array.from(atob(String(data)), (c) => c.charCodeAt(0));
  }

  async close(): Promise<void> {
    this.#session.close();
    await stopBrowser(this.#process);
    this.#afterStop();
    await removeProfile(this.#profileDir);
  }
}

/**
 * Drive a started browser over its open DevTools socket: load the scene,
 * or close everything (browser, profile) and throw.
 */
export async function connectScene(
  socket: CdpSocket,
  process: BrowserProcess,
  profileDir: string,
  opts: SceneOptions,
  session: SessionOptions = {},
  /** Runs once the browser has exited, before the profile is removed. */
  afterStop: () => void = () => {},
): Promise<Scene> {
  const tail = session.tail ?? (() => "");
  const cdp = new CdpSession(socket, {
    ...session,
    signal: session.signal ?? opts.signal,
  });
  process.status.then((status) =>
    cdp.fail(new Error(`chromium exited (code ${status.code})${tail()}`))
  );
  const scene = new CdpScene(cdp, process, profileDir, afterStop);
  try {
    await attach(cdp, opts);
    return scene;
  } catch (err) {
    await scene.close();
    throw err;
  }
}

/**
 * The browser's DevTools URL, once it writes its port file. Fails at once
 * if the browser exits first or the signal aborts, and after 15s
 * otherwise, with the stderr tail either way.
 */
export async function waitForDevtools(
  profileDir: string,
  exited: Promise<Deno.CommandStatus>,
  tail: () => string,
  signal?: AbortSignal,
  waitMs = DEVTOOLS_WAIT_MS,
): Promise<string> {
  let status: Deno.CommandStatus | undefined;
  exited.then((s) => {
    status = s;
  });
  const portFile = `${profileDir}/DevToolsActivePort`;
  const deadline = Date.now() + waitMs;
  while (true) {
    signal?.throwIfAborted();
    try {
      const [port, path] = (await Deno.readTextFile(portFile)).trim().split(
        "\n",
      );
      if (port && path) return `ws://127.0.0.1:${port}${path}`;
    } catch { /* not written yet */ }
    if (status) {
      throw new Error(
        `chromium exited (code ${status.code}) before exposing DevTools${tail()}`,
      );
    }
    if (Date.now() >= deadline) {
      throw new Error(
        `chromium did not expose a DevTools port within ${
          waitMs / 1000
        }s${tail()}`,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

const realLauncher: SceneLauncher = async (opts) => {
  checkStageSize(opts.width, opts.height);
  opts.signal?.throwIfAborted();
  const profileDir = await Deno.makeTempDir({ prefix: "video-brand-cdp-" });
  let process: Deno.ChildProcess;
  try {
    // A long-lived browser driven over its socket, so not through exec.ts;
    // argv only, never a shell.
    // swamp-quality-ignore deno-command
    process = new Deno.Command(opts.chromium, {
      args: [
        "--headless=new",
        "--remote-debugging-port=0",
        `--user-data-dir=${profileDir}`,
        "--no-first-run",
        "--no-default-browser-check",
        "--hide-scrollbars",
        "--mute-audio",
        "--allow-file-access-from-files",
        // Keep painting even though no window is ever shown or focused.
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "--disable-ipc-flooding-protection",
        "--disable-hang-monitor",
        "--disable-breakpad",
        "--disable-crash-reporter",
        "--disable-extensions",
        "--disable-component-extensions-with-background-pages",
        "--disable-background-networking",
        "--disable-sync",
        "--disable-default-apps",
        "--metrics-recording-only",
        "--password-store=basic",
        "--force-color-profile=srgb",
        "--enable-automation",
        "--disable-features=CalculateNativeWinOcclusion,Translate,OptimizationHints,MediaRouter",
        "about:blank",
      ],
      stdout: "null",
      stderr: "piped",
    }).spawn();
  } catch (err) {
    await Deno.remove(profileDir, { recursive: true }).catch(() => {});
    if (err instanceof Deno.errors.NotFound) {
      throw new Error(
        `${opts.chromium} not found: install chromium or point the chromium setting at it`,
      );
    }
    throw err;
  }
  const stderr = new StderrTail(process.stderr);
  const tail = () => stderr.text();
  let socket: WebSocket | undefined;
  try {
    socket = new WebSocket(
      await waitForDevtools(profileDir, process.status, tail, opts.signal),
    );
    const open = socket;
    await new Promise<void>((resolve, reject) => {
      const settle = (fn: () => void) => () => {
        clearTimeout(timer);
        opts.signal?.removeEventListener("abort", abort);
        fn();
      };
      const abort = settle(() => reject(opts.signal?.reason));
      opts.signal?.addEventListener("abort", abort, { once: true });
      const timer = setTimeout(
        settle(() =>
          reject(
            new Error(
              `CDP socket did not open within ${CDP_TIMEOUT_MS}ms${tail()}`,
            ),
          )
        ),
        CDP_TIMEOUT_MS,
      );
      open.onopen = settle(resolve);
      open.onerror = settle(() =>
        reject(new Error(`CDP socket failed to open${tail()}`))
      );
      // After the timer exists: settle clears it.
      if (opts.signal?.aborted) abort();
    });
  } catch (err) {
    try {
      socket?.close();
    } catch { /* never opened */ }
    await stopBrowser(process);
    stderr.stop();
    await removeProfile(profileDir);
    throw err;
  }
  return connectScene(
    socket,
    process,
    profileDir,
    opts,
    { tail },
    () => stderr.stop(),
  );
};

let launcher: SceneLauncher = realLauncher;

export function setSceneLauncher(fn: SceneLauncher): void {
  launcher = fn;
}

export function resetSceneLauncher(): void {
  launcher = realLauncher;
}

export function openScene(opts: SceneOptions): Promise<Scene> {
  return launcher(opts);
}
