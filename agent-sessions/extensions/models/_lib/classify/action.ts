/**
 * What a tool call did, said the same way for every harness, so the
 * labeller and the stored target never depend on one harness's tool names
 * (swamp-club#4158). Each harness's parser builds one from its own call; a
 * call whose input the record may not keep is `none`.
 *
 * @module
 */

/** A tool call's action: what the labeller reads and the record's target comes from. */
export type CallAction =
  | { readonly kind: "shell"; readonly command: string }
  | { readonly kind: "file-edit"; readonly path: string }
  | { readonly kind: "file-write"; readonly path: string }
  | { readonly kind: "file-read"; readonly path: string }
  | { readonly kind: "skill"; readonly name: string }
  | { readonly kind: "web"; readonly url: string }
  | { readonly kind: "search"; readonly path: string }
  | { readonly kind: "none" };

/**
 * The raw target of a call, before redaction: the command line, the path,
 * the skill name or the URL. Descriptions, queries, patterns, prompts, file
 * contents and MCP arguments never reach an action, so they never appear.
 */
export function actionTarget(action: CallAction): string {
  switch (action.kind) {
    case "shell":
      return action.command;
    case "file-edit":
    case "file-write":
    case "file-read":
    case "search":
      return action.path;
    case "skill":
      return action.name;
    case "web":
      return action.url;
    case "none":
      return "";
  }
}
