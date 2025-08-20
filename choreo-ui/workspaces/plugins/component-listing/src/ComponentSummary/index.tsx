import React from "react";
import { projectOverviewSecondaryExtensionPoint } from "@open-choreo/overviews";
import { type PluginExtension } from "@open-choreo/plugin-core";

const ComponentSummary = React.lazy(() => import("./ComponentSummary"));

export const componentSummary: PluginExtension = {
  extensionPoint: projectOverviewSecondaryExtensionPoint,
  component: ComponentSummary,
  key: "component-summary",
  when: "project != null",
};
