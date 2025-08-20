import { type PluginManifest } from "@open-choreo/plugin-core";

import { panel } from "./panel";

export const deploymentPlugin = {
  name: "Deployment",
  description: "Deployment Plugin",
  extensions: [panel],
} as PluginManifest;
