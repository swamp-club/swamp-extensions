import type { GcpEnrichment } from "./types.ts";

export const enrichment: GcpEnrichment = {
  resourceId: "drive.files",
  npmImports: {},
  sourceFile: new URL("./drive-files.enrich.ts", import.meta.url).pathname,
  methodsExport: "driveFilesMediaMethods",
  filesExport: "driveFilesContentFiles",
};
