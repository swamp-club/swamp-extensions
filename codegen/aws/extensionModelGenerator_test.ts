import { assertSnapshot } from "@std/testing/snapshot";
import {
  type AwsExtensionModelInput,
  generateAwsExtensionModel,
  resolveNamingField,
} from "./extensionModelGenerator.ts";
import type { AwsEnrichment } from "./enrichments/index.ts";
import { assertEquals } from "@std/assert";

// ---------------------------------------------------------------------------
// resolveNamingField unit tests
// ---------------------------------------------------------------------------

Deno.test("resolveNamingField - writable primary ID uses that field", () => {
  const result = resolveNamingField(
    {
      primaryIdentifier: ["BucketName"],
      readOnly: [],
      writeOnly: [],
      createOnly: [],
    },
    {
      typeName: "AWS::S3::Bucket",
      description: "",
      primaryIdentifier: ["/properties/BucketName"],
      properties: { BucketName: { type: "string" } },
    },
  );
  assertEquals(result, { field: "BucketName", synthetic: false });
});

Deno.test("resolveNamingField - read-only primary ID injects synthetic name", () => {
  const result = resolveNamingField(
    {
      primaryIdentifier: ["Arn"],
      readOnly: ["Arn"],
      writeOnly: [],
      createOnly: [],
    },
    {
      typeName: "AWS::IAM::Role",
      description: "",
      primaryIdentifier: ["/properties/Arn"],
      properties: { Arn: { type: "string" } },
    },
  );
  assertEquals(result, { field: "name", synthetic: true });
});

Deno.test("resolveNamingField - composite primary ID injects synthetic name", () => {
  const result = resolveNamingField(
    {
      primaryIdentifier: ["VpcId", "SubnetId"],
      readOnly: [],
      writeOnly: [],
      createOnly: [],
    },
    {
      typeName: "AWS::EC2::Subnet",
      description: "",
      primaryIdentifier: ["/properties/VpcId", "/properties/SubnetId"],
      properties: { VpcId: { type: "string" }, SubnetId: { type: "string" } },
    },
  );
  assertEquals(result, { field: "name", synthetic: true });
});

Deno.test("resolveNamingField - primary ID not in properties injects synthetic name", () => {
  const result = resolveNamingField(
    { primaryIdentifier: ["Id"], readOnly: [], writeOnly: [], createOnly: [] },
    {
      typeName: "AWS::EC2::VPC",
      description: "",
      primaryIdentifier: ["/properties/Id"],
      properties: { CidrBlock: { type: "string" } },
    },
  );
  assertEquals(result, { field: "name", synthetic: true });
});

// ---------------------------------------------------------------------------
// Snapshot: simple resource with all CRUD handlers, writable primary ID
// ---------------------------------------------------------------------------

Deno.test("generateAwsExtensionModel - all handlers, natural name", async (t) => {
  const input: AwsExtensionModelInput = {
    typeName: "AWS::S3::Bucket",
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  BucketName: z.string().describe("The name of the S3 bucket"),`,
      resourceSchemaBody:
        `  BucketName: z.string().optional(),\n  Arn: z.string().optional(),`,
    },
    onlyProperties: {
      primaryIdentifier: ["BucketName"],
      readOnly: ["Arn"],
      writeOnly: [],
      createOnly: [],
    },
    cfSchema: {
      typeName: "AWS::S3::Bucket",
      description: "AWS S3 Bucket",
      primaryIdentifier: ["/properties/BucketName"],
      properties: {
        BucketName: {
          type: "string",
          description: "The name of the S3 bucket",
        },
        Arn: { type: "string" },
      },
    },
    handlers: { create: true, read: true, update: true, delete: true },
    version: "2026.01.01.1",
    modelType: "@swamp/aws/s3/bucket",
  };

  await assertSnapshot(t, generateAwsExtensionModel(input));
});

// ---------------------------------------------------------------------------
// Snapshot: synthetic name (read-only primary ID)
// ---------------------------------------------------------------------------

Deno.test("generateAwsExtensionModel - synthetic name", async (t) => {
  const input: AwsExtensionModelInput = {
    typeName: "AWS::IAM::Role",
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  RoleName: z.string().describe("The name of the IAM role"),\n  AssumeRolePolicyDocument: z.record(z.string(), z.unknown()).describe("The trust policy"),`,
      resourceSchemaBody:
        `  RoleName: z.string().optional(),\n  Arn: z.string().optional(),\n  RoleId: z.string().optional(),`,
    },
    onlyProperties: {
      primaryIdentifier: ["Arn"],
      readOnly: ["Arn", "RoleId"],
      writeOnly: [],
      createOnly: [],
    },
    cfSchema: {
      typeName: "AWS::IAM::Role",
      description: "AWS IAM Role",
      primaryIdentifier: ["/properties/Arn"],
      properties: {
        RoleName: { type: "string" },
        AssumeRolePolicyDocument: { type: "object" },
        Arn: { type: "string" },
        RoleId: { type: "string" },
      },
    },
    handlers: { create: true, read: true, update: true, delete: true },
    version: "2026.01.01.1",
    modelType: "@swamp/aws/iam/role",
  };

  await assertSnapshot(t, generateAwsExtensionModel(input));
});

// ---------------------------------------------------------------------------
// Snapshot: composite primary identifier
// ---------------------------------------------------------------------------

Deno.test("generateAwsExtensionModel - composite primary identifier", async (t) => {
  const input: AwsExtensionModelInput = {
    typeName: "AWS::EC2::SubnetRouteTableAssociation",
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  SubnetId: z.string().describe("The subnet ID"),\n  RouteTableId: z.string().describe("The route table ID"),`,
      resourceSchemaBody:
        `  SubnetId: z.string().optional(),\n  RouteTableId: z.string().optional(),\n  Id: z.string().optional(),`,
    },
    onlyProperties: {
      primaryIdentifier: ["SubnetId", "RouteTableId"],
      readOnly: ["Id"],
      writeOnly: [],
      createOnly: ["SubnetId"],
    },
    cfSchema: {
      typeName: "AWS::EC2::SubnetRouteTableAssociation",
      description: "Associates a subnet with a route table",
      primaryIdentifier: ["/properties/SubnetId", "/properties/RouteTableId"],
      properties: {
        SubnetId: { type: "string" },
        RouteTableId: { type: "string" },
        Id: { type: "string" },
      },
    },
    handlers: { create: true, read: true, update: true, delete: true },
    version: "2026.01.01.1",
    modelType: "@swamp/aws/ec2/subnet_route_table_association",
  };

  await assertSnapshot(t, generateAwsExtensionModel(input));
});

// ---------------------------------------------------------------------------
// Snapshot: createOnly properties in update
// ---------------------------------------------------------------------------

Deno.test("generateAwsExtensionModel - createOnly properties filtered in update", async (t) => {
  const input: AwsExtensionModelInput = {
    typeName: "AWS::EC2::Instance",
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  InstanceType: z.string().describe("The instance type"),\n  ImageId: z.string().describe("The AMI ID"),`,
      resourceSchemaBody:
        `  InstanceId: z.string().optional(),\n  InstanceType: z.string().optional(),\n  ImageId: z.string().optional(),`,
    },
    onlyProperties: {
      primaryIdentifier: ["InstanceId"],
      readOnly: ["InstanceId"],
      writeOnly: [],
      createOnly: ["ImageId"],
    },
    cfSchema: {
      typeName: "AWS::EC2::Instance",
      description: "An Amazon EC2 instance",
      primaryIdentifier: ["/properties/InstanceId"],
      properties: {
        InstanceType: { type: "string" },
        ImageId: { type: "string" },
        InstanceId: { type: "string" },
      },
    },
    handlers: { create: true, read: true, update: true, delete: true },
    version: "2026.01.01.1",
    modelType: "@swamp/aws/ec2/instance",
  };

  await assertSnapshot(t, generateAwsExtensionModel(input));
});

// ---------------------------------------------------------------------------
// Snapshot: no update/delete handlers
// ---------------------------------------------------------------------------

Deno.test("generateAwsExtensionModel - read-only resource (no update, no delete)", async (t) => {
  const input: AwsExtensionModelInput = {
    typeName: "AWS::CloudFormation::StackSet",
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  StackSetName: z.string().describe("The name of the stack set"),`,
      resourceSchemaBody:
        `  StackSetName: z.string().optional(),\n  StackSetId: z.string().optional(),`,
    },
    onlyProperties: {
      primaryIdentifier: ["StackSetId"],
      readOnly: ["StackSetId"],
      writeOnly: [],
      createOnly: [],
    },
    cfSchema: {
      typeName: "AWS::CloudFormation::StackSet",
      description: "A CloudFormation StackSet",
      primaryIdentifier: ["/properties/StackSetId"],
      properties: {
        StackSetName: { type: "string" },
        StackSetId: { type: "string" },
      },
    },
    handlers: { create: true, read: true, update: false, delete: false },
    version: "2026.01.01.1",
    modelType: "@swamp/aws/cloudformation/stack_set",
  };

  await assertSnapshot(t, generateAwsExtensionModel(input));
});

// ---------------------------------------------------------------------------
// Snapshot: extracted schemas + StateSchema collision
// ---------------------------------------------------------------------------

Deno.test("generateAwsExtensionModel - extracted schemas and StateSchema collision", async (t) => {
  const input: AwsExtensionModelInput = {
    typeName: "AWS::ECS::TaskDefinition",
    zodResult: {
      extractedSchemas: [
        {
          name: "StateSchema",
          declaration:
            `const StateSchema = z.object({\n  Memory: z.string().optional(),\n});`,
        },
      ],
      inputSchemaBody: `  Family: z.string().describe("The task family name"),`,
      resourceSchemaBody:
        `  Family: z.string().optional(),\n  TaskDefinitionArn: z.string().optional(),`,
    },
    onlyProperties: {
      primaryIdentifier: ["TaskDefinitionArn"],
      readOnly: ["TaskDefinitionArn"],
      writeOnly: [],
      createOnly: [],
    },
    cfSchema: {
      typeName: "AWS::ECS::TaskDefinition",
      description: "An ECS task definition",
      primaryIdentifier: ["/properties/TaskDefinitionArn"],
      properties: {
        Family: { type: "string" },
        TaskDefinitionArn: { type: "string" },
      },
    },
    handlers: { create: true, read: true, update: false, delete: true },
    version: "2026.01.01.1",
    modelType: "@swamp/aws/ecs/task_definition",
  };

  await assertSnapshot(t, generateAwsExtensionModel(input));
});

// ---------------------------------------------------------------------------
// Snapshot: upgrades block
// ---------------------------------------------------------------------------

Deno.test("generateAwsExtensionModel - with upgrades block", async (t) => {
  const input: AwsExtensionModelInput = {
    typeName: "AWS::SQS::Queue",
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  QueueName: z.string().describe("The name of the queue"),`,
      resourceSchemaBody:
        `  QueueName: z.string().optional(),\n  QueueUrl: z.string().optional(),`,
    },
    onlyProperties: {
      primaryIdentifier: ["QueueUrl"],
      readOnly: ["QueueUrl"],
      writeOnly: [],
      createOnly: [],
    },
    cfSchema: {
      typeName: "AWS::SQS::Queue",
      description: "An SQS Queue",
      primaryIdentifier: ["/properties/QueueUrl"],
      properties: {
        QueueName: { type: "string" },
        QueueUrl: { type: "string" },
      },
    },
    handlers: { create: true, read: true, update: true, delete: true },
    version: "2026.01.02.1",
    modelType: "@swamp/aws/sqs/queue",
    upgradesBlock:
      `  upgrades: [\n    {\n      toVersion: "2026.01.02.1",\n      description: "Added: NewField",\n      upgradeAttributes: (old: Record<string, unknown>) => old,\n    },\n  ],`,
  };

  await assertSnapshot(t, generateAwsExtensionModel(input));
});

// ---------------------------------------------------------------------------
// Snapshot: model with enrichment (SDK-based)
// ---------------------------------------------------------------------------

Deno.test("generateAwsExtensionModel - with enrichment", async (t) => {
  const mockEnrichment: AwsEnrichment = {
    cfTypeName: "AWS::RDS::DBCluster",
    npmImports: { "@aws-sdk/client-rds": "npm:@aws-sdk/client-rds@3.1021.0" },
    imports: [
      'import { DescribeDBClustersCommand, RDSClient } from "@aws-sdk/client-rds";',
    ],
    schemas: `\
const MemberSchema = z.object({
  MemberId: z.string().optional(),
  IsWriter: z.boolean().optional(),
});`,
    stateFields: "  Members: z.array(MemberSchema).optional(),",
    enrichFunction: `\
async function enrichState(state: StateData): Promise<StateData> {
  return state;
}`,
  };

  const input: AwsExtensionModelInput = {
    typeName: "AWS::RDS::DBCluster",
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  DBClusterIdentifier: z.string().describe("The DB cluster identifier"),`,
      resourceSchemaBody:
        `  DBClusterIdentifier: z.string(),\n  DBClusterArn: z.string().optional(),`,
    },
    onlyProperties: {
      primaryIdentifier: ["DBClusterIdentifier"],
      readOnly: ["DBClusterArn"],
      writeOnly: [],
      createOnly: [],
    },
    cfSchema: {
      typeName: "AWS::RDS::DBCluster",
      description: "An RDS DB Cluster",
      primaryIdentifier: ["/properties/DBClusterIdentifier"],
      properties: {
        DBClusterIdentifier: { type: "string" },
        DBClusterArn: { type: "string" },
      },
    },
    handlers: { create: true, read: true, update: true, delete: true },
    version: "2026.01.01.1",
    modelType: "@swamp/aws/rds/dbcluster",
    enrichment: mockEnrichment,
  };

  await assertSnapshot(t, generateAwsExtensionModel(input));
});
