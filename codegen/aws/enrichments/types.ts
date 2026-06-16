export interface AwsEnrichmentListMethod {
  /** Absolute path to the list method source file (real TypeScript, type-checkable) */
  sourceFile: string;
  /** Name of the list function export */
  functionExport: string;
  /** Zod field strings for the list method's arguments schema (each line is a field) */
  argumentFields: string[];
  /** Description for the list method */
  description: string;
}

export interface AwsEnrichmentCustomMethod {
  /** Method name as it appears on the model, e.g. "listInstances" */
  methodName: string;
  /** Human-readable description */
  description: string;
  /** Zod field strings for the method's arguments schema (each line is a field) */
  argumentFields: string[];
  /** Name of the exported function in the source file */
  functionExport: string;
  /** Whether the function returns an array (writes each item to state) or a single result */
  returnsArray: boolean;
}

export interface AwsEnrichment {
  /** CloudFormation type name, e.g., "AWS::RDS::DBCluster" */
  cfTypeName: string;
  /** Additional npm packages to add to the service's deno.json imports */
  npmImports: Record<string, string>;
  /** Absolute path to the enrichState source file (real TypeScript, type-checkable) */
  sourceFile?: string;
  /** Name of the enrichState function export */
  functionExport?: string;
  /** Extra field(s) to add inside the StateSchema z.object({}) block */
  stateFields?: string;
  /** Optional list method configuration */
  listMethod?: AwsEnrichmentListMethod;
  /** Optional custom methods — standalone native-SDK-backed methods */
  customMethods?: {
    /** Absolute path to the source file containing all custom method functions */
    sourceFile: string;
    /** Method definitions */
    methods: AwsEnrichmentCustomMethod[];
  };
}

export interface ParsedEnrichmentSource {
  /** Import lines to add to the generated model (SDK imports from the source) */
  imports: string[];
  /** The body code (schemas + function) with export keywords stripped */
  body: string;
}
