import { type PluginManifest } from "@open-choreo/plugin-core";

import {deploymentMenu} from "./NavItems"
import {deploymentPage} from "./Deployment"

export const deploymentPlugin = {
  name: "Deployment",
  description: "Deployment Plugin",
  extensions: [deploymentMenu, deploymentPage],
} as PluginManifest;
