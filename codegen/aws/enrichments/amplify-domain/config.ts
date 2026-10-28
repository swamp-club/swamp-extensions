import type { AwsEnrichment } from "../types.ts";

export const enrichment: AwsEnrichment = {
  cfTypeName: "AWS::Amplify::Domain",
  npmImports: {
    "@aws-sdk/client-amplify": "npm:@aws-sdk/client-amplify@3.1156.0",
    "@smithy/node-http-handler": "npm:@smithy/node-http-handler@4.9.7",
  },
  customMethods: {
    sourceFile: new URL("./methods.ts", import.meta.url).pathname,
    methods: [
      {
        methodName: "getDomainAssociation",
        description:
          "Get this domain's status and which branch each subdomain is bound to (the model's SubDomainSettings global argument must still be supplied)",
        argumentFields: [
          `    timeoutMs: z.number().int().min(1000).max(120000).describe("Deadline for the call in milliseconds (default: 30000)").optional(),`,
        ],
        functionExport: "getDomainAssociation",
        returnsArray: false,
        output: {
          resourceName: "domainAssociation",
          description:
            "Domain status and subdomain-to-branch bindings from the most recent getDomainAssociation call",
          schemaExport: "DomainAssociationOutputSchema",
          lifetime: "30d",
          garbageCollection: 10,
          instanceKey: { arg: "DomainName" },
        },
      },
    ],
  },
};
