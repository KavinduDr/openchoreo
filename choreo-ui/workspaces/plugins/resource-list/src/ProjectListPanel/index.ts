import { organizationOverviewMainExtensionPoint } from "@open-choreo/plugin-overview";
import { ProjectListPanel } from "./ProjectListPanel";
import { PluginExtension } from "@open-choreo/plugin-core";
export { organizationOverviewActionsExtensionPoint } from "./ProjectListPanel";

export const projectListPanel: PluginExtension = {
  extentionPoint: organizationOverviewMainExtensionPoint,
  component: ProjectListPanel,
  key: "project-list-panel",
};
