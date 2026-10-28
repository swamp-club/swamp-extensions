// deno-lint-ignore-file no-import-prefix

import { z } from "npm:zod@4.6.7";
import {
  AmplifyClient,
  GetDomainAssociationCommand,
  type GetDomainAssociationCommandOutput,
} from "npm:@aws-sdk/client-amplify@3.1156.0";
import { NodeHttpHandler } from "npm:@smithy/node-http-handler@4.9.7";
import type { AwsCredentials } from "../../../../model/aws/amplify/extensions/models/_lib/aws.ts";

export const DomainAssociationOutputSchema = z.object({
  appId: z.string(),
  domainName: z.string(),
  domainStatus: z.string().optional(),
  updateStatus: z.string().optional(),
  statusReason: z.string().optional(),
  enableAutoSubDomain: z.boolean().optional(),
  certificateType: z.string().optional(),
  branchBindings: z.array(z.object({
    prefix: z.string().optional(),
    branchName: z.string().optional(),
    verified: z.boolean().optional(),
  })),
  observedAt: z.string(),
});

function createAmplifyClient(credentials: AwsCredentials): AmplifyClient {
  // disableImdsIfOffEc2 inlined — enrichments run at codegen time, not extension runtime
  if (
    !Deno.env.get("AWS_EC2_METADATA_DISABLED") &&
    !Deno.env.get("AWS_CONTAINER_CREDENTIALS_RELATIVE_URI") &&
    !Deno.env.get("AWS_CONTAINER_CREDENTIALS_FULL_URI")
  ) {
    Deno.env.set("AWS_EC2_METADATA_DISABLED", "true");
  }

  const region = credentials.region ??
    Deno.env.get("AWS_REGION") ??
    Deno.env.get("AWS_DEFAULT_REGION") ??
    "us-east-1";

  const config: Record<string, unknown> = {
    region,
    requestHandler: new NodeHttpHandler(),
  };

  if (credentials.accessKeyId && credentials.secretAccessKey) {
    config.credentials = {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      ...(credentials.sessionToken
        ? { sessionToken: credentials.sessionToken }
        : {}),
    };
  }

  return new AmplifyClient(config);
}

export async function getDomainAssociation(
  args: Record<string, unknown>,
  credentials: AwsCredentials,
): Promise<Record<string, unknown>> {
  const appId = args.AppId as string;
  const domainName = args.DomainName as string;
  const requested = typeof args.timeoutMs === "number" &&
      Number.isFinite(args.timeoutMs)
    ? Math.trunc(args.timeoutMs)
    : 30000;
  const timeoutMs = Math.min(Math.max(requested, 1), 120000);

  const client = createAmplifyClient(credentials);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let response;
  try {
    // Settle at the deadline even if the SDK is waiting out a retry backoff;
    // the signal aborts any request in flight.
    response = await new Promise<GetDomainAssociationCommandOutput>(
      (resolve, reject) => {
        const onAbort = () => reject(new Error("deadline exceeded"));
        controller.signal.addEventListener("abort", onAbort, { once: true });
        client.send(
          new GetDomainAssociationCommand({ appId, domainName }),
          { abortSignal: controller.signal },
        ).then((value) => {
          controller.signal.removeEventListener("abort", onAbort);
          resolve(value);
        }, (error) => {
          controller.signal.removeEventListener("abort", onAbort);
          reject(error);
        });
      },
    );
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error(
        `GetDomainAssociation for ${domainName} did not complete within ${timeoutMs}ms`,
      );
    }
    throw error;
  } finally {
    clearTimeout(timer);
    client.destroy();
  }

  const association = response.domainAssociation;
  if (!association) {
    throw new Error(
      `Domain association ${domainName} not found on app ${appId}`,
    );
  }

  return {
    appId,
    domainName: association.domainName ?? domainName,
    domainStatus: association.domainStatus,
    updateStatus: association.updateStatus,
    statusReason: association.statusReason,
    enableAutoSubDomain: association.enableAutoSubDomain,
    certificateType: association.certificate?.type,
    branchBindings: (association.subDomains ?? []).map((subDomain) => ({
      prefix: subDomain.subDomainSetting?.prefix,
      branchName: subDomain.subDomainSetting?.branchName,
      verified: subDomain.verified,
    })),
    observedAt: new Date().toISOString(),
  };
}
