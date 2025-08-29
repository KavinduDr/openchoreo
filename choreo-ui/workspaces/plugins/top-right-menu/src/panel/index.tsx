import React from "react";
import {
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
const TopRightMenuPanel = React.lazy(() => import("./TopRightMenuPanel"));

export const panel: PluginExtension = {
  extensionPoint: coreExtensionPoints.headerRight,
  key: "toprightmenu",
  component: TopRightMenuPanel,
};
