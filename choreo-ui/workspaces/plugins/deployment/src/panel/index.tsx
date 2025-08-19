import { type PluginExtension,  coreExtensionPoints } from "@open-choreo/plugin-core";
import React from "react";
const DeploymentPanel = React.lazy(() => import("./DeploymentPanel"));

export const panel: PluginExtension = {
    extensionPoint: coreExtensionPoints.headerLeft,
    key: "deployment",
    component: DeploymentPanel,
};
