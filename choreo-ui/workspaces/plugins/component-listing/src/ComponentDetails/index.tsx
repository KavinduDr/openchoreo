import React from "react";
import { componentOverviewMainExtensionPoint } from "@open-choreo/overviews";
import { type PluginExtension } from "@open-choreo/plugin-core";

const ComponentDetails = React.lazy(() => import("./ComponentDetails"));

export const componentDetails: PluginExtension = {
  extensionPoint: componentOverviewMainExtensionPoint,
  component: ComponentDetails,
  key: "component-details",
  when: "component != null && component.type === 'Service'",
};
