import { dirname, fromFileUrl, join } from "@std/path";

export interface EmulatorEndpoints {
  s3: string;
  gcs: string;
}

const COMPOSE_DIR = join(dirname(fromFileUrl(import.meta.url)), "..");

async function dockerAvailable(): Promise<boolean> {
  try {
    const cmd = new Deno.Command("docker", {
      args: ["info"],
      stdout: "null",
      stderr: "null",
    });
    const result = await cmd.output();
    return result.success;
  } catch {
    return false;
  }
}

async function composeCommand(): Promise<string[]> {
  // Try "docker compose" (v2) first, fall back to "docker-compose" (v1)
  try {
    const cmd = new Deno.Command("docker", {
      args: ["compose", "version"],
      stdout: "null",
      stderr: "null",
    });
    const result = await cmd.output();
    if (result.success) return ["docker", "compose"];
  } catch {
    // fall through
  }
  return ["docker-compose"];
}

async function runCompose(args: string[]): Promise<void> {
  const [bin, ...prefix] = await composeCommand();
  const cmd = new Deno.Command(bin, {
    args: [...prefix, "-f", join(COMPOSE_DIR, "docker-compose.yml"), ...args],
    stdout: "piped",
    stderr: "piped",
  });
  const result = await cmd.output();
  if (!result.success) {
    const stderr = new TextDecoder().decode(result.stderr);
    throw new Error(`docker compose ${args.join(" ")} failed: ${stderr}`);
  }
}

async function waitForHealth(url: string, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const resp = await fetch(url);
      if (resp.ok || resp.status < 500) {
        await resp.body?.cancel();
        return;
      }
      await resp.body?.cancel();
    } catch {
      // connection refused, retry
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(
    `Emulator at ${url} did not become healthy within ${timeoutMs}ms`,
  );
}

export async function startEmulators(): Promise<EmulatorEndpoints> {
  const s3Endpoint = Deno.env.get("BENCHMARK_S3_ENDPOINT");
  const gcsEndpoint = Deno.env.get("BENCHMARK_GCS_ENDPOINT");

  if (s3Endpoint && gcsEndpoint) {
    console.log("Using pre-configured emulator endpoints");
    return { s3: s3Endpoint, gcs: gcsEndpoint };
  }

  if (!(await dockerAvailable())) {
    throw new Error(
      "Docker is not available. Either:\n" +
        "  1. Install and start Docker, or\n" +
        "  2. Set BENCHMARK_S3_ENDPOINT and BENCHMARK_GCS_ENDPOINT env vars " +
        "to point at running emulators.",
    );
  }

  // Stop any stale containers from a previous interrupted run, then start fresh
  console.log("Starting emulators via docker compose...");
  await runCompose(["down", "-v"]).catch(() => {});
  await runCompose(["up", "-d", "--wait"]);

  const endpoints: EmulatorEndpoints = {
    s3: s3Endpoint ?? "http://localhost:9000",
    gcs: gcsEndpoint ?? "http://localhost:4443",
  };

  await waitForHealth(`${endpoints.s3}/minio/health/live`, 30_000);
  await waitForHealth(`${endpoints.gcs}/storage/v1/b`, 30_000);
  console.log("Emulators ready.\n");
  return endpoints;
}

export async function stopEmulators(): Promise<void> {
  const s3Endpoint = Deno.env.get("BENCHMARK_S3_ENDPOINT");
  const gcsEndpoint = Deno.env.get("BENCHMARK_GCS_ENDPOINT");

  if (s3Endpoint && gcsEndpoint) {
    // Pre-configured endpoints — don't stop anything
    return;
  }

  await runCompose(["down", "-v"]);
}

export async function createS3Bucket(
  endpoint: string,
  bucket: string,
): Promise<void> {
  const { S3Client, CreateBucketCommand } = await import(
    "@aws-sdk/client-s3"
  );
  const client = new S3Client({
    endpoint,
    forcePathStyle: true,
    region: "us-east-1",
    credentials: {
      accessKeyId: "minioadmin",
      secretAccessKey: "minioadmin",
    },
  });
  try {
    await client.send(new CreateBucketCommand({ Bucket: bucket }));
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "BucketAlreadyOwnedByYou") return;
    if (err instanceof Error && err.name === "BucketAlreadyExists") return;
    throw err;
  } finally {
    client.destroy();
  }
}

export async function createGcsBucket(
  endpoint: string,
  bucket: string,
): Promise<void> {
  const url = `${endpoint}/storage/v1/b`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: bucket }),
  });
  if (!resp.ok && resp.status !== 409) {
    const body = await resp.text();
    throw new Error(
      `GCS bucket creation failed: ${resp.status} ${resp.statusText} — ${body}`,
    );
  }
  await resp.body?.cancel();
}
