// generate-models command implementation

import { generateAwsModels } from "../aws/pipeline.ts";
import { generateDigitalOceanModels } from "../digitalocean/pipeline.ts";
import { generateGcpModels } from "../gcp/pipeline.ts";
import { generateHetznerModels } from "../hetzner/pipeline.ts";
import { stripReleaseNotes } from "../shared/version.ts";

export async function generateModels(options: {
  provider: string;
  outputDir: string;
  services?: string[];
  schemaPath?: string;
}): Promise<void> {
  switch (options.provider) {
    case "aws":
      await generateAwsProvider(options);
      break;
    case "hetzner":
      await generateHetznerProvider(options);
      break;
    case "digitalocean":
      await generateDigitalOceanProvider(options);
      break;
    case "gcp":
      await generateGcpProvider(options);
      break;
    default:
      throw new Error(
        `Unsupported provider: ${options.provider}. Supported: "aws", "gcp", "hetzner", "digitalocean".`,
      );
  }
}

async function generateHetznerProvider(options: {
  outputDir: string;
  schemaPath?: string;
}): Promise<void> {
  const hetznerOutputDir = `${options.outputDir}/hetzner-cloud`;
  console.log(`Generating hetzner models...`);
  console.log(`Output directory: ${hetznerOutputDir}`);

  const {
    version,
    models,
    libFile,
    manifest,
    readmeFile,
    licenseFile,
    denoConfigFile,
    skipped,
    errors,
    modelChanges,
    hasChanges,
  } = await generateHetznerModels({
    outputDir: hetznerOutputDir,
    schemaPath: options.schemaPath,
  });

  // Write the shared lib file
  const libPath = `${hetznerOutputDir}/${libFile.filePath}`;
  const libDir = libPath.substring(0, libPath.lastIndexOf("/"));
  await Deno.mkdir(libDir, { recursive: true });
  await Deno.writeTextFile(libPath, libFile.sourceCode);

  // Write each model file
  for (const model of models) {
    const modelPath = `${hetznerOutputDir}/${model.filePath}`;
    const modelDir = modelPath.substring(0, modelPath.lastIndexOf("/"));
    await Deno.mkdir(modelDir, { recursive: true });
    await Deno.writeTextFile(modelPath, model.sourceCode);
  }

  // Write README, LICENSE, and deno.json
  await Deno.writeTextFile(
    `${hetznerOutputDir}/README.md`,
    readmeFile.sourceCode,
  );
  await Deno.writeTextFile(
    `${hetznerOutputDir}/LICENSE.txt`,
    licenseFile.sourceCode,
  );
  await Deno.writeTextFile(
    `${hetznerOutputDir}/deno.json`,
    denoConfigFile.sourceCode,
  );

  // Report changes from pipeline
  const changedCount = modelChanges.filter((c) => c.status !== "unchanged")
    .length;
  const unchangedCount = modelChanges.filter((c) => c.status === "unchanged")
    .length;

  // Write manifest only when content actually differs from disk. Note we
  // do *not* gate on hasChanges — that flag tracks model/readme/license
  // deltas only, so a pure manifest edit (e.g. adding `repository:` via a
  // codegen change) would be missed. Strip release notes from both sides
  // so that stale notes from a prior run aren't wiped when no models changed.
  {
    const manifestPath = `${hetznerOutputDir}/${manifest.filePath}`;
    let manifestChanged = true;
    try {
      const existingManifest = await Deno.readTextFile(manifestPath);
      manifestChanged =
        stripReleaseNotes(existingManifest) !==
          stripReleaseNotes(manifest.sourceCode);
    } catch {
      // File doesn't exist — write it
    }
    if (manifestChanged) {
      await Deno.writeTextFile(manifestPath, manifest.sourceCode);
    }
  }

  // Format generated files with deno fmt
  console.log(`\nFormatting generated files...`);
  const fmtCmd = new Deno.Command("deno", {
    args: ["fmt", "--no-config", hetznerOutputDir],
  });
  const fmtResult = await fmtCmd.output();
  if (!fmtResult.success) {
    console.warn(
      `  Warning: deno fmt failed: ${
        new TextDecoder().decode(fmtResult.stderr)
      }`,
    );
  }

  console.log(`\nGeneration complete!`);
  console.log(
    `  Models: ${changedCount} changed, ${unchangedCount} unchanged`,
  );
  console.log(`  Manifest: ${hasChanges ? "changed" : "unchanged"}`);
  console.log(`  Skipped: ${skipped.length}`);
  for (const s of skipped) {
    console.log(`    ${s.path}: ${s.reason}`);
  }
  if (errors.length > 0) {
    console.log(`  Errors: ${errors.length}`);
    for (const err of errors) {
      console.log(`    ${err}`);
    }
  }
  console.log(`  Version: ${version}`);
  console.log(`  Output directory: ${hetznerOutputDir}`);
}

async function generateDigitalOceanProvider(options: {
  outputDir: string;
  schemaPath?: string;
}): Promise<void> {
  const doOutputDir = `${options.outputDir}/digitalocean`;
  console.log(`Generating digitalocean models...`);
  console.log(`Output directory: ${doOutputDir}`);

  const {
    version,
    models,
    libFile,
    manifest,
    readmeFile,
    licenseFile,
    denoConfigFile,
    skipped,
    errors,
    modelChanges,
    hasChanges,
  } = await generateDigitalOceanModels({
    outputDir: doOutputDir,
    schemaPath: options.schemaPath,
  });

  // Write the shared lib file
  const libPath = `${doOutputDir}/${libFile.filePath}`;
  const libDir = libPath.substring(0, libPath.lastIndexOf("/"));
  await Deno.mkdir(libDir, { recursive: true });
  await Deno.writeTextFile(libPath, libFile.sourceCode);

  // Write each model file
  for (const model of models) {
    const modelPath = `${doOutputDir}/${model.filePath}`;
    const modelDir = modelPath.substring(0, modelPath.lastIndexOf("/"));
    await Deno.mkdir(modelDir, { recursive: true });
    await Deno.writeTextFile(modelPath, model.sourceCode);
  }

  // Write README, LICENSE, and deno.json
  await Deno.writeTextFile(
    `${doOutputDir}/README.md`,
    readmeFile.sourceCode,
  );
  await Deno.writeTextFile(
    `${doOutputDir}/LICENSE.txt`,
    licenseFile.sourceCode,
  );
  await Deno.writeTextFile(
    `${doOutputDir}/deno.json`,
    denoConfigFile.sourceCode,
  );

  // Report changes from pipeline
  const changedCount = modelChanges.filter((c) => c.status !== "unchanged")
    .length;
  const unchangedCount = modelChanges.filter((c) => c.status === "unchanged")
    .length;

  // Write manifest only when content actually differs from disk. Note we
  // do *not* gate on hasChanges — that flag tracks model/readme/license
  // deltas only, so a pure manifest edit (e.g. adding `repository:` via a
  // codegen change) would be missed. Strip release notes from both sides
  // so that stale notes from a prior run aren't wiped when no models changed.
  {
    const manifestPath = `${doOutputDir}/${manifest.filePath}`;
    let manifestChanged = true;
    try {
      const existingManifest = await Deno.readTextFile(manifestPath);
      manifestChanged =
        stripReleaseNotes(existingManifest) !==
          stripReleaseNotes(manifest.sourceCode);
    } catch {
      // File doesn't exist — write it
    }
    if (manifestChanged) {
      await Deno.writeTextFile(manifestPath, manifest.sourceCode);
    }
  }

  // Format generated files with deno fmt
  console.log(`\nFormatting generated files...`);
  const fmtCmd = new Deno.Command("deno", {
    args: ["fmt", "--no-config", doOutputDir],
  });
  const fmtResult = await fmtCmd.output();
  if (!fmtResult.success) {
    console.warn(
      `  Warning: deno fmt failed: ${
        new TextDecoder().decode(fmtResult.stderr)
      }`,
    );
  }

  console.log(`\nGeneration complete!`);
  console.log(
    `  Models: ${changedCount} changed, ${unchangedCount} unchanged`,
  );
  console.log(`  Manifest: ${hasChanges ? "changed" : "unchanged"}`);
  console.log(`  Skipped: ${skipped.length}`);
  for (const s of skipped) {
    console.log(`    ${s.path}: ${s.reason}`);
  }
  if (errors.length > 0) {
    console.log(`  Errors: ${errors.length}`);
    for (const err of errors) {
      console.log(`    ${err}`);
    }
  }
  console.log(`  Version: ${version}`);
  console.log(`  Output directory: ${doOutputDir}`);
}

async function generateAwsProvider(options: {
  outputDir: string;
  services?: string[];
  schemaPath?: string;
}): Promise<void> {
  console.log(`Generating aws models...`);
  console.log(`Output directory: ${options.outputDir}`);

  if (options.services && options.services.length > 0) {
    console.log(`Service filter: ${options.services.join(", ")}`);
  }

  const {
    datePrefix,
    services,
    skipped,
    errors,
  } = await generateAwsModels({
    services: options.services,
    outputDir: options.outputDir,
    schemaPath: options.schemaPath,
  });

  let totalModelsChanged = 0;
  let totalModelsUnchanged = 0;

  for (const [serviceName, serviceResult] of services) {
    const serviceOutputDir = `${options.outputDir}/aws/${serviceName}`;

    // Write the shared lib file
    const libPath = `${serviceOutputDir}/${serviceResult.libFile.filePath}`;
    const libDir = libPath.substring(0, libPath.lastIndexOf("/"));
    await Deno.mkdir(libDir, { recursive: true });
    await Deno.writeTextFile(libPath, serviceResult.libFile.sourceCode);

    // Write each model file
    for (const model of serviceResult.models) {
      const modelPath = `${serviceOutputDir}/${model.filePath}`;
      const modelDir = modelPath.substring(0, modelPath.lastIndexOf("/"));
      await Deno.mkdir(modelDir, { recursive: true });
      await Deno.writeTextFile(modelPath, model.sourceCode);
    }

    // Remove orphan model files — .ts files in extensions/models/ that
    // aren't in the manifest's models: list any more (typically because the
    // CF schema dropped the resource or it lost its read handler). Without
    // this, stale files sit in the repo with outdated codegen output.
    const generatedFileNames = new Set(
      serviceResult.models.map((m) => m.filePath.split("/").pop()!),
    );
    const modelsDir = `${serviceOutputDir}/extensions/models`;
    try {
      for await (const entry of Deno.readDir(modelsDir)) {
        if (
          entry.isFile && entry.name.endsWith(".ts") &&
          !generatedFileNames.has(entry.name)
        ) {
          await Deno.remove(`${modelsDir}/${entry.name}`);
          console.log(
            `  [${serviceName}] removed orphan model: ${entry.name}`,
          );
        }
      }
    } catch {
      // extensions/models/ doesn't exist yet — nothing to prune
    }

    // Write README, LICENSE, and deno.json
    await Deno.writeTextFile(
      `${serviceOutputDir}/README.md`,
      serviceResult.readmeFile.sourceCode,
    );
    await Deno.writeTextFile(
      `${serviceOutputDir}/LICENSE.txt`,
      serviceResult.licenseFile.sourceCode,
    );
    await Deno.writeTextFile(
      `${serviceOutputDir}/deno.json`,
      serviceResult.denoConfigFile.sourceCode,
    );

    // Report changes
    const changedCount = serviceResult.modelChanges.filter(
      (c) => c.status !== "unchanged",
    ).length;
    const unchangedCount = serviceResult.modelChanges.filter(
      (c) => c.status === "unchanged",
    ).length;
    totalModelsChanged += changedCount;
    totalModelsUnchanged += unchangedCount;

    // Write manifest only when content actually differs from disk. Note we
    // do *not* gate on serviceResult.hasChanges here — that flag tracks
    // model/readme/license deltas only, so a pure manifest edit (e.g.
    // adding `repository:` or `platforms:` via a codegen change) would be
    // missed. Strip release notes from both sides so that stale notes
    // from a prior run aren't wiped when no models changed.
    {
      const manifestPath =
        `${serviceOutputDir}/${serviceResult.manifest.filePath}`;
      let manifestChanged = true;
      try {
        const existingManifest = await Deno.readTextFile(manifestPath);
        manifestChanged =
          stripReleaseNotes(existingManifest) !==
            stripReleaseNotes(serviceResult.manifest.sourceCode);
      } catch {
        // File doesn't exist — write it
      }
      if (manifestChanged) {
        await Deno.writeTextFile(
          manifestPath,
          serviceResult.manifest.sourceCode,
        );
      }
    }

    // Format generated files with deno fmt
    const fmtCmd = new Deno.Command("deno", {
      args: ["fmt", "--no-config", serviceOutputDir],
    });
    const fmtResult = await fmtCmd.output();
    if (!fmtResult.success) {
      console.warn(
        `  Warning: deno fmt failed for ${serviceName}: ${
          new TextDecoder().decode(fmtResult.stderr)
        }`,
      );
    }
  }

  // Summarize skipped schemas by reason
  const skipsByReason = new Map<string, number>();
  for (const s of skipped) {
    skipsByReason.set(s.reason, (skipsByReason.get(s.reason) || 0) + 1);
  }

  console.log(`\nGeneration complete!`);
  console.log(`  Services: ${services.size}`);
  console.log(
    `  Models: ${totalModelsChanged} changed, ${totalModelsUnchanged} unchanged`,
  );
  console.log(`  Schemas skipped: ${skipped.length}`);
  for (const [reason, count] of [...skipsByReason.entries()].sort()) {
    console.log(`    ${reason}: ${count}`);
  }
  if (errors.length > 0) {
    console.log(`  Errors: ${errors.length}`);
    for (const err of errors) {
      console.log(`    ${err}`);
    }
  }
  console.log(`  Date prefix: ${datePrefix}`);
  console.log(`  Output directory: ${options.outputDir}`);
}

async function generateGcpProvider(options: {
  outputDir: string;
  services?: string[];
  schemaPath?: string;
}): Promise<void> {
  console.log(`Generating gcp models...`);
  console.log(`Output directory: ${options.outputDir}`);

  if (options.services && options.services.length > 0) {
    console.log(`Service filter: ${options.services.join(", ")}`);
  }

  const {
    datePrefix,
    services,
    skipped,
    errors,
  } = await generateGcpModels({
    services: options.services,
    outputDir: options.outputDir,
    schemaPath: options.schemaPath,
  });

  let totalModelsChanged = 0;
  let totalModelsUnchanged = 0;

  for (const [serviceName, serviceResult] of services) {
    const serviceOutputDir = `${options.outputDir}/gcp/${serviceName}`;

    // Write the shared lib file
    const libPath = `${serviceOutputDir}/${serviceResult.libFile.filePath}`;
    const libDir = libPath.substring(0, libPath.lastIndexOf("/"));
    await Deno.mkdir(libDir, { recursive: true });
    await Deno.writeTextFile(libPath, serviceResult.libFile.sourceCode);

    // Write each model file
    for (const model of serviceResult.models) {
      const modelPath = `${serviceOutputDir}/${model.filePath}`;
      const modelDir = modelPath.substring(0, modelPath.lastIndexOf("/"));
      await Deno.mkdir(modelDir, { recursive: true });
      await Deno.writeTextFile(modelPath, model.sourceCode);
    }

    // Remove orphan model files — .ts files in extensions/models/ that
    // aren't in the manifest's models: list any more (typically because the
    // CF schema dropped the resource or it lost its read handler). Without
    // this, stale files sit in the repo with outdated codegen output.
    const generatedFileNames = new Set(
      serviceResult.models.map((m) => m.filePath.split("/").pop()!),
    );
    const modelsDir = `${serviceOutputDir}/extensions/models`;
    try {
      for await (const entry of Deno.readDir(modelsDir)) {
        if (
          entry.isFile && entry.name.endsWith(".ts") &&
          !generatedFileNames.has(entry.name)
        ) {
          await Deno.remove(`${modelsDir}/${entry.name}`);
          console.log(
            `  [${serviceName}] removed orphan model: ${entry.name}`,
          );
        }
      }
    } catch {
      // extensions/models/ doesn't exist yet — nothing to prune
    }

    // Write README, LICENSE, and deno.json
    await Deno.writeTextFile(
      `${serviceOutputDir}/README.md`,
      serviceResult.readmeFile.sourceCode,
    );
    await Deno.writeTextFile(
      `${serviceOutputDir}/LICENSE.txt`,
      serviceResult.licenseFile.sourceCode,
    );
    await Deno.writeTextFile(
      `${serviceOutputDir}/deno.json`,
      serviceResult.denoConfigFile.sourceCode,
    );

    // Report changes
    const changedCount = serviceResult.modelChanges.filter(
      (c) => c.status !== "unchanged",
    ).length;
    const unchangedCount = serviceResult.modelChanges.filter(
      (c) => c.status === "unchanged",
    ).length;
    totalModelsChanged += changedCount;
    totalModelsUnchanged += unchangedCount;

    // Write manifest only when content actually differs from disk. Note we
    // do *not* gate on serviceResult.hasChanges here — that flag tracks
    // model/readme/license deltas only, so a pure manifest edit (e.g.
    // adding `repository:` or `platforms:` via a codegen change) would be
    // missed. Strip release notes from both sides so that stale notes
    // from a prior run aren't wiped when no models changed.
    {
      const manifestPath =
        `${serviceOutputDir}/${serviceResult.manifest.filePath}`;
      let manifestChanged = true;
      try {
        const existingManifest = await Deno.readTextFile(manifestPath);
        manifestChanged =
          stripReleaseNotes(existingManifest) !==
            stripReleaseNotes(serviceResult.manifest.sourceCode);
      } catch {
        // File doesn't exist — write it
      }
      if (manifestChanged) {
        await Deno.writeTextFile(
          manifestPath,
          serviceResult.manifest.sourceCode,
        );
      }
    }

    // Format generated files with deno fmt
    const fmtCmd = new Deno.Command("deno", {
      args: ["fmt", "--no-config", serviceOutputDir],
    });
    const fmtResult = await fmtCmd.output();
    if (!fmtResult.success) {
      console.warn(
        `  Warning: deno fmt failed for ${serviceName}: ${
          new TextDecoder().decode(fmtResult.stderr)
        }`,
      );
    }
  }

  // Summarize skipped
  const skipsByReason = new Map<string, number>();
  for (const s of skipped) {
    const key = `${s.service}/${s.resource}: ${s.reason}`;
    skipsByReason.set(key, (skipsByReason.get(key) || 0) + 1);
  }

  console.log(`\nGeneration complete!`);
  console.log(`  Services: ${services.size}`);
  console.log(
    `  Models: ${totalModelsChanged} changed, ${totalModelsUnchanged} unchanged`,
  );
  console.log(`  Schemas skipped: ${skipped.length}`);
  if (errors.length > 0) {
    console.log(`  Errors: ${errors.length}`);
    for (const err of errors) {
      console.log(`    ${err}`);
    }
  }
  console.log(`  Date prefix: ${datePrefix}`);
  console.log(`  Output directory: ${options.outputDir}`);
}
