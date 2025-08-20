import { type PluginManifest } from "@open-choreo/plugin-core";

import { deploymentPage } from "./Deployment";
import { deploymentMenu } from "./NavItems";

export const deploymentPlugin = {
  name: "Deployment",
  description: "Deployment Plugin",
  extensions: [deploymentMenu, deploymentPage],
} as PluginManifest;
