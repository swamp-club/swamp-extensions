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

// Auto-generated extension model for @swamp/cloudflare/waiting-rooms/waiting-rooms
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Waiting Rooms.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  zone_id: z.string().describe("Cloudflare zone ID"),
  additional_routes: z.array(z.object({
    host: z.string().optional(),
    path: z.string().optional(),
  })).describe(
    "Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. The hostname and path combination must be unique to this and all other waiting rooms.",
  ).optional(),
  cookie_attributes: z.object({
    samesite: z.enum(["auto", "lax", "none", "strict"]).optional(),
    secure: z.enum(["auto", "always", "never"]).optional(),
  }).describe(
    "Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position.",
  ).optional(),
  cookie_suffix: z.string().describe(
    "Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is \"abcd\", the cookie name will be `__cf_waitingroom_abcd`. This field is required if using `additional_routes`.",
  ).optional(),
  custom_page_html: z.string().describe(
    "Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:\n1. {{`waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue_all is **true**.\n2. {{`waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:\n3. {{`waitTime`}} Number of minutes of estimated wait for a user.\n4. {{`waitTimeHours`}} Number of hours of estimated wait for a user (`Math.floor(waitTime/60)`).\n5. {{`waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value (`waitTime%60`).\n6. {{`queueIsFull`}} Changes to **true** when no more people can be added to the queue.\n\nTo view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.",
  ).optional(),
  default_template_language: z.enum([
    "en-US",
    "es-ES",
    "de-DE",
    "fr-FR",
    "it-IT",
    "ja-JP",
    "ko-KR",
    "pt-BR",
    "zh-CN",
    "zh-TW",
    "nl-NL",
    "pl-PL",
    "id-ID",
    "tr-TR",
    "ar-EG",
    "ru-RU",
    "fa-IR",
    "bg-BG",
    "hr-HR",
    "cs-CZ",
    "da-DK",
    "fi-FI",
    "lt-LT",
    "ms-MY",
    "nb-NO",
    "ro-RO",
    "el-GR",
    "he-IL",
    "hi-IN",
    "hu-HU",
    "sr-BA",
    "sk-SK",
    "sl-SI",
    "sv-SE",
    "tl-PH",
    "th-TH",
    "uk-UA",
    "vi-VN",
  ]).describe(
    "The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.",
  ).optional(),
  description: z.string().describe(
    "A note that you can use to add more details about the waiting room.",
  ).optional(),
  disable_session_renewal: z.boolean().describe(
    "Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, they will have to go through the waiting room again. If `false`, a user's session cookie will be automatically renewed on every request.",
  ).optional(),
  enabled_origin_commands: z.array(z.enum(["revoke"])).describe(
    "A list of enabled origin commands.",
  ).optional(),
  host: z.string().describe(
    "The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique.",
  ),
  json_response_enabled: z.boolean().describe(
    'Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on the user\'s status in the waiting room as opposed to the configured static HTML page. This JSON response object has one property `cfWaitingRoom` which is an object containing the following fields:\n1. `inWaitingRoom`: Boolean indicating if the user is in the waiting room (always **true**).\n2. `waitTimeKnown`: Boolean indicating if the current estimated wait times are accurate. If **false**, they are not available.\n3. `waitTime`: Valid only when `waitTimeKnown` is **true**. Integer indicating the current estimated time in minutes the user will wait in the waiting room. When `queueingMethod` is **random**, this is set to `waitTime50Percentile`.\n4. `waitTime25Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 25% of users that gain entry the fastest (25th percentile).\n5. `waitTime50Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 50% of users that gain entry the fastest (50th percentile). In other words, half of the queued users are expected to let into the origin website before `waitTime50Percentile` and half are expected to be let in after it.\n6. `waitTime75Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 75% of users that gain entry the fastest (75th percentile).\n7. `waitTimeFormatted`: String displaying the `waitTime` formatted in English for users. If `waitTimeKnown` is **false**, `waitTimeFormatted` will display **unavailable**.\n8. `queueIsFull`: Boolean indicating if the waiting room\'s queue is currently full and not accepting new users at the moment.\n9. `queueAll`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website.\n10. `lastUpdated`: String displaying the timestamp as an ISO 8601 string of the user\'s last attempt to leave the waiting room and be let into the origin website. The user is able to make another attempt after `refreshIntervalSeconds` past this time. If the user makes a request too soon, it will be ignored and `lastUpdated` will not change.\n11. `refreshIntervalSeconds`: Integer indicating the number of seconds after `lastUpdated` until the user is able to make another attempt to leave the waiting room and be let into the origin website. When the `queueingMethod` is `reject`, there is no specified refresh time —\\_it will always be **zero**.\n12. `queueingMethod`: The queueing method currently used by the waiting room. It is either **fifo**, **random**, **passthrough**, or **reject**.\n13. `isFIFOQueue`: Boolean indicating if the waiting room uses a FIFO (First-In-First-Out) queue.\n14. `isRandomQueue`: Boolean indicating if the waiting room uses a Random queue where users gain access randomly.\n15. `isPassthroughQueue`: Boolean indicating if the waiting room uses a passthrough queue. Keep in mind that when passthrough is enabled, this JSON response will only exist when `queueAll` is **true** or `isEventPrequeueing` is **true** because in all other cases requests will go directly to the origin.\n16. `isRejectQueue`: Boolean indicating if the waiting room uses a reject queue.\n17. `isEventActive`: Boolean indicating if an event is currently occurring. Events are able to change a waiting room\'s behavior during a specified period of time. For additional information, look at the event properties `prequeue_start_time`, `event_start_time`, and `event_end_time` in the documentation for creating waiting room events. Events are considered active between these start and end times, as well as during the prequeueing period if it exists.\n18. `isEventPrequeueing`: Valid only when `isEventActive` is **true**. Boolean indicating if an event is currently prequeueing users before it starts.\n19. `timeUntilEventStart`: Valid only when `isEventPrequeueing` is **true**. Integer indicating the number of minutes until the event starts.\n20. `timeUntilEventStartFormatted`: String displaying the `timeUntilEventStart` formatted in English for users. If `isEventPrequeueing` is **false**, `timeUntilEventStartFormatted` will display **unavailable**.\n21. `timeUntilEventEnd`: Valid only when `isEventActive` is **true**. Integer indicating the number of minutes until the event ends.\n22. `timeUntilEventEndFormatted`: String displaying the `timeUntilEventEnd` formatted in English for users. If `isEventActive` is **false**, `timeUntilEventEndFormatted` will display **unavailable**.\n23. `shuffleAtEventStart`: Valid only when `isEventActive` is **true**. Boolean indicating if the users in the prequeue are shuffled randomly when the event starts.\n24. `turnstile`: Empty when turnstile isn\'t enabled. String displaying an html tag to display the Turnstile widget. Please add the `{{{turnstile}}}` tag to the `custom_html` template to ensure the Turnstile widget appears.\n25. `infiniteQueue`: Boolean indicating whether the response is for a user in the infinite queue.\n\nAn example cURL to a waiting room could be:\n\n\tcurl -X GET "https://example.com/waitingroom" \\\n\t\t-H "Accept: application/json"\n\nIf `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **fifo** and no event is active could be:\n\n\t{\n\t\t"cfWaitingRoom": {\n\t\t\t"inWaitingRoom": true,\n\t\t\t"waitTimeKnown": true,\n\t\t\t"waitTime": 10,\n\t\t\t"waitTime25Percentile": 0,\n\t\t\t"waitTime50Percentile": 0,\n\t\t\t"waitTime75Percentile": 0,\n\t\t\t"waitTimeFormatted": "10 minutes",\n\t\t\t"queueIsFull": false,\n\t\t\t"queueAll": false,\n\t\t\t"lastUpdated": "2020-08-03T23:46:00.000Z",\n\t\t\t"refreshIntervalSeconds": 20,\n\t\t\t"queueingMethod": "fifo",\n\t\t\t"isFIFOQueue": true,\n\t\t\t"isRandomQueue": false,\n\t\t\t"isPassthroughQueue": false,\n\t\t\t"isRejectQueue": false,\n\t\t\t"isEventActive": false,\n\t\t\t"isEventPrequeueing": false,\n\t\t\t"timeUntilEventStart": 0,\n\t\t\t"timeUntilEventStartFormatted": "unavailable",\n\t\t\t"timeUntilEventEnd": 0,\n\t\t\t"timeUntilEventEndFormatted": "unavailable",\n\t\t\t"shuffleAtEventStart": false\n\t\t}\n\t}\n\nIf `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **random** and an event is active could be:\n\n\t{\n\t\t"cfWaitingRoom": {\n\t\t\t"inWaitingRoom": true,\n\t\t\t"waitTimeKnown": true,\n\t\t\t"waitTime": 10,\n\t\t\t"waitTime25Percentile": 5,\n\t\t\t"waitTime50Percentile": 10,\n\t\t\t"waitTime75Percentile": 15,\n\t\t\t"waitTimeFormatted": "5 minutes to 15 minutes",\n\t\t\t"queueIsFull": false,\n\t\t\t"queueAll": false,\n\t\t\t"lastUpdated": "2020-08-03T23:46:00.000Z",\n\t\t\t"refreshIntervalSeconds": 20,\n\t\t\t"queueingMethod": "random",\n\t\t\t"isFIFOQueue": false,\n\t\t\t"isRandomQueue": true,\n\t\t\t"isPassthroughQueue": false,\n\t\t\t"isRejectQueue": false,\n\t\t\t"isEventActive": true,\n\t\t\t"isEventPrequeueing": false,\n\t\t\t"timeUntilEventStart": 0,\n\t\t\t"timeUntilEventStartFormatted": "unavailable",\n\t\t\t"timeUntilEventEnd": 15,\n\t\t\t"timeUntilEventEndFormatted": "15 minutes",\n\t\t\t"shuffleAtEventStart": true\n\t\t}\n\t}',
  ).optional(),
  name: z.string().describe(
    "A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.",
  ),
  new_users_per_minute: z.number().int().min(200).max(2147483647).describe(
    "Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little more or little less traffic coming to the route based on the traffic patterns at that time around the world.",
  ),
  path: z.string().describe(
    "Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.",
  ).optional(),
  queue_all: z.boolean().describe(
    "If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailable.",
  ).optional(),
  queueing_method: z.enum(["fifo", "random", "passthrough", "reject"]).describe(
    "Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing method, if `queue_all` is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically. The valid queueing methods are:\n1. `fifo` **(default)**: First-In-First-Out queue where customers gain access in the order they arrived.\n2. `random`: Random queue where customers gain access randomly, regardless of arrival time.\n3. `passthrough`: Users will pass directly through the waiting room and into the origin website. As a result, any configured limits will not be respected while this is enabled. This method can be used as an alternative to disabling a waiting room (with `suspended`) so that analytics are still reported. This can be used if you wish to allow all traffic normally, but want to restrict traffic during a waiting room event, or vice versa.\n4. `reject`: Users will be immediately rejected from the waiting room. As a result, no users will reach the origin website while this is enabled. This can be used if you wish to reject all traffic while performing maintenance, block traffic during a specified period of time (an event), or block traffic while events are not occurring. Consider a waiting room used for vaccine distribution that only allows traffic during sign-up events, and otherwise blocks all traffic. For this case, the waiting room uses `reject`, and its events override this with `fifo`, `random`, or `passthrough`. When this queueing method is enabled and neither `queueAll` is enabled nor an event is prequeueing, the waiting room page **will not refresh automatically**.",
  ).optional(),
  queueing_status_code: z.union([
    z.literal(200),
    z.literal(202),
    z.literal(429),
  ]).describe("HTTP status code returned to a user while in the queue.")
    .optional(),
  session_duration: z.number().int().min(1).max(30).describe(
    "Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits the route.",
  ).optional(),
  suspended: z.boolean().describe(
    "Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.",
  ).optional(),
  total_active_users: z.number().int().min(200).max(2147483647).describe(
    "Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the total number of active user sessions on the route. It is possible to have a situation where there are more or less active users sessions on the route based on the traffic patterns at that time around the world.",
  ),
  turnstile_action: z.enum(["log", "infinite_queue"]).describe(
    "Which action to take when a bot is detected using Turnstile. `log` will\nhave no impact on queueing behavior, simply keeping track of how many\nbots are detected in Waiting Room Analytics. `infinite_queue` will send\nbots to a false queueing state, where they will never reach your\norigin. `infinite_queue` requires Advanced Waiting Room.\n",
  ).optional(),
  turnstile_mode: z.enum([
    "off",
    "invisible",
    "visible_non_interactive",
    "visible_managed",
  ]).describe(
    "Which Turnstile widget type to use for detecting bot traffic. See\n[the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types)\nfor the definitions of these widget types. Set to `off` to disable the\nTurnstile integration entirely. Setting this to anything other than\n`off` or `invisible` requires Advanced Waiting Room.\n",
  ).optional(),
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API key for the legacy key+email auth path; overrides the CLOUDFLARE_API_KEY environment variable. Wire with a vault.get(...) expression. Requires email.",
  ).optional(),
  email: z.string().meta({ sensitive: true }).describe(
    "Cloudflare account email for the legacy key+email auth path; overrides the CLOUDFLARE_EMAIL environment variable. Requires apiKey.",
  ).optional(),
});

const ResourceSchema = z.object({
  additional_routes: z.array(z.object({
    host: z.string().optional(),
    path: z.string().optional(),
  })).optional(),
  cookie_attributes: z.object({
    samesite: z.string().optional(),
    secure: z.string().optional(),
  }).optional(),
  cookie_suffix: z.string().optional(),
  created_on: z.string().optional(),
  custom_page_html: z.string().optional(),
  default_template_language: z.string().optional(),
  description: z.string().optional(),
  disable_session_renewal: z.boolean().optional(),
  enabled_origin_commands: z.array(z.string()).optional(),
  host: z.string().optional(),
  id: z.string(),
  json_response_enabled: z.boolean().optional(),
  modified_on: z.string().optional(),
  name: z.string().optional(),
  new_users_per_minute: z.number().optional(),
  next_event_prequeue_start_time: z.string().optional(),
  next_event_start_time: z.string().optional(),
  path: z.string().optional(),
  queue_all: z.boolean().optional(),
  queueing_method: z.string().optional(),
  queueing_status_code: z.number().optional(),
  session_duration: z.number().optional(),
  suspended: z.boolean().optional(),
  total_active_users: z.number().optional(),
  turnstile_action: z.string().optional(),
  turnstile_mode: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  additional_routes: z.array(z.object({
    host: z.string().optional(),
    path: z.string().optional(),
  })).optional(),
  cookie_attributes: z.object({
    samesite: z.enum(["auto", "lax", "none", "strict"]).optional(),
    secure: z.enum(["auto", "always", "never"]).optional(),
  }).optional(),
  cookie_suffix: z.string().optional(),
  custom_page_html: z.string().optional(),
  default_template_language: z.enum([
    "en-US",
    "es-ES",
    "de-DE",
    "fr-FR",
    "it-IT",
    "ja-JP",
    "ko-KR",
    "pt-BR",
    "zh-CN",
    "zh-TW",
    "nl-NL",
    "pl-PL",
    "id-ID",
    "tr-TR",
    "ar-EG",
    "ru-RU",
    "fa-IR",
    "bg-BG",
    "hr-HR",
    "cs-CZ",
    "da-DK",
    "fi-FI",
    "lt-LT",
    "ms-MY",
    "nb-NO",
    "ro-RO",
    "el-GR",
    "he-IL",
    "hi-IN",
    "hu-HU",
    "sr-BA",
    "sk-SK",
    "sl-SI",
    "sv-SE",
    "tl-PH",
    "th-TH",
    "uk-UA",
    "vi-VN",
  ]).optional(),
  description: z.string().optional(),
  disable_session_renewal: z.boolean().optional(),
  enabled_origin_commands: z.array(z.enum(["revoke"])).optional(),
  host: z.string().optional(),
  json_response_enabled: z.boolean().optional(),
  name: z.string().optional(),
  new_users_per_minute: z.number().int().min(200).max(2147483647).optional(),
  path: z.string().optional(),
  queue_all: z.boolean().optional(),
  queueing_method: z.enum(["fifo", "random", "passthrough", "reject"])
    .optional(),
  queueing_status_code: z.union([
    z.literal(200),
    z.literal(202),
    z.literal(429),
  ]).optional(),
  session_duration: z.number().int().min(1).max(30).optional(),
  suspended: z.boolean().optional(),
  total_active_users: z.number().int().min(200).max(2147483647).optional(),
  turnstile_action: z.enum(["log", "infinite_queue"]).optional(),
  turnstile_mode: z.enum([
    "off",
    "invisible",
    "visible_non_interactive",
    "visible_managed",
  ]).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Waiting Rooms. Registered at `@swamp/cloudflare/waiting-rooms/waiting-rooms`. */
export const model = {
  type: "@swamp/cloudflare/waiting-rooms/waiting-rooms",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
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
      description: "Waiting Rooms resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Waiting Rooms",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/waiting_rooms";
        const body: Record<string, unknown> = {};
        if (g.additional_routes !== undefined) {
          body.additional_routes = g.additional_routes;
        }
        if (g.cookie_attributes !== undefined) {
          body.cookie_attributes = g.cookie_attributes;
        }
        if (g.cookie_suffix !== undefined) body.cookie_suffix = g.cookie_suffix;
        if (g.custom_page_html !== undefined) {
          body.custom_page_html = g.custom_page_html;
        }
        if (g.default_template_language !== undefined) {
          body.default_template_language = g.default_template_language;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.disable_session_renewal !== undefined) {
          body.disable_session_renewal = g.disable_session_renewal;
        }
        if (g.enabled_origin_commands !== undefined) {
          body.enabled_origin_commands = g.enabled_origin_commands;
        }
        if (g.host !== undefined) body.host = g.host;
        if (g.json_response_enabled !== undefined) {
          body.json_response_enabled = g.json_response_enabled;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.new_users_per_minute !== undefined) {
          body.new_users_per_minute = g.new_users_per_minute;
        }
        if (g.path !== undefined) body.path = g.path;
        if (g.queue_all !== undefined) body.queue_all = g.queue_all;
        if (g.queueing_method !== undefined) {
          body.queueing_method = g.queueing_method;
        }
        if (g.queueing_status_code !== undefined) {
          body.queueing_status_code = g.queueing_status_code;
        }
        if (g.session_duration !== undefined) {
          body.session_duration = g.session_duration;
        }
        if (g.suspended !== undefined) body.suspended = g.suspended;
        if (g.total_active_users !== undefined) {
          body.total_active_users = g.total_active_users;
        }
        if (g.turnstile_action !== undefined) {
          body.turnstile_action = g.turnstile_action;
        }
        if (g.turnstile_mode !== undefined) {
          body.turnstile_mode = g.turnstile_mode;
        }
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a Waiting Rooms",
      arguments: z.object({
        id: z.string().describe("The ID of the Waiting Rooms"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/waiting_rooms";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName = (g.name?.toString() ?? args.id).replace(
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
      description: "Update Waiting Rooms attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/waiting_rooms";
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.additional_routes !== undefined) {
          body.additional_routes = g.additional_routes;
        }
        if (g.cookie_attributes !== undefined) {
          body.cookie_attributes = g.cookie_attributes;
        }
        if (g.cookie_suffix !== undefined) body.cookie_suffix = g.cookie_suffix;
        if (g.custom_page_html !== undefined) {
          body.custom_page_html = g.custom_page_html;
        }
        if (g.default_template_language !== undefined) {
          body.default_template_language = g.default_template_language;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.disable_session_renewal !== undefined) {
          body.disable_session_renewal = g.disable_session_renewal;
        }
        if (g.enabled_origin_commands !== undefined) {
          body.enabled_origin_commands = g.enabled_origin_commands;
        }
        if (g.host !== undefined) body.host = g.host;
        if (g.json_response_enabled !== undefined) {
          body.json_response_enabled = g.json_response_enabled;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.new_users_per_minute !== undefined) {
          body.new_users_per_minute = g.new_users_per_minute;
        }
        if (g.path !== undefined) body.path = g.path;
        if (g.queue_all !== undefined) body.queue_all = g.queue_all;
        if (g.queueing_method !== undefined) {
          body.queueing_method = g.queueing_method;
        }
        if (g.queueing_status_code !== undefined) {
          body.queueing_status_code = g.queueing_status_code;
        }
        if (g.session_duration !== undefined) {
          body.session_duration = g.session_duration;
        }
        if (g.suspended !== undefined) body.suspended = g.suspended;
        if (g.total_active_users !== undefined) {
          body.total_active_users = g.total_active_users;
        }
        if (g.turnstile_action !== undefined) {
          body.turnstile_action = g.turnstile_action;
        }
        if (g.turnstile_mode !== undefined) {
          body.turnstile_mode = g.turnstile_mode;
        }
        const result = await update(endpoint, existing.id, body, "PATCH", {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Waiting Rooms",
      arguments: z.object({
        id: z.string().describe("The ID of the Waiting Rooms"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/waiting_rooms";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
        const instanceName = (context.globalArgs.name?.toString() ?? args.id)
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          id: args.id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync Waiting Rooms state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/waiting_rooms";
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
          throw new Error("No data found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
        const result = await tryRead(endpoint, existing.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          id: existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
