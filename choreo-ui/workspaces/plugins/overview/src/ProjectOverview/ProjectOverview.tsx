import { useSelectedProject } from "@open-choreo/choreo-context";
import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import {
  PanelExtensionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";
import { ResourcePageLayout } from "@open-choreo/resource-views";

export const projectOverviewMainExtensionPoint: PluginExtensionPoint = {
  id: "project-overview-page-body",
  type: PluginExtensionType.PANEL,
};

const ProjectOverview: React.FC = () => {
  const {
    data: selectedProject,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useSelectedProject();
  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return <PresetErrorPage preset="500" />;
  }

  if (!selectedProject) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <ResourcePageLayout
      resource={selectedProject?.data}
      testId="project-overview-page"
      isRefreshing={isFetching}
      isLoading={isLoading}
    >
      <PanelExtensionMounter
        extentionPoint={projectOverviewMainExtensionPoint}
      />
    </ResourcePageLayout>
  );
};

export default ProjectOverview;
