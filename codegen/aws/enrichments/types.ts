export interface AwsEnrichment {
  /** CloudFormation type name, e.g., "AWS::RDS::DBCluster" */
  cfTypeName: string;
  /** Additional npm packages to add to the service's deno.json imports */
  npmImports: Record<string, string>;
  /** Absolute path to the enrichment source file (real TypeScript, copied to output) */
  sourceFile: string;
  /** Named exports from the source file that are Zod schemas (imported by the generated model) */
  schemaExports: string[];
  /** Named export from the source file for the enrichState function */
  functionExport: string;
  /** Extra field(s) to add inside the StateSchema z.object({}) block, referencing schemaExports */
  stateFields: string;
}
