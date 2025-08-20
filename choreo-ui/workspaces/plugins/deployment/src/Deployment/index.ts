import { coreExtensionPoints, PluginExtension } from "@open-choreo/plugin-core";
import { default as Deployment } from "./Deployment";

export const deploymentPage: PluginExtension = {
  extensionPoint: coreExtensionPoints.componentLevelPage,
  component: Deployment,
  pathPattern: "/deploy",
  when: "component != null",
};
