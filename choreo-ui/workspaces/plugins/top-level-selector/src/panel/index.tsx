import {
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
import React from "react";
const OverviewPage = React.lazy(() => import("./TopLevelSelector"));

export const panel: PluginExtension = {
  extentionPoint: coreExtensionPoints.headerLeft,
  key: "top-level-selector",
  component: OverviewPage,
};
