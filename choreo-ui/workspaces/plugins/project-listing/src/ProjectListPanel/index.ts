import { organizationOverviewMainExtensionPoint } from "@open-choreo/overviews";
import { PluginExtension } from "@open-choreo/plugin-core";
import { ProjectListPanel } from "./ProjectListPanel";
export { organizationOverviewActionsExtensionPoint } from "./ProjectListPanel";

export const projectListPanel: PluginExtension = {
  extensionPoint: organizationOverviewMainExtensionPoint,
  component: ProjectListPanel,
  key: "project-list-panel",
  when: "org != null",
};
