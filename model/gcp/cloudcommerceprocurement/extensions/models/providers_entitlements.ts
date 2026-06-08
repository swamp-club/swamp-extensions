// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/cloudcommerceprocurement/providers-entitlements
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Commerce Partner Procurement Providers.Entitlements.
 *
 * Represents a procured product of a customer.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/entitlements/${shortName}`;
}

const BASE_URL = "https://cloudcommerceprocurement.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudcommerceprocurement.providers.entitlements.get",
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

const PATCH_CONFIG = {
  "id": "cloudcommerceprocurement.providers.entitlements.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "cloudcommerceprocurement.providers.entitlements.list",
  "path": "v1/{+parent}/entitlements",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  account: z.string().describe(
    "Output only. The resource name of the account that this entitlement is based on, if any.",
  ).optional(),
  cancellationReason: z.string().describe(
    'Output only. The reason the entitlement was cancelled. If this entitlement wasn\'t cancelled, this field is empty. Possible values include "unknown", "expired", "user-cancelled", "account-closed", "billing-disabled" (if the customer has manually disabled billing to their resources), "user-aborted", and "migrated" (if the entitlement has migrated across products). Values of this field are subject to change, and we recommend that you don\'t build your technical integration to rely on these fields.',
  ).optional(),
  consumers: z.array(z.object({
    project: z.string().describe("A project name with format `projects/`.")
      .optional(),
  })).describe(
    "Output only. The resources using this entitlement, if applicable.",
  ).optional(),
  createTime: z.string().describe("Output only. The creation timestamp.")
    .optional(),
  entitlementBenefitIds: z.array(z.string()).describe(
    "Output only. The entitlement benefit IDs associated with the purchase.",
  ).optional(),
  messageToUser: z.string().describe(
    "Provider-supplied message that is displayed to the end user. Currently this is used to communicate progress and ETA for provisioning. This field can be updated only when a user is waiting for an action from the provider, i.e. entitlement state is EntitlementState.ENTITLEMENT_ACTIVATION_REQUESTED or EntitlementState.ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL. This field is cleared automatically when the entitlement state changes.",
  ).optional(),
  name: z.string().describe(
    "Output only. The resource name of the entitlement. Entitlement names have the form `providers/{provider_id}/entitlements/{entitlement_id}`.",
  ).optional(),
  newOfferEndTime: z.string().describe(
    "Output only. The end time of the new offer, determined from the offer's specified end date. If the offer des not have a specified end date then this field is not set. This field is populated even if the entitlement isn't active yet. If there's no upcoming offer, the field is empty. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, ENTITLEMENT_ACTIVE, or ENTITLEMENT_PENDING_CANCELLATION, then this field is empty. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE, and the upcoming offer has a specified end date, then this field is populated with the expected end time of the upcoming offer, in the future. Otherwise, this field is empty. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is empty.",
  ).optional(),
  newOfferStartTime: z.string().describe(
    "Output only. The timestamp when the new offer becomes effective. This field is populated even if the entitlement isn't active yet. If there's no upcoming offer, the field is empty. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, this field isn't populated when the entitlement isn't yet approved. After the entitlement is approved, this field is populated with the effective time of the upcoming offer. * If the entitlement is in the state ENTITLEMENT_ACTIVE or ENTITLEMENT_PENDING_CANCELLATION, this field isn't populated. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL, this field isn't populated, because the entitlement change is waiting on approval. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE, this field is populated with the expected effective time of the upcoming offer, which is in the future. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is empty.",
  ).optional(),
  newPendingOffer: z.string().describe(
    "Output only. Upon a pending plan change, the name of the offer that the entitlement is switching to. Only exists if the pending plan change is moving to an offer. This field isn't populated for entitlements which aren't active yet. Format: 'projects/{project}/services/{service}/privateOffers/{offer}' OR 'projects/{project}/services/{service}/standardOffers/{offer}', depending on whether the offer is private or public. The {service} in the name is the listing service of the offer. It could be either the product service that the offer is referencing, or a generic private offer parent service. We recommend that you don't build your integration to rely on the meaning of this {service} part. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, ENTITLEMENT_ACTIVE or ENTITLEMENT_PENDING_CANCELLATION, then this field is empty. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE, then this field is populated with the upcoming offer. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this is empty.",
  ).optional(),
  newPendingOfferDuration: z.string().describe(
    "Output only. The duration of the new offer, in ISO 8601 duration format. This field is populated for pending offer changes. It isn't populated for entitlements which aren't active yet. If the offer has a specified end date instead of a duration, this field is empty. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, ENTITLEMENT_ACTIVE, or ENTITLEMENT_PENDING_CANCELLATION, this field is empty. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE, and the upcoming offer doesn't have a specified end date, then this field is populated with the duration of the upcoming offer. Otherwise, this field is empty. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is empty.",
  ).optional(),
  newPendingPlan: z.string().describe(
    "Output only. The identifier of the pending new plan. Required if the product has plans and the entitlement has a pending plan change.",
  ).optional(),
  offer: z.string().describe(
    "Output only. The name of the offer that was procured. Field is empty if order wasn't made using an offer. Format: 'projects/{project}/services/{service}/privateOffers/{offer}' OR 'projects/{project}/services/{service}/standardOffers/{offer}', depending on whether the offer is private or public. The {service} in the name is the listing service of the offer. It could be either the product service that the offer is referencing, or a generic private offer parent service. We recommend that you don't build your integration to rely on the meaning of this {service} part. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, this field is populated with the upcoming offer. * If the entitlement is in the state ENTITLEMENT_ACTIVE, ENTITLEMENT_PENDING_CANCELLATION, ENTITLEMENT_PENDING_PLAN_CHANGE, or ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL, this field is populated with the current offer. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is populated with the latest offer that the order was associated with.",
  ).optional(),
  offerDuration: z.string().describe(
    "Output only. The offer duration of the current offer, in ISO 8601 duration format. This is empty if the entitlement wasn't made using an offer, or if the offer has a specified end date instead of a duration. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, and the upcoming offer doesn't have a specified end date, then this field is populated with the duration of the upcoming offer. Otherwise, this field is empty. * If the entitlement is in the state ENTITLEMENT_ACTIVE, ENTITLEMENT_PENDING_CANCELLATION, ENTITLEMENT_PENDING_PLAN_CHANGE, or ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL, and the current offer doesn't have a specified end date, then this field contains the duration of the current offer. Otherwise, this field is empty. * If the entitlement is in the state ENTITLEMENT_CANCELLED, and the offer doesn't have a specified end date, then this field is populated with the duration of the latest offer that the order was associated with. Otherwise, this field is empty.",
  ).optional(),
  offerEndTime: z.string().describe(
    "Output only. End time for the current term of the Offer associated with this entitlement. The value of this field can change naturally over time due to auto-renewal, even if the offer isn't changed. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, then: * If the entitlement isn't approved yet approved, and the offer has a specified end date, then this field is populated with the expected end time of the upcoming offer, in the future. Otherwise, this field is empty. * If the entitlement is approved, then this field is populated with the expected end time of the upcoming offer, in the future. This means that this field and the field offer_duration can both exist. * If the entitlement is in the state ENTITLEMENT_ACTIVE or ENTITLEMENT_PENDING_CANCELLATION, then this field is populated with the expected end time of the current offer, in the future. This field's value is set regardless of whether the offer has a specific end date or a duration. This means that this field and the field offer_duration can both exist. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE: * If the entitlement's pricing model is usage based and the associated offer is a private offer whose term has ended, then this field reflects the ACTUAL end time of the entitlement's associated offer (in the past), even though the entitlement associated with this private offer does not terminate at the end of that private offer's term. * Otherwise, this is the expected end date of the current offer, in the future. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is populated with the end time, in the past, of the latest offer that the order was associated with. If the entitlement was cancelled before any offer started, then this field is empty.",
  ).optional(),
  orderId: z.string().describe(
    "Output only. The order ID of this entitlement, without any `orders/` resource name prefix.",
  ).optional(),
  plan: z.string().describe(
    "Output only. The identifier of the plan that was procured. Required if the product has plans.",
  ).optional(),
  productExternalName: z.string().describe(
    "Output only. The identifier of the product that was procured.",
  ).optional(),
  provider: z.string().describe(
    "Output only. The identifier of the service provider that this entitlement was created against. Each service provider is assigned a unique provider value when they onboard with Cloud Commerce platform.",
  ).optional(),
  quoteExternalName: z.string().describe(
    "Output only. The identifier of the quote that was used to procure. Empty if the order is not purchased using a quote.",
  ).optional(),
  state: z.enum([
    "ENTITLEMENT_STATE_UNSPECIFIED",
    "ENTITLEMENT_ACTIVATION_REQUESTED",
    "ENTITLEMENT_ACTIVE",
    "ENTITLEMENT_PENDING_CANCELLATION",
    "ENTITLEMENT_CANCELLED",
    "ENTITLEMENT_PENDING_PLAN_CHANGE",
    "ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL",
    "ENTITLEMENT_SUSPENDED",
  ]).describe("Output only. The state of the entitlement.").optional(),
  subscriptionEndTime: z.string().describe(
    "Output only. End time for the subscription corresponding to this entitlement.",
  ).optional(),
  updateTime: z.string().describe("Output only. The last update timestamp.")
    .optional(),
  usageReportingId: z.string().describe(
    "Output only. The consumerId to use when reporting usage through the Service Control API. See the consumerId field at [Reporting Metrics](https://cloud.google.com/service-control/reporting-metrics) for more details. This field is present only if the product has usage-based billing configured.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  account: z.string().optional(),
  cancellationReason: z.string().optional(),
  consumers: z.array(z.object({
    project: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  entitlementBenefitIds: z.array(z.string()).optional(),
  inputProperties: z.record(z.string(), z.unknown()).optional(),
  messageToUser: z.string().optional(),
  name: z.string(),
  newOfferEndTime: z.string().optional(),
  newOfferStartTime: z.string().optional(),
  newPendingOffer: z.string().optional(),
  newPendingOfferDuration: z.string().optional(),
  newPendingPlan: z.string().optional(),
  offer: z.string().optional(),
  offerDuration: z.string().optional(),
  offerEndTime: z.string().optional(),
  orderId: z.string().optional(),
  plan: z.string().optional(),
  product: z.string().optional(),
  productExternalName: z.string().optional(),
  provider: z.string().optional(),
  quoteExternalName: z.string().optional(),
  state: z.string().optional(),
  subscriptionEndTime: z.string().optional(),
  updateTime: z.string().optional(),
  usageReportingId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  account: z.string().describe(
    "Output only. The resource name of the account that this entitlement is based on, if any.",
  ).optional(),
  cancellationReason: z.string().describe(
    'Output only. The reason the entitlement was cancelled. If this entitlement wasn\'t cancelled, this field is empty. Possible values include "unknown", "expired", "user-cancelled", "account-closed", "billing-disabled" (if the customer has manually disabled billing to their resources), "user-aborted", and "migrated" (if the entitlement has migrated across products). Values of this field are subject to change, and we recommend that you don\'t build your technical integration to rely on these fields.',
  ).optional(),
  consumers: z.array(z.object({
    project: z.string().describe("A project name with format `projects/`.")
      .optional(),
  })).describe(
    "Output only. The resources using this entitlement, if applicable.",
  ).optional(),
  createTime: z.string().describe("Output only. The creation timestamp.")
    .optional(),
  entitlementBenefitIds: z.array(z.string()).describe(
    "Output only. The entitlement benefit IDs associated with the purchase.",
  ).optional(),
  messageToUser: z.string().describe(
    "Provider-supplied message that is displayed to the end user. Currently this is used to communicate progress and ETA for provisioning. This field can be updated only when a user is waiting for an action from the provider, i.e. entitlement state is EntitlementState.ENTITLEMENT_ACTIVATION_REQUESTED or EntitlementState.ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL. This field is cleared automatically when the entitlement state changes.",
  ).optional(),
  name: z.string().describe(
    "Output only. The resource name of the entitlement. Entitlement names have the form `providers/{provider_id}/entitlements/{entitlement_id}`.",
  ).optional(),
  newOfferEndTime: z.string().describe(
    "Output only. The end time of the new offer, determined from the offer's specified end date. If the offer des not have a specified end date then this field is not set. This field is populated even if the entitlement isn't active yet. If there's no upcoming offer, the field is empty. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, ENTITLEMENT_ACTIVE, or ENTITLEMENT_PENDING_CANCELLATION, then this field is empty. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE, and the upcoming offer has a specified end date, then this field is populated with the expected end time of the upcoming offer, in the future. Otherwise, this field is empty. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is empty.",
  ).optional(),
  newOfferStartTime: z.string().describe(
    "Output only. The timestamp when the new offer becomes effective. This field is populated even if the entitlement isn't active yet. If there's no upcoming offer, the field is empty. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, this field isn't populated when the entitlement isn't yet approved. After the entitlement is approved, this field is populated with the effective time of the upcoming offer. * If the entitlement is in the state ENTITLEMENT_ACTIVE or ENTITLEMENT_PENDING_CANCELLATION, this field isn't populated. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL, this field isn't populated, because the entitlement change is waiting on approval. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE, this field is populated with the expected effective time of the upcoming offer, which is in the future. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is empty.",
  ).optional(),
  newPendingOffer: z.string().describe(
    "Output only. Upon a pending plan change, the name of the offer that the entitlement is switching to. Only exists if the pending plan change is moving to an offer. This field isn't populated for entitlements which aren't active yet. Format: 'projects/{project}/services/{service}/privateOffers/{offer}' OR 'projects/{project}/services/{service}/standardOffers/{offer}', depending on whether the offer is private or public. The {service} in the name is the listing service of the offer. It could be either the product service that the offer is referencing, or a generic private offer parent service. We recommend that you don't build your integration to rely on the meaning of this {service} part. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, ENTITLEMENT_ACTIVE or ENTITLEMENT_PENDING_CANCELLATION, then this field is empty. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE, then this field is populated with the upcoming offer. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this is empty.",
  ).optional(),
  newPendingOfferDuration: z.string().describe(
    "Output only. The duration of the new offer, in ISO 8601 duration format. This field is populated for pending offer changes. It isn't populated for entitlements which aren't active yet. If the offer has a specified end date instead of a duration, this field is empty. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, ENTITLEMENT_ACTIVE, or ENTITLEMENT_PENDING_CANCELLATION, this field is empty. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE, and the upcoming offer doesn't have a specified end date, then this field is populated with the duration of the upcoming offer. Otherwise, this field is empty. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is empty.",
  ).optional(),
  newPendingPlan: z.string().describe(
    "Output only. The identifier of the pending new plan. Required if the product has plans and the entitlement has a pending plan change.",
  ).optional(),
  offer: z.string().describe(
    "Output only. The name of the offer that was procured. Field is empty if order wasn't made using an offer. Format: 'projects/{project}/services/{service}/privateOffers/{offer}' OR 'projects/{project}/services/{service}/standardOffers/{offer}', depending on whether the offer is private or public. The {service} in the name is the listing service of the offer. It could be either the product service that the offer is referencing, or a generic private offer parent service. We recommend that you don't build your integration to rely on the meaning of this {service} part. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, this field is populated with the upcoming offer. * If the entitlement is in the state ENTITLEMENT_ACTIVE, ENTITLEMENT_PENDING_CANCELLATION, ENTITLEMENT_PENDING_PLAN_CHANGE, or ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL, this field is populated with the current offer. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is populated with the latest offer that the order was associated with.",
  ).optional(),
  offerDuration: z.string().describe(
    "Output only. The offer duration of the current offer, in ISO 8601 duration format. This is empty if the entitlement wasn't made using an offer, or if the offer has a specified end date instead of a duration. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, and the upcoming offer doesn't have a specified end date, then this field is populated with the duration of the upcoming offer. Otherwise, this field is empty. * If the entitlement is in the state ENTITLEMENT_ACTIVE, ENTITLEMENT_PENDING_CANCELLATION, ENTITLEMENT_PENDING_PLAN_CHANGE, or ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL, and the current offer doesn't have a specified end date, then this field contains the duration of the current offer. Otherwise, this field is empty. * If the entitlement is in the state ENTITLEMENT_CANCELLED, and the offer doesn't have a specified end date, then this field is populated with the duration of the latest offer that the order was associated with. Otherwise, this field is empty.",
  ).optional(),
  offerEndTime: z.string().describe(
    "Output only. End time for the current term of the Offer associated with this entitlement. The value of this field can change naturally over time due to auto-renewal, even if the offer isn't changed. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, then: * If the entitlement isn't approved yet approved, and the offer has a specified end date, then this field is populated with the expected end time of the upcoming offer, in the future. Otherwise, this field is empty. * If the entitlement is approved, then this field is populated with the expected end time of the upcoming offer, in the future. This means that this field and the field offer_duration can both exist. * If the entitlement is in the state ENTITLEMENT_ACTIVE or ENTITLEMENT_PENDING_CANCELLATION, then this field is populated with the expected end time of the current offer, in the future. This field's value is set regardless of whether the offer has a specific end date or a duration. This means that this field and the field offer_duration can both exist. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE: * If the entitlement's pricing model is usage based and the associated offer is a private offer whose term has ended, then this field reflects the ACTUAL end time of the entitlement's associated offer (in the past), even though the entitlement associated with this private offer does not terminate at the end of that private offer's term. * Otherwise, this is the expected end date of the current offer, in the future. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is populated with the end time, in the past, of the latest offer that the order was associated with. If the entitlement was cancelled before any offer started, then this field is empty.",
  ).optional(),
  orderId: z.string().describe(
    "Output only. The order ID of this entitlement, without any `orders/` resource name prefix.",
  ).optional(),
  plan: z.string().describe(
    "Output only. The identifier of the plan that was procured. Required if the product has plans.",
  ).optional(),
  productExternalName: z.string().describe(
    "Output only. The identifier of the product that was procured.",
  ).optional(),
  provider: z.string().describe(
    "Output only. The identifier of the service provider that this entitlement was created against. Each service provider is assigned a unique provider value when they onboard with Cloud Commerce platform.",
  ).optional(),
  quoteExternalName: z.string().describe(
    "Output only. The identifier of the quote that was used to procure. Empty if the order is not purchased using a quote.",
  ).optional(),
  state: z.enum([
    "ENTITLEMENT_STATE_UNSPECIFIED",
    "ENTITLEMENT_ACTIVATION_REQUESTED",
    "ENTITLEMENT_ACTIVE",
    "ENTITLEMENT_PENDING_CANCELLATION",
    "ENTITLEMENT_CANCELLED",
    "ENTITLEMENT_PENDING_PLAN_CHANGE",
    "ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL",
    "ENTITLEMENT_SUSPENDED",
  ]).describe("Output only. The state of the entitlement.").optional(),
  subscriptionEndTime: z.string().describe(
    "Output only. End time for the subscription corresponding to this entitlement.",
  ).optional(),
  updateTime: z.string().describe("Output only. The last update timestamp.")
    .optional(),
  usageReportingId: z.string().describe(
    "Output only. The consumerId to use when reporting usage through the Service Control API. See the consumerId field at [Reporting Metrics](https://cloud.google.com/service-control/reporting-metrics) for more details. This field is present only if the product has usage-based billing configured.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Commerce Partner Procurement Providers.Entitlements. Registered at `@swamp/gcp/cloudcommerceprocurement/providers-entitlements`. */
export const model = {
  type: "@swamp/gcp/cloudcommerceprocurement/providers-entitlements",
  version: "2026.06.08.1",
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
      toVersion: "2026.04.23.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a procured product of a customer.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a entitlements",
      arguments: z.object({
        identifier: z.string().describe("The name of the entitlements"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
    update: {
      description: "Update entitlements attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["account"] !== undefined) body["account"] = g["account"];
        if (g["cancellationReason"] !== undefined) {
          body["cancellationReason"] = g["cancellationReason"];
        }
        if (g["consumers"] !== undefined) body["consumers"] = g["consumers"];
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["entitlementBenefitIds"] !== undefined) {
          body["entitlementBenefitIds"] = g["entitlementBenefitIds"];
        }
        if (g["messageToUser"] !== undefined) {
          body["messageToUser"] = g["messageToUser"];
        }
        if (g["newOfferEndTime"] !== undefined) {
          body["newOfferEndTime"] = g["newOfferEndTime"];
        }
        if (g["newOfferStartTime"] !== undefined) {
          body["newOfferStartTime"] = g["newOfferStartTime"];
        }
        if (g["newPendingOffer"] !== undefined) {
          body["newPendingOffer"] = g["newPendingOffer"];
        }
        if (g["newPendingOfferDuration"] !== undefined) {
          body["newPendingOfferDuration"] = g["newPendingOfferDuration"];
        }
        if (g["newPendingPlan"] !== undefined) {
          body["newPendingPlan"] = g["newPendingPlan"];
        }
        if (g["offer"] !== undefined) body["offer"] = g["offer"];
        if (g["offerDuration"] !== undefined) {
          body["offerDuration"] = g["offerDuration"];
        }
        if (g["offerEndTime"] !== undefined) {
          body["offerEndTime"] = g["offerEndTime"];
        }
        if (g["orderId"] !== undefined) body["orderId"] = g["orderId"];
        if (g["plan"] !== undefined) body["plan"] = g["plan"];
        if (g["productExternalName"] !== undefined) {
          body["productExternalName"] = g["productExternalName"];
        }
        if (g["provider"] !== undefined) body["provider"] = g["provider"];
        if (g["quoteExternalName"] !== undefined) {
          body["quoteExternalName"] = g["quoteExternalName"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["subscriptionEndTime"] !== undefined) {
          body["subscriptionEndTime"] = g["subscriptionEndTime"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["usageReportingId"] !== undefined) {
          body["usageReportingId"] = g["usageReportingId"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          credentials,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync entitlements state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            String(g["parent"] ?? ""),
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
            credentials,
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
    list: {
      description: "List entitlements resources",
      arguments: z.object({
        filter: z.string().describe(
          'The filter that can be used to limit the list request. The filter is a query string that can match a selected set of attributes with string values. For example `account=E-1234-5678-ABCD-EFGH`, `state=pending_cancellation`, and `plan!=foo-plan`. Supported query attributes are * `account` * `customer_billing_account` with value in the format of: `billingAccounts/{id}` * `product_external_name` * `quote_external_name` * `offer` * `new_pending_offer` * `plan` * `newPendingPlan` or `new_pending_plan` * `state` * `services` * `consumers.project` * `change_history.new_offer` Note that the consumers and change_history.new_offer match works on repeated structures, so equality (`consumers.project=projects/123456789`) is not supported. Set membership can be expressed with the `:` operator. For example, `consumers.project:projects/123456789` finds entitlements with at least one consumer with project field equal to `projects/123456789`. `change_history.new_offer` retrieves all entitlements that were once associated or are currently active with the offer. Also note that the state name match is case-insensitive and query can omit the prefix "ENTITLEMENT_". For example, `state=active` is equivalent to `state=ENTITLEMENT_ACTIVE`. If the query contains some special characters other than letters, underscore, or digits, the phrase must be quoted with double quotes. For example, `product="providerId:productId"`, where the product name needs to be quoted because it contains special character colon. Queries can be combined with `AND`, `OR`, and `NOT` to form more complex queries. They can also be grouped to force a desired evaluation order. For example, `state=active AND (account=E-1234 OR account=5678) AND NOT (product=foo-product)`. Connective `AND` can be omitted between two predicates. For example `account=E-1234 state=active` is equivalent to `account=E-1234 AND state=active`.',
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of entries that are requested. The default page size is 200.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "entitlements",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
    approve: {
      description: "approve",
      arguments: z.object({
        entitlementMigrated: z.any().optional(),
        properties: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["entitlementMigrated"] !== undefined) {
          body["entitlementMigrated"] = args["entitlementMigrated"];
        }
        if (args["properties"] !== undefined) {
          body["properties"] = args["properties"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudcommerceprocurement.providers.entitlements.approve",
            "path": "v1/{+name}:approve",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    approve_plan_change: {
      description: "approve plan change",
      arguments: z.object({
        pendingPlanName: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["pendingPlanName"] !== undefined) {
          body["pendingPlanName"] = args["pendingPlanName"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudcommerceprocurement.providers.entitlements.approvePlanChange",
            "path": "v1/{+name}:approvePlanChange",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    reject: {
      description: "reject",
      arguments: z.object({
        reason: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["reason"] !== undefined) body["reason"] = args["reason"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudcommerceprocurement.providers.entitlements.reject",
            "path": "v1/{+name}:reject",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    reject_plan_change: {
      description: "reject plan change",
      arguments: z.object({
        pendingPlanName: z.any().optional(),
        reason: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["pendingPlanName"] !== undefined) {
          body["pendingPlanName"] = args["pendingPlanName"];
        }
        if (args["reason"] !== undefined) body["reason"] = args["reason"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudcommerceprocurement.providers.entitlements.rejectPlanChange",
            "path": "v1/{+name}:rejectPlanChange",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    suspend: {
      description: "suspend",
      arguments: z.object({
        reason: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["reason"] !== undefined) body["reason"] = args["reason"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudcommerceprocurement.providers.entitlements.suspend",
            "path": "v1/{+name}:suspend",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
