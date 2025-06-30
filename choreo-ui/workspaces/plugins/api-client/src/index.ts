import { type PluginManifest } from "@open-choreo/plugin-core";

import { provider } from "./providers";

export const apiClientPlugin = {
  name: "Api Client",
  description: "Api Client Plugin",
  extensions: [provider],
} as PluginManifest;

// export * from "./hooks";
// export * from "./providers";
