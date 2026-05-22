// fetch-schema command — delegates to the appropriate provider pipeline

import { fetchAwsSchema } from "../aws/pipeline.ts";
import { fetchCloudflareSchema } from "../cloudflare/pipeline.ts";
import { fetchDigitalOceanSchema } from "../digitalocean/pipeline.ts";
import { fetchGcpSchema } from "../gcp/pipeline.ts";
import { fetchHetznerSchema } from "../hetzner/pipeline.ts";

/**
 * Fetches the latest schemas for the given provider.
 * Each provider pipeline implements its own fetch logic.
 */
export async function fetchSchema(options: {
  provider: string;
  outputPath?: string;
}): Promise<void> {
  switch (options.provider) {
    case "aws":
      await fetchAwsSchema({ outputPath: options.outputPath });
      break;
    case "cloudflare":
      await fetchCloudflareSchema({ outputPath: options.outputPath });
      break;
    case "hetzner":
      await fetchHetznerSchema({ outputPath: options.outputPath });
      break;
    case "digitalocean":
      await fetchDigitalOceanSchema({ outputPath: options.outputPath });
      break;
    case "gcp":
      await fetchGcpSchema({ outputPath: options.outputPath });
      break;
    default:
      throw new Error(
        `Unsupported provider: ${options.provider}. Supported: "aws", "cloudflare", "gcp", "hetzner", "digitalocean".`,
      );
  }
}
