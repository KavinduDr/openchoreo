import {
  type PluginExtension,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";
const TopRightMenuPanel = React.lazy(() => import("./TopRightMenuPanel"));

export const panel: PluginExtension = {
  type: PluginExtensionType.PANEL,
  extentionPointId: "header.right",
  key: "toprightmenu",
  component: TopRightMenuPanel,
};
