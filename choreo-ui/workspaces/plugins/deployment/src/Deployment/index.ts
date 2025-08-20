import { BasePathPatterns } from "@open-choreo/choreo-context";
import { default as Deployment } from "./Deployment";
import { coreExtensionPoints, PluginExtension } from "@open-choreo/plugin-core"

export const deploymentPage: PluginExtension = {
    extensionPoint: coreExtensionPoints.componentLevelPage,
    component: Deployment,
    pathPattern: "/deploy",
    when: "component != null",
}