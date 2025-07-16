import { type PluginExtension } from "@open-choreo/plugin-core";
import { projectOverviewSecondaryExtensionPoint } from "@open-choreo/plugin-overview";
import React from "react";

const ComponentSummary = React.lazy(() => import("./ComponentSummary"));

export const componentSummary: PluginExtension = {
  extentionPoint: projectOverviewSecondaryExtensionPoint,
  component: ComponentSummary,
  key: "component-summary",
};
