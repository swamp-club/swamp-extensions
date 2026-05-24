// Auto-generated extension model for @swamp/gcp/servicemanagement/services-configs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Service Management Services.Configs.
 *
 * `Service` is the root object of Google API service configuration (service config). It describes the basic information about a logical service, such as the service name and the user-facing title, and delegates other aspects to sub-sections. Each sub-section is either a proto message or a repeated proto message that configures a specific aspect, such as auth. For more information, see each proto message definition. Example: type: google.api.Service name: calendar.googleapis.com title: Google Calendar API apis: - name: google.calendar.v3.Calendar visibility: rules: - selector: "google.calendar.v3.*" restriction: PREVIEW backend: rules: - selector: "google.calendar.v3.*" address: calendar.example.com authentication: providers: - id: google_calendar_auth jwks_uri: https://www.googleapis.com/oauth2/v1/certs issuer: https://securetoken.google.com rules: - selector: "*" requirements: provider_id: google_calendar_auth
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://servicemanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "servicemanagement.services.configs.get",
  "path": "v1/services/{serviceName}/configs/{configId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "serviceName",
    "configId",
  ],
  "parameters": {
    "configId": {
      "location": "path",
      "required": true,
    },
    "serviceName": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "servicemanagement.services.configs.create",
  "path": "v1/services/{serviceName}/configs",
  "httpMethod": "POST",
  "parameterOrder": [
    "serviceName",
  ],
  "parameters": {
    "serviceName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "servicemanagement.services.configs.list",
  "path": "v1/services/{serviceName}/configs",
  "httpMethod": "GET",
  "parameterOrder": [
    "serviceName",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "serviceName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  apis: z.array(z.object({
    edition: z.string().describe(
      "The source edition string, only valid when syntax is SYNTAX_EDITIONS.",
    ).optional(),
    methods: z.array(z.object({
      edition: z.string().describe(
        "The source edition string, only valid when syntax is SYNTAX_EDITIONS. This field should be ignored, instead the edition should be inherited from Api. This is similar to Field and EnumValue.",
      ).optional(),
      name: z.string().describe("The simple name of this method.").optional(),
      options: z.array(z.unknown()).describe(
        "Any metadata attached to the method.",
      ).optional(),
      requestStreaming: z.boolean().describe(
        "If true, the request is streamed.",
      ).optional(),
      requestTypeUrl: z.string().describe("A URL of the input message type.")
        .optional(),
      responseStreaming: z.boolean().describe(
        "If true, the response is streamed.",
      ).optional(),
      responseTypeUrl: z.string().describe(
        "The URL of the output message type.",
      ).optional(),
      syntax: z.enum(["SYNTAX_PROTO2", "SYNTAX_PROTO3", "SYNTAX_EDITIONS"])
        .describe(
          "The source syntax of this method. This field should be ignored, instead the syntax should be inherited from Api. This is similar to Field and EnumValue.",
        ).optional(),
    })).describe("The methods of this interface, in unspecified order.")
      .optional(),
    mixins: z.array(z.object({
      name: z.string().describe(
        "The fully qualified name of the interface which is included.",
      ).optional(),
      root: z.string().describe(
        "If non-empty specifies a path under which inherited HTTP paths are rooted.",
      ).optional(),
    })).describe("Included interfaces. See Mixin.").optional(),
    name: z.string().describe(
      "The fully qualified name of this interface, including package name followed by the interface's simple name.",
    ).optional(),
    options: z.array(z.object({
      name: z.string().describe(
        'The option\'s name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, `"map_entry"`. For custom options, it should be the fully-qualified name. For example, `"google.api.http"`.',
      ).optional(),
      value: z.record(z.string(), z.unknown()).describe(
        "The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type.",
      ).optional(),
    })).describe("Any metadata attached to the interface.").optional(),
    sourceContext: z.object({
      fileName: z.string().describe(
        'The path-qualified name of the.proto file that contained the associated protobuf element. For example: `"google/protobuf/source_context.proto"`.',
      ).optional(),
    }).describe(
      "`SourceContext` represents information about the source of a protobuf element, like the file in which it is defined.",
    ).optional(),
    syntax: z.enum(["SYNTAX_PROTO2", "SYNTAX_PROTO3", "SYNTAX_EDITIONS"])
      .describe("The source syntax of the service.").optional(),
    version: z.string().describe(
      "A version string for this interface. If specified, must have the form `major-version.minor-version`, as in `1.10`. If the minor version is omitted, it defaults to zero. If the entire version field is empty, the major version is derived from the package name, as outlined below. If the field is not empty, the version in the package name will be verified to be consistent with what is provided here. The versioning schema uses [semantic versioning](http://semver.org) where the major version number indicates a breaking change and the minor version an additive, non-breaking change. Both version numbers are signals to users what to expect from different versions, and should be carefully chosen based on the product plan. The major version is also reflected in the package name of the interface, which must end in `v`, as in `google.feature.v1`. For major versions 0 and 1, the suffix can be omitted. Zero major versions must only be used for experimental, non-GA interfaces.",
    ).optional(),
  })).describe(
    "A list of API interfaces exported by this service. Only the `name` field of the google.protobuf.Api needs to be provided by the configuration author, as the remaining fields will be derived from the IDL during the normalization process. It is an error to specify an API interface here which cannot be resolved against the associated IDL files.",
  ).optional(),
  aspects: z.array(z.object({
    kind: z.string().describe("The type of this aspect configuration.")
      .optional(),
    rules: z.array(z.object({
      config: z.record(z.string(), z.unknown()).describe(
        "Required. Rules of the configuration. The underlying schema should be defined by Aspect owners as protobuf message under `google/api/configaspects/proto`.",
      ).optional(),
      selector: z.string().describe(
        "Required. Selects the RPC methods to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe("Optional. Rules of the Configuration.").optional(),
    spec: z.record(z.string(), z.string()).describe(
      "Content of the configuration. The underlying schema should be defined by Aspect owners as protobuf message under `google/api/configaspects/proto`.",
    ).optional(),
  })).describe(
    "Configuration aspects. This is a repeated field to allow multiple aspects to be configured. The kind field in each ConfigAspect specifies the type of aspect. The spec field contains the configuration for that aspect. The schema for the spec field is defined by the backend service owners.",
  ).optional(),
  authentication: z.object({
    providers: z.array(z.object({
      audiences: z.string().describe(
        'The list of JWT [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted. When this setting is absent, JWTs with audiences: - "https://[service.name]/[google.protobuf.Api.name]" - "https://[service.name]/" will be accepted. For example, if no audiences are in the setting, LibraryService API will accept JWTs with the following audiences: - https://library-example.googleapis.com/google.example.library.v1.LibraryService - https://library-example.googleapis.com/ Example: audiences: bookstore_android.apps.googleusercontent.com, bookstore_web.apps.googleusercontent.com',
      ).optional(),
      authorizationUrl: z.string().describe(
        "Redirect URL if JWT token is required but not present or is expired. Implement authorizationUrl of securityDefinitions in OpenAPI spec.",
      ).optional(),
      id: z.string().describe(
        'The unique identifier of the auth provider. It will be referred to by `AuthRequirement.provider_id`. Example: "bookstore_auth".',
      ).optional(),
      issuer: z.string().describe(
        "Identifies the principal that issued the JWT. See https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.1 Usually a URL or an email address. Example: https://securetoken.google.com Example: 1234567-compute@developer.gserviceaccount.com",
      ).optional(),
      jwksUri: z.string().describe(
        "URL of the provider's public key set to validate signature of the JWT. See [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata). Optional if the key set document: - can be retrieved from [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) of the issuer. - can be inferred from the email domain of the issuer (e.g. a Google service account). Example: https://www.googleapis.com/oauth2/v1/certs",
      ).optional(),
      jwtLocations: z.array(z.object({
        cookie: z.unknown().describe(
          "Specifies cookie name to extract JWT token.",
        ).optional(),
        header: z.unknown().describe(
          "Specifies HTTP header name to extract JWT token.",
        ).optional(),
        query: z.unknown().describe(
          "Specifies URL query parameter name to extract JWT token.",
        ).optional(),
        valuePrefix: z.unknown().describe(
          'The value prefix. The value format is "value_prefix{token}" Only applies to "in" header type. Must be empty for "in" query type. If not empty, the header value has to match (case sensitive) this prefix. If not matched, JWT will not be extracted. If matched, JWT will be extracted after the prefix is removed. For example, for "Authorization: Bearer {JWT}", value_prefix="Bearer " with a space at the end.',
        ).optional(),
      })).describe(
        'Defines the locations to extract the JWT. For now it is only used by the Cloud Endpoints to store the OpenAPI extension [x-google-jwt-locations] (https://cloud.google.com/endpoints/docs/openapi/openapi-extensions#x-google-jwt-locations) JWT locations can be one of HTTP headers, URL query parameters or cookies. The rule is that the first match wins. If not specified, default to use following 3 locations: 1) Authorization: Bearer 2) x-goog-iap-jwt-assertion 3) access_token query parameter Default locations can be specified as followings: jwt_locations: - header: Authorization value_prefix: "Bearer " - header: x-goog-iap-jwt-assertion - query: access_token',
      ).optional(),
    })).describe(
      "Defines a set of authentication providers that a service supports.",
    ).optional(),
    rules: z.array(z.object({
      allowWithoutCredential: z.boolean().describe(
        "If true, the service accepts API keys without any other credential. This flag only applies to HTTP and gRPC requests.",
      ).optional(),
      oauth: z.object({
        canonicalScopes: z.string().describe(
          "The list of publicly documented OAuth scopes that are allowed access. An OAuth token containing any of these scopes will be accepted. Example: canonical_scopes: https://www.googleapis.com/auth/calendar, https://www.googleapis.com/auth/calendar.read",
        ).optional(),
      }).describe(
        'OAuth scopes are a way to define data and permissions on data. For example, there are scopes defined for "Read-only access to Google Calendar" and "Access to Cloud Platform". Users can consent to a scope for an application, giving it permission to access that data on their behalf. OAuth scope specifications should be fairly coarse grained; a user will need to see and understand the text description of what your scope means. In most cases: use one or at most two OAuth scopes for an entire family of products. If your product has multiple APIs, you should probably be sharing the OAuth scope across all of those APIs. When you need finer grained OAuth consent screens: talk with your product management about how developers will use them in practice. Please note that even though each of the canonical scopes is enough for a request to be accepted and passed to the backend, a request can still fail due to the backend requiring additional scopes or permissions.',
      ).optional(),
      requirements: z.array(z.object({
        audiences: z.unknown().describe(
          'NOTE: This will be deprecated soon, once AuthProvider.audiences is implemented and accepted in all the runtime components. The list of JWT [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted. When this setting is absent, only JWTs with audience "https://Service_name/API_name" will be accepted. For example, if no audiences are in the setting, LibraryService API will only accept JWTs with the following audience "https://library-example.googleapis.com/google.example.library.v1.LibraryService". Example: audiences: bookstore_android.apps.googleusercontent.com, bookstore_web.apps.googleusercontent.com',
        ).optional(),
        providerId: z.unknown().describe(
          "id from authentication provider. Example: provider_id: bookstore_auth",
        ).optional(),
      })).describe("Requirements for additional authentication providers.")
        .optional(),
      selector: z.string().describe(
        "Selects the methods to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      'A list of authentication rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
  }).describe(
    '`Authentication` defines the authentication configuration for API methods provided by an API service. Example: name: calendar.googleapis.com authentication: providers: - id: google_calendar_auth jwks_uri: https://www.googleapis.com/oauth2/v1/certs issuer: https://securetoken.google.com rules: - selector: "*" requirements: provider_id: google_calendar_auth - selector: google.calendar.Delegate oauth: canonical_scopes: https://www.googleapis.com/auth/calendar.read',
  ).optional(),
  backend: z.object({
    rules: z.array(z.object({
      address: z.string().describe(
        "The address of the API backend. The scheme is used to determine the backend protocol and security. The following schemes are accepted: SCHEME PROTOCOL SECURITY http:// HTTP None https:// HTTP TLS grpc:// gRPC None grpcs:// gRPC TLS It is recommended to explicitly include a scheme. Leaving out the scheme may cause constrasting behaviors across platforms. If the port is unspecified, the default is: - 80 for schemes without TLS - 443 for schemes with TLS For HTTP backends, use protocol to specify the protocol version.",
      ).optional(),
      deadline: z.number().describe(
        "The number of seconds to wait for a response from a request. The default varies based on the request protocol and deployment environment.",
      ).optional(),
      disableAuth: z.boolean().describe(
        'When disable_auth is true, a JWT ID token won\'t be generated and the original "Authorization" HTTP header will be preserved. If the header is used to carry the original token and is expected by the backend, this field must be set to true to preserve the header.',
      ).optional(),
      jwtAudience: z.string().describe(
        'The JWT audience is used when generating a JWT ID token for the backend. This ID token will be added in the HTTP "authorization" header, and sent to the backend.',
      ).optional(),
      loadBalancingPolicy: z.string().describe(
        'The load balancing policy used for connection to the application backend. Defined as an arbitrary string to accomondate custom load balancing policies supported by the underlying channel, but suggest most users use one of the standard policies, such as the default, "RoundRobin".',
      ).optional(),
      minDeadline: z.number().describe("Deprecated, do not use.").optional(),
      operationDeadline: z.number().describe(
        "The number of seconds to wait for the completion of a long running operation. The default is no deadline.",
      ).optional(),
      overridesByRequestProtocol: z.record(z.string(), z.string()).describe(
        "The map between request protocol and the backend address.",
      ).optional(),
      pathTranslation: z.enum([
        "PATH_TRANSLATION_UNSPECIFIED",
        "CONSTANT_ADDRESS",
        "APPEND_PATH_TO_ADDRESS",
      ]).describe(
        "Path translation specifies how to combine the backend address with the request path in order to produce the appropriate forwarding URL for the request. See PathTranslation for more details.",
      ).optional(),
      protocol: z.string().describe(
        'The protocol used for sending a request to the backend. The supported values are "http/1.1" and "h2". The default value is inferred from the scheme in the address field: SCHEME PROTOCOL http:// http/1.1 https:// http/1.1 grpc:// h2 grpcs:// h2 For secure HTTP backends (https://) that support HTTP/2, set this field to "h2" for improved performance. Configuring this field to non-default values is only supported for secure HTTP backends. This field will be ignored for all other backends. See https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids for more details on the supported values.',
      ).optional(),
      selector: z.string().describe(
        "Selects the methods to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      'A list of API backend rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
  }).describe("`Backend` defines the backend configuration for a service.")
    .optional(),
  billing: z.object({
    consumerDestinations: z.array(z.object({
      metrics: z.array(z.string()).describe(
        "Names of the metrics to report to this billing destination. Each name must be defined in Service.metrics section.",
      ).optional(),
      monitoredResource: z.string().describe(
        "The monitored resource type. The type must be defined in Service.monitored_resources section.",
      ).optional(),
    })).describe(
      "Billing configurations for sending metrics to the consumer project. There can be multiple consumer destinations per service, each one must have a different monitored resource type. A metric can be used in at most one consumer destination.",
    ).optional(),
  }).describe(
    'Billing related configuration of the service. The following example shows how to configure monitored resources and metrics for billing, `consumer_destinations` is the only supported destination and the monitored resources need at least one label key `cloud.googleapis.com/location` to indicate the location of the billing usage, using different monitored resources between monitoring and billing is recommended so they can be evolved independently: monitored_resources: - type: library.googleapis.com/billing_branch labels: - key: cloud.googleapis.com/location description: | Predefined label to support billing location restriction. - key: city description: | Custom label to define the city where the library branch is located in. - key: name description: Custom label to define the name of the library branch. metrics: - name: library.googleapis.com/book/borrowed_count metric_kind: DELTA value_type: INT64 unit: "1" billing: consumer_destinations: - monitored_resource: library.googleapis.com/billing_branch metrics: - library.googleapis.com/book/borrowed_count',
  ).optional(),
  configVersion: z.number().int().describe(
    "Obsolete. Do not use. This field has no semantic meaning. The service config compiler always sets this field to `3`.",
  ).optional(),
  context: z.object({
    rules: z.array(z.object({
      allowedRequestExtensions: z.array(z.string()).describe(
        "A list of full type names or extension IDs of extensions allowed in grpc side channel from client to backend.",
      ).optional(),
      allowedResponseExtensions: z.array(z.string()).describe(
        "A list of full type names or extension IDs of extensions allowed in grpc side channel from backend to client.",
      ).optional(),
      provided: z.array(z.string()).describe(
        "A list of full type names of provided contexts. It is used to support propagating HTTP headers and ETags from the response extension.",
      ).optional(),
      requested: z.array(z.string()).describe(
        "A list of full type names of requested contexts, only the requested context will be made available to the backend.",
      ).optional(),
      selector: z.string().describe(
        "Selects the methods to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      'A list of RPC context rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
  }).describe(
    '`Context` defines which contexts an API requests. Example: context: rules: - selector: "*" requested: - google.rpc.context.ProjectContext - google.rpc.context.OriginContext The above specifies that all methods in the API request `google.rpc.context.ProjectContext` and `google.rpc.context.OriginContext`. Available context types are defined in package `google.rpc.context`. This also provides mechanism to allowlist any protobuf message extension that can be sent in grpc metadata using “x-goog-ext--bin” and “x-goog-ext--jspb” format. For example, list any service specific protobuf types that can appear in grpc metadata as follows in your yaml file: Example: context: rules: - selector: "google.example.library.v1.LibraryService.CreateBook" allowed_request_extensions: - google.foo.v1.NewExtension allowed_response_extensions: - google.foo.v1.NewExtension You can also specify extension ID instead of fully qualified extension name here.',
  ).optional(),
  control: z.object({
    environment: z.string().describe(
      "The service controller environment to use. If empty, no control plane features (like quota and billing) will be enabled. The recommended value for most services is servicecontrol.googleapis.com.",
    ).optional(),
    methodPolicies: z.array(z.object({
      requestPolicies: z.array(z.object({
        resourcePermission: z.unknown().describe(
          'Specifies the required permission(s) for the resource referred to by the field. It requires the field contains a valid resource reference, and the request must pass the permission checks to proceed. For example, "resourcemanager.projects.get".',
        ).optional(),
        resourceType: z.unknown().describe(
          "Specifies the resource type for the resource referred to by the field.",
        ).optional(),
        selector: z.unknown().describe(
          'Selects one or more request or response message fields to apply this `FieldPolicy`. When a `FieldPolicy` is used in proto annotation, the selector must be left as empty. The service config generator will automatically fill the correct value. When a `FieldPolicy` is used in service config, the selector must be a comma-separated string with valid request or response field paths, such as "foo.bar" or "foo.bar,foo.baz".',
        ).optional(),
      })).describe("Policies that are applicable to the request message.")
        .optional(),
      selector: z.string().describe(
        'Selects a method to which these policies should be enforced, for example, "google.pubsub.v1.Subscriber.CreateSubscription". Refer to selector for syntax details. NOTE: This field must not be set in the proto annotation. It will be automatically filled by the service config compiler.',
      ).optional(),
    })).describe("Defines policies applying to the API methods of the service.")
      .optional(),
  }).describe(
    "Selects and configures the service controller used by the service. Example: control: environment: servicecontrol.googleapis.com",
  ).optional(),
  customError: z.object({
    rules: z.array(z.object({
      isErrorType: z.boolean().describe(
        "Mark this message as possible payload in error response. Otherwise, objects of this type will be filtered when they appear in error payload.",
      ).optional(),
      selector: z.string().describe(
        "Selects messages to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      'The list of custom error rules that apply to individual API messages. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
    types: z.array(z.string()).describe(
      "The list of custom error detail types, e.g. 'google.foo.v1.CustomError'.",
    ).optional(),
  }).describe(
    "Customize service error responses. For example, list any service specific protobuf types that can appear in error detail lists of error responses. Example: custom_error: types: - google.foo.v1.CustomError - google.foo.v1.AnotherError",
  ).optional(),
  documentation: z.object({
    additionalIamInfo: z.string().describe(
      "Optional information about the IAM configuration. This is typically used to link to documentation about a product's IAM roles and permissions.",
    ).optional(),
    documentationRootUrl: z.string().describe(
      "The URL to the root of documentation.",
    ).optional(),
    overview: z.string().describe(
      "Declares a single overview page. For example: documentation: summary:... overview: (== include overview.md ==) This is a shortcut for the following declaration (using pages style): documentation: summary:... pages: - name: Overview content: (== include overview.md ==) Note: you cannot specify both `overview` field and `pages` field.",
    ).optional(),
    pages: z.array(z.object({
      content: z.string().describe(
        "The Markdown content of the page. You can use ` (== include {path} ==) ` to include content from a Markdown file. The content can be used to produce the documentation page such as HTML format page.",
      ).optional(),
      name: z.string().describe(
        "The name of the page. It will be used as an identity of the page to generate URI of the page, text of the link to this page in navigation, etc. The full page name (start from the root page name to this page concatenated with `.`) can be used as reference to the page in your documentation. For example: pages: - name: Tutorial content: (== include tutorial.md ==) subpages: - name: Java content: (== include tutorial_java.md ==) You can reference `Java` page using Markdown reference link syntax: `Java`.",
      ).optional(),
      subpages: z.array(z.string()).describe(
        "Subpages of this page. The order of subpages specified here will be honored in the generated docset.",
      ).optional(),
    })).describe("The top level pages for the documentation set.").optional(),
    rules: z.array(z.object({
      deprecationDescription: z.string().describe(
        "Deprecation description of the selected element(s). It can be provided if an element is marked as `deprecated`.",
      ).optional(),
      description: z.string().describe(
        "Description of the selected proto element (e.g. a message, a method, a 'service' definition, or a field). Defaults to leading & trailing comments taken from the proto source definition of the proto element.",
      ).optional(),
      disableReplacementWords: z.string().describe(
        "String of comma or space separated case-sensitive words for which method/field name replacement will be disabled.",
      ).optional(),
      selector: z.string().describe(
        'The selector is a comma-separated list of patterns for any element such as a method, a field, an enum value. Each pattern is a qualified name of the element which may end in "*", indicating a wildcard. Wildcards are only allowed at the end and for a whole component of the qualified name, i.e. "foo.*" is ok, but not "foo.b*" or "foo.*.bar". A wildcard will match one or more components. To specify a default for all applicable elements, the whole pattern "*" is used.',
      ).optional(),
    })).describe(
      'A list of documentation rules that apply to individual API elements. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
    sectionOverrides: z.array(z.object({
      content: z.string().describe(
        "The Markdown content of the page. You can use ` (== include {path} ==) ` to include content from a Markdown file. The content can be used to produce the documentation page such as HTML format page.",
      ).optional(),
      name: z.string().describe(
        "The name of the page. It will be used as an identity of the page to generate URI of the page, text of the link to this page in navigation, etc. The full page name (start from the root page name to this page concatenated with `.`) can be used as reference to the page in your documentation. For example: pages: - name: Tutorial content: (== include tutorial.md ==) subpages: - name: Java content: (== include tutorial_java.md ==) You can reference `Java` page using Markdown reference link syntax: `Java`.",
      ).optional(),
      subpages: z.array(z.string()).describe(
        "Subpages of this page. The order of subpages specified here will be honored in the generated docset.",
      ).optional(),
    })).describe(
      "Specifies section and content to override the boilerplate content. Currently overrides following sections: 1. rest.service.client_libraries",
    ).optional(),
    serviceRootUrl: z.string().describe(
      "Specifies the service root url if the default one (the service name from the yaml file) is not suitable. This can be seen in any fully specified service urls as well as sections that show a base that other urls are relative to.",
    ).optional(),
    summary: z.string().describe(
      "A short description of what the service does. The summary must be plain text. It becomes the overview of the service displayed in Google Cloud Console. NOTE: This field is equivalent to the standard field `description`.",
    ).optional(),
  }).describe(
    "`Documentation` provides the information for describing a service. Example: documentation: summary: > The Google Calendar API gives access to most calendar features. pages: - name: Overview content: (== include google/foo/overview.md ==) - name: Tutorial content: (== include google/foo/tutorial.md ==) subpages: - name: Java content: (== include google/foo/tutorial_java.md ==) rules: - selector: google.calendar.Calendar.Get description: >... - selector: google.calendar.Calendar.Put description: >... Documentation is provided in markdown syntax. In addition to standard markdown features, definition lists, tables and fenced code blocks are supported. Section headers can be provided and are interpreted relative to the section nesting of the context where a documentation fragment is embedded. Documentation from the IDL is merged with documentation defined via the config at normalization time, where documentation provided by config rules overrides IDL provided. A number of constructs specific to the API platform are supported in documentation text. In order to reference a proto element, the following notation can be used: [fully.qualified.proto.name][] To override the display text used for the link, this can be used: [display text][fully.qualified.proto.name] Text can be excluded from doc using the following notation: (-- internal comment --) A few directives are available in documentation. Note that directives must appear on a single line to be properly identified. The `include` directive includes a markdown file from an external source: (== include path/to/file ==) The `resource_for` directive marks a message to be the resource of a collection in REST view. If it is not specified, tools attempt to infer the resource from the operations in a collection: (== resource_for v1.shelves.books ==) The directive `suppress_warning` does not directly affect documentation and is documented together with service config validation.",
  ).optional(),
  endpoints: z.array(z.object({
    aliases: z.array(z.string()).describe(
      "Aliases for this endpoint, these will be served by the same UrlMap as the parent endpoint, and will be provisioned in the GCP stack for the Regional Endpoints.",
    ).optional(),
    allowCors: z.boolean().describe(
      "Allowing [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), aka cross-domain traffic, would allow the backends served from this endpoint to receive and respond to HTTP OPTIONS requests. The response will be used by the browser to determine whether the subsequent cross-origin request is allowed to proceed.",
    ).optional(),
    name: z.string().describe("The canonical name of this endpoint.")
      .optional(),
    target: z.string().describe(
      'The specification of an Internet routable address of API frontend that will handle requests to this [API Endpoint](https://cloud.google.com/apis/design/glossary). It should be either a valid IPv4 address or a fully-qualified domain name. For example, "8.8.8.8" or "myservice.appspot.com".',
    ).optional(),
  })).describe(
    "Configuration for network endpoints. If this is empty, then an endpoint with the same name as the service is automatically generated to service all defined APIs.",
  ).optional(),
  enums: z.array(z.object({
    edition: z.string().describe(
      "The source edition string, only valid when syntax is SYNTAX_EDITIONS.",
    ).optional(),
    enumvalue: z.array(z.object({
      name: z.string().describe("Enum value name.").optional(),
      number: z.number().int().describe("Enum value number.").optional(),
      options: z.array(z.unknown()).describe("Protocol buffer options.")
        .optional(),
    })).describe("Enum value definitions.").optional(),
    name: z.string().describe("Enum type name.").optional(),
    options: z.array(z.object({
      name: z.string().describe(
        'The option\'s name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, `"map_entry"`. For custom options, it should be the fully-qualified name. For example, `"google.api.http"`.',
      ).optional(),
      value: z.record(z.string(), z.unknown()).describe(
        "The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type.",
      ).optional(),
    })).describe("Protocol buffer options.").optional(),
    sourceContext: z.object({
      fileName: z.string().describe(
        'The path-qualified name of the.proto file that contained the associated protobuf element. For example: `"google/protobuf/source_context.proto"`.',
      ).optional(),
    }).describe(
      "`SourceContext` represents information about the source of a protobuf element, like the file in which it is defined.",
    ).optional(),
    syntax: z.enum(["SYNTAX_PROTO2", "SYNTAX_PROTO3", "SYNTAX_EDITIONS"])
      .describe("The source syntax.").optional(),
  })).describe(
    "A list of all enum types included in this API service. Enums referenced directly or indirectly by the `apis` are automatically included. Enums which are not referenced but shall be included should be listed here by name by the configuration author. Example: enums: - name: google.someapi.v1.SomeEnum",
  ).optional(),
  http: z.object({
    fullyDecodeReservedExpansion: z.boolean().describe(
      'When set to true, URL path parameters will be fully URI-decoded except in cases of single segment matches in reserved expansion, where "%2F" will be left encoded. The default behavior is to not decode RFC 6570 reserved characters in multi segment matches.',
    ).optional(),
    rules: z.array(z.object({
      additionalBindings: z.array(z.string()).describe(
        "Additional HTTP bindings for the selector. Nested bindings must not contain an `additional_bindings` field themselves (that is, the nesting may only be one level deep).",
      ).optional(),
      body: z.string().describe(
        "The name of the request field whose value is mapped to the HTTP request body, or `*` for mapping all request fields not captured by the path pattern to the HTTP body, or omitted for not having any HTTP request body. NOTE: the referred field must be present at the top-level of the request message type.",
      ).optional(),
      custom: z.object({
        kind: z.string().describe("The name of this custom HTTP verb.")
          .optional(),
        path: z.string().describe("The path matched by this custom verb.")
          .optional(),
      }).describe("A custom pattern is used for defining custom HTTP verb.")
        .optional(),
      delete: z.string().describe(
        "Maps to HTTP DELETE. Used for deleting a resource.",
      ).optional(),
      get: z.string().describe(
        "Maps to HTTP GET. Used for listing and getting information about resources.",
      ).optional(),
      patch: z.string().describe(
        "Maps to HTTP PATCH. Used for updating a resource.",
      ).optional(),
      post: z.string().describe(
        "Maps to HTTP POST. Used for creating a resource or performing an action.",
      ).optional(),
      put: z.string().describe(
        "Maps to HTTP PUT. Used for replacing a resource.",
      ).optional(),
      responseBody: z.string().describe(
        "Optional. The name of the response field whose value is mapped to the HTTP response body. When omitted, the entire response message will be used as the HTTP response body. NOTE: The referred field must be present at the top-level of the response message type.",
      ).optional(),
      selector: z.string().describe(
        "Selects a method to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      'A list of HTTP configuration rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
  }).describe(
    "Defines the HTTP configuration for an API service. It contains a list of HttpRule, each specifying the mapping of an RPC method to one or more HTTP REST API methods.",
  ).optional(),
  id: z.string().describe(
    "A unique ID for a specific instance of this message, typically assigned by the client for tracking purpose. Must be no longer than 63 characters and only lower case letters, digits, '.', '_' and '-' are allowed. If empty, the server may choose to generate one instead.",
  ).optional(),
  logging: z.object({
    consumerDestinations: z.array(z.object({
      logs: z.array(z.string()).describe(
        'Names of the logs to be sent to this destination. Each name must be defined in the Service.logs section. If the log name is not a domain scoped name, it will be automatically prefixed with the service name followed by "/".',
      ).optional(),
      monitoredResource: z.string().describe(
        "The monitored resource type. The type must be defined in the Service.monitored_resources section.",
      ).optional(),
    })).describe(
      "Logging configurations for sending logs to the consumer project. There can be multiple consumer destinations, each one must have a different monitored resource type. A log can be used in at most one consumer destination.",
    ).optional(),
    producerDestinations: z.array(z.object({
      logs: z.array(z.string()).describe(
        'Names of the logs to be sent to this destination. Each name must be defined in the Service.logs section. If the log name is not a domain scoped name, it will be automatically prefixed with the service name followed by "/".',
      ).optional(),
      monitoredResource: z.string().describe(
        "The monitored resource type. The type must be defined in the Service.monitored_resources section.",
      ).optional(),
    })).describe(
      "Logging configurations for sending logs to the producer project. There can be multiple producer destinations, each one must have a different monitored resource type. A log can be used in at most one producer destination.",
    ).optional(),
  }).describe(
    "Logging configuration of the service. The following example shows how to configure logs to be sent to the producer and consumer projects. In the example, the `activity_history` log is sent to both the producer and consumer projects, whereas the `purchase_history` log is only sent to the producer project. monitored_resources: - type: library.googleapis.com/branch labels: - key: /city description: The city where the library branch is located in. - key: /name description: The name of the branch. logs: - name: activity_history labels: - key: /customer_id - name: purchase_history logging: producer_destinations: - monitored_resource: library.googleapis.com/branch logs: - activity_history - purchase_history consumer_destinations: - monitored_resource: library.googleapis.com/branch logs: - activity_history",
  ).optional(),
  logs: z.array(z.object({
    description: z.string().describe(
      "A human-readable description of this log. This information appears in the documentation and can contain details.",
    ).optional(),
    displayName: z.string().describe(
      "The human-readable name for this log. This information appears on the user interface and should be concise.",
    ).optional(),
    labels: z.array(z.object({
      description: z.string().describe(
        "A human-readable description for the label.",
      ).optional(),
      key: z.string().describe("The label key.").optional(),
      valueType: z.enum(["STRING", "BOOL", "INT64"]).describe(
        "The type of data that can be assigned to the label.",
      ).optional(),
    })).describe(
      "The set of labels that are available to describe a specific log entry. Runtime requests that contain labels not specified here are considered invalid.",
    ).optional(),
    name: z.string().describe(
      "The name of the log. It must be less than 512 characters long and can include the following characters: upper- and lower-case alphanumeric characters [A-Za-z0-9], and punctuation characters including slash, underscore, hyphen, period [/_-.].",
    ).optional(),
  })).describe("Defines the logs used by this service.").optional(),
  metrics: z.array(z.object({
    description: z.string().describe(
      "A detailed description of the metric, which can be used in documentation.",
    ).optional(),
    displayName: z.string().describe(
      'A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example "Request count". This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota.',
    ).optional(),
    labels: z.array(z.object({
      description: z.string().describe(
        "A human-readable description for the label.",
      ).optional(),
      key: z.string().describe("The label key.").optional(),
      valueType: z.enum(["STRING", "BOOL", "INT64"]).describe(
        "The type of data that can be assigned to the label.",
      ).optional(),
    })).describe(
      "The set of labels that can be used to describe a specific instance of this metric type. For example, the `appengine.googleapis.com/http/server/response_latencies` metric type has a label for the HTTP response code, `response_code`, so you can look at latencies for successful responses or just for responses that failed.",
    ).optional(),
    launchStage: z.enum([
      "LAUNCH_STAGE_UNSPECIFIED",
      "UNIMPLEMENTED",
      "PRELAUNCH",
      "EARLY_ACCESS",
      "ALPHA",
      "BETA",
      "GA",
      "DEPRECATED",
    ]).describe("Optional. The launch stage of the metric definition.")
      .optional(),
    metadata: z.object({
      ingestDelay: z.string().describe(
        "The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors.",
      ).optional(),
      launchStage: z.enum([
        "LAUNCH_STAGE_UNSPECIFIED",
        "UNIMPLEMENTED",
        "PRELAUNCH",
        "EARLY_ACCESS",
        "ALPHA",
        "BETA",
        "GA",
        "DEPRECATED",
      ]).describe(
        "Deprecated. Must use the MetricDescriptor.launch_stage instead.",
      ).optional(),
      samplePeriod: z.string().describe(
        "The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period.",
      ).optional(),
      timeSeriesResourceHierarchyLevel: z.array(
        z.enum([
          "TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED",
          "PROJECT",
          "ORGANIZATION",
          "FOLDER",
        ]),
      ).describe("The scope of the timeseries data of the metric.").optional(),
    }).describe(
      "Additional annotations that can be used to guide the usage of a metric.",
    ).optional(),
    metricKind: z.enum([
      "METRIC_KIND_UNSPECIFIED",
      "GAUGE",
      "DELTA",
      "CUMULATIVE",
    ]).describe(
      "Whether the metric records instantaneous values, changes to a value, etc. Some combinations of `metric_kind` and `value_type` might not be supported.",
    ).optional(),
    monitoredResourceTypes: z.array(z.string()).describe(
      "Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here.",
    ).optional(),
    name: z.string().describe("The resource name of the metric descriptor.")
      .optional(),
    type: z.string().describe(
      'The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name `custom.googleapis.com` or `external.googleapis.com`. Metric types should use a natural hierarchical grouping. For example: "custom.googleapis.com/invoice/paid/amount" "external.googleapis.com/prometheus/up" "appengine.googleapis.com/http/server/response_latencies"',
    ).optional(),
    unit: z.string().describe(
      'The units in which the metric value is reported. It is only applicable if the `value_type` is `INT64`, `DOUBLE`, or `DISTRIBUTION`. The `unit` defines the representation of the stored metric values. Different systems might scale the values to be more easily displayed (so a value of `0.02kBy` _might_ be displayed as `20By`, and a value of `3523kBy` _might_ be displayed as `3.5MBy`). However, if the `unit` is `kBy`, then the value of the metric is always in thousands of bytes, no matter how it might be displayed. If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an `INT64 CUMULATIVE` metric whose `unit` is `s{CPU}` (or equivalently `1s{CPU}` or just `s`). If the job uses 12,005 CPU-seconds, then the value is written as `12005`. Alternatively, if you want a custom metric to record data in a more granular way, you can create a `DOUBLE CUMULATIVE` metric whose `unit` is `ks{CPU}`, and then write the value `12.005` (which is `12005/1000`), or use `Kis{CPU}` and write `11.723` (which is `12005/1024`). The supported units are a subset of [The Unified Code for Units of Measure](https://unitsofmeasure.org/ucum.html) standard: **Basic units (UNIT)** * `bit` bit * `By` byte * `s` second * `min` minute * `h` hour * `d` day * `1` dimensionless **Prefixes (PREFIX)** * `k` kilo (10^3) * `M` mega (10^6) * `G` giga (10^9) * `T` tera (10^12) * `P` peta (10^15) * `E` exa (10^18) * `Z` zetta (10^21) * `Y` yotta (10^24) * `m` milli (10^-3) * `u` micro (10^-6) * `n` nano (10^-9) * `p` pico (10^-12) * `f` femto (10^-15) * `a` atto (10^-18) * `z` zepto (10^-21) * `y` yocto (10^-24) * `Ki` kibi (2^10) * `Mi` mebi (2^20) * `Gi` gibi (2^30) * `Ti` tebi (2^40) * `Pi` pebi (2^50) **Grammar** The grammar also includes these connectors: * `/` division or ratio (as an infix operator). For examples, `kBy/{email}` or `MiBy/10ms` (although you should almost never have `/s` in a metric `unit`; rates should always be computed at query time from the underlying cumulative or delta value). * `.` multiplication or composition (as an infix operator). For examples, `GBy.d` or `k{watt}.h`. The grammar for a unit is as follows: Expression = Component { "." Component } { "/" Component }; Component = ( [ PREFIX ] UNIT | "%") [ Annotation ] | Annotation | "1"; Annotation = "{" NAME "}"; Notes: * `Annotation` is just a comment if it follows a `UNIT`. If the annotation is used alone, then the unit is equivalent to `1`. For examples, `{request}/s == 1/s`, `By{transmitted}/s == By/s`. * `NAME` is a sequence of non-blank printable ASCII characters not containing `{` or `}`. * `1` represents a unitary [dimensionless unit](https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in `1/s`. It is typically used when none of the basic units are appropriate. For example, "new users per day" can be represented as `1/d` or `{new-users}/d` (and a metric value `5` would mean "5 new users). Alternatively, "thousands of page views per day" would be represented as `1000/d` or `k1/d` or `k{page_views}/d` (and a metric value of `5.3` would mean "5300 page views per day"). * `%` represents dimensionless value of 1/100, and annotates values giving a percentage (so the metric values are typically in the range of 0..100, and a metric value `3` means "3 percent"). * `10^2.%` indicates a metric contains a ratio, typically in the range 0..1, that will be multiplied by 100 and displayed as a percentage (so a metric value `0.03` means "3 percent").',
    ).optional(),
    valueType: z.enum([
      "VALUE_TYPE_UNSPECIFIED",
      "BOOL",
      "INT64",
      "DOUBLE",
      "STRING",
      "DISTRIBUTION",
      "MONEY",
    ]).describe(
      "Whether the measurement is an integer, a floating-point number, etc. Some combinations of `metric_kind` and `value_type` might not be supported.",
    ).optional(),
  })).describe("Defines the metrics used by this service.").optional(),
  monitoredResources: z.array(z.object({
    description: z.string().describe(
      "Optional. A detailed description of the monitored resource type that might be used in documentation.",
    ).optional(),
    displayName: z.string().describe(
      'Optional. A concise name for the monitored resource type that might be displayed in user interfaces. It should be a Title Cased Noun Phrase, without any article or other determiners. For example, `"Google Cloud SQL Database"`.',
    ).optional(),
    labels: z.array(z.object({
      description: z.string().describe(
        "A human-readable description for the label.",
      ).optional(),
      key: z.string().describe("The label key.").optional(),
      valueType: z.enum(["STRING", "BOOL", "INT64"]).describe(
        "The type of data that can be assigned to the label.",
      ).optional(),
    })).describe(
      'Required. A set of labels used to describe instances of this monitored resource type. For example, an individual Google Cloud SQL database is identified by values for the labels `"database_id"` and `"zone"`.',
    ).optional(),
    launchStage: z.enum([
      "LAUNCH_STAGE_UNSPECIFIED",
      "UNIMPLEMENTED",
      "PRELAUNCH",
      "EARLY_ACCESS",
      "ALPHA",
      "BETA",
      "GA",
      "DEPRECATED",
    ]).describe(
      "Optional. The launch stage of the monitored resource definition.",
    ).optional(),
    name: z.string().describe(
      'Optional. The resource name of the monitored resource descriptor: `"projects/{project_id}/monitoredResourceDescriptors/{type}"` where {type} is the value of the `type` field in this object and {project_id} is a project ID that provides API-specific context for accessing the type. APIs that do not use project information can use the resource name format `"monitoredResourceDescriptors/{type}"`.',
    ).optional(),
    type: z.string().describe(
      'Required. The monitored resource type. For example, the type `"cloudsql_database"` represents databases in Google Cloud SQL. For a list of types, see [Monitored resource types](https://cloud.google.com/monitoring/api/resources) and [Logging resource types](https://cloud.google.com/logging/docs/api/v2/resource-list).',
    ).optional(),
  })).describe(
    "Defines the monitored resources used by this service. This is required by the `Service.monitoring` and `Service.logging` configurations.",
  ).optional(),
  monitoring: z.object({
    consumerDestinations: z.array(z.object({
      metrics: z.array(z.string()).describe(
        "Types of the metrics to report to this monitoring destination. Each type must be defined in Service.metrics section.",
      ).optional(),
      monitoredResource: z.string().describe(
        "The monitored resource type. The type must be defined in Service.monitored_resources section.",
      ).optional(),
    })).describe(
      "Monitoring configurations for sending metrics to the consumer project. There can be multiple consumer destinations. A monitored resource type may appear in multiple monitoring destinations if different aggregations are needed for different sets of metrics associated with that monitored resource type. A monitored resource and metric pair may only be used once in the Monitoring configuration.",
    ).optional(),
    producerDestinations: z.array(z.object({
      metrics: z.array(z.string()).describe(
        "Types of the metrics to report to this monitoring destination. Each type must be defined in Service.metrics section.",
      ).optional(),
      monitoredResource: z.string().describe(
        "The monitored resource type. The type must be defined in Service.monitored_resources section.",
      ).optional(),
    })).describe(
      "Monitoring configurations for sending metrics to the producer project. There can be multiple producer destinations. A monitored resource type may appear in multiple monitoring destinations if different aggregations are needed for different sets of metrics associated with that monitored resource type. A monitored resource and metric pair may only be used once in the Monitoring configuration.",
    ).optional(),
  }).describe(
    'Monitoring configuration of the service. The example below shows how to configure monitored resources and metrics for monitoring. In the example, a monitored resource and two metrics are defined. The `library.googleapis.com/book/returned_count` metric is sent to both producer and consumer projects, whereas the `library.googleapis.com/book/num_overdue` metric is only sent to the consumer project. monitored_resources: - type: library.googleapis.com/Branch display_name: "Library Branch" description: "A branch of a library." launch_stage: GA labels: - key: resource_container description: "The Cloud container (ie. project id) for the Branch." - key: location description: "The location of the library branch." - key: branch_id description: "The id of the branch." metrics: - name: library.googleapis.com/book/returned_count display_name: "Books Returned" description: "The count of books that have been returned." launch_stage: GA metric_kind: DELTA value_type: INT64 unit: "1" labels: - key: customer_id description: "The id of the customer." - name: library.googleapis.com/book/num_overdue display_name: "Books Overdue" description: "The current number of overdue books." launch_stage: GA metric_kind: GAUGE value_type: INT64 unit: "1" labels: - key: customer_id description: "The id of the customer." monitoring: producer_destinations: - monitored_resource: library.googleapis.com/Branch metrics: - library.googleapis.com/book/returned_count consumer_destinations: - monitored_resource: library.googleapis.com/Branch metrics: - library.googleapis.com/book/returned_count - library.googleapis.com/book/num_overdue',
  ).optional(),
  name: z.string().describe(
    "The service name, which is a DNS-like logical identifier for the service, such as `calendar.googleapis.com`. The service name typically goes through DNS verification to make sure the owner of the service also owns the DNS name.",
  ).optional(),
  producerProjectId: z.string().describe(
    "The Google project that owns this service.",
  ).optional(),
  publishing: z.object({
    apiShortName: z.string().describe(
      'Used as a tracking tag when collecting data about the APIs developer relations artifacts like docs, packages delivered to package managers, etc. Example: "speech".',
    ).optional(),
    codeownerGithubTeams: z.array(z.string()).describe(
      "GitHub teams to be added to CODEOWNERS in the directory in GitHub containing source code for the client libraries for this API.",
    ).optional(),
    docTagPrefix: z.string().describe(
      "A prefix used in sample code when demarking regions to be included in documentation.",
    ).optional(),
    documentationUri: z.string().describe(
      "Link to product home page. Example: https://cloud.google.com/asset-inventory/docs/overview",
    ).optional(),
    githubLabel: z.string().describe(
      "GitHub label to apply to issues and pull requests opened for this API.",
    ).optional(),
    librarySettings: z.array(z.object({
      cppSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
      }).describe("Settings for C++ client libraries.").optional(),
      dotnetSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
        forcedNamespaceAliases: z.array(z.unknown()).describe(
          "Namespaces which must be aliased in snippets due to a known (but non-generator-predictable) naming collision",
        ).optional(),
        handwrittenSignatures: z.array(z.unknown()).describe(
          'Method signatures (in the form "service.method(signature)") which are provided separately, so shouldn\'t be generated. Snippets *calling* these methods are still generated, however.',
        ).optional(),
        ignoredResources: z.array(z.unknown()).describe(
          'List of full resource types to ignore during generation. This is typically used for API-specific Location resources, which should be handled by the generator as if they were actually the common Location resources. Example entry: "documentai.googleapis.com/Location"',
        ).optional(),
        renamedResources: z.record(z.string(), z.unknown()).describe(
          'Map from full resource types to the effective short name for the resource. This is used when otherwise resource named from different services would cause naming collisions. Example entry: "datalabeling.googleapis.com/Dataset": "DataLabelingDataset"',
        ).optional(),
        renamedServices: z.record(z.string(), z.unknown()).describe(
          "Map from original service names to renamed versions. This is used when the default generated types would cause a naming conflict. (Neither name is fully-qualified.) Example: Subscriber to SubscriberServiceApi.",
        ).optional(),
      }).describe("Settings for Dotnet client libraries.").optional(),
      goSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
        renamedServices: z.record(z.string(), z.unknown()).describe(
          "Map of service names to renamed services. Keys are the package relative service names and values are the name to be used for the service client and call options. Example: publishing: go_settings: renamed_services: Publisher: TopicAdmin",
        ).optional(),
      }).describe("Settings for Go client libraries.").optional(),
      javaSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
        libraryPackage: z.string().describe(
          'The package name to use in Java. Clobbers the java_package option set in the protobuf. This should be used **only** by APIs who have already set the language_settings.java.package_name" field in gapic.yaml. API teams should use the protobuf java_package option where possible. Example of a YAML configuration:: publishing: library_settings: java_settings: library_package: com.google.cloud.pubsub.v1',
        ).optional(),
        serviceClassNames: z.record(z.string(), z.unknown()).describe(
          "Configure the Java class name to use instead of the service's for its corresponding generated GAPIC client. Keys are fully-qualified service names as they appear in the protobuf (including the full the language_settings.java.interface_names\" field in gapic.yaml. API teams should otherwise use the service name as it appears in the protobuf. Example of a YAML configuration:: publishing: java_settings: service_class_names: - google.pubsub.v1.Publisher: TopicAdmin - google.pubsub.v1.Subscriber: SubscriptionAdmin",
        ).optional(),
      }).describe("Settings for Java client libraries.").optional(),
      launchStage: z.enum([
        "LAUNCH_STAGE_UNSPECIFIED",
        "UNIMPLEMENTED",
        "PRELAUNCH",
        "EARLY_ACCESS",
        "ALPHA",
        "BETA",
        "GA",
        "DEPRECATED",
      ]).describe("Launch stage of this version of the API.").optional(),
      nodeSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
      }).describe("Settings for Node client libraries.").optional(),
      phpSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
        libraryPackage: z.string().describe(
          'The package name to use in Php. Clobbers the php_namespace option set in the protobuf. This should be used **only** by APIs who have already set the language_settings.php.package_name" field in gapic.yaml. API teams should use the protobuf php_namespace option where possible. Example of a YAML configuration:: publishing: library_settings: php_settings: library_package: Google\\Cloud\\PubSub\\V1',
        ).optional(),
      }).describe("Settings for Php client libraries.").optional(),
      pythonSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
        experimentalFeatures: z.object({
          protobufPythonicTypesEnabled: z.unknown().describe(
            "Enables generation of protobuf code using new types that are more Pythonic which are included in `protobuf>=5.29.x`. This feature will be enabled by default 1 month after launching the feature in preview packages.",
          ).optional(),
          restAsyncIoEnabled: z.unknown().describe(
            "Enables generation of asynchronous REST clients if `rest` transport is enabled. By default, asynchronous REST clients will not be generated. This feature will be enabled by default 1 month after launching the feature in preview packages.",
          ).optional(),
          unversionedPackageDisabled: z.unknown().describe(
            "Disables generation of an unversioned Python package for this client library. This means that the module names will need to be versioned in import statements. For example `import google.cloud.library_v2` instead of `import google.cloud.library`.",
          ).optional(),
        }).describe(
          "Experimental features to be included during client library generation. These fields will be deprecated once the feature graduates and is enabled by default.",
        ).optional(),
      }).describe("Settings for Python client libraries.").optional(),
      restNumericEnums: z.boolean().describe(
        "When using transport=rest, the client request will encode enums as numbers rather than strings.",
      ).optional(),
      rubySettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
      }).describe("Settings for Ruby client libraries.").optional(),
      version: z.string().describe(
        'Version of the API to apply these settings to. This is the full protobuf package for the API, ending in the version element. Examples: "google.cloud.speech.v1" and "google.spanner.admin.database.v1".',
      ).optional(),
    })).describe(
      "Client library settings. If the same version string appears multiple times in this list, then the last one wins. Settings from earlier settings with the same version string are discarded.",
    ).optional(),
    methodSettings: z.array(z.object({
      autoPopulatedFields: z.array(z.string()).describe(
        "List of top-level fields of the request message, that should be automatically populated by the client libraries based on their (google.api.field_info).format. Currently supported format: UUID4. Example of a YAML configuration: publishing: method_settings: - selector: google.example.v1.ExampleService.CreateExample auto_populated_fields: - request_id",
      ).optional(),
      batching: z.object({
        batchDescriptor: z.object({
          batchedField: z.unknown().describe(
            "The repeated field in the request message to be aggregated by batching.",
          ).optional(),
          discriminatorFields: z.unknown().describe(
            "A list of the fields in the request message. Two requests will be batched together only if the values of every field specified in `request_discriminator_fields` is equal between the two requests.",
          ).optional(),
          subresponseField: z.unknown().describe(
            "Optional. When present, indicates the field in the response message to be used to demultiplex the response into multiple response messages, in correspondence with the multiple request messages originally batched together.",
          ).optional(),
        }).describe(
          "`BatchingDescriptorProto` specifies the fields of the request message to be used for batching, and, optionally, the fields of the response message to be used for demultiplexing.",
        ).optional(),
        thresholds: z.object({
          delayThreshold: z.unknown().describe(
            "The duration after which a batch should be sent, starting from the addition of the first message to that batch.",
          ).optional(),
          elementCountLimit: z.unknown().describe(
            "The maximum number of elements collected in a batch that could be accepted by server.",
          ).optional(),
          elementCountThreshold: z.unknown().describe(
            "The number of elements of a field collected into a batch which, if exceeded, causes the batch to be sent.",
          ).optional(),
          flowControlByteLimit: z.unknown().describe(
            "The maximum size of data allowed by flow control.",
          ).optional(),
          flowControlElementLimit: z.unknown().describe(
            "The maximum number of elements allowed by flow control.",
          ).optional(),
          flowControlLimitExceededBehavior: z.unknown().describe(
            "The behavior to take when the flow control limit is exceeded.",
          ).optional(),
          requestByteLimit: z.unknown().describe(
            "The maximum size of the request that could be accepted by server.",
          ).optional(),
          requestByteThreshold: z.unknown().describe(
            "The aggregated size of the batched field which, if exceeded, causes the batch to be sent. This size is computed by aggregating the sizes of the request field to be batched, not of the entire request message.",
          ).optional(),
        }).describe(
          "`BatchingSettingsProto` specifies a set of batching thresholds, each of which acts as a trigger to send a batch of messages as a request. At least one threshold must be positive nonzero.",
        ).optional(),
      }).describe(
        "`BatchingConfigProto` defines the batching configuration for an API method.",
      ).optional(),
      longRunning: z.object({
        initialPollDelay: z.string().describe(
          "Initial delay after which the first poll request will be made. Default value: 5 seconds.",
        ).optional(),
        maxPollDelay: z.string().describe(
          "Maximum time between two subsequent poll requests. Default value: 45 seconds.",
        ).optional(),
        pollDelayMultiplier: z.number().describe(
          "Multiplier to gradually increase delay between subsequent polls until it reaches max_poll_delay. Default value: 1.5.",
        ).optional(),
        totalPollTimeout: z.string().describe(
          "Total polling timeout. Default value: 5 minutes.",
        ).optional(),
      }).describe(
        "Describes settings to use when generating API methods that use the long-running operation pattern. All default values below are from those used in the client library generators (e.g. [Java](https://github.com/googleapis/gapic-generator-java/blob/04c2faa191a9b5a10b92392fe8482279c4404803/src/main/java/com/google/api/generator/gapic/composer/common/RetrySettingsComposer.java)).",
      ).optional(),
      selector: z.string().describe(
        "The fully qualified name of the method, for which the options below apply. This is used to find the method to apply the options. Example: publishing: method_settings: - selector: google.storage.control.v2.StorageControl.CreateFolder # method settings for CreateFolder...",
      ).optional(),
    })).describe(
      "A list of API method settings, e.g. the behavior for methods that use the long-running operation pattern.",
    ).optional(),
    newIssueUri: z.string().describe(
      "Link to a *public* URI where users can report issues. Example: https://issuetracker.google.com/issues/new?component=190865&template=1161103",
    ).optional(),
    organization: z.enum([
      "CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED",
      "CLOUD",
      "ADS",
      "PHOTOS",
      "STREET_VIEW",
      "SHOPPING",
      "GEO",
      "GENERATIVE_AI",
      "HEALTH",
    ]).describe("For whom the client library is being published.").optional(),
    protoReferenceDocumentationUri: z.string().describe(
      "Optional link to proto reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rpc",
    ).optional(),
    restReferenceDocumentationUri: z.string().describe(
      "Optional link to REST reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rest",
    ).optional(),
  }).describe(
    "This message configures the settings for publishing [Google Cloud Client libraries](https://cloud.google.com/apis/docs/cloud-client-libraries) generated from the service config.",
  ).optional(),
  quota: z.object({
    limits: z.array(z.object({
      defaultLimit: z.string().describe(
        "Default number of tokens that can be consumed during the specified duration. This is the number of tokens assigned when a client application developer activates the service for his/her project. Specifying a value of 0 will block all requests. This can be used if you are provisioning quota to selected consumers and blocking others. Similarly, a value of -1 will indicate an unlimited quota. No other negative values are allowed. Used by group-based quotas only.",
      ).optional(),
      description: z.string().describe(
        "Optional. User-visible, extended description for this quota limit. Should be used only when more context is needed to understand this limit than provided by the limit's display name (see: `display_name`).",
      ).optional(),
      displayName: z.string().describe(
        "User-visible display name for this limit. Optional. If not set, the UI will provide a default display name based on the quota configuration. This field can be used to override the default display name generated from the configuration.",
      ).optional(),
      duration: z.string().describe(
        'Duration of this limit in textual notation. Must be "100s" or "1d". Used by group-based quotas only.',
      ).optional(),
      freeTier: z.string().describe(
        'Free tier value displayed in the Developers Console for this limit. The free tier is the number of tokens that will be subtracted from the billed amount when billing is enabled. This field can only be set on a limit with duration "1d", in a billable group; it is invalid on any other limit. If this field is not set, it defaults to 0, indicating that there is no free tier for this service. Used by group-based quotas only.',
      ).optional(),
      maxLimit: z.string().describe(
        "Maximum number of tokens that can be consumed during the specified duration. Client application developers can override the default limit up to this maximum. If specified, this value cannot be set to a value less than the default limit. If not specified, it is set to the default limit. To allow clients to apply overrides with no upper bound, set this to -1, indicating unlimited maximum quota. Used by group-based quotas only.",
      ).optional(),
      metric: z.string().describe(
        "The name of the metric this quota limit applies to. The quota limits with the same metric will be checked together during runtime. The metric must be defined within the service config.",
      ).optional(),
      name: z.string().describe(
        "Name of the quota limit. The name must be provided, and it must be unique within the service. The name can only include alphanumeric characters as well as '-'. The maximum length of the limit name is 64 characters.",
      ).optional(),
      unit: z.string().describe(
        'Specify the unit of the quota limit. It uses the same syntax as MetricDescriptor.unit. The supported unit kinds are determined by the quota backend system. Here are some examples: * "1/min/{project}" for quota per minute per project. Note: the order of unit components is insignificant. The "1" at the beginning is required to follow the metric unit syntax.',
      ).optional(),
      values: z.record(z.string(), z.string()).describe(
        "Tiered limit values. You must specify this as a key:value pair, with an integer value that is the maximum number of requests allowed for the specified unit. Currently only STANDARD is supported.",
      ).optional(),
    })).describe("List of QuotaLimit definitions for the service.").optional(),
    metricRules: z.array(z.object({
      metricCosts: z.record(z.string(), z.string()).describe(
        "Metrics to update when the selected methods are called, and the associated cost applied to each metric. The key of the map is the metric name, and the values are the amount increased for the metric against which the quota limits are defined. The value must not be negative.",
      ).optional(),
      selector: z.string().describe(
        "Selects the methods to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      "List of MetricRule definitions, each one mapping a selected method to one or more metrics.",
    ).optional(),
  }).describe(
    'Quota configuration helps to achieve fairness and budgeting in service usage. The metric based quota configuration works this way: - The service configuration defines a set of metrics. - For API calls, the quota.metric_rules maps methods to metrics with corresponding costs. - The quota.limits defines limits on the metrics, which will be used for quota checks at runtime. An example quota configuration in yaml format: quota: limits: - name: apiWriteQpsPerProject metric: library.googleapis.com/write_calls unit: "1/min/{project}" # rate limit for consumer projects values: STANDARD: 10000 (The metric rules bind all methods to the read_calls metric, except for the UpdateBook and DeleteBook methods. These two methods are mapped to the write_calls metric, with the UpdateBook method consuming at twice rate as the DeleteBook method.) metric_rules: - selector: "*" metric_costs: library.googleapis.com/read_calls: 1 - selector: google.example.library.v1.LibraryService.UpdateBook metric_costs: library.googleapis.com/write_calls: 2 - selector: google.example.library.v1.LibraryService.DeleteBook metric_costs: library.googleapis.com/write_calls: 1 Corresponding Metric definition: metrics: - name: library.googleapis.com/read_calls display_name: Read requests metric_kind: DELTA value_type: INT64 - name: library.googleapis.com/write_calls display_name: Write requests metric_kind: DELTA value_type: INT64',
  ).optional(),
  sourceInfo: z.object({
    sourceFiles: z.array(z.record(z.string(), z.string())).describe(
      "All files used during config generation.",
    ).optional(),
  }).describe("Source information used to create a Service Config").optional(),
  systemParameters: z.object({
    rules: z.array(z.object({
      parameters: z.array(z.object({
        httpHeader: z.unknown().describe(
          "Define the HTTP header name to use for the parameter. It is case insensitive.",
        ).optional(),
        name: z.unknown().describe(
          'Define the name of the parameter, such as "api_key". It is case sensitive.',
        ).optional(),
        urlQueryParameter: z.unknown().describe(
          "Define the URL query parameter name to use for the parameter. It is case sensitive.",
        ).optional(),
      })).describe(
        "Define parameters. Multiple names may be defined for a parameter. For a given method call, only one of them should be used. If multiple names are used the behavior is implementation-dependent. If none of the specified names are present the behavior is parameter-dependent.",
      ).optional(),
      selector: z.string().describe(
        "Selects the methods to which this rule applies. Use '*' to indicate all methods in all APIs. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      'Define system parameters. The parameters defined here will override the default parameters implemented by the system. If this field is missing from the service config, default system parameters will be used. Default system parameters and names is implementation-dependent. Example: define api key for all methods system_parameters rules: - selector: "*" parameters: - name: api_key url_query_parameter: api_key Example: define 2 api key names for a specific method. system_parameters rules: - selector: "/ListShelves" parameters: - name: api_key http_header: Api-Key1 - name: api_key http_header: Api-Key2 **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
  }).describe(
    "### System parameter configuration A system parameter is a special kind of parameter defined by the API system, not by an individual API. It is typically mapped to an HTTP header and/or a URL query parameter. This configuration specifies which methods change the names of the system parameters.",
  ).optional(),
  systemTypes: z.array(z.object({
    edition: z.string().describe(
      "The source edition string, only valid when syntax is SYNTAX_EDITIONS.",
    ).optional(),
    fields: z.array(z.object({
      cardinality: z.enum([
        "CARDINALITY_UNKNOWN",
        "CARDINALITY_OPTIONAL",
        "CARDINALITY_REQUIRED",
        "CARDINALITY_REPEATED",
      ]).describe("The field cardinality.").optional(),
      defaultValue: z.string().describe(
        "The string value of the default value of this field. Proto2 syntax only.",
      ).optional(),
      jsonName: z.string().describe("The field JSON name.").optional(),
      kind: z.enum([
        "TYPE_UNKNOWN",
        "TYPE_DOUBLE",
        "TYPE_FLOAT",
        "TYPE_INT64",
        "TYPE_UINT64",
        "TYPE_INT32",
        "TYPE_FIXED64",
        "TYPE_FIXED32",
        "TYPE_BOOL",
        "TYPE_STRING",
        "TYPE_GROUP",
        "TYPE_MESSAGE",
        "TYPE_BYTES",
        "TYPE_UINT32",
        "TYPE_ENUM",
        "TYPE_SFIXED32",
        "TYPE_SFIXED64",
        "TYPE_SINT32",
        "TYPE_SINT64",
      ]).describe("The field type.").optional(),
      name: z.string().describe("The field name.").optional(),
      number: z.number().int().describe("The field number.").optional(),
      oneofIndex: z.number().int().describe(
        "The index of the field type in `Type.oneofs`, for message or enumeration types. The first type has index 1; zero means the type is not in the list.",
      ).optional(),
      options: z.array(z.unknown()).describe("The protocol buffer options.")
        .optional(),
      packed: z.boolean().describe(
        "Whether to use alternative packed wire representation.",
      ).optional(),
      typeUrl: z.string().describe(
        'The field type URL, without the scheme, for message or enumeration types. Example: `"type.googleapis.com/google.protobuf.Timestamp"`.',
      ).optional(),
    })).describe("The list of fields.").optional(),
    name: z.string().describe("The fully qualified message name.").optional(),
    oneofs: z.array(z.string()).describe(
      "The list of types appearing in `oneof` definitions in this type.",
    ).optional(),
    options: z.array(z.object({
      name: z.string().describe(
        'The option\'s name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, `"map_entry"`. For custom options, it should be the fully-qualified name. For example, `"google.api.http"`.',
      ).optional(),
      value: z.record(z.string(), z.unknown()).describe(
        "The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type.",
      ).optional(),
    })).describe("The protocol buffer options.").optional(),
    sourceContext: z.object({
      fileName: z.string().describe(
        'The path-qualified name of the.proto file that contained the associated protobuf element. For example: `"google/protobuf/source_context.proto"`.',
      ).optional(),
    }).describe(
      "`SourceContext` represents information about the source of a protobuf element, like the file in which it is defined.",
    ).optional(),
    syntax: z.enum(["SYNTAX_PROTO2", "SYNTAX_PROTO3", "SYNTAX_EDITIONS"])
      .describe("The source syntax.").optional(),
  })).describe(
    "A list of all proto message types included in this API service. It serves similar purpose as [google.api.Service.types], except that these types are not needed by user-defined APIs. Therefore, they will not show up in the generated discovery doc. This field should only be used to define system APIs in ESF.",
  ).optional(),
  title: z.string().describe(
    "The product title for this service, it is the name displayed in Google Cloud Console.",
  ).optional(),
  types: z.array(z.object({
    edition: z.string().describe(
      "The source edition string, only valid when syntax is SYNTAX_EDITIONS.",
    ).optional(),
    fields: z.array(z.object({
      cardinality: z.enum([
        "CARDINALITY_UNKNOWN",
        "CARDINALITY_OPTIONAL",
        "CARDINALITY_REQUIRED",
        "CARDINALITY_REPEATED",
      ]).describe("The field cardinality.").optional(),
      defaultValue: z.string().describe(
        "The string value of the default value of this field. Proto2 syntax only.",
      ).optional(),
      jsonName: z.string().describe("The field JSON name.").optional(),
      kind: z.enum([
        "TYPE_UNKNOWN",
        "TYPE_DOUBLE",
        "TYPE_FLOAT",
        "TYPE_INT64",
        "TYPE_UINT64",
        "TYPE_INT32",
        "TYPE_FIXED64",
        "TYPE_FIXED32",
        "TYPE_BOOL",
        "TYPE_STRING",
        "TYPE_GROUP",
        "TYPE_MESSAGE",
        "TYPE_BYTES",
        "TYPE_UINT32",
        "TYPE_ENUM",
        "TYPE_SFIXED32",
        "TYPE_SFIXED64",
        "TYPE_SINT32",
        "TYPE_SINT64",
      ]).describe("The field type.").optional(),
      name: z.string().describe("The field name.").optional(),
      number: z.number().int().describe("The field number.").optional(),
      oneofIndex: z.number().int().describe(
        "The index of the field type in `Type.oneofs`, for message or enumeration types. The first type has index 1; zero means the type is not in the list.",
      ).optional(),
      options: z.array(z.unknown()).describe("The protocol buffer options.")
        .optional(),
      packed: z.boolean().describe(
        "Whether to use alternative packed wire representation.",
      ).optional(),
      typeUrl: z.string().describe(
        'The field type URL, without the scheme, for message or enumeration types. Example: `"type.googleapis.com/google.protobuf.Timestamp"`.',
      ).optional(),
    })).describe("The list of fields.").optional(),
    name: z.string().describe("The fully qualified message name.").optional(),
    oneofs: z.array(z.string()).describe(
      "The list of types appearing in `oneof` definitions in this type.",
    ).optional(),
    options: z.array(z.object({
      name: z.string().describe(
        'The option\'s name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, `"map_entry"`. For custom options, it should be the fully-qualified name. For example, `"google.api.http"`.',
      ).optional(),
      value: z.record(z.string(), z.unknown()).describe(
        "The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type.",
      ).optional(),
    })).describe("The protocol buffer options.").optional(),
    sourceContext: z.object({
      fileName: z.string().describe(
        'The path-qualified name of the.proto file that contained the associated protobuf element. For example: `"google/protobuf/source_context.proto"`.',
      ).optional(),
    }).describe(
      "`SourceContext` represents information about the source of a protobuf element, like the file in which it is defined.",
    ).optional(),
    syntax: z.enum(["SYNTAX_PROTO2", "SYNTAX_PROTO3", "SYNTAX_EDITIONS"])
      .describe("The source syntax.").optional(),
  })).describe(
    "A list of all proto message types included in this API service. Types referenced directly or indirectly by the `apis` are automatically included. Messages which are not referenced but shall be included, such as types used by the `google.protobuf.Any` type, should be listed here by name by the configuration author. Example: types: - name: google.protobuf.Int32",
  ).optional(),
  usage: z.object({
    producerNotificationChannel: z.string().describe(
      "The full resource name of a channel used for sending notifications to the service producer. Google Service Management currently only supports [Google Cloud Pub/Sub](https://cloud.google.com/pubsub) as a notification channel. To use Google Cloud Pub/Sub as the channel, this must be the name of a Cloud Pub/Sub topic that uses the Cloud Pub/Sub topic name format documented in https://cloud.google.com/pubsub/docs/overview.",
    ).optional(),
    requirements: z.array(z.string()).describe(
      'Requirements that must be satisfied before a consumer project can use the service. Each requirement is of the form /; for example \'serviceusage.googleapis.com/billing-enabled\'. For Google APIs, a Terms of Service requirement must be included here. Google Cloud APIs must include "serviceusage.googleapis.com/tos/cloud". Other Google APIs should include "serviceusage.googleapis.com/tos/universal". Additional ToS can be included based on the business needs.',
    ).optional(),
    rules: z.array(z.object({
      allowUnregisteredCalls: z.boolean().describe(
        "Use this rule to configure unregistered calls for the service. Unregistered calls are calls that do not contain consumer project identity. (Example: calls that do not contain an API key). WARNING: By default, API methods do not allow unregistered calls, and each method call must be identified by a consumer project identity.",
      ).optional(),
      selector: z.string().describe(
        "Selects the methods to which this rule applies. Use '*' to indicate all methods in all APIs. Refer to selector for syntax details.",
      ).optional(),
      skipServiceControl: z.boolean().describe(
        "If true, the selected method should skip service control and the control plane features, such as quota and billing, will not be available. This flag is used by Google Cloud Endpoints to bypass checks for internal methods, such as service health check methods.",
      ).optional(),
    })).describe(
      'A list of usage rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
  }).describe("Configuration controlling usage of a service.").optional(),
  serviceName: z.string().describe(
    "Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`.",
  ),
});

const StateSchema = z.object({
  apis: z.array(z.object({
    edition: z.string(),
    methods: z.array(z.object({
      edition: z.string(),
      name: z.string(),
      options: z.array(z.unknown()),
      requestStreaming: z.boolean(),
      requestTypeUrl: z.string(),
      responseStreaming: z.boolean(),
      responseTypeUrl: z.string(),
      syntax: z.string(),
    })),
    mixins: z.array(z.object({
      name: z.string(),
      root: z.string(),
    })),
    name: z.string(),
    options: z.array(z.object({
      name: z.string(),
      value: z.record(z.string(), z.unknown()),
    })),
    sourceContext: z.object({
      fileName: z.string(),
    }),
    syntax: z.string(),
    version: z.string(),
  })).optional(),
  aspects: z.array(z.object({
    kind: z.string(),
    rules: z.array(z.object({
      config: z.record(z.string(), z.unknown()),
      selector: z.string(),
    })),
    spec: z.record(z.string(), z.unknown()),
  })).optional(),
  authentication: z.object({
    providers: z.array(z.object({
      audiences: z.string(),
      authorizationUrl: z.string(),
      id: z.string(),
      issuer: z.string(),
      jwksUri: z.string(),
      jwtLocations: z.array(z.object({
        cookie: z.unknown(),
        header: z.unknown(),
        query: z.unknown(),
        valuePrefix: z.unknown(),
      })),
    })),
    rules: z.array(z.object({
      allowWithoutCredential: z.boolean(),
      oauth: z.object({
        canonicalScopes: z.string(),
      }),
      requirements: z.array(z.object({
        audiences: z.unknown(),
        providerId: z.unknown(),
      })),
      selector: z.string(),
    })),
  }).optional(),
  backend: z.object({
    rules: z.array(z.object({
      address: z.string(),
      deadline: z.number(),
      disableAuth: z.boolean(),
      jwtAudience: z.string(),
      loadBalancingPolicy: z.string(),
      minDeadline: z.number(),
      operationDeadline: z.number(),
      overridesByRequestProtocol: z.record(z.string(), z.unknown()),
      pathTranslation: z.string(),
      protocol: z.string(),
      selector: z.string(),
    })),
  }).optional(),
  billing: z.object({
    consumerDestinations: z.array(z.object({
      metrics: z.array(z.string()),
      monitoredResource: z.string(),
    })),
  }).optional(),
  configVersion: z.number().optional(),
  context: z.object({
    rules: z.array(z.object({
      allowedRequestExtensions: z.array(z.string()),
      allowedResponseExtensions: z.array(z.string()),
      provided: z.array(z.string()),
      requested: z.array(z.string()),
      selector: z.string(),
    })),
  }).optional(),
  control: z.object({
    environment: z.string(),
    methodPolicies: z.array(z.object({
      requestPolicies: z.array(z.object({
        resourcePermission: z.unknown(),
        resourceType: z.unknown(),
        selector: z.unknown(),
      })),
      selector: z.string(),
    })),
  }).optional(),
  customError: z.object({
    rules: z.array(z.object({
      isErrorType: z.boolean(),
      selector: z.string(),
    })),
    types: z.array(z.string()),
  }).optional(),
  documentation: z.object({
    additionalIamInfo: z.string(),
    documentationRootUrl: z.string(),
    overview: z.string(),
    pages: z.array(z.object({
      content: z.string(),
      name: z.string(),
      subpages: z.array(z.string()),
    })),
    rules: z.array(z.object({
      deprecationDescription: z.string(),
      description: z.string(),
      disableReplacementWords: z.string(),
      selector: z.string(),
    })),
    sectionOverrides: z.array(z.object({
      content: z.string(),
      name: z.string(),
      subpages: z.array(z.string()),
    })),
    serviceRootUrl: z.string(),
    summary: z.string(),
  }).optional(),
  endpoints: z.array(z.object({
    aliases: z.array(z.string()),
    allowCors: z.boolean(),
    name: z.string(),
    target: z.string(),
  })).optional(),
  enums: z.array(z.object({
    edition: z.string(),
    enumvalue: z.array(z.object({
      name: z.string(),
      number: z.number(),
      options: z.array(z.unknown()),
    })),
    name: z.string(),
    options: z.array(z.object({
      name: z.string(),
      value: z.record(z.string(), z.unknown()),
    })),
    sourceContext: z.object({
      fileName: z.string(),
    }),
    syntax: z.string(),
  })).optional(),
  http: z.object({
    fullyDecodeReservedExpansion: z.boolean(),
    rules: z.array(z.object({
      additionalBindings: z.array(z.string()),
      body: z.string(),
      custom: z.object({
        kind: z.string(),
        path: z.string(),
      }),
      delete: z.string(),
      get: z.string(),
      patch: z.string(),
      post: z.string(),
      put: z.string(),
      responseBody: z.string(),
      selector: z.string(),
    })),
  }).optional(),
  id: z.string().optional(),
  logging: z.object({
    consumerDestinations: z.array(z.object({
      logs: z.array(z.string()),
      monitoredResource: z.string(),
    })),
    producerDestinations: z.array(z.object({
      logs: z.array(z.string()),
      monitoredResource: z.string(),
    })),
  }).optional(),
  logs: z.array(z.object({
    description: z.string(),
    displayName: z.string(),
    labels: z.array(z.object({
      description: z.string(),
      key: z.string(),
      valueType: z.string(),
    })),
    name: z.string(),
  })).optional(),
  metrics: z.array(z.object({
    description: z.string(),
    displayName: z.string(),
    labels: z.array(z.object({
      description: z.string(),
      key: z.string(),
      valueType: z.string(),
    })),
    launchStage: z.string(),
    metadata: z.object({
      ingestDelay: z.string(),
      launchStage: z.string(),
      samplePeriod: z.string(),
      timeSeriesResourceHierarchyLevel: z.array(z.string()),
    }),
    metricKind: z.string(),
    monitoredResourceTypes: z.array(z.string()),
    name: z.string(),
    type: z.string(),
    unit: z.string(),
    valueType: z.string(),
  })).optional(),
  monitoredResources: z.array(z.object({
    description: z.string(),
    displayName: z.string(),
    labels: z.array(z.object({
      description: z.string(),
      key: z.string(),
      valueType: z.string(),
    })),
    launchStage: z.string(),
    name: z.string(),
    type: z.string(),
  })).optional(),
  monitoring: z.object({
    consumerDestinations: z.array(z.object({
      metrics: z.array(z.string()),
      monitoredResource: z.string(),
    })),
    producerDestinations: z.array(z.object({
      metrics: z.array(z.string()),
      monitoredResource: z.string(),
    })),
  }).optional(),
  name: z.string(),
  producerProjectId: z.string().optional(),
  publishing: z.object({
    apiShortName: z.string(),
    codeownerGithubTeams: z.array(z.string()),
    docTagPrefix: z.string(),
    documentationUri: z.string(),
    githubLabel: z.string(),
    librarySettings: z.array(z.object({
      cppSettings: z.object({
        common: z.object({
          destinations: z.unknown(),
          referenceDocsUri: z.unknown(),
          selectiveGapicGeneration: z.unknown(),
        }),
      }),
      dotnetSettings: z.object({
        common: z.object({
          destinations: z.unknown(),
          referenceDocsUri: z.unknown(),
          selectiveGapicGeneration: z.unknown(),
        }),
        forcedNamespaceAliases: z.array(z.unknown()),
        handwrittenSignatures: z.array(z.unknown()),
        ignoredResources: z.array(z.unknown()),
        renamedResources: z.record(z.string(), z.unknown()),
        renamedServices: z.record(z.string(), z.unknown()),
      }),
      goSettings: z.object({
        common: z.object({
          destinations: z.unknown(),
          referenceDocsUri: z.unknown(),
          selectiveGapicGeneration: z.unknown(),
        }),
        renamedServices: z.record(z.string(), z.unknown()),
      }),
      javaSettings: z.object({
        common: z.object({
          destinations: z.unknown(),
          referenceDocsUri: z.unknown(),
          selectiveGapicGeneration: z.unknown(),
        }),
        libraryPackage: z.string(),
        serviceClassNames: z.record(z.string(), z.unknown()),
      }),
      launchStage: z.string(),
      nodeSettings: z.object({
        common: z.object({
          destinations: z.unknown(),
          referenceDocsUri: z.unknown(),
          selectiveGapicGeneration: z.unknown(),
        }),
      }),
      phpSettings: z.object({
        common: z.object({
          destinations: z.unknown(),
          referenceDocsUri: z.unknown(),
          selectiveGapicGeneration: z.unknown(),
        }),
        libraryPackage: z.string(),
      }),
      pythonSettings: z.object({
        common: z.object({
          destinations: z.unknown(),
          referenceDocsUri: z.unknown(),
          selectiveGapicGeneration: z.unknown(),
        }),
        experimentalFeatures: z.object({
          protobufPythonicTypesEnabled: z.unknown(),
          restAsyncIoEnabled: z.unknown(),
          unversionedPackageDisabled: z.unknown(),
        }),
      }),
      restNumericEnums: z.boolean(),
      rubySettings: z.object({
        common: z.object({
          destinations: z.unknown(),
          referenceDocsUri: z.unknown(),
          selectiveGapicGeneration: z.unknown(),
        }),
      }),
      version: z.string(),
    })),
    methodSettings: z.array(z.object({
      autoPopulatedFields: z.array(z.string()),
      batching: z.object({
        batchDescriptor: z.object({
          batchedField: z.unknown(),
          discriminatorFields: z.unknown(),
          subresponseField: z.unknown(),
        }),
        thresholds: z.object({
          delayThreshold: z.unknown(),
          elementCountLimit: z.unknown(),
          elementCountThreshold: z.unknown(),
          flowControlByteLimit: z.unknown(),
          flowControlElementLimit: z.unknown(),
          flowControlLimitExceededBehavior: z.unknown(),
          requestByteLimit: z.unknown(),
          requestByteThreshold: z.unknown(),
        }),
      }),
      longRunning: z.object({
        initialPollDelay: z.string(),
        maxPollDelay: z.string(),
        pollDelayMultiplier: z.number(),
        totalPollTimeout: z.string(),
      }),
      selector: z.string(),
    })),
    newIssueUri: z.string(),
    organization: z.string(),
    protoReferenceDocumentationUri: z.string(),
    restReferenceDocumentationUri: z.string(),
  }).optional(),
  quota: z.object({
    limits: z.array(z.object({
      defaultLimit: z.string(),
      description: z.string(),
      displayName: z.string(),
      duration: z.string(),
      freeTier: z.string(),
      maxLimit: z.string(),
      metric: z.string(),
      name: z.string(),
      unit: z.string(),
      values: z.record(z.string(), z.unknown()),
    })),
    metricRules: z.array(z.object({
      metricCosts: z.record(z.string(), z.unknown()),
      selector: z.string(),
    })),
  }).optional(),
  sourceInfo: z.object({
    sourceFiles: z.array(z.record(z.string(), z.unknown())),
  }).optional(),
  systemParameters: z.object({
    rules: z.array(z.object({
      parameters: z.array(z.object({
        httpHeader: z.unknown(),
        name: z.unknown(),
        urlQueryParameter: z.unknown(),
      })),
      selector: z.string(),
    })),
  }).optional(),
  systemTypes: z.array(z.object({
    edition: z.string(),
    fields: z.array(z.object({
      cardinality: z.string(),
      defaultValue: z.string(),
      jsonName: z.string(),
      kind: z.string(),
      name: z.string(),
      number: z.number(),
      oneofIndex: z.number(),
      options: z.array(z.unknown()),
      packed: z.boolean(),
      typeUrl: z.string(),
    })),
    name: z.string(),
    oneofs: z.array(z.string()),
    options: z.array(z.object({
      name: z.string(),
      value: z.record(z.string(), z.unknown()),
    })),
    sourceContext: z.object({
      fileName: z.string(),
    }),
    syntax: z.string(),
  })).optional(),
  title: z.string().optional(),
  types: z.array(z.object({
    edition: z.string(),
    fields: z.array(z.object({
      cardinality: z.string(),
      defaultValue: z.string(),
      jsonName: z.string(),
      kind: z.string(),
      name: z.string(),
      number: z.number(),
      oneofIndex: z.number(),
      options: z.array(z.unknown()),
      packed: z.boolean(),
      typeUrl: z.string(),
    })),
    name: z.string(),
    oneofs: z.array(z.string()),
    options: z.array(z.object({
      name: z.string(),
      value: z.record(z.string(), z.unknown()),
    })),
    sourceContext: z.object({
      fileName: z.string(),
    }),
    syntax: z.string(),
  })).optional(),
  usage: z.object({
    producerNotificationChannel: z.string(),
    requirements: z.array(z.string()),
    rules: z.array(z.object({
      allowUnregisteredCalls: z.boolean(),
      selector: z.string(),
      skipServiceControl: z.boolean(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  apis: z.array(z.object({
    edition: z.string().describe(
      "The source edition string, only valid when syntax is SYNTAX_EDITIONS.",
    ).optional(),
    methods: z.array(z.object({
      edition: z.string().describe(
        "The source edition string, only valid when syntax is SYNTAX_EDITIONS. This field should be ignored, instead the edition should be inherited from Api. This is similar to Field and EnumValue.",
      ).optional(),
      name: z.string().describe("The simple name of this method.").optional(),
      options: z.array(z.unknown()).describe(
        "Any metadata attached to the method.",
      ).optional(),
      requestStreaming: z.boolean().describe(
        "If true, the request is streamed.",
      ).optional(),
      requestTypeUrl: z.string().describe("A URL of the input message type.")
        .optional(),
      responseStreaming: z.boolean().describe(
        "If true, the response is streamed.",
      ).optional(),
      responseTypeUrl: z.string().describe(
        "The URL of the output message type.",
      ).optional(),
      syntax: z.enum(["SYNTAX_PROTO2", "SYNTAX_PROTO3", "SYNTAX_EDITIONS"])
        .describe(
          "The source syntax of this method. This field should be ignored, instead the syntax should be inherited from Api. This is similar to Field and EnumValue.",
        ).optional(),
    })).describe("The methods of this interface, in unspecified order.")
      .optional(),
    mixins: z.array(z.object({
      name: z.string().describe(
        "The fully qualified name of the interface which is included.",
      ).optional(),
      root: z.string().describe(
        "If non-empty specifies a path under which inherited HTTP paths are rooted.",
      ).optional(),
    })).describe("Included interfaces. See Mixin.").optional(),
    name: z.string().describe(
      "The fully qualified name of this interface, including package name followed by the interface's simple name.",
    ).optional(),
    options: z.array(z.object({
      name: z.string().describe(
        'The option\'s name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, `"map_entry"`. For custom options, it should be the fully-qualified name. For example, `"google.api.http"`.',
      ).optional(),
      value: z.record(z.string(), z.unknown()).describe(
        "The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type.",
      ).optional(),
    })).describe("Any metadata attached to the interface.").optional(),
    sourceContext: z.object({
      fileName: z.string().describe(
        'The path-qualified name of the.proto file that contained the associated protobuf element. For example: `"google/protobuf/source_context.proto"`.',
      ).optional(),
    }).describe(
      "`SourceContext` represents information about the source of a protobuf element, like the file in which it is defined.",
    ).optional(),
    syntax: z.enum(["SYNTAX_PROTO2", "SYNTAX_PROTO3", "SYNTAX_EDITIONS"])
      .describe("The source syntax of the service.").optional(),
    version: z.string().describe(
      "A version string for this interface. If specified, must have the form `major-version.minor-version`, as in `1.10`. If the minor version is omitted, it defaults to zero. If the entire version field is empty, the major version is derived from the package name, as outlined below. If the field is not empty, the version in the package name will be verified to be consistent with what is provided here. The versioning schema uses [semantic versioning](http://semver.org) where the major version number indicates a breaking change and the minor version an additive, non-breaking change. Both version numbers are signals to users what to expect from different versions, and should be carefully chosen based on the product plan. The major version is also reflected in the package name of the interface, which must end in `v`, as in `google.feature.v1`. For major versions 0 and 1, the suffix can be omitted. Zero major versions must only be used for experimental, non-GA interfaces.",
    ).optional(),
  })).describe(
    "A list of API interfaces exported by this service. Only the `name` field of the google.protobuf.Api needs to be provided by the configuration author, as the remaining fields will be derived from the IDL during the normalization process. It is an error to specify an API interface here which cannot be resolved against the associated IDL files.",
  ).optional(),
  aspects: z.array(z.object({
    kind: z.string().describe("The type of this aspect configuration.")
      .optional(),
    rules: z.array(z.object({
      config: z.record(z.string(), z.unknown()).describe(
        "Required. Rules of the configuration. The underlying schema should be defined by Aspect owners as protobuf message under `google/api/configaspects/proto`.",
      ).optional(),
      selector: z.string().describe(
        "Required. Selects the RPC methods to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe("Optional. Rules of the Configuration.").optional(),
    spec: z.record(z.string(), z.string()).describe(
      "Content of the configuration. The underlying schema should be defined by Aspect owners as protobuf message under `google/api/configaspects/proto`.",
    ).optional(),
  })).describe(
    "Configuration aspects. This is a repeated field to allow multiple aspects to be configured. The kind field in each ConfigAspect specifies the type of aspect. The spec field contains the configuration for that aspect. The schema for the spec field is defined by the backend service owners.",
  ).optional(),
  authentication: z.object({
    providers: z.array(z.object({
      audiences: z.string().describe(
        'The list of JWT [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted. When this setting is absent, JWTs with audiences: - "https://[service.name]/[google.protobuf.Api.name]" - "https://[service.name]/" will be accepted. For example, if no audiences are in the setting, LibraryService API will accept JWTs with the following audiences: - https://library-example.googleapis.com/google.example.library.v1.LibraryService - https://library-example.googleapis.com/ Example: audiences: bookstore_android.apps.googleusercontent.com, bookstore_web.apps.googleusercontent.com',
      ).optional(),
      authorizationUrl: z.string().describe(
        "Redirect URL if JWT token is required but not present or is expired. Implement authorizationUrl of securityDefinitions in OpenAPI spec.",
      ).optional(),
      id: z.string().describe(
        'The unique identifier of the auth provider. It will be referred to by `AuthRequirement.provider_id`. Example: "bookstore_auth".',
      ).optional(),
      issuer: z.string().describe(
        "Identifies the principal that issued the JWT. See https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.1 Usually a URL or an email address. Example: https://securetoken.google.com Example: 1234567-compute@developer.gserviceaccount.com",
      ).optional(),
      jwksUri: z.string().describe(
        "URL of the provider's public key set to validate signature of the JWT. See [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata). Optional if the key set document: - can be retrieved from [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) of the issuer. - can be inferred from the email domain of the issuer (e.g. a Google service account). Example: https://www.googleapis.com/oauth2/v1/certs",
      ).optional(),
      jwtLocations: z.array(z.object({
        cookie: z.unknown().describe(
          "Specifies cookie name to extract JWT token.",
        ).optional(),
        header: z.unknown().describe(
          "Specifies HTTP header name to extract JWT token.",
        ).optional(),
        query: z.unknown().describe(
          "Specifies URL query parameter name to extract JWT token.",
        ).optional(),
        valuePrefix: z.unknown().describe(
          'The value prefix. The value format is "value_prefix{token}" Only applies to "in" header type. Must be empty for "in" query type. If not empty, the header value has to match (case sensitive) this prefix. If not matched, JWT will not be extracted. If matched, JWT will be extracted after the prefix is removed. For example, for "Authorization: Bearer {JWT}", value_prefix="Bearer " with a space at the end.',
        ).optional(),
      })).describe(
        'Defines the locations to extract the JWT. For now it is only used by the Cloud Endpoints to store the OpenAPI extension [x-google-jwt-locations] (https://cloud.google.com/endpoints/docs/openapi/openapi-extensions#x-google-jwt-locations) JWT locations can be one of HTTP headers, URL query parameters or cookies. The rule is that the first match wins. If not specified, default to use following 3 locations: 1) Authorization: Bearer 2) x-goog-iap-jwt-assertion 3) access_token query parameter Default locations can be specified as followings: jwt_locations: - header: Authorization value_prefix: "Bearer " - header: x-goog-iap-jwt-assertion - query: access_token',
      ).optional(),
    })).describe(
      "Defines a set of authentication providers that a service supports.",
    ).optional(),
    rules: z.array(z.object({
      allowWithoutCredential: z.boolean().describe(
        "If true, the service accepts API keys without any other credential. This flag only applies to HTTP and gRPC requests.",
      ).optional(),
      oauth: z.object({
        canonicalScopes: z.string().describe(
          "The list of publicly documented OAuth scopes that are allowed access. An OAuth token containing any of these scopes will be accepted. Example: canonical_scopes: https://www.googleapis.com/auth/calendar, https://www.googleapis.com/auth/calendar.read",
        ).optional(),
      }).describe(
        'OAuth scopes are a way to define data and permissions on data. For example, there are scopes defined for "Read-only access to Google Calendar" and "Access to Cloud Platform". Users can consent to a scope for an application, giving it permission to access that data on their behalf. OAuth scope specifications should be fairly coarse grained; a user will need to see and understand the text description of what your scope means. In most cases: use one or at most two OAuth scopes for an entire family of products. If your product has multiple APIs, you should probably be sharing the OAuth scope across all of those APIs. When you need finer grained OAuth consent screens: talk with your product management about how developers will use them in practice. Please note that even though each of the canonical scopes is enough for a request to be accepted and passed to the backend, a request can still fail due to the backend requiring additional scopes or permissions.',
      ).optional(),
      requirements: z.array(z.object({
        audiences: z.unknown().describe(
          'NOTE: This will be deprecated soon, once AuthProvider.audiences is implemented and accepted in all the runtime components. The list of JWT [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted. When this setting is absent, only JWTs with audience "https://Service_name/API_name" will be accepted. For example, if no audiences are in the setting, LibraryService API will only accept JWTs with the following audience "https://library-example.googleapis.com/google.example.library.v1.LibraryService". Example: audiences: bookstore_android.apps.googleusercontent.com, bookstore_web.apps.googleusercontent.com',
        ).optional(),
        providerId: z.unknown().describe(
          "id from authentication provider. Example: provider_id: bookstore_auth",
        ).optional(),
      })).describe("Requirements for additional authentication providers.")
        .optional(),
      selector: z.string().describe(
        "Selects the methods to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      'A list of authentication rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
  }).describe(
    '`Authentication` defines the authentication configuration for API methods provided by an API service. Example: name: calendar.googleapis.com authentication: providers: - id: google_calendar_auth jwks_uri: https://www.googleapis.com/oauth2/v1/certs issuer: https://securetoken.google.com rules: - selector: "*" requirements: provider_id: google_calendar_auth - selector: google.calendar.Delegate oauth: canonical_scopes: https://www.googleapis.com/auth/calendar.read',
  ).optional(),
  backend: z.object({
    rules: z.array(z.object({
      address: z.string().describe(
        "The address of the API backend. The scheme is used to determine the backend protocol and security. The following schemes are accepted: SCHEME PROTOCOL SECURITY http:// HTTP None https:// HTTP TLS grpc:// gRPC None grpcs:// gRPC TLS It is recommended to explicitly include a scheme. Leaving out the scheme may cause constrasting behaviors across platforms. If the port is unspecified, the default is: - 80 for schemes without TLS - 443 for schemes with TLS For HTTP backends, use protocol to specify the protocol version.",
      ).optional(),
      deadline: z.number().describe(
        "The number of seconds to wait for a response from a request. The default varies based on the request protocol and deployment environment.",
      ).optional(),
      disableAuth: z.boolean().describe(
        'When disable_auth is true, a JWT ID token won\'t be generated and the original "Authorization" HTTP header will be preserved. If the header is used to carry the original token and is expected by the backend, this field must be set to true to preserve the header.',
      ).optional(),
      jwtAudience: z.string().describe(
        'The JWT audience is used when generating a JWT ID token for the backend. This ID token will be added in the HTTP "authorization" header, and sent to the backend.',
      ).optional(),
      loadBalancingPolicy: z.string().describe(
        'The load balancing policy used for connection to the application backend. Defined as an arbitrary string to accomondate custom load balancing policies supported by the underlying channel, but suggest most users use one of the standard policies, such as the default, "RoundRobin".',
      ).optional(),
      minDeadline: z.number().describe("Deprecated, do not use.").optional(),
      operationDeadline: z.number().describe(
        "The number of seconds to wait for the completion of a long running operation. The default is no deadline.",
      ).optional(),
      overridesByRequestProtocol: z.record(z.string(), z.string()).describe(
        "The map between request protocol and the backend address.",
      ).optional(),
      pathTranslation: z.enum([
        "PATH_TRANSLATION_UNSPECIFIED",
        "CONSTANT_ADDRESS",
        "APPEND_PATH_TO_ADDRESS",
      ]).describe(
        "Path translation specifies how to combine the backend address with the request path in order to produce the appropriate forwarding URL for the request. See PathTranslation for more details.",
      ).optional(),
      protocol: z.string().describe(
        'The protocol used for sending a request to the backend. The supported values are "http/1.1" and "h2". The default value is inferred from the scheme in the address field: SCHEME PROTOCOL http:// http/1.1 https:// http/1.1 grpc:// h2 grpcs:// h2 For secure HTTP backends (https://) that support HTTP/2, set this field to "h2" for improved performance. Configuring this field to non-default values is only supported for secure HTTP backends. This field will be ignored for all other backends. See https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids for more details on the supported values.',
      ).optional(),
      selector: z.string().describe(
        "Selects the methods to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      'A list of API backend rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
  }).describe("`Backend` defines the backend configuration for a service.")
    .optional(),
  billing: z.object({
    consumerDestinations: z.array(z.object({
      metrics: z.array(z.string()).describe(
        "Names of the metrics to report to this billing destination. Each name must be defined in Service.metrics section.",
      ).optional(),
      monitoredResource: z.string().describe(
        "The monitored resource type. The type must be defined in Service.monitored_resources section.",
      ).optional(),
    })).describe(
      "Billing configurations for sending metrics to the consumer project. There can be multiple consumer destinations per service, each one must have a different monitored resource type. A metric can be used in at most one consumer destination.",
    ).optional(),
  }).describe(
    'Billing related configuration of the service. The following example shows how to configure monitored resources and metrics for billing, `consumer_destinations` is the only supported destination and the monitored resources need at least one label key `cloud.googleapis.com/location` to indicate the location of the billing usage, using different monitored resources between monitoring and billing is recommended so they can be evolved independently: monitored_resources: - type: library.googleapis.com/billing_branch labels: - key: cloud.googleapis.com/location description: | Predefined label to support billing location restriction. - key: city description: | Custom label to define the city where the library branch is located in. - key: name description: Custom label to define the name of the library branch. metrics: - name: library.googleapis.com/book/borrowed_count metric_kind: DELTA value_type: INT64 unit: "1" billing: consumer_destinations: - monitored_resource: library.googleapis.com/billing_branch metrics: - library.googleapis.com/book/borrowed_count',
  ).optional(),
  configVersion: z.number().int().describe(
    "Obsolete. Do not use. This field has no semantic meaning. The service config compiler always sets this field to `3`.",
  ).optional(),
  context: z.object({
    rules: z.array(z.object({
      allowedRequestExtensions: z.array(z.string()).describe(
        "A list of full type names or extension IDs of extensions allowed in grpc side channel from client to backend.",
      ).optional(),
      allowedResponseExtensions: z.array(z.string()).describe(
        "A list of full type names or extension IDs of extensions allowed in grpc side channel from backend to client.",
      ).optional(),
      provided: z.array(z.string()).describe(
        "A list of full type names of provided contexts. It is used to support propagating HTTP headers and ETags from the response extension.",
      ).optional(),
      requested: z.array(z.string()).describe(
        "A list of full type names of requested contexts, only the requested context will be made available to the backend.",
      ).optional(),
      selector: z.string().describe(
        "Selects the methods to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      'A list of RPC context rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
  }).describe(
    '`Context` defines which contexts an API requests. Example: context: rules: - selector: "*" requested: - google.rpc.context.ProjectContext - google.rpc.context.OriginContext The above specifies that all methods in the API request `google.rpc.context.ProjectContext` and `google.rpc.context.OriginContext`. Available context types are defined in package `google.rpc.context`. This also provides mechanism to allowlist any protobuf message extension that can be sent in grpc metadata using “x-goog-ext--bin” and “x-goog-ext--jspb” format. For example, list any service specific protobuf types that can appear in grpc metadata as follows in your yaml file: Example: context: rules: - selector: "google.example.library.v1.LibraryService.CreateBook" allowed_request_extensions: - google.foo.v1.NewExtension allowed_response_extensions: - google.foo.v1.NewExtension You can also specify extension ID instead of fully qualified extension name here.',
  ).optional(),
  control: z.object({
    environment: z.string().describe(
      "The service controller environment to use. If empty, no control plane features (like quota and billing) will be enabled. The recommended value for most services is servicecontrol.googleapis.com.",
    ).optional(),
    methodPolicies: z.array(z.object({
      requestPolicies: z.array(z.object({
        resourcePermission: z.unknown().describe(
          'Specifies the required permission(s) for the resource referred to by the field. It requires the field contains a valid resource reference, and the request must pass the permission checks to proceed. For example, "resourcemanager.projects.get".',
        ).optional(),
        resourceType: z.unknown().describe(
          "Specifies the resource type for the resource referred to by the field.",
        ).optional(),
        selector: z.unknown().describe(
          'Selects one or more request or response message fields to apply this `FieldPolicy`. When a `FieldPolicy` is used in proto annotation, the selector must be left as empty. The service config generator will automatically fill the correct value. When a `FieldPolicy` is used in service config, the selector must be a comma-separated string with valid request or response field paths, such as "foo.bar" or "foo.bar,foo.baz".',
        ).optional(),
      })).describe("Policies that are applicable to the request message.")
        .optional(),
      selector: z.string().describe(
        'Selects a method to which these policies should be enforced, for example, "google.pubsub.v1.Subscriber.CreateSubscription". Refer to selector for syntax details. NOTE: This field must not be set in the proto annotation. It will be automatically filled by the service config compiler.',
      ).optional(),
    })).describe("Defines policies applying to the API methods of the service.")
      .optional(),
  }).describe(
    "Selects and configures the service controller used by the service. Example: control: environment: servicecontrol.googleapis.com",
  ).optional(),
  customError: z.object({
    rules: z.array(z.object({
      isErrorType: z.boolean().describe(
        "Mark this message as possible payload in error response. Otherwise, objects of this type will be filtered when they appear in error payload.",
      ).optional(),
      selector: z.string().describe(
        "Selects messages to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      'The list of custom error rules that apply to individual API messages. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
    types: z.array(z.string()).describe(
      "The list of custom error detail types, e.g. 'google.foo.v1.CustomError'.",
    ).optional(),
  }).describe(
    "Customize service error responses. For example, list any service specific protobuf types that can appear in error detail lists of error responses. Example: custom_error: types: - google.foo.v1.CustomError - google.foo.v1.AnotherError",
  ).optional(),
  documentation: z.object({
    additionalIamInfo: z.string().describe(
      "Optional information about the IAM configuration. This is typically used to link to documentation about a product's IAM roles and permissions.",
    ).optional(),
    documentationRootUrl: z.string().describe(
      "The URL to the root of documentation.",
    ).optional(),
    overview: z.string().describe(
      "Declares a single overview page. For example: documentation: summary:... overview: (== include overview.md ==) This is a shortcut for the following declaration (using pages style): documentation: summary:... pages: - name: Overview content: (== include overview.md ==) Note: you cannot specify both `overview` field and `pages` field.",
    ).optional(),
    pages: z.array(z.object({
      content: z.string().describe(
        "The Markdown content of the page. You can use ` (== include {path} ==) ` to include content from a Markdown file. The content can be used to produce the documentation page such as HTML format page.",
      ).optional(),
      name: z.string().describe(
        "The name of the page. It will be used as an identity of the page to generate URI of the page, text of the link to this page in navigation, etc. The full page name (start from the root page name to this page concatenated with `.`) can be used as reference to the page in your documentation. For example: pages: - name: Tutorial content: (== include tutorial.md ==) subpages: - name: Java content: (== include tutorial_java.md ==) You can reference `Java` page using Markdown reference link syntax: `Java`.",
      ).optional(),
      subpages: z.array(z.string()).describe(
        "Subpages of this page. The order of subpages specified here will be honored in the generated docset.",
      ).optional(),
    })).describe("The top level pages for the documentation set.").optional(),
    rules: z.array(z.object({
      deprecationDescription: z.string().describe(
        "Deprecation description of the selected element(s). It can be provided if an element is marked as `deprecated`.",
      ).optional(),
      description: z.string().describe(
        "Description of the selected proto element (e.g. a message, a method, a 'service' definition, or a field). Defaults to leading & trailing comments taken from the proto source definition of the proto element.",
      ).optional(),
      disableReplacementWords: z.string().describe(
        "String of comma or space separated case-sensitive words for which method/field name replacement will be disabled.",
      ).optional(),
      selector: z.string().describe(
        'The selector is a comma-separated list of patterns for any element such as a method, a field, an enum value. Each pattern is a qualified name of the element which may end in "*", indicating a wildcard. Wildcards are only allowed at the end and for a whole component of the qualified name, i.e. "foo.*" is ok, but not "foo.b*" or "foo.*.bar". A wildcard will match one or more components. To specify a default for all applicable elements, the whole pattern "*" is used.',
      ).optional(),
    })).describe(
      'A list of documentation rules that apply to individual API elements. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
    sectionOverrides: z.array(z.object({
      content: z.string().describe(
        "The Markdown content of the page. You can use ` (== include {path} ==) ` to include content from a Markdown file. The content can be used to produce the documentation page such as HTML format page.",
      ).optional(),
      name: z.string().describe(
        "The name of the page. It will be used as an identity of the page to generate URI of the page, text of the link to this page in navigation, etc. The full page name (start from the root page name to this page concatenated with `.`) can be used as reference to the page in your documentation. For example: pages: - name: Tutorial content: (== include tutorial.md ==) subpages: - name: Java content: (== include tutorial_java.md ==) You can reference `Java` page using Markdown reference link syntax: `Java`.",
      ).optional(),
      subpages: z.array(z.string()).describe(
        "Subpages of this page. The order of subpages specified here will be honored in the generated docset.",
      ).optional(),
    })).describe(
      "Specifies section and content to override the boilerplate content. Currently overrides following sections: 1. rest.service.client_libraries",
    ).optional(),
    serviceRootUrl: z.string().describe(
      "Specifies the service root url if the default one (the service name from the yaml file) is not suitable. This can be seen in any fully specified service urls as well as sections that show a base that other urls are relative to.",
    ).optional(),
    summary: z.string().describe(
      "A short description of what the service does. The summary must be plain text. It becomes the overview of the service displayed in Google Cloud Console. NOTE: This field is equivalent to the standard field `description`.",
    ).optional(),
  }).describe(
    "`Documentation` provides the information for describing a service. Example: documentation: summary: > The Google Calendar API gives access to most calendar features. pages: - name: Overview content: (== include google/foo/overview.md ==) - name: Tutorial content: (== include google/foo/tutorial.md ==) subpages: - name: Java content: (== include google/foo/tutorial_java.md ==) rules: - selector: google.calendar.Calendar.Get description: >... - selector: google.calendar.Calendar.Put description: >... Documentation is provided in markdown syntax. In addition to standard markdown features, definition lists, tables and fenced code blocks are supported. Section headers can be provided and are interpreted relative to the section nesting of the context where a documentation fragment is embedded. Documentation from the IDL is merged with documentation defined via the config at normalization time, where documentation provided by config rules overrides IDL provided. A number of constructs specific to the API platform are supported in documentation text. In order to reference a proto element, the following notation can be used: [fully.qualified.proto.name][] To override the display text used for the link, this can be used: [display text][fully.qualified.proto.name] Text can be excluded from doc using the following notation: (-- internal comment --) A few directives are available in documentation. Note that directives must appear on a single line to be properly identified. The `include` directive includes a markdown file from an external source: (== include path/to/file ==) The `resource_for` directive marks a message to be the resource of a collection in REST view. If it is not specified, tools attempt to infer the resource from the operations in a collection: (== resource_for v1.shelves.books ==) The directive `suppress_warning` does not directly affect documentation and is documented together with service config validation.",
  ).optional(),
  endpoints: z.array(z.object({
    aliases: z.array(z.string()).describe(
      "Aliases for this endpoint, these will be served by the same UrlMap as the parent endpoint, and will be provisioned in the GCP stack for the Regional Endpoints.",
    ).optional(),
    allowCors: z.boolean().describe(
      "Allowing [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), aka cross-domain traffic, would allow the backends served from this endpoint to receive and respond to HTTP OPTIONS requests. The response will be used by the browser to determine whether the subsequent cross-origin request is allowed to proceed.",
    ).optional(),
    name: z.string().describe("The canonical name of this endpoint.")
      .optional(),
    target: z.string().describe(
      'The specification of an Internet routable address of API frontend that will handle requests to this [API Endpoint](https://cloud.google.com/apis/design/glossary). It should be either a valid IPv4 address or a fully-qualified domain name. For example, "8.8.8.8" or "myservice.appspot.com".',
    ).optional(),
  })).describe(
    "Configuration for network endpoints. If this is empty, then an endpoint with the same name as the service is automatically generated to service all defined APIs.",
  ).optional(),
  enums: z.array(z.object({
    edition: z.string().describe(
      "The source edition string, only valid when syntax is SYNTAX_EDITIONS.",
    ).optional(),
    enumvalue: z.array(z.object({
      name: z.string().describe("Enum value name.").optional(),
      number: z.number().int().describe("Enum value number.").optional(),
      options: z.array(z.unknown()).describe("Protocol buffer options.")
        .optional(),
    })).describe("Enum value definitions.").optional(),
    name: z.string().describe("Enum type name.").optional(),
    options: z.array(z.object({
      name: z.string().describe(
        'The option\'s name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, `"map_entry"`. For custom options, it should be the fully-qualified name. For example, `"google.api.http"`.',
      ).optional(),
      value: z.record(z.string(), z.unknown()).describe(
        "The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type.",
      ).optional(),
    })).describe("Protocol buffer options.").optional(),
    sourceContext: z.object({
      fileName: z.string().describe(
        'The path-qualified name of the.proto file that contained the associated protobuf element. For example: `"google/protobuf/source_context.proto"`.',
      ).optional(),
    }).describe(
      "`SourceContext` represents information about the source of a protobuf element, like the file in which it is defined.",
    ).optional(),
    syntax: z.enum(["SYNTAX_PROTO2", "SYNTAX_PROTO3", "SYNTAX_EDITIONS"])
      .describe("The source syntax.").optional(),
  })).describe(
    "A list of all enum types included in this API service. Enums referenced directly or indirectly by the `apis` are automatically included. Enums which are not referenced but shall be included should be listed here by name by the configuration author. Example: enums: - name: google.someapi.v1.SomeEnum",
  ).optional(),
  http: z.object({
    fullyDecodeReservedExpansion: z.boolean().describe(
      'When set to true, URL path parameters will be fully URI-decoded except in cases of single segment matches in reserved expansion, where "%2F" will be left encoded. The default behavior is to not decode RFC 6570 reserved characters in multi segment matches.',
    ).optional(),
    rules: z.array(z.object({
      additionalBindings: z.array(z.string()).describe(
        "Additional HTTP bindings for the selector. Nested bindings must not contain an `additional_bindings` field themselves (that is, the nesting may only be one level deep).",
      ).optional(),
      body: z.string().describe(
        "The name of the request field whose value is mapped to the HTTP request body, or `*` for mapping all request fields not captured by the path pattern to the HTTP body, or omitted for not having any HTTP request body. NOTE: the referred field must be present at the top-level of the request message type.",
      ).optional(),
      custom: z.object({
        kind: z.string().describe("The name of this custom HTTP verb.")
          .optional(),
        path: z.string().describe("The path matched by this custom verb.")
          .optional(),
      }).describe("A custom pattern is used for defining custom HTTP verb.")
        .optional(),
      delete: z.string().describe(
        "Maps to HTTP DELETE. Used for deleting a resource.",
      ).optional(),
      get: z.string().describe(
        "Maps to HTTP GET. Used for listing and getting information about resources.",
      ).optional(),
      patch: z.string().describe(
        "Maps to HTTP PATCH. Used for updating a resource.",
      ).optional(),
      post: z.string().describe(
        "Maps to HTTP POST. Used for creating a resource or performing an action.",
      ).optional(),
      put: z.string().describe(
        "Maps to HTTP PUT. Used for replacing a resource.",
      ).optional(),
      responseBody: z.string().describe(
        "Optional. The name of the response field whose value is mapped to the HTTP response body. When omitted, the entire response message will be used as the HTTP response body. NOTE: The referred field must be present at the top-level of the response message type.",
      ).optional(),
      selector: z.string().describe(
        "Selects a method to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      'A list of HTTP configuration rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
  }).describe(
    "Defines the HTTP configuration for an API service. It contains a list of HttpRule, each specifying the mapping of an RPC method to one or more HTTP REST API methods.",
  ).optional(),
  id: z.string().describe(
    "A unique ID for a specific instance of this message, typically assigned by the client for tracking purpose. Must be no longer than 63 characters and only lower case letters, digits, '.', '_' and '-' are allowed. If empty, the server may choose to generate one instead.",
  ).optional(),
  logging: z.object({
    consumerDestinations: z.array(z.object({
      logs: z.array(z.string()).describe(
        'Names of the logs to be sent to this destination. Each name must be defined in the Service.logs section. If the log name is not a domain scoped name, it will be automatically prefixed with the service name followed by "/".',
      ).optional(),
      monitoredResource: z.string().describe(
        "The monitored resource type. The type must be defined in the Service.monitored_resources section.",
      ).optional(),
    })).describe(
      "Logging configurations for sending logs to the consumer project. There can be multiple consumer destinations, each one must have a different monitored resource type. A log can be used in at most one consumer destination.",
    ).optional(),
    producerDestinations: z.array(z.object({
      logs: z.array(z.string()).describe(
        'Names of the logs to be sent to this destination. Each name must be defined in the Service.logs section. If the log name is not a domain scoped name, it will be automatically prefixed with the service name followed by "/".',
      ).optional(),
      monitoredResource: z.string().describe(
        "The monitored resource type. The type must be defined in the Service.monitored_resources section.",
      ).optional(),
    })).describe(
      "Logging configurations for sending logs to the producer project. There can be multiple producer destinations, each one must have a different monitored resource type. A log can be used in at most one producer destination.",
    ).optional(),
  }).describe(
    "Logging configuration of the service. The following example shows how to configure logs to be sent to the producer and consumer projects. In the example, the `activity_history` log is sent to both the producer and consumer projects, whereas the `purchase_history` log is only sent to the producer project. monitored_resources: - type: library.googleapis.com/branch labels: - key: /city description: The city where the library branch is located in. - key: /name description: The name of the branch. logs: - name: activity_history labels: - key: /customer_id - name: purchase_history logging: producer_destinations: - monitored_resource: library.googleapis.com/branch logs: - activity_history - purchase_history consumer_destinations: - monitored_resource: library.googleapis.com/branch logs: - activity_history",
  ).optional(),
  logs: z.array(z.object({
    description: z.string().describe(
      "A human-readable description of this log. This information appears in the documentation and can contain details.",
    ).optional(),
    displayName: z.string().describe(
      "The human-readable name for this log. This information appears on the user interface and should be concise.",
    ).optional(),
    labels: z.array(z.object({
      description: z.string().describe(
        "A human-readable description for the label.",
      ).optional(),
      key: z.string().describe("The label key.").optional(),
      valueType: z.enum(["STRING", "BOOL", "INT64"]).describe(
        "The type of data that can be assigned to the label.",
      ).optional(),
    })).describe(
      "The set of labels that are available to describe a specific log entry. Runtime requests that contain labels not specified here are considered invalid.",
    ).optional(),
    name: z.string().describe(
      "The name of the log. It must be less than 512 characters long and can include the following characters: upper- and lower-case alphanumeric characters [A-Za-z0-9], and punctuation characters including slash, underscore, hyphen, period [/_-.].",
    ).optional(),
  })).describe("Defines the logs used by this service.").optional(),
  metrics: z.array(z.object({
    description: z.string().describe(
      "A detailed description of the metric, which can be used in documentation.",
    ).optional(),
    displayName: z.string().describe(
      'A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example "Request count". This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota.',
    ).optional(),
    labels: z.array(z.object({
      description: z.string().describe(
        "A human-readable description for the label.",
      ).optional(),
      key: z.string().describe("The label key.").optional(),
      valueType: z.enum(["STRING", "BOOL", "INT64"]).describe(
        "The type of data that can be assigned to the label.",
      ).optional(),
    })).describe(
      "The set of labels that can be used to describe a specific instance of this metric type. For example, the `appengine.googleapis.com/http/server/response_latencies` metric type has a label for the HTTP response code, `response_code`, so you can look at latencies for successful responses or just for responses that failed.",
    ).optional(),
    launchStage: z.enum([
      "LAUNCH_STAGE_UNSPECIFIED",
      "UNIMPLEMENTED",
      "PRELAUNCH",
      "EARLY_ACCESS",
      "ALPHA",
      "BETA",
      "GA",
      "DEPRECATED",
    ]).describe("Optional. The launch stage of the metric definition.")
      .optional(),
    metadata: z.object({
      ingestDelay: z.string().describe(
        "The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors.",
      ).optional(),
      launchStage: z.enum([
        "LAUNCH_STAGE_UNSPECIFIED",
        "UNIMPLEMENTED",
        "PRELAUNCH",
        "EARLY_ACCESS",
        "ALPHA",
        "BETA",
        "GA",
        "DEPRECATED",
      ]).describe(
        "Deprecated. Must use the MetricDescriptor.launch_stage instead.",
      ).optional(),
      samplePeriod: z.string().describe(
        "The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period.",
      ).optional(),
      timeSeriesResourceHierarchyLevel: z.array(
        z.enum([
          "TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED",
          "PROJECT",
          "ORGANIZATION",
          "FOLDER",
        ]),
      ).describe("The scope of the timeseries data of the metric.").optional(),
    }).describe(
      "Additional annotations that can be used to guide the usage of a metric.",
    ).optional(),
    metricKind: z.enum([
      "METRIC_KIND_UNSPECIFIED",
      "GAUGE",
      "DELTA",
      "CUMULATIVE",
    ]).describe(
      "Whether the metric records instantaneous values, changes to a value, etc. Some combinations of `metric_kind` and `value_type` might not be supported.",
    ).optional(),
    monitoredResourceTypes: z.array(z.string()).describe(
      "Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here.",
    ).optional(),
    name: z.string().describe("The resource name of the metric descriptor.")
      .optional(),
    type: z.string().describe(
      'The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name `custom.googleapis.com` or `external.googleapis.com`. Metric types should use a natural hierarchical grouping. For example: "custom.googleapis.com/invoice/paid/amount" "external.googleapis.com/prometheus/up" "appengine.googleapis.com/http/server/response_latencies"',
    ).optional(),
    unit: z.string().describe(
      'The units in which the metric value is reported. It is only applicable if the `value_type` is `INT64`, `DOUBLE`, or `DISTRIBUTION`. The `unit` defines the representation of the stored metric values. Different systems might scale the values to be more easily displayed (so a value of `0.02kBy` _might_ be displayed as `20By`, and a value of `3523kBy` _might_ be displayed as `3.5MBy`). However, if the `unit` is `kBy`, then the value of the metric is always in thousands of bytes, no matter how it might be displayed. If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an `INT64 CUMULATIVE` metric whose `unit` is `s{CPU}` (or equivalently `1s{CPU}` or just `s`). If the job uses 12,005 CPU-seconds, then the value is written as `12005`. Alternatively, if you want a custom metric to record data in a more granular way, you can create a `DOUBLE CUMULATIVE` metric whose `unit` is `ks{CPU}`, and then write the value `12.005` (which is `12005/1000`), or use `Kis{CPU}` and write `11.723` (which is `12005/1024`). The supported units are a subset of [The Unified Code for Units of Measure](https://unitsofmeasure.org/ucum.html) standard: **Basic units (UNIT)** * `bit` bit * `By` byte * `s` second * `min` minute * `h` hour * `d` day * `1` dimensionless **Prefixes (PREFIX)** * `k` kilo (10^3) * `M` mega (10^6) * `G` giga (10^9) * `T` tera (10^12) * `P` peta (10^15) * `E` exa (10^18) * `Z` zetta (10^21) * `Y` yotta (10^24) * `m` milli (10^-3) * `u` micro (10^-6) * `n` nano (10^-9) * `p` pico (10^-12) * `f` femto (10^-15) * `a` atto (10^-18) * `z` zepto (10^-21) * `y` yocto (10^-24) * `Ki` kibi (2^10) * `Mi` mebi (2^20) * `Gi` gibi (2^30) * `Ti` tebi (2^40) * `Pi` pebi (2^50) **Grammar** The grammar also includes these connectors: * `/` division or ratio (as an infix operator). For examples, `kBy/{email}` or `MiBy/10ms` (although you should almost never have `/s` in a metric `unit`; rates should always be computed at query time from the underlying cumulative or delta value). * `.` multiplication or composition (as an infix operator). For examples, `GBy.d` or `k{watt}.h`. The grammar for a unit is as follows: Expression = Component { "." Component } { "/" Component }; Component = ( [ PREFIX ] UNIT | "%") [ Annotation ] | Annotation | "1"; Annotation = "{" NAME "}"; Notes: * `Annotation` is just a comment if it follows a `UNIT`. If the annotation is used alone, then the unit is equivalent to `1`. For examples, `{request}/s == 1/s`, `By{transmitted}/s == By/s`. * `NAME` is a sequence of non-blank printable ASCII characters not containing `{` or `}`. * `1` represents a unitary [dimensionless unit](https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in `1/s`. It is typically used when none of the basic units are appropriate. For example, "new users per day" can be represented as `1/d` or `{new-users}/d` (and a metric value `5` would mean "5 new users). Alternatively, "thousands of page views per day" would be represented as `1000/d` or `k1/d` or `k{page_views}/d` (and a metric value of `5.3` would mean "5300 page views per day"). * `%` represents dimensionless value of 1/100, and annotates values giving a percentage (so the metric values are typically in the range of 0..100, and a metric value `3` means "3 percent"). * `10^2.%` indicates a metric contains a ratio, typically in the range 0..1, that will be multiplied by 100 and displayed as a percentage (so a metric value `0.03` means "3 percent").',
    ).optional(),
    valueType: z.enum([
      "VALUE_TYPE_UNSPECIFIED",
      "BOOL",
      "INT64",
      "DOUBLE",
      "STRING",
      "DISTRIBUTION",
      "MONEY",
    ]).describe(
      "Whether the measurement is an integer, a floating-point number, etc. Some combinations of `metric_kind` and `value_type` might not be supported.",
    ).optional(),
  })).describe("Defines the metrics used by this service.").optional(),
  monitoredResources: z.array(z.object({
    description: z.string().describe(
      "Optional. A detailed description of the monitored resource type that might be used in documentation.",
    ).optional(),
    displayName: z.string().describe(
      'Optional. A concise name for the monitored resource type that might be displayed in user interfaces. It should be a Title Cased Noun Phrase, without any article or other determiners. For example, `"Google Cloud SQL Database"`.',
    ).optional(),
    labels: z.array(z.object({
      description: z.string().describe(
        "A human-readable description for the label.",
      ).optional(),
      key: z.string().describe("The label key.").optional(),
      valueType: z.enum(["STRING", "BOOL", "INT64"]).describe(
        "The type of data that can be assigned to the label.",
      ).optional(),
    })).describe(
      'Required. A set of labels used to describe instances of this monitored resource type. For example, an individual Google Cloud SQL database is identified by values for the labels `"database_id"` and `"zone"`.',
    ).optional(),
    launchStage: z.enum([
      "LAUNCH_STAGE_UNSPECIFIED",
      "UNIMPLEMENTED",
      "PRELAUNCH",
      "EARLY_ACCESS",
      "ALPHA",
      "BETA",
      "GA",
      "DEPRECATED",
    ]).describe(
      "Optional. The launch stage of the monitored resource definition.",
    ).optional(),
    name: z.string().describe(
      'Optional. The resource name of the monitored resource descriptor: `"projects/{project_id}/monitoredResourceDescriptors/{type}"` where {type} is the value of the `type` field in this object and {project_id} is a project ID that provides API-specific context for accessing the type. APIs that do not use project information can use the resource name format `"monitoredResourceDescriptors/{type}"`.',
    ).optional(),
    type: z.string().describe(
      'Required. The monitored resource type. For example, the type `"cloudsql_database"` represents databases in Google Cloud SQL. For a list of types, see [Monitored resource types](https://cloud.google.com/monitoring/api/resources) and [Logging resource types](https://cloud.google.com/logging/docs/api/v2/resource-list).',
    ).optional(),
  })).describe(
    "Defines the monitored resources used by this service. This is required by the `Service.monitoring` and `Service.logging` configurations.",
  ).optional(),
  monitoring: z.object({
    consumerDestinations: z.array(z.object({
      metrics: z.array(z.string()).describe(
        "Types of the metrics to report to this monitoring destination. Each type must be defined in Service.metrics section.",
      ).optional(),
      monitoredResource: z.string().describe(
        "The monitored resource type. The type must be defined in Service.monitored_resources section.",
      ).optional(),
    })).describe(
      "Monitoring configurations for sending metrics to the consumer project. There can be multiple consumer destinations. A monitored resource type may appear in multiple monitoring destinations if different aggregations are needed for different sets of metrics associated with that monitored resource type. A monitored resource and metric pair may only be used once in the Monitoring configuration.",
    ).optional(),
    producerDestinations: z.array(z.object({
      metrics: z.array(z.string()).describe(
        "Types of the metrics to report to this monitoring destination. Each type must be defined in Service.metrics section.",
      ).optional(),
      monitoredResource: z.string().describe(
        "The monitored resource type. The type must be defined in Service.monitored_resources section.",
      ).optional(),
    })).describe(
      "Monitoring configurations for sending metrics to the producer project. There can be multiple producer destinations. A monitored resource type may appear in multiple monitoring destinations if different aggregations are needed for different sets of metrics associated with that monitored resource type. A monitored resource and metric pair may only be used once in the Monitoring configuration.",
    ).optional(),
  }).describe(
    'Monitoring configuration of the service. The example below shows how to configure monitored resources and metrics for monitoring. In the example, a monitored resource and two metrics are defined. The `library.googleapis.com/book/returned_count` metric is sent to both producer and consumer projects, whereas the `library.googleapis.com/book/num_overdue` metric is only sent to the consumer project. monitored_resources: - type: library.googleapis.com/Branch display_name: "Library Branch" description: "A branch of a library." launch_stage: GA labels: - key: resource_container description: "The Cloud container (ie. project id) for the Branch." - key: location description: "The location of the library branch." - key: branch_id description: "The id of the branch." metrics: - name: library.googleapis.com/book/returned_count display_name: "Books Returned" description: "The count of books that have been returned." launch_stage: GA metric_kind: DELTA value_type: INT64 unit: "1" labels: - key: customer_id description: "The id of the customer." - name: library.googleapis.com/book/num_overdue display_name: "Books Overdue" description: "The current number of overdue books." launch_stage: GA metric_kind: GAUGE value_type: INT64 unit: "1" labels: - key: customer_id description: "The id of the customer." monitoring: producer_destinations: - monitored_resource: library.googleapis.com/Branch metrics: - library.googleapis.com/book/returned_count consumer_destinations: - monitored_resource: library.googleapis.com/Branch metrics: - library.googleapis.com/book/returned_count - library.googleapis.com/book/num_overdue',
  ).optional(),
  name: z.string().describe(
    "The service name, which is a DNS-like logical identifier for the service, such as `calendar.googleapis.com`. The service name typically goes through DNS verification to make sure the owner of the service also owns the DNS name.",
  ).optional(),
  producerProjectId: z.string().describe(
    "The Google project that owns this service.",
  ).optional(),
  publishing: z.object({
    apiShortName: z.string().describe(
      'Used as a tracking tag when collecting data about the APIs developer relations artifacts like docs, packages delivered to package managers, etc. Example: "speech".',
    ).optional(),
    codeownerGithubTeams: z.array(z.string()).describe(
      "GitHub teams to be added to CODEOWNERS in the directory in GitHub containing source code for the client libraries for this API.",
    ).optional(),
    docTagPrefix: z.string().describe(
      "A prefix used in sample code when demarking regions to be included in documentation.",
    ).optional(),
    documentationUri: z.string().describe(
      "Link to product home page. Example: https://cloud.google.com/asset-inventory/docs/overview",
    ).optional(),
    githubLabel: z.string().describe(
      "GitHub label to apply to issues and pull requests opened for this API.",
    ).optional(),
    librarySettings: z.array(z.object({
      cppSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
      }).describe("Settings for C++ client libraries.").optional(),
      dotnetSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
        forcedNamespaceAliases: z.array(z.unknown()).describe(
          "Namespaces which must be aliased in snippets due to a known (but non-generator-predictable) naming collision",
        ).optional(),
        handwrittenSignatures: z.array(z.unknown()).describe(
          'Method signatures (in the form "service.method(signature)") which are provided separately, so shouldn\'t be generated. Snippets *calling* these methods are still generated, however.',
        ).optional(),
        ignoredResources: z.array(z.unknown()).describe(
          'List of full resource types to ignore during generation. This is typically used for API-specific Location resources, which should be handled by the generator as if they were actually the common Location resources. Example entry: "documentai.googleapis.com/Location"',
        ).optional(),
        renamedResources: z.record(z.string(), z.unknown()).describe(
          'Map from full resource types to the effective short name for the resource. This is used when otherwise resource named from different services would cause naming collisions. Example entry: "datalabeling.googleapis.com/Dataset": "DataLabelingDataset"',
        ).optional(),
        renamedServices: z.record(z.string(), z.unknown()).describe(
          "Map from original service names to renamed versions. This is used when the default generated types would cause a naming conflict. (Neither name is fully-qualified.) Example: Subscriber to SubscriberServiceApi.",
        ).optional(),
      }).describe("Settings for Dotnet client libraries.").optional(),
      goSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
        renamedServices: z.record(z.string(), z.unknown()).describe(
          "Map of service names to renamed services. Keys are the package relative service names and values are the name to be used for the service client and call options. Example: publishing: go_settings: renamed_services: Publisher: TopicAdmin",
        ).optional(),
      }).describe("Settings for Go client libraries.").optional(),
      javaSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
        libraryPackage: z.string().describe(
          'The package name to use in Java. Clobbers the java_package option set in the protobuf. This should be used **only** by APIs who have already set the language_settings.java.package_name" field in gapic.yaml. API teams should use the protobuf java_package option where possible. Example of a YAML configuration:: publishing: library_settings: java_settings: library_package: com.google.cloud.pubsub.v1',
        ).optional(),
        serviceClassNames: z.record(z.string(), z.unknown()).describe(
          "Configure the Java class name to use instead of the service's for its corresponding generated GAPIC client. Keys are fully-qualified service names as they appear in the protobuf (including the full the language_settings.java.interface_names\" field in gapic.yaml. API teams should otherwise use the service name as it appears in the protobuf. Example of a YAML configuration:: publishing: java_settings: service_class_names: - google.pubsub.v1.Publisher: TopicAdmin - google.pubsub.v1.Subscriber: SubscriptionAdmin",
        ).optional(),
      }).describe("Settings for Java client libraries.").optional(),
      launchStage: z.enum([
        "LAUNCH_STAGE_UNSPECIFIED",
        "UNIMPLEMENTED",
        "PRELAUNCH",
        "EARLY_ACCESS",
        "ALPHA",
        "BETA",
        "GA",
        "DEPRECATED",
      ]).describe("Launch stage of this version of the API.").optional(),
      nodeSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
      }).describe("Settings for Node client libraries.").optional(),
      phpSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
        libraryPackage: z.string().describe(
          'The package name to use in Php. Clobbers the php_namespace option set in the protobuf. This should be used **only** by APIs who have already set the language_settings.php.package_name" field in gapic.yaml. API teams should use the protobuf php_namespace option where possible. Example of a YAML configuration:: publishing: library_settings: php_settings: library_package: Google\\Cloud\\PubSub\\V1',
        ).optional(),
      }).describe("Settings for Php client libraries.").optional(),
      pythonSettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
        experimentalFeatures: z.object({
          protobufPythonicTypesEnabled: z.unknown().describe(
            "Enables generation of protobuf code using new types that are more Pythonic which are included in `protobuf>=5.29.x`. This feature will be enabled by default 1 month after launching the feature in preview packages.",
          ).optional(),
          restAsyncIoEnabled: z.unknown().describe(
            "Enables generation of asynchronous REST clients if `rest` transport is enabled. By default, asynchronous REST clients will not be generated. This feature will be enabled by default 1 month after launching the feature in preview packages.",
          ).optional(),
          unversionedPackageDisabled: z.unknown().describe(
            "Disables generation of an unversioned Python package for this client library. This means that the module names will need to be versioned in import statements. For example `import google.cloud.library_v2` instead of `import google.cloud.library`.",
          ).optional(),
        }).describe(
          "Experimental features to be included during client library generation. These fields will be deprecated once the feature graduates and is enabled by default.",
        ).optional(),
      }).describe("Settings for Python client libraries.").optional(),
      restNumericEnums: z.boolean().describe(
        "When using transport=rest, the client request will encode enums as numbers rather than strings.",
      ).optional(),
      rubySettings: z.object({
        common: z.object({
          destinations: z.unknown().describe(
            "The destination where API teams want this client library to be published.",
          ).optional(),
          referenceDocsUri: z.unknown().describe(
            "Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest",
          ).optional(),
          selectiveGapicGeneration: z.unknown().describe(
            "This message is used to configure the generation of a subset of the RPCs in a service for client libraries. Note: This feature should not be used in most cases.",
          ).optional(),
        }).describe("Required information for every language.").optional(),
      }).describe("Settings for Ruby client libraries.").optional(),
      version: z.string().describe(
        'Version of the API to apply these settings to. This is the full protobuf package for the API, ending in the version element. Examples: "google.cloud.speech.v1" and "google.spanner.admin.database.v1".',
      ).optional(),
    })).describe(
      "Client library settings. If the same version string appears multiple times in this list, then the last one wins. Settings from earlier settings with the same version string are discarded.",
    ).optional(),
    methodSettings: z.array(z.object({
      autoPopulatedFields: z.array(z.string()).describe(
        "List of top-level fields of the request message, that should be automatically populated by the client libraries based on their (google.api.field_info).format. Currently supported format: UUID4. Example of a YAML configuration: publishing: method_settings: - selector: google.example.v1.ExampleService.CreateExample auto_populated_fields: - request_id",
      ).optional(),
      batching: z.object({
        batchDescriptor: z.object({
          batchedField: z.unknown().describe(
            "The repeated field in the request message to be aggregated by batching.",
          ).optional(),
          discriminatorFields: z.unknown().describe(
            "A list of the fields in the request message. Two requests will be batched together only if the values of every field specified in `request_discriminator_fields` is equal between the two requests.",
          ).optional(),
          subresponseField: z.unknown().describe(
            "Optional. When present, indicates the field in the response message to be used to demultiplex the response into multiple response messages, in correspondence with the multiple request messages originally batched together.",
          ).optional(),
        }).describe(
          "`BatchingDescriptorProto` specifies the fields of the request message to be used for batching, and, optionally, the fields of the response message to be used for demultiplexing.",
        ).optional(),
        thresholds: z.object({
          delayThreshold: z.unknown().describe(
            "The duration after which a batch should be sent, starting from the addition of the first message to that batch.",
          ).optional(),
          elementCountLimit: z.unknown().describe(
            "The maximum number of elements collected in a batch that could be accepted by server.",
          ).optional(),
          elementCountThreshold: z.unknown().describe(
            "The number of elements of a field collected into a batch which, if exceeded, causes the batch to be sent.",
          ).optional(),
          flowControlByteLimit: z.unknown().describe(
            "The maximum size of data allowed by flow control.",
          ).optional(),
          flowControlElementLimit: z.unknown().describe(
            "The maximum number of elements allowed by flow control.",
          ).optional(),
          flowControlLimitExceededBehavior: z.unknown().describe(
            "The behavior to take when the flow control limit is exceeded.",
          ).optional(),
          requestByteLimit: z.unknown().describe(
            "The maximum size of the request that could be accepted by server.",
          ).optional(),
          requestByteThreshold: z.unknown().describe(
            "The aggregated size of the batched field which, if exceeded, causes the batch to be sent. This size is computed by aggregating the sizes of the request field to be batched, not of the entire request message.",
          ).optional(),
        }).describe(
          "`BatchingSettingsProto` specifies a set of batching thresholds, each of which acts as a trigger to send a batch of messages as a request. At least one threshold must be positive nonzero.",
        ).optional(),
      }).describe(
        "`BatchingConfigProto` defines the batching configuration for an API method.",
      ).optional(),
      longRunning: z.object({
        initialPollDelay: z.string().describe(
          "Initial delay after which the first poll request will be made. Default value: 5 seconds.",
        ).optional(),
        maxPollDelay: z.string().describe(
          "Maximum time between two subsequent poll requests. Default value: 45 seconds.",
        ).optional(),
        pollDelayMultiplier: z.number().describe(
          "Multiplier to gradually increase delay between subsequent polls until it reaches max_poll_delay. Default value: 1.5.",
        ).optional(),
        totalPollTimeout: z.string().describe(
          "Total polling timeout. Default value: 5 minutes.",
        ).optional(),
      }).describe(
        "Describes settings to use when generating API methods that use the long-running operation pattern. All default values below are from those used in the client library generators (e.g. [Java](https://github.com/googleapis/gapic-generator-java/blob/04c2faa191a9b5a10b92392fe8482279c4404803/src/main/java/com/google/api/generator/gapic/composer/common/RetrySettingsComposer.java)).",
      ).optional(),
      selector: z.string().describe(
        "The fully qualified name of the method, for which the options below apply. This is used to find the method to apply the options. Example: publishing: method_settings: - selector: google.storage.control.v2.StorageControl.CreateFolder # method settings for CreateFolder...",
      ).optional(),
    })).describe(
      "A list of API method settings, e.g. the behavior for methods that use the long-running operation pattern.",
    ).optional(),
    newIssueUri: z.string().describe(
      "Link to a *public* URI where users can report issues. Example: https://issuetracker.google.com/issues/new?component=190865&template=1161103",
    ).optional(),
    organization: z.enum([
      "CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED",
      "CLOUD",
      "ADS",
      "PHOTOS",
      "STREET_VIEW",
      "SHOPPING",
      "GEO",
      "GENERATIVE_AI",
      "HEALTH",
    ]).describe("For whom the client library is being published.").optional(),
    protoReferenceDocumentationUri: z.string().describe(
      "Optional link to proto reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rpc",
    ).optional(),
    restReferenceDocumentationUri: z.string().describe(
      "Optional link to REST reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rest",
    ).optional(),
  }).describe(
    "This message configures the settings for publishing [Google Cloud Client libraries](https://cloud.google.com/apis/docs/cloud-client-libraries) generated from the service config.",
  ).optional(),
  quota: z.object({
    limits: z.array(z.object({
      defaultLimit: z.string().describe(
        "Default number of tokens that can be consumed during the specified duration. This is the number of tokens assigned when a client application developer activates the service for his/her project. Specifying a value of 0 will block all requests. This can be used if you are provisioning quota to selected consumers and blocking others. Similarly, a value of -1 will indicate an unlimited quota. No other negative values are allowed. Used by group-based quotas only.",
      ).optional(),
      description: z.string().describe(
        "Optional. User-visible, extended description for this quota limit. Should be used only when more context is needed to understand this limit than provided by the limit's display name (see: `display_name`).",
      ).optional(),
      displayName: z.string().describe(
        "User-visible display name for this limit. Optional. If not set, the UI will provide a default display name based on the quota configuration. This field can be used to override the default display name generated from the configuration.",
      ).optional(),
      duration: z.string().describe(
        'Duration of this limit in textual notation. Must be "100s" or "1d". Used by group-based quotas only.',
      ).optional(),
      freeTier: z.string().describe(
        'Free tier value displayed in the Developers Console for this limit. The free tier is the number of tokens that will be subtracted from the billed amount when billing is enabled. This field can only be set on a limit with duration "1d", in a billable group; it is invalid on any other limit. If this field is not set, it defaults to 0, indicating that there is no free tier for this service. Used by group-based quotas only.',
      ).optional(),
      maxLimit: z.string().describe(
        "Maximum number of tokens that can be consumed during the specified duration. Client application developers can override the default limit up to this maximum. If specified, this value cannot be set to a value less than the default limit. If not specified, it is set to the default limit. To allow clients to apply overrides with no upper bound, set this to -1, indicating unlimited maximum quota. Used by group-based quotas only.",
      ).optional(),
      metric: z.string().describe(
        "The name of the metric this quota limit applies to. The quota limits with the same metric will be checked together during runtime. The metric must be defined within the service config.",
      ).optional(),
      name: z.string().describe(
        "Name of the quota limit. The name must be provided, and it must be unique within the service. The name can only include alphanumeric characters as well as '-'. The maximum length of the limit name is 64 characters.",
      ).optional(),
      unit: z.string().describe(
        'Specify the unit of the quota limit. It uses the same syntax as MetricDescriptor.unit. The supported unit kinds are determined by the quota backend system. Here are some examples: * "1/min/{project}" for quota per minute per project. Note: the order of unit components is insignificant. The "1" at the beginning is required to follow the metric unit syntax.',
      ).optional(),
      values: z.record(z.string(), z.string()).describe(
        "Tiered limit values. You must specify this as a key:value pair, with an integer value that is the maximum number of requests allowed for the specified unit. Currently only STANDARD is supported.",
      ).optional(),
    })).describe("List of QuotaLimit definitions for the service.").optional(),
    metricRules: z.array(z.object({
      metricCosts: z.record(z.string(), z.string()).describe(
        "Metrics to update when the selected methods are called, and the associated cost applied to each metric. The key of the map is the metric name, and the values are the amount increased for the metric against which the quota limits are defined. The value must not be negative.",
      ).optional(),
      selector: z.string().describe(
        "Selects the methods to which this rule applies. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      "List of MetricRule definitions, each one mapping a selected method to one or more metrics.",
    ).optional(),
  }).describe(
    'Quota configuration helps to achieve fairness and budgeting in service usage. The metric based quota configuration works this way: - The service configuration defines a set of metrics. - For API calls, the quota.metric_rules maps methods to metrics with corresponding costs. - The quota.limits defines limits on the metrics, which will be used for quota checks at runtime. An example quota configuration in yaml format: quota: limits: - name: apiWriteQpsPerProject metric: library.googleapis.com/write_calls unit: "1/min/{project}" # rate limit for consumer projects values: STANDARD: 10000 (The metric rules bind all methods to the read_calls metric, except for the UpdateBook and DeleteBook methods. These two methods are mapped to the write_calls metric, with the UpdateBook method consuming at twice rate as the DeleteBook method.) metric_rules: - selector: "*" metric_costs: library.googleapis.com/read_calls: 1 - selector: google.example.library.v1.LibraryService.UpdateBook metric_costs: library.googleapis.com/write_calls: 2 - selector: google.example.library.v1.LibraryService.DeleteBook metric_costs: library.googleapis.com/write_calls: 1 Corresponding Metric definition: metrics: - name: library.googleapis.com/read_calls display_name: Read requests metric_kind: DELTA value_type: INT64 - name: library.googleapis.com/write_calls display_name: Write requests metric_kind: DELTA value_type: INT64',
  ).optional(),
  sourceInfo: z.object({
    sourceFiles: z.array(z.record(z.string(), z.string())).describe(
      "All files used during config generation.",
    ).optional(),
  }).describe("Source information used to create a Service Config").optional(),
  systemParameters: z.object({
    rules: z.array(z.object({
      parameters: z.array(z.object({
        httpHeader: z.unknown().describe(
          "Define the HTTP header name to use for the parameter. It is case insensitive.",
        ).optional(),
        name: z.unknown().describe(
          'Define the name of the parameter, such as "api_key". It is case sensitive.',
        ).optional(),
        urlQueryParameter: z.unknown().describe(
          "Define the URL query parameter name to use for the parameter. It is case sensitive.",
        ).optional(),
      })).describe(
        "Define parameters. Multiple names may be defined for a parameter. For a given method call, only one of them should be used. If multiple names are used the behavior is implementation-dependent. If none of the specified names are present the behavior is parameter-dependent.",
      ).optional(),
      selector: z.string().describe(
        "Selects the methods to which this rule applies. Use '*' to indicate all methods in all APIs. Refer to selector for syntax details.",
      ).optional(),
    })).describe(
      'Define system parameters. The parameters defined here will override the default parameters implemented by the system. If this field is missing from the service config, default system parameters will be used. Default system parameters and names is implementation-dependent. Example: define api key for all methods system_parameters rules: - selector: "*" parameters: - name: api_key url_query_parameter: api_key Example: define 2 api key names for a specific method. system_parameters rules: - selector: "/ListShelves" parameters: - name: api_key http_header: Api-Key1 - name: api_key http_header: Api-Key2 **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
  }).describe(
    "### System parameter configuration A system parameter is a special kind of parameter defined by the API system, not by an individual API. It is typically mapped to an HTTP header and/or a URL query parameter. This configuration specifies which methods change the names of the system parameters.",
  ).optional(),
  systemTypes: z.array(z.object({
    edition: z.string().describe(
      "The source edition string, only valid when syntax is SYNTAX_EDITIONS.",
    ).optional(),
    fields: z.array(z.object({
      cardinality: z.enum([
        "CARDINALITY_UNKNOWN",
        "CARDINALITY_OPTIONAL",
        "CARDINALITY_REQUIRED",
        "CARDINALITY_REPEATED",
      ]).describe("The field cardinality.").optional(),
      defaultValue: z.string().describe(
        "The string value of the default value of this field. Proto2 syntax only.",
      ).optional(),
      jsonName: z.string().describe("The field JSON name.").optional(),
      kind: z.enum([
        "TYPE_UNKNOWN",
        "TYPE_DOUBLE",
        "TYPE_FLOAT",
        "TYPE_INT64",
        "TYPE_UINT64",
        "TYPE_INT32",
        "TYPE_FIXED64",
        "TYPE_FIXED32",
        "TYPE_BOOL",
        "TYPE_STRING",
        "TYPE_GROUP",
        "TYPE_MESSAGE",
        "TYPE_BYTES",
        "TYPE_UINT32",
        "TYPE_ENUM",
        "TYPE_SFIXED32",
        "TYPE_SFIXED64",
        "TYPE_SINT32",
        "TYPE_SINT64",
      ]).describe("The field type.").optional(),
      name: z.string().describe("The field name.").optional(),
      number: z.number().int().describe("The field number.").optional(),
      oneofIndex: z.number().int().describe(
        "The index of the field type in `Type.oneofs`, for message or enumeration types. The first type has index 1; zero means the type is not in the list.",
      ).optional(),
      options: z.array(z.unknown()).describe("The protocol buffer options.")
        .optional(),
      packed: z.boolean().describe(
        "Whether to use alternative packed wire representation.",
      ).optional(),
      typeUrl: z.string().describe(
        'The field type URL, without the scheme, for message or enumeration types. Example: `"type.googleapis.com/google.protobuf.Timestamp"`.',
      ).optional(),
    })).describe("The list of fields.").optional(),
    name: z.string().describe("The fully qualified message name.").optional(),
    oneofs: z.array(z.string()).describe(
      "The list of types appearing in `oneof` definitions in this type.",
    ).optional(),
    options: z.array(z.object({
      name: z.string().describe(
        'The option\'s name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, `"map_entry"`. For custom options, it should be the fully-qualified name. For example, `"google.api.http"`.',
      ).optional(),
      value: z.record(z.string(), z.unknown()).describe(
        "The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type.",
      ).optional(),
    })).describe("The protocol buffer options.").optional(),
    sourceContext: z.object({
      fileName: z.string().describe(
        'The path-qualified name of the.proto file that contained the associated protobuf element. For example: `"google/protobuf/source_context.proto"`.',
      ).optional(),
    }).describe(
      "`SourceContext` represents information about the source of a protobuf element, like the file in which it is defined.",
    ).optional(),
    syntax: z.enum(["SYNTAX_PROTO2", "SYNTAX_PROTO3", "SYNTAX_EDITIONS"])
      .describe("The source syntax.").optional(),
  })).describe(
    "A list of all proto message types included in this API service. It serves similar purpose as [google.api.Service.types], except that these types are not needed by user-defined APIs. Therefore, they will not show up in the generated discovery doc. This field should only be used to define system APIs in ESF.",
  ).optional(),
  title: z.string().describe(
    "The product title for this service, it is the name displayed in Google Cloud Console.",
  ).optional(),
  types: z.array(z.object({
    edition: z.string().describe(
      "The source edition string, only valid when syntax is SYNTAX_EDITIONS.",
    ).optional(),
    fields: z.array(z.object({
      cardinality: z.enum([
        "CARDINALITY_UNKNOWN",
        "CARDINALITY_OPTIONAL",
        "CARDINALITY_REQUIRED",
        "CARDINALITY_REPEATED",
      ]).describe("The field cardinality.").optional(),
      defaultValue: z.string().describe(
        "The string value of the default value of this field. Proto2 syntax only.",
      ).optional(),
      jsonName: z.string().describe("The field JSON name.").optional(),
      kind: z.enum([
        "TYPE_UNKNOWN",
        "TYPE_DOUBLE",
        "TYPE_FLOAT",
        "TYPE_INT64",
        "TYPE_UINT64",
        "TYPE_INT32",
        "TYPE_FIXED64",
        "TYPE_FIXED32",
        "TYPE_BOOL",
        "TYPE_STRING",
        "TYPE_GROUP",
        "TYPE_MESSAGE",
        "TYPE_BYTES",
        "TYPE_UINT32",
        "TYPE_ENUM",
        "TYPE_SFIXED32",
        "TYPE_SFIXED64",
        "TYPE_SINT32",
        "TYPE_SINT64",
      ]).describe("The field type.").optional(),
      name: z.string().describe("The field name.").optional(),
      number: z.number().int().describe("The field number.").optional(),
      oneofIndex: z.number().int().describe(
        "The index of the field type in `Type.oneofs`, for message or enumeration types. The first type has index 1; zero means the type is not in the list.",
      ).optional(),
      options: z.array(z.unknown()).describe("The protocol buffer options.")
        .optional(),
      packed: z.boolean().describe(
        "Whether to use alternative packed wire representation.",
      ).optional(),
      typeUrl: z.string().describe(
        'The field type URL, without the scheme, for message or enumeration types. Example: `"type.googleapis.com/google.protobuf.Timestamp"`.',
      ).optional(),
    })).describe("The list of fields.").optional(),
    name: z.string().describe("The fully qualified message name.").optional(),
    oneofs: z.array(z.string()).describe(
      "The list of types appearing in `oneof` definitions in this type.",
    ).optional(),
    options: z.array(z.object({
      name: z.string().describe(
        'The option\'s name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, `"map_entry"`. For custom options, it should be the fully-qualified name. For example, `"google.api.http"`.',
      ).optional(),
      value: z.record(z.string(), z.unknown()).describe(
        "The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type.",
      ).optional(),
    })).describe("The protocol buffer options.").optional(),
    sourceContext: z.object({
      fileName: z.string().describe(
        'The path-qualified name of the.proto file that contained the associated protobuf element. For example: `"google/protobuf/source_context.proto"`.',
      ).optional(),
    }).describe(
      "`SourceContext` represents information about the source of a protobuf element, like the file in which it is defined.",
    ).optional(),
    syntax: z.enum(["SYNTAX_PROTO2", "SYNTAX_PROTO3", "SYNTAX_EDITIONS"])
      .describe("The source syntax.").optional(),
  })).describe(
    "A list of all proto message types included in this API service. Types referenced directly or indirectly by the `apis` are automatically included. Messages which are not referenced but shall be included, such as types used by the `google.protobuf.Any` type, should be listed here by name by the configuration author. Example: types: - name: google.protobuf.Int32",
  ).optional(),
  usage: z.object({
    producerNotificationChannel: z.string().describe(
      "The full resource name of a channel used for sending notifications to the service producer. Google Service Management currently only supports [Google Cloud Pub/Sub](https://cloud.google.com/pubsub) as a notification channel. To use Google Cloud Pub/Sub as the channel, this must be the name of a Cloud Pub/Sub topic that uses the Cloud Pub/Sub topic name format documented in https://cloud.google.com/pubsub/docs/overview.",
    ).optional(),
    requirements: z.array(z.string()).describe(
      'Requirements that must be satisfied before a consumer project can use the service. Each requirement is of the form /; for example \'serviceusage.googleapis.com/billing-enabled\'. For Google APIs, a Terms of Service requirement must be included here. Google Cloud APIs must include "serviceusage.googleapis.com/tos/cloud". Other Google APIs should include "serviceusage.googleapis.com/tos/universal". Additional ToS can be included based on the business needs.',
    ).optional(),
    rules: z.array(z.object({
      allowUnregisteredCalls: z.boolean().describe(
        "Use this rule to configure unregistered calls for the service. Unregistered calls are calls that do not contain consumer project identity. (Example: calls that do not contain an API key). WARNING: By default, API methods do not allow unregistered calls, and each method call must be identified by a consumer project identity.",
      ).optional(),
      selector: z.string().describe(
        "Selects the methods to which this rule applies. Use '*' to indicate all methods in all APIs. Refer to selector for syntax details.",
      ).optional(),
      skipServiceControl: z.boolean().describe(
        "If true, the selected method should skip service control and the control plane features, such as quota and billing, will not be available. This flag is used by Google Cloud Endpoints to bypass checks for internal methods, such as service health check methods.",
      ).optional(),
    })).describe(
      'A list of usage rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order.',
    ).optional(),
  }).describe("Configuration controlling usage of a service.").optional(),
  serviceName: z.string().describe(
    "Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Service Management Services.Configs. Registered at `@swamp/gcp/servicemanagement/services-configs`. */
export const model = {
  type: "@swamp/gcp/servicemanagement/services-configs",
  version: "2026.05.24.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.12.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "`Service` is the root object of Google API service configuration (service con...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a configs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["serviceName"] !== undefined) {
          params["serviceName"] = String(g["serviceName"]);
        }
        const body: Record<string, unknown> = {};
        if (g["apis"] !== undefined) body["apis"] = g["apis"];
        if (g["aspects"] !== undefined) body["aspects"] = g["aspects"];
        if (g["authentication"] !== undefined) {
          body["authentication"] = g["authentication"];
        }
        if (g["backend"] !== undefined) body["backend"] = g["backend"];
        if (g["billing"] !== undefined) body["billing"] = g["billing"];
        if (g["configVersion"] !== undefined) {
          body["configVersion"] = g["configVersion"];
        }
        if (g["context"] !== undefined) body["context"] = g["context"];
        if (g["control"] !== undefined) body["control"] = g["control"];
        if (g["customError"] !== undefined) {
          body["customError"] = g["customError"];
        }
        if (g["documentation"] !== undefined) {
          body["documentation"] = g["documentation"];
        }
        if (g["endpoints"] !== undefined) body["endpoints"] = g["endpoints"];
        if (g["enums"] !== undefined) body["enums"] = g["enums"];
        if (g["http"] !== undefined) body["http"] = g["http"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["logging"] !== undefined) body["logging"] = g["logging"];
        if (g["logs"] !== undefined) body["logs"] = g["logs"];
        if (g["metrics"] !== undefined) body["metrics"] = g["metrics"];
        if (g["monitoredResources"] !== undefined) {
          body["monitoredResources"] = g["monitoredResources"];
        }
        if (g["monitoring"] !== undefined) body["monitoring"] = g["monitoring"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["producerProjectId"] !== undefined) {
          body["producerProjectId"] = g["producerProjectId"];
        }
        if (g["publishing"] !== undefined) body["publishing"] = g["publishing"];
        if (g["quota"] !== undefined) body["quota"] = g["quota"];
        if (g["sourceInfo"] !== undefined) body["sourceInfo"] = g["sourceInfo"];
        if (g["systemParameters"] !== undefined) {
          body["systemParameters"] = g["systemParameters"];
        }
        if (g["systemTypes"] !== undefined) {
          body["systemTypes"] = g["systemTypes"];
        }
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["types"] !== undefined) body["types"] = g["types"];
        if (g["usage"] !== undefined) body["usage"] = g["usage"];
        if (g["name"] !== undefined) params["configId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "serviceName": String(g["serviceName"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a configs",
      arguments: z.object({
        identifier: z.string().describe("The name of the configs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["serviceName"] !== undefined) {
          params["serviceName"] = String(g["serviceName"]);
        }
        params["configId"] = args.identifier;
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
    sync: {
      description: "Sync configs state from GCP",
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
          if (g["serviceName"] !== undefined) {
            params["serviceName"] = String(g["serviceName"]);
          } else if (existing["serviceName"]) {
            params["serviceName"] = String(existing["serviceName"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["configId"] = identifier;
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
    submit: {
      description: "submit",
      arguments: z.object({
        configSource: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["serviceName"] !== undefined) {
          params["serviceName"] = String(g["serviceName"]);
        }
        const body: Record<string, unknown> = {};
        if (args["configSource"] !== undefined) {
          body["configSource"] = args["configSource"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "servicemanagement.services.configs.submit",
            "path": "v1/services/{serviceName}/configs:submit",
            "httpMethod": "POST",
            "parameterOrder": ["serviceName"],
            "parameters": {
              "serviceName": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
