export interface AwsEnrichment {
  /** CloudFormation type name, e.g., "AWS::RDS::DBCluster" */
  cfTypeName: string;
  /** Additional npm packages to add to the service's deno.json imports */
  npmImports: Record<string, string>;
  /** Import lines to add at the top of the generated model file */
  imports: string[];
  /** Extra Zod schema definitions emitted before StateSchema */
  schemas: string;
  /** Extra fields appended inside the StateSchema z.object({}) block */
  stateFields: string;
  /** The enrichState() function body, emitted after the StateData type alias */
  enrichFunction: string;
}
