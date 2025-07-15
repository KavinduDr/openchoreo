import {
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
import React from "react";
const TopRightMenuPanel = React.lazy(() => import("./TopRightMenuPanel"));

export const panel: PluginExtension = {
  extentionPoint: coreExtensionPoints.headerRight,
  key: "toprightmenu",
  component: TopRightMenuPanel,
};
