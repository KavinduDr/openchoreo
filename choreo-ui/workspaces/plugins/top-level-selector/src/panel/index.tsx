import {
  type PluginExtension,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";
const OverviewPage = React.lazy(() => import("./TopLevelSelector"));

export const panel: PluginExtension = {
  type: PluginExtensionType.PANEL,
  extentionPointId: "header.left",
  key: "top-level-selector",
  component: OverviewPage,
};
