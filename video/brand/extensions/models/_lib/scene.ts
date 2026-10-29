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

const CDP_TIMEOUT_MS = 30_000;

export interface SceneOptions {
  chromium: string;
  /** The scene page on disk. */
  page: string;
  width: number;
  height: number;
  /** Transparent background, for overlays. */
  transparent: boolean;
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

/** Output sizes must be 16:9, the stage's shape. */
export function checkStageSize(width: number, height: number): void {
  if (Math.round(height * STAGE_WIDTH / width) !== STAGE_HEIGHT) {
    throw new Error(`output size ${width}x${height} must be 16:9`);
  }
}

type Pending = {
  resolve: (value: Record<string, unknown>) => void;
  reject: (error: Error) => void;
};

class CdpScene implements Scene {
  #process: Deno.ChildProcess;
  #profileDir: string;
  #socket: WebSocket;
  #sessionId = "";
  #nextId = 1;
  #pending = new Map<number, Pending>();
  #listeners = new Map<string, Array<() => void>>();

  constructor(
    process: Deno.ChildProcess,
    profileDir: string,
    socket: WebSocket,
  ) {
    this.#process = process;
    this.#profileDir = profileDir;
    this.#socket = socket;
    socket.onmessage = (event) => this.#onMessage(String(event.data));
  }

  async attach(opts: SceneOptions): Promise<void> {
    // The browser's own foreground tab: tabs made with Target.createTarget
    // start in the background and never paint.
    const { targetInfos } = await this.#send("Target.getTargets") as {
      targetInfos: Array<{ targetId: string; type: string }>;
    };
    const page = targetInfos.find((t) => t.type === "page");
    if (!page) throw new Error("chromium started without a page target");
    const { sessionId } = await this.#send("Target.attachToTarget", {
      targetId: page.targetId,
      flatten: true,
    });
    this.#sessionId = String(sessionId);
    await this.#send("Page.enable");
    await this.#send("Page.bringToFront");
    await this.#send("Emulation.setFocusEmulationEnabled", { enabled: true });
    await this.#send("Emulation.setDeviceMetricsOverride", {
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      deviceScaleFactor: opts.width / STAGE_WIDTH,
      mobile: false,
    });
    if (opts.transparent) {
      await this.#send("Emulation.setDefaultBackgroundColorOverride", {
        color: { r: 0, g: 0, b: 0, a: 0 },
      });
    }
    const loaded = this.#once("Page.loadEventFired");
    await this.#send("Page.navigate", { url: fileUrl(opts.page) });
    await loaded;
    await this.#evaluate("document.fonts.ready.then(() => true)");
  }

  async frame(seconds: number): Promise<Uint8Array> {
    await this.#evaluate(`window.__seek(${seconds})`);
    // captureScreenshot composites a fresh frame, so the seek is painted.
    const { data } = await this.#send("Page.captureScreenshot", {
      format: "png",
    });
    return Uint8Array.from(atob(String(data)), (c) => c.charCodeAt(0));
  }

  async close(): Promise<void> {
    try {
      this.#socket.close();
    } catch { /* already closed */ }
    try {
      this.#process.kill("SIGTERM");
    } catch { /* already exited */ }
    await this.#process.status;
    // Helper processes can still be flushing the profile right after exit.
    for (let attempt = 0; attempt < 10; attempt++) {
      try {
        await Deno.remove(this.#profileDir, { recursive: true });
        return;
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }
  }

  async #evaluate(expression: string): Promise<void> {
    const result = await this.#send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
    });
    if (result.exceptionDetails) {
      throw new Error(
        `scene script failed: ${JSON.stringify(result.exceptionDetails)}`,
      );
    }
  }

  #send(
    method: string,
    params: Record<string, unknown> = {},
  ): Promise<Record<string, unknown>> {
    const id = this.#nextId++;
    const message: Record<string, unknown> = { id, method, params };
    if (this.#sessionId) message.sessionId = this.#sessionId;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.#pending.delete(id);
        reject(new Error(`CDP ${method} timed out after ${CDP_TIMEOUT_MS}ms`));
      }, CDP_TIMEOUT_MS);
      this.#pending.set(id, {
        resolve: (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        reject: (error) => {
          clearTimeout(timer);
          reject(error);
        },
      });
      this.#socket.send(JSON.stringify(message));
    });
  }

  #once(event: string): Promise<void> {
    return new Promise((resolve) => {
      const list = this.#listeners.get(event) ?? [];
      list.push(resolve);
      this.#listeners.set(event, list);
    });
  }

  #onMessage(raw: string) {
    const message = JSON.parse(raw);
    if (typeof message.id === "number") {
      const pending = this.#pending.get(message.id);
      if (!pending) return;
      this.#pending.delete(message.id);
      if (message.error) {
        pending.reject(new Error(`CDP error: ${message.error.message}`));
      } else {
        pending.resolve(message.result ?? {});
      }
      return;
    }
    const listeners = this.#listeners.get(message.method);
    if (listeners) {
      this.#listeners.delete(message.method);
      for (const listener of listeners) listener();
    }
  }
}

async function waitForDevtools(profileDir: string): Promise<string> {
  const portFile = `${profileDir}/DevToolsActivePort`;
  for (let attempt = 0; attempt < 150; attempt++) {
    try {
      const [port, path] = (await Deno.readTextFile(portFile)).trim().split(
        "\n",
      );
      if (port && path) return `ws://127.0.0.1:${port}${path}`;
    } catch { /* not written yet */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("chromium did not expose a DevTools port within 15s");
}

const realLauncher: SceneLauncher = async (opts) => {
  checkStageSize(opts.width, opts.height);
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
      stderr: "null",
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
  let scene: CdpScene | undefined;
  try {
    const socket = new WebSocket(await waitForDevtools(profileDir));
    await new Promise<void>((resolve, reject) => {
      socket.onopen = () => resolve();
      socket.onerror = () => reject(new Error("CDP socket failed to open"));
    });
    scene = new CdpScene(process, profileDir, socket);
    await scene.attach(opts);
    return scene;
  } catch (err) {
    if (scene) await scene.close();
    else {
      try {
        process.kill("SIGTERM");
      } catch { /* already exited */ }
      await process.status;
      await Deno.remove(profileDir, { recursive: true }).catch(() => {});
    }
    throw err;
  }
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
