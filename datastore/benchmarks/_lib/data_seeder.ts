import { join } from "@std/path";
import { ensureDir } from "@std/fs";

export interface SeedOptions {
  cachePath: string;
  fileCount?: number;
  modelCount?: number;
  fileSizeBytes?: number;
}

export interface SeedResult {
  totalFiles: number;
  totalBytes: number;
  models: Array<{ modelType: string; modelId: string; fileCount: number }>;
}

export async function seedTestData(options: SeedOptions): Promise<SeedResult> {
  const {
    cachePath,
    fileCount = 1000,
    modelCount = 50,
    fileSizeBytes = 5120,
  } = options;

  await ensureDir(cachePath);

  const filesPerModel = Math.ceil(fileCount / modelCount);
  const models: SeedResult["models"] = [];
  let totalFiles = 0;
  let totalBytes = 0;

  for (let m = 0; m < modelCount; m++) {
    const modelType = `@test/model-type-${String(m).padStart(3, "0")}`;
    const modelId = crypto.randomUUID();
    const modelDir = join(cachePath, "data", modelType, modelId);
    await ensureDir(modelDir);

    let modelFiles = 0;
    for (let f = 0; f < filesPerModel && totalFiles < fileCount; f++) {
      const fileName = `file-${String(f).padStart(4, "0")}.json`;
      const content = generateFileContent(fileSizeBytes, m, f);
      await Deno.writeFile(join(modelDir, fileName), content);
      totalFiles++;
      totalBytes += content.byteLength;
      modelFiles++;
    }
    models.push({ modelType, modelId, fileCount: modelFiles });
  }

  return { totalFiles, totalBytes, models };
}

function generateFileContent(
  targetBytes: number,
  modelIdx: number,
  fileIdx: number,
): Uint8Array {
  const payload = JSON.stringify({
    model: modelIdx,
    file: fileIdx,
    timestamp: new Date().toISOString(),
    data: "x".repeat(Math.max(0, targetBytes - 100)),
  });
  return new TextEncoder().encode(payload);
}

export async function modifyOneFile(
  cachePath: string,
  models: SeedResult["models"],
  modelIndex: number,
): Promise<string> {
  const model = models[modelIndex];
  const modelDir = join(cachePath, "data", model.modelType, model.modelId);
  const fileName = "file-0000.json";
  const filePath = join(modelDir, fileName);
  const content = JSON.stringify({
    model: modelIndex,
    file: 0,
    timestamp: new Date().toISOString(),
    data: "modified-" + crypto.randomUUID(),
  });
  await Deno.writeTextFile(filePath, content);
  return join("data", model.modelType, model.modelId, fileName);
}

export async function bulkModifyFiles(
  cachePath: string,
  models: SeedResult["models"],
  count: number,
): Promise<string[]> {
  const paths: string[] = [];
  for (let i = 0; i < Math.min(count, models.length); i++) {
    const p = await modifyOneFile(cachePath, models, i);
    paths.push(p);
  }
  return paths;
}
