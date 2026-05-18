// Auto-generated extension model for @swamp/gcp/oracledatabase/goldengateconnections
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Oracle Database@Google Cloud GoldengateConnections.
 *
 * Details of the GoldengateConnection resource.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/goldengateConnections/${shortName}`;
}

const BASE_URL = "https://oracledatabase.googleapis.com/";

const GET_CONFIG = {
  "id": "oracledatabase.projects.locations.goldengateConnections.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "oracledatabase.projects.locations.goldengateConnections.create",
  "path": "v1/{+parent}/goldengateConnections",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "goldengateConnectionId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "oracledatabase.projects.locations.goldengateConnections.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  gcpOracleZone: z.string().describe(
    "Optional. The GCP Oracle zone where Oracle GoldengateConnection is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels or tags associated with the GoldengateConnection.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the GoldengateConnection resource in the following format: projects/{project}/locations/{region}/goldengateConnections/{goldengate_connection}",
  ).optional(),
  odbNetwork: z.string().describe(
    "Optional. The name of the OdbNetwork associated with the GoldengateConnection. The format is projects/{project}/locations/{location}/odbNetworks/{odb_network}. It is optional but if specified, this should match the parent ODBNetwork of the OdbSubnet.",
  ).optional(),
  odbSubnet: z.string().describe(
    "Optional. The name of the OdbSubnet associated with the GoldengateConnection for IP allocation. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  properties: z.object({
    amazonKinesisConnectionProperties: z.object({
      accessKeyId: z.string().describe(
        "Optional. Access key ID to access the Amazon Kinesis.",
      ).optional(),
      awsRegion: z.string().describe(
        "Optional. The name of the AWS region. If not provided, Goldengate will default to 'us-west-1'.",
      ).optional(),
      endpoint: z.string().describe(
        "Optional. The endpoint URL of the Amazon Kinesis service. e.g.: 'https://kinesis.us-east-1.amazonaws.com' If not provided, Goldengate will default to 'https://kinesis..amazonaws.com'.",
      ).optional(),
      secretAccessKeySecret: z.string().describe(
        "Optional. Secret access key to access the Amazon Kinesis.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of AmazonKinesisConnection.",
      ).optional(),
    }).describe("The properties of GoldengateAmazonKinesisConnection.")
      .optional(),
    amazonRedshiftConnectionProperties: z.object({
      connectionUrl: z.string().describe(
        "Optional. Connection URL. e.g.: 'jdbc:redshift://aws-redshift-instance.aaaaaaaaaaaa.us-east-2.redshift.amazonaws.com:5439/mydb'",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for Amazon Redshift connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Amazon Redshift connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of AmazonRedshiftConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("The properties of GoldengateAmazonRedshiftConnection.")
      .optional(),
    amazonS3ConnectionProperties: z.object({
      accessKeyId: z.string().describe(
        "Optional. Access key ID to access the Amazon S3 bucket.",
      ).optional(),
      endpoint: z.string().describe("Optional. The Amazon Endpoint for S3.")
        .optional(),
      region: z.string().describe(
        "Optional. The name of the AWS region where the bucket is created.",
      ).optional(),
      secretAccessKeySecret: z.string().describe(
        "Optional. Secret access key to access the Amazon S3 bucket.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of AmazonS3Connection.",
      ).optional(),
    }).describe("The properties of GoldengateAmazonS3Connection.").optional(),
    azureDataLakeStorageConnectionProperties: z.object({
      account: z.string().describe(
        "Optional. Sets the Azure storage account name.",
      ).optional(),
      accountKeySecret: z.string().describe(
        "Optional. Azure storage account key. This property is required when 'authentication_type' is set to 'SHARED_KEY'.",
      ).optional(),
      authenticationType: z.enum([
        "AUTHENTICATION_TYPE_UNSPECIFIED",
        "SHARED_KEY",
        "SHARED_ACCESS_SIGNATURE",
        "AZURE_ACTIVE_DIRECTORY",
      ]).describe(
        "Optional. Authentication mechanism to access Azure Data Lake Storage.",
      ).optional(),
      azureAuthorityHost: z.string().describe(
        "Optional. The endpoint used for authentication with Microsoft Entra ID (formerly Azure Active Directory). Default value: https://login.microsoftonline.com",
      ).optional(),
      azureTenantId: z.string().describe(
        "Optional. Azure tenant ID of the application. This property is required when 'authentication_type' is set to 'AZURE_ACTIVE_DIRECTORY'.",
      ).optional(),
      clientId: z.string().describe(
        "Optional. Azure client ID of the application. This property is required when 'authentication_type' is set to 'AZURE_ACTIVE_DIRECTORY'.",
      ).optional(),
      clientSecret: z.string().describe(
        "Optional. Azure client secret (aka application password) for authentication.",
      ).optional(),
      endpoint: z.string().describe(
        "Optional. Azure Storage service endpoint. e.g: https://test.blob.core.windows.net",
      ).optional(),
      sasTokenSecret: z.string().describe(
        "Optional. Credential that uses a shared access signature (SAS) to authenticate to an Azure Service.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of AzureDataLakeStorageConnection.",
      ).optional(),
    }).describe("The properties of GoldengateAzureDataLakeStorageConnection.")
      .optional(),
    azureSynapseAnalyticsConnectionProperties: z.object({
      connectionString: z.string().describe(
        "Optional. JDBC connection string. e.g.: 'jdbc:sqlserver://.sql.azuresynapse.net:1433;database=;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.sql.azuresynapse.net;loginTimeout=300;'",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for Azure Synapse Analytics connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Azure Synapse Analytics connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of AzureSynapseAnalyticsConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("The properties of GoldengateAzureSynapseAnalyticsConnection.")
      .optional(),
    connectionType: z.enum([
      "GOLDENGATE_CONNECTION_TYPE_UNSPECIFIED",
      "GOLDENGATE",
      "KAFKA",
      "KAFKA_SCHEMA_REGISTRY",
      "MYSQL",
      "JAVA_MESSAGE_SERVICE",
      "MICROSOFT_SQLSERVER",
      "OCI_OBJECT_STORAGE",
      "ORACLE",
      "AZURE_DATA_LAKE_STORAGE",
      "POSTGRESQL",
      "AZURE_SYNAPSE_ANALYTICS",
      "SNOWFLAKE",
      "AMAZON_S3",
      "HDFS",
      "ORACLE_AI_DATA_PLATFORM",
      "ORACLE_NOSQL",
      "MONGODB",
      "AMAZON_KINESIS",
      "AMAZON_REDSHIFT",
      "DB2",
      "REDIS",
      "ELASTICSEARCH",
      "GENERIC",
      "GOOGLE_CLOUD_STORAGE",
      "GOOGLE_BIGQUERY",
      "DATABRICKS",
      "GOOGLE_PUBSUB",
      "MICROSOFT_FABRIC",
      "ICEBERG",
    ]).describe("Required. The connection type.").optional(),
    databricksConnectionProperties: z.object({
      authenticationType: z.enum([
        "DATABRICKS_AUTHENTICATION_TYPE_UNSPECIFIED",
        "PERSONAL_ACCESS_TOKEN",
        "OAUTH_M2M",
      ]).describe("Optional. Authentication type for Databricks.").optional(),
      clientId: z.string().describe(
        "Optional. OAuth client id, only applicable for authentication_type == OAUTH_M2M",
      ).optional(),
      clientSecret: z.string().describe(
        "Optional. OAuth client secret, only applicable for authentication_type == OAUTH_M2M",
      ).optional(),
      connectionUrl: z.string().describe(
        "Optional. Connection URL. e.g.: 'jdbc:databricks://adb-33934.4.azuredatabricks.net:443/default;transportMode=http;ssl=1;httpPath=sql/protocolv1/o/3393########44/0##3-7-hlrb'",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password used to connect to Databricks in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password used to connect to Databricks. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      storageCredential: z.string().describe(
        "Optional. External storage credential name to access files on object storage such as ADLS Gen2, S3 or Cloud Storage.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of DatabricksConnection.",
      ).optional(),
    }).describe("The properties of GoldengateDatabricksConnection.").optional(),
    db2ConnectionProperties: z.object({
      additionalAttributes: z.array(z.object({
        key: z.string().describe("Required. The name of the property entry.")
          .optional(),
        value: z.string().describe("Required. The value of the property entry.")
          .optional(),
      })).describe(
        "Optional. An array of name-value pair attribute entries. Used as additional parameters in connection string.",
      ).optional(),
      database: z.string().describe("Optional. The name of the database.")
        .optional(),
      host: z.string().describe("Optional. The name or address of a host.")
        .optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for Db2 connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Db2 connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      port: z.number().int().describe(
        "Optional. The port of an endpoint usually specified for a connection.",
      ).optional(),
      securityProtocol: z.enum([
        "DB2_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
      ]).describe("Optional. Security protocol for the DB2 database.")
        .optional(),
      sslClientKeystashFile: z.string().describe(
        "Optional. The keystash file which contains the encrypted password to the key database file. Not supported for IBM Db2 for i.",
      ).optional(),
      sslClientKeystoredbFile: z.string().describe(
        "Optional. The keystore file created at the client containing the server certificate / CA root certificate. Not supported for IBM Db2 for i.",
      ).optional(),
      sslServerCertificateFile: z.string().describe(
        "Optional. The file which contains the self-signed server certificate / Certificate Authority (CA) certificate.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of Db2Connection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect to the DB2 database.",
      ).optional(),
    }).describe("The properties of GoldengateDb2Connection.").optional(),
    description: z.string().describe(
      "Optional. Metadata about this specific object.",
    ).optional(),
    displayName: z.string().describe("Required. An object's Display Name.")
      .optional(),
    elasticsearchConnectionProperties: z.object({
      authenticationType: z.enum([
        "ELASTICSEARCH_AUTHENTICATION_TYPE_UNSPECIFIED",
        "NONE",
        "BASIC",
      ]).describe("Optional. Authentication type for Elasticsearch.")
        .optional(),
      fingerprint: z.string().describe(
        "Optional. Fingerprint required by TLS security protocol. Eg.: '6152b2dfbff200f973c5074a5b91d06ab3b472c07c09a1ea57bb7fd406cdce9c'",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for Elastic Search connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Elastic Search connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      securityProtocol: z.enum([
        "ELASTICSEARCH_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
      ]).describe("Optional. Security protocol for Elasticsearch.").optional(),
      servers: z.string().describe(
        'Optional. Comma separated list of Elasticsearch server addresses, specified as host:port entries, where:port is optional. If port is not specified, it defaults to 9200. Example: "server1.example.com:4000,server2.example.com:4000"',
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of ElasticsearchConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("The properties of GoldengateElasticsearchConnection.")
      .optional(),
    genericConnectionProperties: z.object({
      host: z.string().describe("Optional. The host of the GenericConnection.")
        .optional(),
      technologyType: z.string().describe("Optional. The technology type.")
        .optional(),
    }).describe("The properties of GoldengateGenericConnectionProperties.")
      .optional(),
    goldengateConnectionProperties: z.object({
      goldengateDeploymentId: z.string().describe(
        "Optional. The name of the GoldengateDeployment associated with the GoldengateConnection. Format: projects/{project}/locations/{location}/goldengateDeployments/{goldengate_deployment}",
      ).optional(),
      host: z.string().describe(
        "Optional. The host of the GoldengateConnection.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password used to connect to the Oracle Goldengate in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password used to connect to the Oracle Goldengate. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      port: z.number().int().describe(
        "Optional. The port of the GoldengateConnection.",
      ).optional(),
      technologyType: z.string().describe("Optional. The technology type.")
        .optional(),
      username: z.string().describe("Optional. The username credential.")
        .optional(),
    }).describe("The properties of GoldengateGoldengateConnectionProperties.")
      .optional(),
    googleBigQueryConnectionProperties: z.object({
      serviceAccountKeyFile: z.string().describe(
        "Optional. The service account key file Cloud Storage containing the credentials required to use Google BigQuery.",
      ).optional(),
      technologyType: z.string().describe("Optional. The technology type.")
        .optional(),
    }).describe(
      "The properties of GoldengateGoogleBigQueryConnectionProperties.",
    ).optional(),
    googleCloudStorageConnectionProperties: z.object({
      serviceAccountKeyFile: z.string().describe(
        "Optional. The service account key Cloud Storage file containing the credentials required to use Google Cloud Storage.",
      ).optional(),
      technologyType: z.string().describe("Optional. The technology type.")
        .optional(),
    }).describe(
      "The properties of GoldengateGoogleCloudStorageConnectionProperties.",
    ).optional(),
    googlePubsubConnectionProperties: z.object({
      serviceAccountKeyFile: z.string().describe(
        "Optional. The content of the service account key file containing the credentials required to use Google Pub/Sub.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of GooglePubsubConnection.",
      ).optional(),
    }).describe("The properties of GoldengateGooglePubsubConnection.")
      .optional(),
    hdfsConnectionProperties: z.object({
      coreSiteXml: z.string().describe(
        "Optional. The content of the Hadoop Distributed File System configuration file (core-site.xml).",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of HdfsConnection.",
      ).optional(),
    }).describe("The properties of GoldengateHdfsConnection.").optional(),
    icebergConnectionProperties: z.object({
      catalog: z.object({
        catalogType: z.enum([
          "CATALOG_TYPE_UNSPECIFIED",
          "GLUE",
          "HADOOP",
          "NESSIE",
          "POLARIS",
          "REST",
        ]).describe("Required. The type of Iceberg catalog.").optional(),
        glueIcebergCatalog: z.object({
          glueId: z.string().describe("Required. The catalog ID of Glue.")
            .optional(),
        }).describe("The Glue Iceberg catalog.").optional(),
        nessieIcebergCatalog: z.object({
          branch: z.string().describe("Required. The Nessie branch.")
            .optional(),
          uri: z.string().describe("Required. The Nessie uri.").optional(),
        }).describe("The Nessie Iceberg catalog.").optional(),
        polarisIcebergCatalog: z.object({
          clientId: z.string().describe("Required. The Polaris client ID.")
            .optional(),
          clientSecret: z.string().describe(
            "Optional. The Polaris client secret.",
          ).optional(),
          polarisCatalog: z.string().describe(
            "Required. The catalog name within Polaris.",
          ).optional(),
          principalRole: z.string().describe(
            "Required. The Polaris principal role.",
          ).optional(),
          uri: z.string().describe("Required. The Polaris uri.").optional(),
        }).describe("The Polaris Iceberg catalog.").optional(),
        restIcebergCatalog: z.object({
          properties: z.string().describe(
            "Optional. The content of the configuration file containing additional properties for the REST catalog.",
          ).optional(),
          uri: z.string().describe("Required. The REST uri.").optional(),
        }).describe("The REST Iceberg catalog.").optional(),
      }).describe("The Iceberg catalog details.").optional(),
      storage: z.object({
        amazonS3IcebergStorage: z.object({
          accessKeyId: z.string().describe(
            "Required. The access key ID of Amazon S3.",
          ).optional(),
          bucket: z.string().describe("Required. The bucket of Amazon S3.")
            .optional(),
          endpoint: z.string().describe("Optional. The endpoint of Amazon S3.")
            .optional(),
          region: z.string().describe("Required. The region of Amazon S3.")
            .optional(),
          schemeType: z.enum(["SCHEME_TYPE_UNSPECIFIED", "S3", "S3A"]).describe(
            "Required. The scheme type of Amazon S3.",
          ).optional(),
          secretAccessKeySecret: z.string().describe(
            "Optional. The secret access key of Amazon S3.",
          ).optional(),
        }).describe("The Amazon S3 Iceberg storage.").optional(),
        azureDataLakeStorageIcebergStorage: z.object({
          accountKeySecret: z.string().describe(
            "Optional. The account key of Azure Data Lake Storage.",
          ).optional(),
          azureAccount: z.string().describe(
            "Required. The account of Azure Data Lake Storage.",
          ).optional(),
          container: z.string().describe(
            "Required. The container of Azure Data Lake Storage.",
          ).optional(),
          endpoint: z.string().describe(
            "Optional. The endpoint of Azure Data Lake Storage.",
          ).optional(),
        }).describe("The Azure Data Lake Storage Iceberg storage.").optional(),
        googleCloudStorageIcebergStorage: z.object({
          bucket: z.string().describe(
            "Required. The bucket of Google Cloud Storage.",
          ).optional(),
          projectId: z.string().describe(
            "Required. The project ID of Google Cloud Storage.",
          ).optional(),
          serviceAccountKeyFile: z.string().describe(
            "Optional. The service account key file of Google Cloud Storage.",
          ).optional(),
        }).describe("The Google Cloud Storage Iceberg storage.").optional(),
        storageType: z.enum([
          "STORAGE_TYPE_UNSPECIFIED",
          "AMAZON_S3",
          "GOOGLE_CLOUD_STORAGE",
          "AZURE_DATA_LAKE_STORAGE",
        ]).describe("Required. The type of Iceberg storage.").optional(),
      }).describe("The Iceberg storage details.").optional(),
      technologyType: z.string().describe(
        "Required. The technology type of Iceberg connection.",
      ).optional(),
    }).describe("The properties of GoldengateIcebergConnection.").optional(),
    ingressIpAddresses: z.array(z.string()).describe(
      "Output only. The Ingress IPs of the GoldengateConnection.",
    ).optional(),
    javaMessageServiceConnectionProperties: z.object({
      authenticationType: z.enum([
        "JMS_AUTHENTICATION_TYPE_UNSPECIFIED",
        "NONE",
        "BASIC",
      ]).describe("Optional. Authentication type for Java Message Service.")
        .optional(),
      connectionFactory: z.string().describe(
        "Optional. The Java class implementing javax.jms.ConnectionFactory interface supplied by the JMS provider.",
      ).optional(),
      connectionUrl: z.string().describe(
        "Optional. Connection URL of the Java Message Service, specifying the protocol, host, and port. e.g.: 'mq://myjms.host.domain:7676'",
      ).optional(),
      jndiConnectionFactory: z.string().describe(
        "Optional. The Connection Factory can be looked up using this name. e.g.: 'ConnectionFactory'",
      ).optional(),
      jndiInitialContextFactory: z.string().describe(
        "Optional. The implementation of javax.naming.spi.InitialContextFactory interface used to obtain initial naming context.",
      ).optional(),
      jndiProviderUrl: z.string().describe(
        "Optional. The URL that Java Message Service will use to contact the JNDI provider. e.g.: 'tcp://myjms.host.domain:61616?jms.prefetchPolicy.all=1000'",
      ).optional(),
      jndiSecurityCredentialsSecret: z.string().describe(
        "Optional. The password associated to the principal.",
      ).optional(),
      jndiSecurityPrincipal: z.string().describe(
        "Optional. Specifies the identity of the principal (user) to be authenticated.",
      ).optional(),
      keyStoreFile: z.string().describe(
        "Optional. The content of the KeyStore file.",
      ).optional(),
      keyStorePassword: z.string().describe(
        "Optional. Input only. The KeyStore password in plain text.",
      ).optional(),
      keyStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the KeyStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses to connect the Java Message Service in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses to connect the associated Java Message Service. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      securityProtocol: z.enum([
        "JMS_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
        "MTLS",
      ]).describe("Optional. Security protocol for Java Message Service.")
        .optional(),
      sslKeyPassword: z.string().describe(
        "Optional. Input only. The password for the cert inside of the KeyStore in plain text.",
      ).optional(),
      sslKeyPasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password for the cert inside of the KeyStore. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of JavaMessageServiceConnection.",
      ).optional(),
      trustStoreFile: z.string().describe(
        "Optional. The content of the TrustStore file.",
      ).optional(),
      trustStorePassword: z.string().describe(
        "Optional. Input only. The TrustStore password in plain text.",
      ).optional(),
      trustStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the TrustStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      useJndi: z.boolean().describe(
        "Optional. If set to true, Java Naming and Directory Interface (JNDI) properties should be provided.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect to the Java Message Service.",
      ).optional(),
    }).describe("The properties of GoldengateJavaMessageServiceConnection.")
      .optional(),
    kafkaConnectionProperties: z.object({
      bootstrapServers: z.array(z.object({
        host: z.string().describe("Required. The name or address of a host.")
          .optional(),
        port: z.number().int().describe(
          "Optional. The port of an endpoint usually specified for a connection.",
        ).optional(),
        privateIpAddress: z.string().describe(
          "Optional. The private IP address of the connection's endpoint in the customer's VCN, typically a database endpoint or a big data endpoint (e.g. Kafka bootstrap server). In case the privateIp is provided, the subnetId must also be provided. In case the privateIp (and the subnetId) is not provided it is assumed the datasource is publicly accessible. In case the connection is accessible only privately, the lack of privateIp will result in not being able to access the connection.",
        ).optional(),
      })).describe(
        'Optional. Kafka bootstrap. Equivalent of bootstrap.servers configuration property in Kafka: list of KafkaBootstrapServer objects specified by host/port. Used for establishing the initial connection to the Kafka cluster. Example: "server1.example.com:9092,server2.example.com:9092"',
      ).optional(),
      clusterId: z.string().describe(
        "Optional. The OCID of the Kafka cluster being referenced from OCI Streaming with Apache Kafka.",
      ).optional(),
      consumerPropertiesFile: z.string().describe(
        "Optional. The content of the consumer.properties file.",
      ).optional(),
      keyStoreFile: z.string().describe(
        "Optional. The content of the KeyStore file.",
      ).optional(),
      keyStorePassword: z.string().describe(
        "Optional. Input only. The KeyStore password in plain text.",
      ).optional(),
      keyStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the KeyStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password for Kafka basic/SASL auth in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password for Kafka basic/SASL auth. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      producerPropertiesFile: z.string().describe(
        "Optional. The content of the producer.properties file.",
      ).optional(),
      securityProtocol: z.enum([
        "KAFKA_SECURITY_PROTOCOL_UNSPECIFIED",
        "SSL",
        "SASL_SSL",
        "PLAINTEXT",
        "SASL_PLAINTEXT",
      ]).describe("Optional. Security Type for Kafka.").optional(),
      sslKeyPassword: z.string().describe(
        "Optional. Input only. The password for the cert inside of the KeyStore in plain text.",
      ).optional(),
      sslKeyPasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password for the cert inside of the KeyStore. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      streamPoolId: z.string().describe(
        "Optional. The OCID of the stream pool being referenced.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of KafkaConnection.",
      ).optional(),
      trustStoreFile: z.string().describe(
        "Optional. The content of the TrustStore file.",
      ).optional(),
      trustStorePassword: z.string().describe(
        "Optional. Input only. The TrustStore password in plain text.",
      ).optional(),
      trustStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the TrustStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      useResourcePrincipal: z.boolean().describe(
        "Optional. Specifies that the user intends to authenticate to the instance using a resource principal. Applicable only for OCI Streaming connections.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("The properties of GoldengateKafkaConnection.").optional(),
    kafkaSchemaRegistryConnectionProperties: z.object({
      authenticationType: z.enum([
        "AUTHENTICATION_TYPE_UNSPECIFIED",
        "NONE",
        "BASIC",
        "MUTUAL",
      ]).describe(
        "Optional. Used authentication mechanism to access Schema Registry.",
      ).optional(),
      keyStoreFile: z.string().describe(
        "Optional. The content of the KeyStore file.",
      ).optional(),
      keyStorePassword: z.string().describe(
        "Optional. Input only. The KeyStore password in plain text.",
      ).optional(),
      keyStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the KeyStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password to access Schema Registry in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password to access Schema Registry using basic authentication. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      sslKeyPassword: z.string().describe(
        "Optional. Input only. The password for the cert inside the KeyStore in plain text.",
      ).optional(),
      sslKeyPasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password for the cert inside the KeyStore. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of KafkaSchemaRegistryConnection.",
      ).optional(),
      trustStoreFile: z.string().describe(
        "Optional. The content of the TrustStore file.",
      ).optional(),
      trustStorePassword: z.string().describe(
        "Optional. Input only. The TrustStore password in plain text.",
      ).optional(),
      trustStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the TrustStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      url: z.string().describe(
        "Optional. Kafka Schema Registry URL. e.g.: 'https://server1.us.oracle.com:8081'",
      ).optional(),
      username: z.string().describe(
        "Optional. The username to access Schema Registry using basic authentication. This value is injected into 'schema.registry.basic.auth.user.info=user:password' configuration property.",
      ).optional(),
    }).describe("The properties of GoldengateKafkaSchemaRegistryConnection.")
      .optional(),
    lifecycleDetails: z.string().describe(
      "Output only. Describes the object's current state in detail. For example, it can be used to provide actionable information for a resource in a Failed state.",
    ).optional(),
    lifecycleState: z.enum([
      "GOLDENGATE_CONNECTION_LIFECYCLE_STATE_UNSPECIFIED",
      "CREATING",
      "ACTIVE",
      "UPDATING",
      "DELETING",
      "DELETED",
      "FAILED",
    ]).describe("Output only. The lifecycle state of the connection.")
      .optional(),
    microsoftFabricConnectionProperties: z.object({
      clientId: z.string().describe(
        "Optional. Azure client ID of the application.",
      ).optional(),
      clientSecret: z.string().describe(
        "Optional. Client secret associated with the client id.",
      ).optional(),
      endpoint: z.string().describe(
        "Optional. Optional Microsoft Fabric service endpoint. Default value: https://onelake.dfs.fabric.microsoft.com",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of MicrosoftFabricConnection.",
      ).optional(),
      tenantId: z.string().describe(
        "Optional. Azure tenant ID of the application.",
      ).optional(),
    }).describe("The properties of GoldengateMicrosoftFabricConnection.")
      .optional(),
    microsoftSqlserverConnectionProperties: z.object({
      additionalAttributes: z.array(z.object({
        key: z.string().describe("Required. The name of the property entry.")
          .optional(),
        value: z.string().describe("Required. The value of the property entry.")
          .optional(),
      })).describe(
        "Optional. An array of name-value pair attribute entries. Used as additional parameters in connection string.",
      ).optional(),
      database: z.string().describe("Optional. The name of the database.")
        .optional(),
      host: z.string().describe("Optional. The name or address of a host.")
        .optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for Microsoft SQL Server connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Microsoft SQL Server connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      port: z.number().int().describe(
        "Optional. The port of an endpoint usually specified for a connection.",
      ).optional(),
      securityProtocol: z.enum([
        "MICROSOFT_SQLSERVER_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
      ]).describe("Optional. Security Type for Microsoft SQL Server.")
        .optional(),
      serverCertificateValidationRequired: z.boolean().describe(
        "Optional. If set to true, the driver validates the certificate that is sent by the database server.",
      ).optional(),
      sslCaFile: z.string().describe(
        "Optional. Database Certificate - The content of a.pem or.crt file containing the server public key (for 1-way SSL).",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of MicrosoftSqlserverConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect to the Microsoft SQL Server.",
      ).optional(),
    }).describe("The properties of GoldengateMicrosoftSqlserverConnection.")
      .optional(),
    mongodbConnectionProperties: z.object({
      connectionString: z.string().describe(
        "Optional. MongoDB connection string. e.g.: 'mongodb://mongodb0.example.com:27017/recordsrecords'",
      ).optional(),
      databaseId: z.string().describe(
        "Optional. The OCID of the Oracle Autonomous Json Database.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses to connect the Mongodb connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses to connect the Mongodb connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      securityProtocol: z.enum([
        "MONGODB_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
        "MTLS",
      ]).describe("Optional. Security Type for MongoDB.").optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of MongodbConnection.",
      ).optional(),
      tlsCaFile: z.string().describe(
        "Optional. Database Certificate - The content of a.pem file, containing the server public key (for 1 and 2-way SSL).",
      ).optional(),
      tlsCertificateKeyFile: z.string().describe(
        "Optional. Client Certificate - The content of a.pem file, containing the client public key (for 2-way SSL).",
      ).optional(),
      tlsCertificateKeyFilePassword: z.string().describe(
        "Optional. Input only. The Client Certificate key file password in plain text.",
      ).optional(),
      tlsCertificateKeyFilePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the Client Certificate key file password in Secret Manager. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect to the database.",
      ).optional(),
    }).describe("The properties of GoldengateMongodbConnection.").optional(),
    mysqlConnectionProperties: z.object({
      additionalAttributes: z.array(z.object({
        key: z.string().describe("Required. The name of the property entry.")
          .optional(),
        value: z.string().describe("Required. The value of the property entry.")
          .optional(),
      })).describe(
        "Optional. An array of name-value pair attribute entries. Used as additional parameters in connection string.",
      ).optional(),
      database: z.string().describe("Optional. The name of the database.")
        .optional(),
      dbSystemId: z.string().describe(
        "Optional. The OCID of the database system being referenced.",
      ).optional(),
      host: z.string().describe("Optional. The name or address of a host.")
        .optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses to connect to MySQL in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses to connect to MySQL. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      port: z.number().int().describe(
        "Optional. The port of an endpoint usually specified for a connection.",
      ).optional(),
      securityProtocol: z.enum([
        "MYSQL_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
        "MTLS",
      ]).describe("Optional. Security Type for MySQL.").optional(),
      sslCaFile: z.string().describe(
        "Optional. Database Certificate - The content of a.pem or.crt file containing the server public key (for 1 and 2-way SSL).",
      ).optional(),
      sslCertFile: z.string().describe(
        "Optional. Client Certificate - The content of a.pem or.crt file containing the client public key (for 2-way SSL).",
      ).optional(),
      sslCrlFile: z.string().describe(
        "Optional. The list of certificates revoked by the trusted certificate authorities (Trusted CA).",
      ).optional(),
      sslKeyFile: z.string().describe(
        "Optional. Client Key - The content of a.pem or.crt file containing the client private key (for 2-way SSL).",
      ).optional(),
      sslMode: z.enum([
        "SSL_MODE_UNSPECIFIED",
        "DISABLED",
        "PREFERRED",
        "REQUIRED",
        "VERIFY_CA",
        "VERIFY_IDENTITY",
      ]).describe("Optional. SSL modes for MySQL.").optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of MysqlConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("Properties of GoldengateMysqlConnection.").optional(),
    ociObjectStorageConnectionProperties: z.object({
      privateKeyFile: z.string().describe(
        "Optional. The content of the private key file (PEM file) corresponding to the API key of the fingerprint.",
      ).optional(),
      privateKeyPassphraseSecret: z.string().describe(
        "Optional. The passphrase of the private key.",
      ).optional(),
      publicKeyFingerprint: z.string().describe(
        "Optional. The fingerprint of the API Key of the user specified by the userId.",
      ).optional(),
      region: z.string().describe(
        "Optional. The name of the region of OCI Object Storage. e.g.: us-ashburn-1 If the region is not provided, backend will default to the default region.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of OciObjectStorageConnection.",
      ).optional(),
      tenancyId: z.string().describe(
        "Optional. The OCID of the related OCI tenancy.",
      ).optional(),
      useResourcePrincipal: z.boolean().describe(
        "Optional. Specifies that the user intends to authenticate to the instance using a resource principal.",
      ).optional(),
      userId: z.string().describe(
        "Optional. The OCID of the OCI user who will access the Object Storage. The user must have write access to the bucket they want to connect to.",
      ).optional(),
    }).describe("The properties of GoldengateOciObjectStorageConnection.")
      .optional(),
    ocid: z.string().describe(
      "Output only. The [OCID] of the connection being referenced.",
    ).optional(),
    oracleAiDataPlatformConnectionProperties: z.object({
      connectionUrl: z.string().describe(
        "Optional. Connection URL. It must start with 'jdbc:spark://'",
      ).optional(),
      privateKeyFile: z.string().describe(
        "Optional. The content of the private key file (PEM file) corresponding to the API key of the fingerprint.",
      ).optional(),
      privateKeyPassphraseSecret: z.string().describe(
        "Optional. The passphrase of the private key.",
      ).optional(),
      publicKeyFingerprint: z.string().describe(
        "Optional. The fingerprint of the API Key of the user specified by the user_id.",
      ).optional(),
      region: z.string().describe(
        "Optional. The name of the region. e.g.: us-ashburn-1",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of OracleAiDataPlatformConnection.",
      ).optional(),
      tenancyId: z.string().describe(
        "Optional. The OCID of the related OCI tenancy.",
      ).optional(),
      useResourcePrincipal: z.boolean().describe(
        "Optional. Specifies that the user intends to authenticate to the instance using a resource principal.",
      ).optional(),
      userId: z.string().describe(
        "Optional. The OCID of the OCI user who will access.",
      ).optional(),
    }).describe("The properties of GoldengateOracleAIDataPlatformConnection.")
      .optional(),
    oracleConnectionProperties: z.object({
      authenticationMode: z.enum([
        "ORACLE_AUTHENTICATION_MODE_UNSPECIFIED",
        "TLS",
        "MTLS",
      ]).describe("Optional. Authentication mode.").optional(),
      connectionString: z.string().describe(
        "Optional. Connect descriptor or Easy Connect Naming method used to connect to a database.",
      ).optional(),
      gcpOracleDatabaseId: z.string().describe(
        "Optional. Database instance id of database in Oracle Database @ Google Cloud. If gcp_oracle_database_id is provided, connection_string must be empty.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      sessionMode: z.enum(["SESSION_MODE_UNSPECIFIED", "DIRECT", "REDIRECT"])
        .describe(
          "Optional. The mode of the database connection session to be established by the data client.",
        ).optional(),
      technologyType: z.string().describe("Optional. The technology type.")
        .optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect.",
      ).optional(),
      walletFile: z.string().describe(
        "Optional. The wallet contents Oracle Goldengate uses to make connections to a database.",
      ).optional(),
    }).describe("The properties of Goldengate Oracle Database Connection.")
      .optional(),
    oracleNosqlConnectionProperties: z.object({
      privateKeyFile: z.string().describe(
        "Optional. The content of the private key file (PEM file) corresponding to the API key of the fingerprint.",
      ).optional(),
      privateKeyPassphraseSecret: z.string().describe(
        "Optional. The passphrase of the private key.",
      ).optional(),
      publicKeyFingerprint: z.string().describe(
        "Optional. The fingerprint of the API Key of the user specified by the userId.",
      ).optional(),
      region: z.string().describe(
        "Optional. The name of the region. e.g.: us-ashburn-1",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of OracleNosqlConnection.",
      ).optional(),
      tenancyId: z.string().describe("Optional. The OCID of the OCI tenancy.")
        .optional(),
      useResourcePrincipal: z.boolean().describe(
        "Optional. Specifies that the user intends to authenticate to the instance using a resource principal.",
      ).optional(),
      userId: z.string().describe(
        "Optional. The OCID of the OCI user who will access the Oracle NoSQL database.",
      ).optional(),
    }).describe("The properties of GoldengateOracleNosqlConnection.")
      .optional(),
    postgresqlConnectionProperties: z.object({
      additionalAttributes: z.array(z.object({
        key: z.string().describe("Required. The name of the property entry.")
          .optional(),
        value: z.string().describe("Required. The value of the property entry.")
          .optional(),
      })).describe(
        "Optional. An array of name-value pair attribute entries. Used as additional parameters in connection string.",
      ).optional(),
      database: z.string().describe("Optional. The name of the database.")
        .optional(),
      dbSystemId: z.string().describe(
        "Optional. The OCID of the database system being referenced.",
      ).optional(),
      host: z.string().describe("Optional. The name or address of a host.")
        .optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for PostgreSQL connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for PostgreSQL connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      port: z.number().int().describe(
        "Optional. The port of an endpoint usually specified for a connection.",
      ).optional(),
      securityProtocol: z.enum([
        "POSTGRESQL_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
        "MTLS",
      ]).describe("Optional. Security protocol for PostgreSQL.").optional(),
      sslCaFile: z.string().describe(
        "Optional. The certificate of the trusted certificate authorities (Trusted CA) for PostgreSQL.",
      ).optional(),
      sslCertFile: z.string().describe(
        "Optional. The certificate of the PostgreSQL server.",
      ).optional(),
      sslCrlFile: z.string().describe(
        "Optional. The list of certificates revoked by the trusted certificate authorities (Trusted CA).",
      ).optional(),
      sslKeyFile: z.string().describe(
        "Optional. The private key of the PostgreSQL server.",
      ).optional(),
      sslMode: z.enum([
        "POSTGRESQL_SSL_MODE_UNSPECIFIED",
        "PREFER",
        "REQUIRE",
        "VERIFY_CA",
        "VERIFY_FULL",
      ]).describe("Optional. SSL modes for PostgreSQL.").optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of PostgresqlConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("The properties of GoldengatePostgresqlConnection.").optional(),
    redisConnectionProperties: z.object({
      authenticationType: z.enum([
        "REDIS_AUTHENTICATION_TYPE_UNSPECIFIED",
        "NONE",
        "BASIC",
      ]).describe("Optional. Authentication type for Redis.").optional(),
      keyStoreFile: z.string().describe(
        "Optional. The content of the KeyStore file.",
      ).optional(),
      keyStorePassword: z.string().describe(
        "Optional. Input only. The KeyStore password in plain text.",
      ).optional(),
      keyStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the KeyStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for Redis connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Redis connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      redisClusterId: z.string().describe(
        "Optional. The OCID of the Redis cluster.",
      ).optional(),
      securityProtocol: z.enum([
        "REDIS_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
        "MTLS",
      ]).describe("Optional. Security protocol for Redis.").optional(),
      servers: z.string().describe(
        'Optional. Comma separated list of Redis server addresses, specified as host:port entries, where:port is optional. If port is not specified, it defaults to 6379. Example: "server1.example.com:6379,server2.example.com:6379"',
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of RedisConnection.",
      ).optional(),
      trustStoreFile: z.string().describe(
        "Optional. The content of the TrustStore file.",
      ).optional(),
      trustStorePassword: z.string().describe(
        "Optional. Input only. The TrustStore password in plain text.",
      ).optional(),
      trustStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the TrustStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("The properties of GoldengateRedisConnection.").optional(),
    routingMethod: z.enum([
      "GOLDENGATE_CONNECTION_ROUTING_METHOD_UNSPECIFIED",
      "SHARED_DEPLOYMENT_ENDPOINT",
      "DEDICATED_ENDPOINT",
    ]).describe("Optional. The routing method for the GoldengateConnection.")
      .optional(),
    snowflakeConnectionProperties: z.object({
      authenticationType: z.enum([
        "AUTHENTICATION_TYPE_UNSPECIFIED",
        "BASIC",
        "KEY_PAIR",
      ]).describe(
        "Optional. Used authentication mechanism to access Snowflake.",
      ).optional(),
      connectionUrl: z.string().describe(
        "Optional. JDBC connection URL. e.g.: 'jdbc:snowflake://.snowflakecomputing.com/?warehouse=&db='",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses to connect to Snowflake platform in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses to connect to Snowflake platform. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      privateKeyFile: z.string().describe(
        "Optional. The content of private key file in PEM format.",
      ).optional(),
      privateKeyPassphraseSecret: z.string().describe(
        "Optional. Password if the private key file is encrypted.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of SnowflakeConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect to Snowflake.",
      ).optional(),
    }).describe("The properties of GoldengateSnowflakeConnection.").optional(),
    updateTime: z.string().describe(
      "Output only. The time the resource was last updated.",
    ).optional(),
  }).describe("The properties of a GoldengateConnection.").optional(),
  goldengateConnectionId: z.string().describe(
    "Required. The ID of the GoldengateConnection to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  entitlementId: z.string().optional(),
  gcpOracleZone: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  ociUrl: z.string().optional(),
  odbNetwork: z.string().optional(),
  odbSubnet: z.string().optional(),
  properties: z.object({
    amazonKinesisConnectionProperties: z.object({
      accessKeyId: z.string(),
      awsRegion: z.string(),
      endpoint: z.string(),
      secretAccessKeySecret: z.string(),
      technologyType: z.string(),
    }),
    amazonRedshiftConnectionProperties: z.object({
      connectionUrl: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      technologyType: z.string(),
      username: z.string(),
    }),
    amazonS3ConnectionProperties: z.object({
      accessKeyId: z.string(),
      endpoint: z.string(),
      region: z.string(),
      secretAccessKeySecret: z.string(),
      technologyType: z.string(),
    }),
    azureDataLakeStorageConnectionProperties: z.object({
      account: z.string(),
      accountKeySecret: z.string(),
      authenticationType: z.string(),
      azureAuthorityHost: z.string(),
      azureTenantId: z.string(),
      clientId: z.string(),
      clientSecret: z.string(),
      endpoint: z.string(),
      sasTokenSecret: z.string(),
      technologyType: z.string(),
    }),
    azureSynapseAnalyticsConnectionProperties: z.object({
      connectionString: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      technologyType: z.string(),
      username: z.string(),
    }),
    connectionType: z.string(),
    databricksConnectionProperties: z.object({
      authenticationType: z.string(),
      clientId: z.string(),
      clientSecret: z.string(),
      connectionUrl: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      storageCredential: z.string(),
      technologyType: z.string(),
    }),
    db2ConnectionProperties: z.object({
      additionalAttributes: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      database: z.string(),
      host: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      port: z.number(),
      securityProtocol: z.string(),
      sslClientKeystashFile: z.string(),
      sslClientKeystoredbFile: z.string(),
      sslServerCertificateFile: z.string(),
      technologyType: z.string(),
      username: z.string(),
    }),
    description: z.string(),
    displayName: z.string(),
    elasticsearchConnectionProperties: z.object({
      authenticationType: z.string(),
      fingerprint: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      securityProtocol: z.string(),
      servers: z.string(),
      technologyType: z.string(),
      username: z.string(),
    }),
    genericConnectionProperties: z.object({
      host: z.string(),
      technologyType: z.string(),
    }),
    goldengateConnectionProperties: z.object({
      goldengateDeploymentId: z.string(),
      host: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      port: z.number(),
      technologyType: z.string(),
      username: z.string(),
    }),
    googleBigQueryConnectionProperties: z.object({
      serviceAccountKeyFile: z.string(),
      technologyType: z.string(),
    }),
    googleCloudStorageConnectionProperties: z.object({
      serviceAccountKeyFile: z.string(),
      technologyType: z.string(),
    }),
    googlePubsubConnectionProperties: z.object({
      serviceAccountKeyFile: z.string(),
      technologyType: z.string(),
    }),
    hdfsConnectionProperties: z.object({
      coreSiteXml: z.string(),
      technologyType: z.string(),
    }),
    icebergConnectionProperties: z.object({
      catalog: z.object({
        catalogType: z.string(),
        glueIcebergCatalog: z.object({
          glueId: z.string(),
        }),
        nessieIcebergCatalog: z.object({
          branch: z.string(),
          uri: z.string(),
        }),
        polarisIcebergCatalog: z.object({
          clientId: z.string(),
          clientSecret: z.string(),
          polarisCatalog: z.string(),
          principalRole: z.string(),
          uri: z.string(),
        }),
        restIcebergCatalog: z.object({
          properties: z.string(),
          uri: z.string(),
        }),
      }),
      storage: z.object({
        amazonS3IcebergStorage: z.object({
          accessKeyId: z.string(),
          bucket: z.string(),
          endpoint: z.string(),
          region: z.string(),
          schemeType: z.string(),
          secretAccessKeySecret: z.string(),
        }),
        azureDataLakeStorageIcebergStorage: z.object({
          accountKeySecret: z.string(),
          azureAccount: z.string(),
          container: z.string(),
          endpoint: z.string(),
        }),
        googleCloudStorageIcebergStorage: z.object({
          bucket: z.string(),
          projectId: z.string(),
          serviceAccountKeyFile: z.string(),
        }),
        storageType: z.string(),
      }),
      technologyType: z.string(),
    }),
    ingressIpAddresses: z.array(z.string()),
    javaMessageServiceConnectionProperties: z.object({
      authenticationType: z.string(),
      connectionFactory: z.string(),
      connectionUrl: z.string(),
      jndiConnectionFactory: z.string(),
      jndiInitialContextFactory: z.string(),
      jndiProviderUrl: z.string(),
      jndiSecurityCredentialsSecret: z.string(),
      jndiSecurityPrincipal: z.string(),
      keyStoreFile: z.string(),
      keyStorePassword: z.string(),
      keyStorePasswordSecretVersion: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      securityProtocol: z.string(),
      sslKeyPassword: z.string(),
      sslKeyPasswordSecretVersion: z.string(),
      technologyType: z.string(),
      trustStoreFile: z.string(),
      trustStorePassword: z.string(),
      trustStorePasswordSecretVersion: z.string(),
      useJndi: z.boolean(),
      username: z.string(),
    }),
    kafkaConnectionProperties: z.object({
      bootstrapServers: z.array(z.object({
        host: z.string(),
        port: z.number(),
        privateIpAddress: z.string(),
      })),
      clusterId: z.string(),
      consumerPropertiesFile: z.string(),
      keyStoreFile: z.string(),
      keyStorePassword: z.string(),
      keyStorePasswordSecretVersion: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      producerPropertiesFile: z.string(),
      securityProtocol: z.string(),
      sslKeyPassword: z.string(),
      sslKeyPasswordSecretVersion: z.string(),
      streamPoolId: z.string(),
      technologyType: z.string(),
      trustStoreFile: z.string(),
      trustStorePassword: z.string(),
      trustStorePasswordSecretVersion: z.string(),
      useResourcePrincipal: z.boolean(),
      username: z.string(),
    }),
    kafkaSchemaRegistryConnectionProperties: z.object({
      authenticationType: z.string(),
      keyStoreFile: z.string(),
      keyStorePassword: z.string(),
      keyStorePasswordSecretVersion: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      sslKeyPassword: z.string(),
      sslKeyPasswordSecretVersion: z.string(),
      technologyType: z.string(),
      trustStoreFile: z.string(),
      trustStorePassword: z.string(),
      trustStorePasswordSecretVersion: z.string(),
      url: z.string(),
      username: z.string(),
    }),
    lifecycleDetails: z.string(),
    lifecycleState: z.string(),
    microsoftFabricConnectionProperties: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      endpoint: z.string(),
      technologyType: z.string(),
      tenantId: z.string(),
    }),
    microsoftSqlserverConnectionProperties: z.object({
      additionalAttributes: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      database: z.string(),
      host: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      port: z.number(),
      securityProtocol: z.string(),
      serverCertificateValidationRequired: z.boolean(),
      sslCaFile: z.string(),
      technologyType: z.string(),
      username: z.string(),
    }),
    mongodbConnectionProperties: z.object({
      connectionString: z.string(),
      databaseId: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      securityProtocol: z.string(),
      technologyType: z.string(),
      tlsCaFile: z.string(),
      tlsCertificateKeyFile: z.string(),
      tlsCertificateKeyFilePassword: z.string(),
      tlsCertificateKeyFilePasswordSecretVersion: z.string(),
      username: z.string(),
    }),
    mysqlConnectionProperties: z.object({
      additionalAttributes: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      database: z.string(),
      dbSystemId: z.string(),
      host: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      port: z.number(),
      securityProtocol: z.string(),
      sslCaFile: z.string(),
      sslCertFile: z.string(),
      sslCrlFile: z.string(),
      sslKeyFile: z.string(),
      sslMode: z.string(),
      technologyType: z.string(),
      username: z.string(),
    }),
    ociObjectStorageConnectionProperties: z.object({
      privateKeyFile: z.string(),
      privateKeyPassphraseSecret: z.string(),
      publicKeyFingerprint: z.string(),
      region: z.string(),
      technologyType: z.string(),
      tenancyId: z.string(),
      useResourcePrincipal: z.boolean(),
      userId: z.string(),
    }),
    ocid: z.string(),
    oracleAiDataPlatformConnectionProperties: z.object({
      connectionUrl: z.string(),
      privateKeyFile: z.string(),
      privateKeyPassphraseSecret: z.string(),
      publicKeyFingerprint: z.string(),
      region: z.string(),
      technologyType: z.string(),
      tenancyId: z.string(),
      useResourcePrincipal: z.boolean(),
      userId: z.string(),
    }),
    oracleConnectionProperties: z.object({
      authenticationMode: z.string(),
      connectionString: z.string(),
      gcpOracleDatabaseId: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      sessionMode: z.string(),
      technologyType: z.string(),
      username: z.string(),
      walletFile: z.string(),
    }),
    oracleNosqlConnectionProperties: z.object({
      privateKeyFile: z.string(),
      privateKeyPassphraseSecret: z.string(),
      publicKeyFingerprint: z.string(),
      region: z.string(),
      technologyType: z.string(),
      tenancyId: z.string(),
      useResourcePrincipal: z.boolean(),
      userId: z.string(),
    }),
    postgresqlConnectionProperties: z.object({
      additionalAttributes: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      database: z.string(),
      dbSystemId: z.string(),
      host: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      port: z.number(),
      securityProtocol: z.string(),
      sslCaFile: z.string(),
      sslCertFile: z.string(),
      sslCrlFile: z.string(),
      sslKeyFile: z.string(),
      sslMode: z.string(),
      technologyType: z.string(),
      username: z.string(),
    }),
    redisConnectionProperties: z.object({
      authenticationType: z.string(),
      keyStoreFile: z.string(),
      keyStorePassword: z.string(),
      keyStorePasswordSecretVersion: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      redisClusterId: z.string(),
      securityProtocol: z.string(),
      servers: z.string(),
      technologyType: z.string(),
      trustStoreFile: z.string(),
      trustStorePassword: z.string(),
      trustStorePasswordSecretVersion: z.string(),
      username: z.string(),
    }),
    routingMethod: z.string(),
    snowflakeConnectionProperties: z.object({
      authenticationType: z.string(),
      connectionUrl: z.string(),
      password: z.string(),
      passwordSecretVersion: z.string(),
      privateKeyFile: z.string(),
      privateKeyPassphraseSecret: z.string(),
      technologyType: z.string(),
      username: z.string(),
    }),
    updateTime: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  gcpOracleZone: z.string().describe(
    "Optional. The GCP Oracle zone where Oracle GoldengateConnection is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels or tags associated with the GoldengateConnection.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the GoldengateConnection resource in the following format: projects/{project}/locations/{region}/goldengateConnections/{goldengate_connection}",
  ).optional(),
  odbNetwork: z.string().describe(
    "Optional. The name of the OdbNetwork associated with the GoldengateConnection. The format is projects/{project}/locations/{location}/odbNetworks/{odb_network}. It is optional but if specified, this should match the parent ODBNetwork of the OdbSubnet.",
  ).optional(),
  odbSubnet: z.string().describe(
    "Optional. The name of the OdbSubnet associated with the GoldengateConnection for IP allocation. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  properties: z.object({
    amazonKinesisConnectionProperties: z.object({
      accessKeyId: z.string().describe(
        "Optional. Access key ID to access the Amazon Kinesis.",
      ).optional(),
      awsRegion: z.string().describe(
        "Optional. The name of the AWS region. If not provided, Goldengate will default to 'us-west-1'.",
      ).optional(),
      endpoint: z.string().describe(
        "Optional. The endpoint URL of the Amazon Kinesis service. e.g.: 'https://kinesis.us-east-1.amazonaws.com' If not provided, Goldengate will default to 'https://kinesis..amazonaws.com'.",
      ).optional(),
      secretAccessKeySecret: z.string().describe(
        "Optional. Secret access key to access the Amazon Kinesis.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of AmazonKinesisConnection.",
      ).optional(),
    }).describe("The properties of GoldengateAmazonKinesisConnection.")
      .optional(),
    amazonRedshiftConnectionProperties: z.object({
      connectionUrl: z.string().describe(
        "Optional. Connection URL. e.g.: 'jdbc:redshift://aws-redshift-instance.aaaaaaaaaaaa.us-east-2.redshift.amazonaws.com:5439/mydb'",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for Amazon Redshift connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Amazon Redshift connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of AmazonRedshiftConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("The properties of GoldengateAmazonRedshiftConnection.")
      .optional(),
    amazonS3ConnectionProperties: z.object({
      accessKeyId: z.string().describe(
        "Optional. Access key ID to access the Amazon S3 bucket.",
      ).optional(),
      endpoint: z.string().describe("Optional. The Amazon Endpoint for S3.")
        .optional(),
      region: z.string().describe(
        "Optional. The name of the AWS region where the bucket is created.",
      ).optional(),
      secretAccessKeySecret: z.string().describe(
        "Optional. Secret access key to access the Amazon S3 bucket.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of AmazonS3Connection.",
      ).optional(),
    }).describe("The properties of GoldengateAmazonS3Connection.").optional(),
    azureDataLakeStorageConnectionProperties: z.object({
      account: z.string().describe(
        "Optional. Sets the Azure storage account name.",
      ).optional(),
      accountKeySecret: z.string().describe(
        "Optional. Azure storage account key. This property is required when 'authentication_type' is set to 'SHARED_KEY'.",
      ).optional(),
      authenticationType: z.enum([
        "AUTHENTICATION_TYPE_UNSPECIFIED",
        "SHARED_KEY",
        "SHARED_ACCESS_SIGNATURE",
        "AZURE_ACTIVE_DIRECTORY",
      ]).describe(
        "Optional. Authentication mechanism to access Azure Data Lake Storage.",
      ).optional(),
      azureAuthorityHost: z.string().describe(
        "Optional. The endpoint used for authentication with Microsoft Entra ID (formerly Azure Active Directory). Default value: https://login.microsoftonline.com",
      ).optional(),
      azureTenantId: z.string().describe(
        "Optional. Azure tenant ID of the application. This property is required when 'authentication_type' is set to 'AZURE_ACTIVE_DIRECTORY'.",
      ).optional(),
      clientId: z.string().describe(
        "Optional. Azure client ID of the application. This property is required when 'authentication_type' is set to 'AZURE_ACTIVE_DIRECTORY'.",
      ).optional(),
      clientSecret: z.string().describe(
        "Optional. Azure client secret (aka application password) for authentication.",
      ).optional(),
      endpoint: z.string().describe(
        "Optional. Azure Storage service endpoint. e.g: https://test.blob.core.windows.net",
      ).optional(),
      sasTokenSecret: z.string().describe(
        "Optional. Credential that uses a shared access signature (SAS) to authenticate to an Azure Service.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of AzureDataLakeStorageConnection.",
      ).optional(),
    }).describe("The properties of GoldengateAzureDataLakeStorageConnection.")
      .optional(),
    azureSynapseAnalyticsConnectionProperties: z.object({
      connectionString: z.string().describe(
        "Optional. JDBC connection string. e.g.: 'jdbc:sqlserver://.sql.azuresynapse.net:1433;database=;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.sql.azuresynapse.net;loginTimeout=300;'",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for Azure Synapse Analytics connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Azure Synapse Analytics connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of AzureSynapseAnalyticsConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("The properties of GoldengateAzureSynapseAnalyticsConnection.")
      .optional(),
    connectionType: z.enum([
      "GOLDENGATE_CONNECTION_TYPE_UNSPECIFIED",
      "GOLDENGATE",
      "KAFKA",
      "KAFKA_SCHEMA_REGISTRY",
      "MYSQL",
      "JAVA_MESSAGE_SERVICE",
      "MICROSOFT_SQLSERVER",
      "OCI_OBJECT_STORAGE",
      "ORACLE",
      "AZURE_DATA_LAKE_STORAGE",
      "POSTGRESQL",
      "AZURE_SYNAPSE_ANALYTICS",
      "SNOWFLAKE",
      "AMAZON_S3",
      "HDFS",
      "ORACLE_AI_DATA_PLATFORM",
      "ORACLE_NOSQL",
      "MONGODB",
      "AMAZON_KINESIS",
      "AMAZON_REDSHIFT",
      "DB2",
      "REDIS",
      "ELASTICSEARCH",
      "GENERIC",
      "GOOGLE_CLOUD_STORAGE",
      "GOOGLE_BIGQUERY",
      "DATABRICKS",
      "GOOGLE_PUBSUB",
      "MICROSOFT_FABRIC",
      "ICEBERG",
    ]).describe("Required. The connection type.").optional(),
    databricksConnectionProperties: z.object({
      authenticationType: z.enum([
        "DATABRICKS_AUTHENTICATION_TYPE_UNSPECIFIED",
        "PERSONAL_ACCESS_TOKEN",
        "OAUTH_M2M",
      ]).describe("Optional. Authentication type for Databricks.").optional(),
      clientId: z.string().describe(
        "Optional. OAuth client id, only applicable for authentication_type == OAUTH_M2M",
      ).optional(),
      clientSecret: z.string().describe(
        "Optional. OAuth client secret, only applicable for authentication_type == OAUTH_M2M",
      ).optional(),
      connectionUrl: z.string().describe(
        "Optional. Connection URL. e.g.: 'jdbc:databricks://adb-33934.4.azuredatabricks.net:443/default;transportMode=http;ssl=1;httpPath=sql/protocolv1/o/3393########44/0##3-7-hlrb'",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password used to connect to Databricks in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password used to connect to Databricks. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      storageCredential: z.string().describe(
        "Optional. External storage credential name to access files on object storage such as ADLS Gen2, S3 or Cloud Storage.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of DatabricksConnection.",
      ).optional(),
    }).describe("The properties of GoldengateDatabricksConnection.").optional(),
    db2ConnectionProperties: z.object({
      additionalAttributes: z.array(z.object({
        key: z.string().describe("Required. The name of the property entry.")
          .optional(),
        value: z.string().describe("Required. The value of the property entry.")
          .optional(),
      })).describe(
        "Optional. An array of name-value pair attribute entries. Used as additional parameters in connection string.",
      ).optional(),
      database: z.string().describe("Optional. The name of the database.")
        .optional(),
      host: z.string().describe("Optional. The name or address of a host.")
        .optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for Db2 connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Db2 connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      port: z.number().int().describe(
        "Optional. The port of an endpoint usually specified for a connection.",
      ).optional(),
      securityProtocol: z.enum([
        "DB2_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
      ]).describe("Optional. Security protocol for the DB2 database.")
        .optional(),
      sslClientKeystashFile: z.string().describe(
        "Optional. The keystash file which contains the encrypted password to the key database file. Not supported for IBM Db2 for i.",
      ).optional(),
      sslClientKeystoredbFile: z.string().describe(
        "Optional. The keystore file created at the client containing the server certificate / CA root certificate. Not supported for IBM Db2 for i.",
      ).optional(),
      sslServerCertificateFile: z.string().describe(
        "Optional. The file which contains the self-signed server certificate / Certificate Authority (CA) certificate.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of Db2Connection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect to the DB2 database.",
      ).optional(),
    }).describe("The properties of GoldengateDb2Connection.").optional(),
    description: z.string().describe(
      "Optional. Metadata about this specific object.",
    ).optional(),
    displayName: z.string().describe("Required. An object's Display Name.")
      .optional(),
    elasticsearchConnectionProperties: z.object({
      authenticationType: z.enum([
        "ELASTICSEARCH_AUTHENTICATION_TYPE_UNSPECIFIED",
        "NONE",
        "BASIC",
      ]).describe("Optional. Authentication type for Elasticsearch.")
        .optional(),
      fingerprint: z.string().describe(
        "Optional. Fingerprint required by TLS security protocol. Eg.: '6152b2dfbff200f973c5074a5b91d06ab3b472c07c09a1ea57bb7fd406cdce9c'",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for Elastic Search connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Elastic Search connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      securityProtocol: z.enum([
        "ELASTICSEARCH_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
      ]).describe("Optional. Security protocol for Elasticsearch.").optional(),
      servers: z.string().describe(
        'Optional. Comma separated list of Elasticsearch server addresses, specified as host:port entries, where:port is optional. If port is not specified, it defaults to 9200. Example: "server1.example.com:4000,server2.example.com:4000"',
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of ElasticsearchConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("The properties of GoldengateElasticsearchConnection.")
      .optional(),
    genericConnectionProperties: z.object({
      host: z.string().describe("Optional. The host of the GenericConnection.")
        .optional(),
      technologyType: z.string().describe("Optional. The technology type.")
        .optional(),
    }).describe("The properties of GoldengateGenericConnectionProperties.")
      .optional(),
    goldengateConnectionProperties: z.object({
      goldengateDeploymentId: z.string().describe(
        "Optional. The name of the GoldengateDeployment associated with the GoldengateConnection. Format: projects/{project}/locations/{location}/goldengateDeployments/{goldengate_deployment}",
      ).optional(),
      host: z.string().describe(
        "Optional. The host of the GoldengateConnection.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password used to connect to the Oracle Goldengate in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password used to connect to the Oracle Goldengate. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      port: z.number().int().describe(
        "Optional. The port of the GoldengateConnection.",
      ).optional(),
      technologyType: z.string().describe("Optional. The technology type.")
        .optional(),
      username: z.string().describe("Optional. The username credential.")
        .optional(),
    }).describe("The properties of GoldengateGoldengateConnectionProperties.")
      .optional(),
    googleBigQueryConnectionProperties: z.object({
      serviceAccountKeyFile: z.string().describe(
        "Optional. The service account key file Cloud Storage containing the credentials required to use Google BigQuery.",
      ).optional(),
      technologyType: z.string().describe("Optional. The technology type.")
        .optional(),
    }).describe(
      "The properties of GoldengateGoogleBigQueryConnectionProperties.",
    ).optional(),
    googleCloudStorageConnectionProperties: z.object({
      serviceAccountKeyFile: z.string().describe(
        "Optional. The service account key Cloud Storage file containing the credentials required to use Google Cloud Storage.",
      ).optional(),
      technologyType: z.string().describe("Optional. The technology type.")
        .optional(),
    }).describe(
      "The properties of GoldengateGoogleCloudStorageConnectionProperties.",
    ).optional(),
    googlePubsubConnectionProperties: z.object({
      serviceAccountKeyFile: z.string().describe(
        "Optional. The content of the service account key file containing the credentials required to use Google Pub/Sub.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of GooglePubsubConnection.",
      ).optional(),
    }).describe("The properties of GoldengateGooglePubsubConnection.")
      .optional(),
    hdfsConnectionProperties: z.object({
      coreSiteXml: z.string().describe(
        "Optional. The content of the Hadoop Distributed File System configuration file (core-site.xml).",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of HdfsConnection.",
      ).optional(),
    }).describe("The properties of GoldengateHdfsConnection.").optional(),
    icebergConnectionProperties: z.object({
      catalog: z.object({
        catalogType: z.enum([
          "CATALOG_TYPE_UNSPECIFIED",
          "GLUE",
          "HADOOP",
          "NESSIE",
          "POLARIS",
          "REST",
        ]).describe("Required. The type of Iceberg catalog.").optional(),
        glueIcebergCatalog: z.object({
          glueId: z.string().describe("Required. The catalog ID of Glue.")
            .optional(),
        }).describe("The Glue Iceberg catalog.").optional(),
        nessieIcebergCatalog: z.object({
          branch: z.string().describe("Required. The Nessie branch.")
            .optional(),
          uri: z.string().describe("Required. The Nessie uri.").optional(),
        }).describe("The Nessie Iceberg catalog.").optional(),
        polarisIcebergCatalog: z.object({
          clientId: z.string().describe("Required. The Polaris client ID.")
            .optional(),
          clientSecret: z.string().describe(
            "Optional. The Polaris client secret.",
          ).optional(),
          polarisCatalog: z.string().describe(
            "Required. The catalog name within Polaris.",
          ).optional(),
          principalRole: z.string().describe(
            "Required. The Polaris principal role.",
          ).optional(),
          uri: z.string().describe("Required. The Polaris uri.").optional(),
        }).describe("The Polaris Iceberg catalog.").optional(),
        restIcebergCatalog: z.object({
          properties: z.string().describe(
            "Optional. The content of the configuration file containing additional properties for the REST catalog.",
          ).optional(),
          uri: z.string().describe("Required. The REST uri.").optional(),
        }).describe("The REST Iceberg catalog.").optional(),
      }).describe("The Iceberg catalog details.").optional(),
      storage: z.object({
        amazonS3IcebergStorage: z.object({
          accessKeyId: z.string().describe(
            "Required. The access key ID of Amazon S3.",
          ).optional(),
          bucket: z.string().describe("Required. The bucket of Amazon S3.")
            .optional(),
          endpoint: z.string().describe("Optional. The endpoint of Amazon S3.")
            .optional(),
          region: z.string().describe("Required. The region of Amazon S3.")
            .optional(),
          schemeType: z.enum(["SCHEME_TYPE_UNSPECIFIED", "S3", "S3A"]).describe(
            "Required. The scheme type of Amazon S3.",
          ).optional(),
          secretAccessKeySecret: z.string().describe(
            "Optional. The secret access key of Amazon S3.",
          ).optional(),
        }).describe("The Amazon S3 Iceberg storage.").optional(),
        azureDataLakeStorageIcebergStorage: z.object({
          accountKeySecret: z.string().describe(
            "Optional. The account key of Azure Data Lake Storage.",
          ).optional(),
          azureAccount: z.string().describe(
            "Required. The account of Azure Data Lake Storage.",
          ).optional(),
          container: z.string().describe(
            "Required. The container of Azure Data Lake Storage.",
          ).optional(),
          endpoint: z.string().describe(
            "Optional. The endpoint of Azure Data Lake Storage.",
          ).optional(),
        }).describe("The Azure Data Lake Storage Iceberg storage.").optional(),
        googleCloudStorageIcebergStorage: z.object({
          bucket: z.string().describe(
            "Required. The bucket of Google Cloud Storage.",
          ).optional(),
          projectId: z.string().describe(
            "Required. The project ID of Google Cloud Storage.",
          ).optional(),
          serviceAccountKeyFile: z.string().describe(
            "Optional. The service account key file of Google Cloud Storage.",
          ).optional(),
        }).describe("The Google Cloud Storage Iceberg storage.").optional(),
        storageType: z.enum([
          "STORAGE_TYPE_UNSPECIFIED",
          "AMAZON_S3",
          "GOOGLE_CLOUD_STORAGE",
          "AZURE_DATA_LAKE_STORAGE",
        ]).describe("Required. The type of Iceberg storage.").optional(),
      }).describe("The Iceberg storage details.").optional(),
      technologyType: z.string().describe(
        "Required. The technology type of Iceberg connection.",
      ).optional(),
    }).describe("The properties of GoldengateIcebergConnection.").optional(),
    ingressIpAddresses: z.array(z.string()).describe(
      "Output only. The Ingress IPs of the GoldengateConnection.",
    ).optional(),
    javaMessageServiceConnectionProperties: z.object({
      authenticationType: z.enum([
        "JMS_AUTHENTICATION_TYPE_UNSPECIFIED",
        "NONE",
        "BASIC",
      ]).describe("Optional. Authentication type for Java Message Service.")
        .optional(),
      connectionFactory: z.string().describe(
        "Optional. The Java class implementing javax.jms.ConnectionFactory interface supplied by the JMS provider.",
      ).optional(),
      connectionUrl: z.string().describe(
        "Optional. Connection URL of the Java Message Service, specifying the protocol, host, and port. e.g.: 'mq://myjms.host.domain:7676'",
      ).optional(),
      jndiConnectionFactory: z.string().describe(
        "Optional. The Connection Factory can be looked up using this name. e.g.: 'ConnectionFactory'",
      ).optional(),
      jndiInitialContextFactory: z.string().describe(
        "Optional. The implementation of javax.naming.spi.InitialContextFactory interface used to obtain initial naming context.",
      ).optional(),
      jndiProviderUrl: z.string().describe(
        "Optional. The URL that Java Message Service will use to contact the JNDI provider. e.g.: 'tcp://myjms.host.domain:61616?jms.prefetchPolicy.all=1000'",
      ).optional(),
      jndiSecurityCredentialsSecret: z.string().describe(
        "Optional. The password associated to the principal.",
      ).optional(),
      jndiSecurityPrincipal: z.string().describe(
        "Optional. Specifies the identity of the principal (user) to be authenticated.",
      ).optional(),
      keyStoreFile: z.string().describe(
        "Optional. The content of the KeyStore file.",
      ).optional(),
      keyStorePassword: z.string().describe(
        "Optional. Input only. The KeyStore password in plain text.",
      ).optional(),
      keyStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the KeyStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses to connect the Java Message Service in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses to connect the associated Java Message Service. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      securityProtocol: z.enum([
        "JMS_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
        "MTLS",
      ]).describe("Optional. Security protocol for Java Message Service.")
        .optional(),
      sslKeyPassword: z.string().describe(
        "Optional. Input only. The password for the cert inside of the KeyStore in plain text.",
      ).optional(),
      sslKeyPasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password for the cert inside of the KeyStore. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of JavaMessageServiceConnection.",
      ).optional(),
      trustStoreFile: z.string().describe(
        "Optional. The content of the TrustStore file.",
      ).optional(),
      trustStorePassword: z.string().describe(
        "Optional. Input only. The TrustStore password in plain text.",
      ).optional(),
      trustStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the TrustStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      useJndi: z.boolean().describe(
        "Optional. If set to true, Java Naming and Directory Interface (JNDI) properties should be provided.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect to the Java Message Service.",
      ).optional(),
    }).describe("The properties of GoldengateJavaMessageServiceConnection.")
      .optional(),
    kafkaConnectionProperties: z.object({
      bootstrapServers: z.array(z.object({
        host: z.string().describe("Required. The name or address of a host.")
          .optional(),
        port: z.number().int().describe(
          "Optional. The port of an endpoint usually specified for a connection.",
        ).optional(),
        privateIpAddress: z.string().describe(
          "Optional. The private IP address of the connection's endpoint in the customer's VCN, typically a database endpoint or a big data endpoint (e.g. Kafka bootstrap server). In case the privateIp is provided, the subnetId must also be provided. In case the privateIp (and the subnetId) is not provided it is assumed the datasource is publicly accessible. In case the connection is accessible only privately, the lack of privateIp will result in not being able to access the connection.",
        ).optional(),
      })).describe(
        'Optional. Kafka bootstrap. Equivalent of bootstrap.servers configuration property in Kafka: list of KafkaBootstrapServer objects specified by host/port. Used for establishing the initial connection to the Kafka cluster. Example: "server1.example.com:9092,server2.example.com:9092"',
      ).optional(),
      clusterId: z.string().describe(
        "Optional. The OCID of the Kafka cluster being referenced from OCI Streaming with Apache Kafka.",
      ).optional(),
      consumerPropertiesFile: z.string().describe(
        "Optional. The content of the consumer.properties file.",
      ).optional(),
      keyStoreFile: z.string().describe(
        "Optional. The content of the KeyStore file.",
      ).optional(),
      keyStorePassword: z.string().describe(
        "Optional. Input only. The KeyStore password in plain text.",
      ).optional(),
      keyStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the KeyStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password for Kafka basic/SASL auth in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password for Kafka basic/SASL auth. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      producerPropertiesFile: z.string().describe(
        "Optional. The content of the producer.properties file.",
      ).optional(),
      securityProtocol: z.enum([
        "KAFKA_SECURITY_PROTOCOL_UNSPECIFIED",
        "SSL",
        "SASL_SSL",
        "PLAINTEXT",
        "SASL_PLAINTEXT",
      ]).describe("Optional. Security Type for Kafka.").optional(),
      sslKeyPassword: z.string().describe(
        "Optional. Input only. The password for the cert inside of the KeyStore in plain text.",
      ).optional(),
      sslKeyPasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password for the cert inside of the KeyStore. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      streamPoolId: z.string().describe(
        "Optional. The OCID of the stream pool being referenced.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of KafkaConnection.",
      ).optional(),
      trustStoreFile: z.string().describe(
        "Optional. The content of the TrustStore file.",
      ).optional(),
      trustStorePassword: z.string().describe(
        "Optional. Input only. The TrustStore password in plain text.",
      ).optional(),
      trustStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the TrustStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      useResourcePrincipal: z.boolean().describe(
        "Optional. Specifies that the user intends to authenticate to the instance using a resource principal. Applicable only for OCI Streaming connections.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("The properties of GoldengateKafkaConnection.").optional(),
    kafkaSchemaRegistryConnectionProperties: z.object({
      authenticationType: z.enum([
        "AUTHENTICATION_TYPE_UNSPECIFIED",
        "NONE",
        "BASIC",
        "MUTUAL",
      ]).describe(
        "Optional. Used authentication mechanism to access Schema Registry.",
      ).optional(),
      keyStoreFile: z.string().describe(
        "Optional. The content of the KeyStore file.",
      ).optional(),
      keyStorePassword: z.string().describe(
        "Optional. Input only. The KeyStore password in plain text.",
      ).optional(),
      keyStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the KeyStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password to access Schema Registry in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password to access Schema Registry using basic authentication. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      sslKeyPassword: z.string().describe(
        "Optional. Input only. The password for the cert inside the KeyStore in plain text.",
      ).optional(),
      sslKeyPasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password for the cert inside the KeyStore. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of KafkaSchemaRegistryConnection.",
      ).optional(),
      trustStoreFile: z.string().describe(
        "Optional. The content of the TrustStore file.",
      ).optional(),
      trustStorePassword: z.string().describe(
        "Optional. Input only. The TrustStore password in plain text.",
      ).optional(),
      trustStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the TrustStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      url: z.string().describe(
        "Optional. Kafka Schema Registry URL. e.g.: 'https://server1.us.oracle.com:8081'",
      ).optional(),
      username: z.string().describe(
        "Optional. The username to access Schema Registry using basic authentication. This value is injected into 'schema.registry.basic.auth.user.info=user:password' configuration property.",
      ).optional(),
    }).describe("The properties of GoldengateKafkaSchemaRegistryConnection.")
      .optional(),
    lifecycleDetails: z.string().describe(
      "Output only. Describes the object's current state in detail. For example, it can be used to provide actionable information for a resource in a Failed state.",
    ).optional(),
    lifecycleState: z.enum([
      "GOLDENGATE_CONNECTION_LIFECYCLE_STATE_UNSPECIFIED",
      "CREATING",
      "ACTIVE",
      "UPDATING",
      "DELETING",
      "DELETED",
      "FAILED",
    ]).describe("Output only. The lifecycle state of the connection.")
      .optional(),
    microsoftFabricConnectionProperties: z.object({
      clientId: z.string().describe(
        "Optional. Azure client ID of the application.",
      ).optional(),
      clientSecret: z.string().describe(
        "Optional. Client secret associated with the client id.",
      ).optional(),
      endpoint: z.string().describe(
        "Optional. Optional Microsoft Fabric service endpoint. Default value: https://onelake.dfs.fabric.microsoft.com",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of MicrosoftFabricConnection.",
      ).optional(),
      tenantId: z.string().describe(
        "Optional. Azure tenant ID of the application.",
      ).optional(),
    }).describe("The properties of GoldengateMicrosoftFabricConnection.")
      .optional(),
    microsoftSqlserverConnectionProperties: z.object({
      additionalAttributes: z.array(z.object({
        key: z.string().describe("Required. The name of the property entry.")
          .optional(),
        value: z.string().describe("Required. The value of the property entry.")
          .optional(),
      })).describe(
        "Optional. An array of name-value pair attribute entries. Used as additional parameters in connection string.",
      ).optional(),
      database: z.string().describe("Optional. The name of the database.")
        .optional(),
      host: z.string().describe("Optional. The name or address of a host.")
        .optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for Microsoft SQL Server connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Microsoft SQL Server connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      port: z.number().int().describe(
        "Optional. The port of an endpoint usually specified for a connection.",
      ).optional(),
      securityProtocol: z.enum([
        "MICROSOFT_SQLSERVER_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
      ]).describe("Optional. Security Type for Microsoft SQL Server.")
        .optional(),
      serverCertificateValidationRequired: z.boolean().describe(
        "Optional. If set to true, the driver validates the certificate that is sent by the database server.",
      ).optional(),
      sslCaFile: z.string().describe(
        "Optional. Database Certificate - The content of a.pem or.crt file containing the server public key (for 1-way SSL).",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of MicrosoftSqlserverConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect to the Microsoft SQL Server.",
      ).optional(),
    }).describe("The properties of GoldengateMicrosoftSqlserverConnection.")
      .optional(),
    mongodbConnectionProperties: z.object({
      connectionString: z.string().describe(
        "Optional. MongoDB connection string. e.g.: 'mongodb://mongodb0.example.com:27017/recordsrecords'",
      ).optional(),
      databaseId: z.string().describe(
        "Optional. The OCID of the Oracle Autonomous Json Database.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses to connect the Mongodb connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses to connect the Mongodb connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      securityProtocol: z.enum([
        "MONGODB_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
        "MTLS",
      ]).describe("Optional. Security Type for MongoDB.").optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of MongodbConnection.",
      ).optional(),
      tlsCaFile: z.string().describe(
        "Optional. Database Certificate - The content of a.pem file, containing the server public key (for 1 and 2-way SSL).",
      ).optional(),
      tlsCertificateKeyFile: z.string().describe(
        "Optional. Client Certificate - The content of a.pem file, containing the client public key (for 2-way SSL).",
      ).optional(),
      tlsCertificateKeyFilePassword: z.string().describe(
        "Optional. Input only. The Client Certificate key file password in plain text.",
      ).optional(),
      tlsCertificateKeyFilePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the Client Certificate key file password in Secret Manager. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect to the database.",
      ).optional(),
    }).describe("The properties of GoldengateMongodbConnection.").optional(),
    mysqlConnectionProperties: z.object({
      additionalAttributes: z.array(z.object({
        key: z.string().describe("Required. The name of the property entry.")
          .optional(),
        value: z.string().describe("Required. The value of the property entry.")
          .optional(),
      })).describe(
        "Optional. An array of name-value pair attribute entries. Used as additional parameters in connection string.",
      ).optional(),
      database: z.string().describe("Optional. The name of the database.")
        .optional(),
      dbSystemId: z.string().describe(
        "Optional. The OCID of the database system being referenced.",
      ).optional(),
      host: z.string().describe("Optional. The name or address of a host.")
        .optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses to connect to MySQL in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses to connect to MySQL. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      port: z.number().int().describe(
        "Optional. The port of an endpoint usually specified for a connection.",
      ).optional(),
      securityProtocol: z.enum([
        "MYSQL_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
        "MTLS",
      ]).describe("Optional. Security Type for MySQL.").optional(),
      sslCaFile: z.string().describe(
        "Optional. Database Certificate - The content of a.pem or.crt file containing the server public key (for 1 and 2-way SSL).",
      ).optional(),
      sslCertFile: z.string().describe(
        "Optional. Client Certificate - The content of a.pem or.crt file containing the client public key (for 2-way SSL).",
      ).optional(),
      sslCrlFile: z.string().describe(
        "Optional. The list of certificates revoked by the trusted certificate authorities (Trusted CA).",
      ).optional(),
      sslKeyFile: z.string().describe(
        "Optional. Client Key - The content of a.pem or.crt file containing the client private key (for 2-way SSL).",
      ).optional(),
      sslMode: z.enum([
        "SSL_MODE_UNSPECIFIED",
        "DISABLED",
        "PREFERRED",
        "REQUIRED",
        "VERIFY_CA",
        "VERIFY_IDENTITY",
      ]).describe("Optional. SSL modes for MySQL.").optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of MysqlConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("Properties of GoldengateMysqlConnection.").optional(),
    ociObjectStorageConnectionProperties: z.object({
      privateKeyFile: z.string().describe(
        "Optional. The content of the private key file (PEM file) corresponding to the API key of the fingerprint.",
      ).optional(),
      privateKeyPassphraseSecret: z.string().describe(
        "Optional. The passphrase of the private key.",
      ).optional(),
      publicKeyFingerprint: z.string().describe(
        "Optional. The fingerprint of the API Key of the user specified by the userId.",
      ).optional(),
      region: z.string().describe(
        "Optional. The name of the region of OCI Object Storage. e.g.: us-ashburn-1 If the region is not provided, backend will default to the default region.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of OciObjectStorageConnection.",
      ).optional(),
      tenancyId: z.string().describe(
        "Optional. The OCID of the related OCI tenancy.",
      ).optional(),
      useResourcePrincipal: z.boolean().describe(
        "Optional. Specifies that the user intends to authenticate to the instance using a resource principal.",
      ).optional(),
      userId: z.string().describe(
        "Optional. The OCID of the OCI user who will access the Object Storage. The user must have write access to the bucket they want to connect to.",
      ).optional(),
    }).describe("The properties of GoldengateOciObjectStorageConnection.")
      .optional(),
    ocid: z.string().describe(
      "Output only. The [OCID] of the connection being referenced.",
    ).optional(),
    oracleAiDataPlatformConnectionProperties: z.object({
      connectionUrl: z.string().describe(
        "Optional. Connection URL. It must start with 'jdbc:spark://'",
      ).optional(),
      privateKeyFile: z.string().describe(
        "Optional. The content of the private key file (PEM file) corresponding to the API key of the fingerprint.",
      ).optional(),
      privateKeyPassphraseSecret: z.string().describe(
        "Optional. The passphrase of the private key.",
      ).optional(),
      publicKeyFingerprint: z.string().describe(
        "Optional. The fingerprint of the API Key of the user specified by the user_id.",
      ).optional(),
      region: z.string().describe(
        "Optional. The name of the region. e.g.: us-ashburn-1",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of OracleAiDataPlatformConnection.",
      ).optional(),
      tenancyId: z.string().describe(
        "Optional. The OCID of the related OCI tenancy.",
      ).optional(),
      useResourcePrincipal: z.boolean().describe(
        "Optional. Specifies that the user intends to authenticate to the instance using a resource principal.",
      ).optional(),
      userId: z.string().describe(
        "Optional. The OCID of the OCI user who will access.",
      ).optional(),
    }).describe("The properties of GoldengateOracleAIDataPlatformConnection.")
      .optional(),
    oracleConnectionProperties: z.object({
      authenticationMode: z.enum([
        "ORACLE_AUTHENTICATION_MODE_UNSPECIFIED",
        "TLS",
        "MTLS",
      ]).describe("Optional. Authentication mode.").optional(),
      connectionString: z.string().describe(
        "Optional. Connect descriptor or Easy Connect Naming method used to connect to a database.",
      ).optional(),
      gcpOracleDatabaseId: z.string().describe(
        "Optional. Database instance id of database in Oracle Database @ Google Cloud. If gcp_oracle_database_id is provided, connection_string must be empty.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      sessionMode: z.enum(["SESSION_MODE_UNSPECIFIED", "DIRECT", "REDIRECT"])
        .describe(
          "Optional. The mode of the database connection session to be established by the data client.",
        ).optional(),
      technologyType: z.string().describe("Optional. The technology type.")
        .optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect.",
      ).optional(),
      walletFile: z.string().describe(
        "Optional. The wallet contents Oracle Goldengate uses to make connections to a database.",
      ).optional(),
    }).describe("The properties of Goldengate Oracle Database Connection.")
      .optional(),
    oracleNosqlConnectionProperties: z.object({
      privateKeyFile: z.string().describe(
        "Optional. The content of the private key file (PEM file) corresponding to the API key of the fingerprint.",
      ).optional(),
      privateKeyPassphraseSecret: z.string().describe(
        "Optional. The passphrase of the private key.",
      ).optional(),
      publicKeyFingerprint: z.string().describe(
        "Optional. The fingerprint of the API Key of the user specified by the userId.",
      ).optional(),
      region: z.string().describe(
        "Optional. The name of the region. e.g.: us-ashburn-1",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of OracleNosqlConnection.",
      ).optional(),
      tenancyId: z.string().describe("Optional. The OCID of the OCI tenancy.")
        .optional(),
      useResourcePrincipal: z.boolean().describe(
        "Optional. Specifies that the user intends to authenticate to the instance using a resource principal.",
      ).optional(),
      userId: z.string().describe(
        "Optional. The OCID of the OCI user who will access the Oracle NoSQL database.",
      ).optional(),
    }).describe("The properties of GoldengateOracleNosqlConnection.")
      .optional(),
    postgresqlConnectionProperties: z.object({
      additionalAttributes: z.array(z.object({
        key: z.string().describe("Required. The name of the property entry.")
          .optional(),
        value: z.string().describe("Required. The value of the property entry.")
          .optional(),
      })).describe(
        "Optional. An array of name-value pair attribute entries. Used as additional parameters in connection string.",
      ).optional(),
      database: z.string().describe("Optional. The name of the database.")
        .optional(),
      dbSystemId: z.string().describe(
        "Optional. The OCID of the database system being referenced.",
      ).optional(),
      host: z.string().describe("Optional. The name or address of a host.")
        .optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for PostgreSQL connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for PostgreSQL connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      port: z.number().int().describe(
        "Optional. The port of an endpoint usually specified for a connection.",
      ).optional(),
      securityProtocol: z.enum([
        "POSTGRESQL_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
        "MTLS",
      ]).describe("Optional. Security protocol for PostgreSQL.").optional(),
      sslCaFile: z.string().describe(
        "Optional. The certificate of the trusted certificate authorities (Trusted CA) for PostgreSQL.",
      ).optional(),
      sslCertFile: z.string().describe(
        "Optional. The certificate of the PostgreSQL server.",
      ).optional(),
      sslCrlFile: z.string().describe(
        "Optional. The list of certificates revoked by the trusted certificate authorities (Trusted CA).",
      ).optional(),
      sslKeyFile: z.string().describe(
        "Optional. The private key of the PostgreSQL server.",
      ).optional(),
      sslMode: z.enum([
        "POSTGRESQL_SSL_MODE_UNSPECIFIED",
        "PREFER",
        "REQUIRE",
        "VERIFY_CA",
        "VERIFY_FULL",
      ]).describe("Optional. SSL modes for PostgreSQL.").optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of PostgresqlConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("The properties of GoldengatePostgresqlConnection.").optional(),
    redisConnectionProperties: z.object({
      authenticationType: z.enum([
        "REDIS_AUTHENTICATION_TYPE_UNSPECIFIED",
        "NONE",
        "BASIC",
      ]).describe("Optional. Authentication type for Redis.").optional(),
      keyStoreFile: z.string().describe(
        "Optional. The content of the KeyStore file.",
      ).optional(),
      keyStorePassword: z.string().describe(
        "Optional. Input only. The KeyStore password in plain text.",
      ).optional(),
      keyStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the KeyStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses for Redis connection in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Redis connection. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      redisClusterId: z.string().describe(
        "Optional. The OCID of the Redis cluster.",
      ).optional(),
      securityProtocol: z.enum([
        "REDIS_SECURITY_PROTOCOL_UNSPECIFIED",
        "PLAIN",
        "TLS",
        "MTLS",
      ]).describe("Optional. Security protocol for Redis.").optional(),
      servers: z.string().describe(
        'Optional. Comma separated list of Redis server addresses, specified as host:port entries, where:port is optional. If port is not specified, it defaults to 6379. Example: "server1.example.com:6379,server2.example.com:6379"',
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of RedisConnection.",
      ).optional(),
      trustStoreFile: z.string().describe(
        "Optional. The content of the TrustStore file.",
      ).optional(),
      trustStorePassword: z.string().describe(
        "Optional. Input only. The TrustStore password in plain text.",
      ).optional(),
      trustStorePasswordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the TrustStore password. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect the associated system of the given technology.",
      ).optional(),
    }).describe("The properties of GoldengateRedisConnection.").optional(),
    routingMethod: z.enum([
      "GOLDENGATE_CONNECTION_ROUTING_METHOD_UNSPECIFIED",
      "SHARED_DEPLOYMENT_ENDPOINT",
      "DEDICATED_ENDPOINT",
    ]).describe("Optional. The routing method for the GoldengateConnection.")
      .optional(),
    snowflakeConnectionProperties: z.object({
      authenticationType: z.enum([
        "AUTHENTICATION_TYPE_UNSPECIFIED",
        "BASIC",
        "KEY_PAIR",
      ]).describe(
        "Optional. Used authentication mechanism to access Snowflake.",
      ).optional(),
      connectionUrl: z.string().describe(
        "Optional. JDBC connection URL. e.g.: 'jdbc:snowflake://.snowflakecomputing.com/?warehouse=&db='",
      ).optional(),
      password: z.string().describe(
        "Optional. Input only. The password Oracle Goldengate uses to connect to Snowflake platform in plain text.",
      ).optional(),
      passwordSecretVersion: z.string().describe(
        "Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses to connect to Snowflake platform. Format: projects/{project}/secrets/{secret}/versions/{version}.",
      ).optional(),
      privateKeyFile: z.string().describe(
        "Optional. The content of private key file in PEM format.",
      ).optional(),
      privateKeyPassphraseSecret: z.string().describe(
        "Optional. Password if the private key file is encrypted.",
      ).optional(),
      technologyType: z.string().describe(
        "Optional. The technology type of SnowflakeConnection.",
      ).optional(),
      username: z.string().describe(
        "Optional. The username Oracle Goldengate uses to connect to Snowflake.",
      ).optional(),
    }).describe("The properties of GoldengateSnowflakeConnection.").optional(),
    updateTime: z.string().describe(
      "Output only. The time the resource was last updated.",
    ).optional(),
  }).describe("The properties of a GoldengateConnection.").optional(),
  goldengateConnectionId: z.string().describe(
    "Required. The ID of the GoldengateConnection to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Oracle Database@Google Cloud GoldengateConnections. Registered at `@swamp/gcp/oracledatabase/goldengateconnections`. */
export const model = {
  type: "@swamp/gcp/oracledatabase/goldengateconnections",
  version: "2026.05.18.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Details of the GoldengateConnection resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a goldengateConnections",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["gcpOracleZone"] !== undefined) {
          body["gcpOracleZone"] = g["gcpOracleZone"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["odbNetwork"] !== undefined) body["odbNetwork"] = g["odbNetwork"];
        if (g["odbSubnet"] !== undefined) body["odbSubnet"] = g["odbSubnet"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["goldengateConnectionId"] !== undefined) {
          body["goldengateConnectionId"] = g["goldengateConnectionId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a goldengateConnections",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the goldengateConnections",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the goldengateConnections",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the goldengateConnections",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync goldengateConnections state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
  },
};
