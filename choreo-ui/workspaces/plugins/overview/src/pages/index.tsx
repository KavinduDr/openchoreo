import {
  type PluginExtension,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";
const OverviewPage = React.lazy(() => import("./OverviewPage"));
// import OverviewPage from "./OverviewPage";

export const page: PluginExtension = {
  type: PluginExtensionType.PAGE,
  path: "/overview",
  component: OverviewPage,
};
