import {
  assertEquals,
  assertRejects,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  detectPlatform,
  ensureDeno,
  extractDenoFromZip,
  tryVerifyChecksum,
} from "./installer.ts";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

Deno.test("detectPlatform returns valid platform", () => {
  const platform = detectPlatform();
  const valid = [
    "linux-x64",
    "linux-arm64",
    "darwin-x64",
    "darwin-arm64",
    "windows-x64",
  ];
  assertEquals(valid.includes(platform), true);
});

Deno.test("detectPlatform maps every supported os and arch", () => {
  assertEquals(detectPlatform("linux", "x86_64"), "linux-x64");
  assertEquals(detectPlatform("linux", "aarch64"), "linux-arm64");
  assertEquals(detectPlatform("darwin", "x86_64"), "darwin-x64");
  assertEquals(detectPlatform("darwin", "aarch64"), "darwin-arm64");
  assertEquals(detectPlatform("windows", "x86_64"), "windows-x64");
});

Deno.test("detectPlatform rejects Windows ARM64, which Deno does not publish", () => {
  assertThrows(
    () => detectPlatform("windows", "aarch64"),
    Error,
    "Deno publishes no Windows build for aarch64",
  );
});

Deno.test("detectPlatform rejects unsupported os and arch", () => {
  assertThrows(
    () => detectPlatform("freebsd", "x86_64"),
    Error,
    "Unsupported operating system: freebsd",
  );
  assertThrows(
    () => detectPlatform("linux", "riscv64"),
    Error,
    "Unsupported architecture: riscv64",
  );
});

// ---------------------------------------------------------------------------
// Checksum verification
// ---------------------------------------------------------------------------

Deno.test(
  "tryVerifyChecksum returns verified on matching hash",
  { sanitizeResources: false }, // mock server may leave connection open
  async () => {
    const testData = new TextEncoder().encode("hello deno");
    const hashBuffer = await crypto.subtle.digest("SHA-256", testData);
    const expectedHash = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const server = Deno.serve({ port: 0 }, (_req) => {
      return new Response(`${expectedHash}  deno-aarch64-apple-darwin.zip\n`);
    });

    try {
      const result = await tryVerifyChecksum(
        testData,
        "2.7.5",
        "darwin-arm64",
        undefined,
        `http://localhost:${server.addr.port}`,
      );
      assertEquals(result, "verified");
    } finally {
      await server.shutdown();
    }
  },
);

Deno.test(
  "tryVerifyChecksum throws on mismatched hash",
  { sanitizeResources: false },
  async () => {
    const testData = new TextEncoder().encode("hello deno");

    const server = Deno.serve({ port: 0 }, (_req) => {
      return new Response(
        "0000000000000000000000000000000000000000000000000000000000000000  deno-aarch64-apple-darwin.zip\n",
      );
    });

    try {
      await assertRejects(
        () =>
          tryVerifyChecksum(
            testData,
            "2.7.5",
            "darwin-arm64",
            undefined,
            `http://localhost:${server.addr.port}`,
          ),
        Error,
        "Checksum mismatch",
      );
    } finally {
      await server.shutdown();
    }
  },
);

Deno.test(
  "tryVerifyChecksum returns skipped when server returns 404",
  { sanitizeResources: false },
  async () => {
    const testData = new TextEncoder().encode("hello deno");

    const server = Deno.serve({ port: 0 }, (_req) => {
      return new Response("Not Found", { status: 404 });
    });

    try {
      const result = await tryVerifyChecksum(
        testData,
        "2.7.5",
        "darwin-arm64",
        undefined,
        `http://localhost:${server.addr.port}`,
      );
      assertEquals(result, "skipped");
    } finally {
      await server.shutdown();
    }
  },
);

// ---------------------------------------------------------------------------
// ensureDeno — binary download and caching
// ---------------------------------------------------------------------------

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function buildZipWithFile(
  filename: string,
  content: Uint8Array,
): Uint8Array {
  const enc = new TextEncoder();
  const nameBytes = enc.encode(filename);
  const crc = crc32(content);
  const now = new Date();
  const dosTime = ((now.getHours() << 11) | (now.getMinutes() << 5) |
    (now.getSeconds() >> 1)) & 0xffff;
  const dosDate =
    (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) |
      now.getDate()) & 0xffff;

  const localHeader = new Uint8Array(30 + nameBytes.length + content.length);
  const lv = new DataView(localHeader.buffer);
  lv.setUint32(0, 0x04034b50, true); // local file header signature
  lv.setUint16(4, 20, true); // version needed
  lv.setUint16(6, 0, true); // flags
  lv.setUint16(8, 0, true); // compression: store
  lv.setUint16(10, dosTime, true);
  lv.setUint16(12, dosDate, true);
  lv.setUint32(14, crc, true); // crc-32
  lv.setUint32(18, content.length, true); // compressed size
  lv.setUint32(22, content.length, true); // uncompressed size
  lv.setUint16(26, nameBytes.length, true);
  lv.setUint16(28, 0, true); // extra field length
  localHeader.set(nameBytes, 30);
  localHeader.set(content, 30 + nameBytes.length);

  const cdOffset = 0;
  const cdEntry = new Uint8Array(46 + nameBytes.length);
  const cv = new DataView(cdEntry.buffer);
  cv.setUint32(0, 0x02014b50, true); // central directory signature
  cv.setUint16(4, 20, true); // version made by
  cv.setUint16(6, 20, true); // version needed
  cv.setUint16(8, 0, true); // flags
  cv.setUint16(10, 0, true); // compression
  cv.setUint16(12, dosTime, true);
  cv.setUint16(14, dosDate, true);
  cv.setUint32(16, crc, true);
  cv.setUint32(20, content.length, true);
  cv.setUint32(24, content.length, true);
  cv.setUint16(28, nameBytes.length, true);
  cv.setUint16(30, 0, true); // extra field length
  cv.setUint16(32, 0, true); // comment length
  cv.setUint16(34, 0, true); // disk number
  cv.setUint16(36, 0, true); // internal attrs
  cv.setUint32(38, 0o100755 << 16, false); // external attrs (unix mode)
  cv.setUint32(42, cdOffset, true); // local header offset
  cdEntry.set(nameBytes, 46);

  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true); // end of central directory
  ev.setUint16(4, 0, true); // disk number
  ev.setUint16(6, 0, true); // disk with cd
  ev.setUint16(8, 1, true); // entries on this disk
  ev.setUint16(10, 1, true); // total entries
  ev.setUint32(12, cdEntry.length, true); // cd size
  ev.setUint32(16, localHeader.length, true); // cd offset
  ev.setUint16(20, 0, true); // comment length

  const result = new Uint8Array(
    localHeader.length + cdEntry.length + eocd.length,
  );
  result.set(localHeader, 0);
  result.set(cdEntry, localHeader.length);
  result.set(eocd, localHeader.length + cdEntry.length);
  return result;
}

Deno.test(
  "ensureDeno downloads and extracts binary from mock server",
  { sanitizeResources: false },
  async () => {
    const tmpDir = await Deno.makeTempDir();

    const scriptContent = new TextEncoder().encode(
      '#!/bin/sh\necho "deno mock"',
    );
    const zipData = buildZipWithFile("deno", scriptContent);
    const zipHash = await crypto.subtle.digest(
      "SHA-256",
      zipData.buffer as ArrayBuffer,
    );
    const zipHashHex = Array.from(new Uint8Array(zipHash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const platform = detectPlatform();

    const server = Deno.serve({ port: 0 }, (req) => {
      const url = new URL(req.url);
      if (url.pathname.endsWith(".sha256")) {
        return new Response(`${zipHashHex}  archive.zip\n`);
      }
      if (url.pathname.endsWith(".zip")) {
        return new Response(zipData as unknown as BodyInit);
      }
      return new Response("Not Found", { status: 404 });
    });

    const originalFetch = globalThis.fetch;
    const port = server.addr.port;
    globalThis.fetch = (input: string | URL | Request, init?: RequestInit) => {
      const urlStr = typeof input === "string"
        ? input
        : input instanceof URL
        ? input.toString()
        : input.url;
      if (urlStr.startsWith("https://dl.deno.land/")) {
        const path = urlStr.replace("https://dl.deno.land/", "/");
        return originalFetch(`http://localhost:${port}${path}`, init);
      }
      return originalFetch(input, init);
    };

    const cacheDir = `${tmpDir}/cache`;
    try {
      const binaryPath = await ensureDeno("2.7.5", cacheDir, platform);
      assertEquals(typeof binaryPath, "string");
      assertEquals(binaryPath.endsWith("/deno"), true);

      const stat = await Deno.stat(binaryPath);
      assertEquals(stat.isFile, true);

      // Calling again should hit cache
      const binaryPath2 = await ensureDeno("2.7.5", cacheDir, platform);
      assertEquals(binaryPath, binaryPath2);
    } finally {
      globalThis.fetch = originalFetch;
      await server.shutdown();
      await Deno.remove(tmpDir, { recursive: true });
    }
  },
);

Deno.test(
  "ensureDeno throws on download failure",
  { sanitizeResources: false },
  async () => {
    const tmpDir = await Deno.makeTempDir();

    const server = Deno.serve({ port: 0 }, (_req) => {
      return new Response("Not Found", { status: 404 });
    });

    const originalFetch = globalThis.fetch;
    const port = server.addr.port;
    globalThis.fetch = (input: string | URL | Request, init?: RequestInit) => {
      const urlStr = typeof input === "string"
        ? input
        : input instanceof URL
        ? input.toString()
        : input.url;
      if (urlStr.startsWith("https://dl.deno.land/")) {
        const path = urlStr.replace("https://dl.deno.land/", "/");
        return originalFetch(`http://localhost:${port}${path}`, init);
      }
      return originalFetch(input, init);
    };

    try {
      await assertRejects(
        () => ensureDeno("99.99.99", tmpDir, "linux-x64"),
        Error,
        "Failed to download Deno",
      );
    } finally {
      globalThis.fetch = originalFetch;
      await server.shutdown();
      await Deno.remove(tmpDir, { recursive: true });
    }
  },
);

Deno.test(
  "ensureDeno downloads the Windows zip and caches deno.exe",
  { sanitizeResources: false }, // mock server may leave connection open
  async () => {
    const tmpDir = await Deno.makeTempDir();
    const exeContent = new TextEncoder().encode("MZ fake deno.exe");
    const zipData = buildZipWithFile("deno.exe", exeContent);

    const requested: string[] = [];
    const server = Deno.serve({ port: 0 }, (req) => {
      const url = new URL(req.url);
      requested.push(url.pathname);
      if (url.pathname.endsWith(".zip")) {
        return new Response(zipData as unknown as BodyInit);
      }
      return new Response("Not Found", { status: 404 });
    });

    const originalFetch = globalThis.fetch;
    const port = server.addr.port;
    globalThis.fetch = (input: string | URL | Request, init?: RequestInit) => {
      const urlStr = typeof input === "string"
        ? input
        : input instanceof URL
        ? input.toString()
        : input.url;
      if (urlStr.startsWith("https://dl.deno.land/")) {
        const path = urlStr.replace("https://dl.deno.land/", "/");
        return originalFetch(`http://localhost:${port}${path}`, init);
      }
      return originalFetch(input, init);
    };

    const cacheDir = `${tmpDir}/cache`;
    try {
      const binaryPath = await ensureDeno("2.7.5", cacheDir, "windows-x64");
      assertEquals(
        binaryPath,
        `${cacheDir}/.swamp/deno-runner/bin/2.7.5/deno.exe`,
      );
      assertEquals(await Deno.readFile(binaryPath), exeContent);
      assertEquals(requested, [
        "/release/v2.7.5/deno-x86_64-pc-windows-msvc.zip",
        "/release/v2.7.5/deno-x86_64-pc-windows-msvc.zip.sha256",
      ]);
    } finally {
      globalThis.fetch = originalFetch;
      await server.shutdown();
      await Deno.remove(tmpDir, { recursive: true });
    }
  },
);

Deno.test("extractDenoFromZip fails when the archive lacks the binary", async () => {
  const tmpDir = await Deno.makeTempDir();
  try {
    const zipData = buildZipWithFile(
      "README.md",
      new TextEncoder().encode("no binary here"),
    );
    await assertRejects(
      () => extractDenoFromZip(zipData, "deno.exe", `${tmpDir}/deno.exe`),
      Error,
      "deno.exe not found in archive",
    );
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});
