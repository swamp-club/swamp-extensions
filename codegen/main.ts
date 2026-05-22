// CLI entry point for cloud provider model generation

import { Command } from "@cliffy/command";
import { fetchSchema } from "./commands/fetchSchema.ts";
import { generateModels } from "./commands/generate.ts";

const DEFAULT_OUTPUT_DIR = new URL("../model", import.meta.url).pathname;

await new Command()
  .name("codegen")
  .version("0.1.0")
  .description(
    "Generate swamp extension models for AWS, Cloudflare, GCP, Hetzner Cloud, and DigitalOcean",
  )
  .command(
    "generate-models",
    new Command()
      .description("Generate model TypeScript files from OpenAPI schemas")
      .option(
        "--provider <provider:string>",
        "Cloud provider to generate models for",
        { required: true },
      )
      .option(
        "--output-dir <dir:string>",
        "Output directory for generated files",
        { default: DEFAULT_OUTPUT_DIR },
      )
      .option(
        "--schema-path <path:string>",
        "Path to the schema JSON file",
      )
      .arguments("[...services:string]")
      .action(async (options, ...services) => {
        const serviceFilter = services.length > 0 ? services : undefined;
        await generateModels({
          provider: options.provider,
          outputDir: options.outputDir,
          services: serviceFilter,
          schemaPath: options.schemaPath,
        });
      }),
  )
  .command(
    "fetch-schema",
    new Command()
      .description("Fetch the latest resource schemas from a cloud provider")
      .option(
        "--provider <provider:string>",
        "Cloud provider to fetch schemas for",
        { required: true },
      )
      .option(
        "--output-path <path:string>",
        "Path to write the consolidated schema JSON",
      )
      .action(async (options) => {
        await fetchSchema({
          provider: options.provider,
          outputPath: options.outputPath,
        });
      }),
  )
  .parse(Deno.args);
