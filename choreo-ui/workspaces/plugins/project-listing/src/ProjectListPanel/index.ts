import { organizationOverviewMainExtensionPoint } from "@open-choreo/overviews";
import { ProjectListPanel } from "./ProjectListPanel";
import { PluginExtension } from "@open-choreo/plugin-core";
export { organizationOverviewActionsExtensionPoint } from "./ProjectListPanel";

export const projectListPanel: PluginExtension = {
  extensionPoint: organizationOverviewMainExtensionPoint,
  component: ProjectListPanel,
  key: "project-list-panel",
  when: "org",
};
