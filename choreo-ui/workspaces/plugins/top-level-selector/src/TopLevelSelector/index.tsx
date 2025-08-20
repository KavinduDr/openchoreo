import React from "react";
import {
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
const TopLevelSelector = React.lazy(() => import("./TopLevelSelector"));

export const topLevelSelector: PluginExtension = {
  extensionPoint: coreExtensionPoints.headerLeft,
  key: "top-level-selector",
  component: TopLevelSelector,
};
