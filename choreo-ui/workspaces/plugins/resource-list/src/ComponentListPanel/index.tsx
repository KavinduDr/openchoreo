import { type PluginExtension } from "@open-choreo/plugin-core";
import React from "react";
const ComponentListPanel = React.lazy(() => import("./ComponentListPanel"));
import { projectOverviewMainExtensionPoint } from "@open-choreo/plugin-overview";
import { componentListMainExtensionPoint } from "../ComponentListPage/ComponentList";

export const componentListPanel: PluginExtension = {
  extentionPoint: projectOverviewMainExtensionPoint,
  component: ComponentListPanel,
  key: "component-list-panel",
};

export const projectOverviewComponentListPanel: PluginExtension = {
  extentionPoint: componentListMainExtensionPoint,
  component: ComponentListPanel,
  key: "component-list-project-overview-panel",
};
