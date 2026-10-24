// deno-lint-ignore-file no-import-prefix

import { z } from "npm:zod@4.6.7";
import {
  ACMClient,
  DescribeCertificateCommand,
} from "npm:@aws-sdk/client-acm@3.1147.0";
import type { AwsCredentials } from "../../../../model/aws/certificatemanager/extensions/models/_lib/aws.ts";

export const AcmDomainValidationSchema = z.object({
  DomainName: z.string().optional(),
  ValidationDomain: z.string().optional(),
  ValidationStatus: z.string().optional(),
  ValidationMethod: z.string().optional(),
  ResourceRecord: z.object({
    Name: z.string().optional(),
    Type: z.string().optional(),
    Value: z.string().optional(),
  }).optional(),
});

export const AcmRenewalSummarySchema = z.object({
  RenewalStatus: z.string().optional(),
  RenewalStatusReason: z.string().optional(),
  UpdatedAt: z.string().optional(),
  DomainValidationOptions: z.array(AcmDomainValidationSchema).optional(),
});

/**
 * Adds the attributes ACM reports for a certificate but CloudFormation does
 * not model: validity window, type, status, renewal eligibility, the
 * resources using it, and the renewal summary.
 */
export async function enrichState(
  state: { CertificateArn?: string } & Record<string, unknown>,
  credentials: AwsCredentials,
): Promise<Record<string, unknown>> {
  const arn = state.CertificateArn;
  if (!arn) return state;
  try {
    // disableImdsIfOffEc2 inlined — enrichments run at codegen time, not extension runtime
    if (
      !Deno.env.get("AWS_EC2_METADATA_DISABLED") &&
      !Deno.env.get("AWS_CONTAINER_CREDENTIALS_RELATIVE_URI") &&
      !Deno.env.get("AWS_CONTAINER_CREDENTIALS_FULL_URI")
    ) {
      Deno.env.set("AWS_EC2_METADATA_DISABLED", "true");
    }
    // The certificate lives in the region its ARN names, which is where the
    // CloudControl read found it, whatever the profile or env would resolve.
    const config: Record<string, unknown> = {
      region: arn.split(":")[3] ||
        credentials.region ||
        Deno.env.get("AWS_REGION") ||
        Deno.env.get("AWS_DEFAULT_REGION") ||
        "us-east-1",
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
    const acmClient = new ACMClient(config);
    let resp;
    try {
      resp = await acmClient.send(
        new DescribeCertificateCommand({ CertificateArn: arn }),
      );
    } finally {
      acmClient.destroy();
    }
    const cert = resp.Certificate;
    if (!cert) return state;
    const renewal = cert.RenewalSummary;
    return {
      ...state,
      NotAfter: cert.NotAfter?.toISOString(),
      NotBefore: cert.NotBefore?.toISOString(),
      Type: cert.Type,
      Status: cert.Status,
      RenewalEligibility: cert.RenewalEligibility,
      InUseBy: cert.InUseBy,
      RenewalSummary: renewal
        ? {
          RenewalStatus: renewal.RenewalStatus,
          RenewalStatusReason: renewal.RenewalStatusReason,
          UpdatedAt: renewal.UpdatedAt?.toISOString(),
          DomainValidationOptions: renewal.DomainValidationOptions?.map((
            d,
          ) => ({
            DomainName: d.DomainName,
            ValidationDomain: d.ValidationDomain,
            ValidationStatus: d.ValidationStatus,
            ValidationMethod: d.ValidationMethod,
            ResourceRecord: d.ResourceRecord,
          })),
        }
        : undefined,
    };
  } catch {
    return state;
  }
}
