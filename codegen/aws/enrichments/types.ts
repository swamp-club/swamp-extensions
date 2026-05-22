export interface AwsEnrichment {
  /** CloudFormation type name, e.g., "AWS::RDS::DBCluster" */
  cfTypeName: string;
  /** Additional npm packages to add to the service's deno.json imports */
  npmImports: Record<string, string>;
  /** Absolute path to the enrichment source file (real TypeScript, type-checkable) */
  sourceFile: string;
  /** Name of the enrichState function export */
  functionExport: string;
  /** Extra field(s) to add inside the StateSchema z.object({}) block */
  stateFields: string;
}

export interface ParsedEnrichmentSource {
  /** Import lines to add to the generated model (SDK imports from the source) */
  imports: string[];
  /** The body code (schemas + function) with export keywords stripped */
  body: string;
}
