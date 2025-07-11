import { useGlobalState } from "@open-choreo/choreo-context";
import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
} from "@open-choreo/common-views";
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
  const { projectQueryResult, componentListQueryResult, selectedProject } =
    useGlobalState();
  if (projectQueryResult?.isLoading) {
    return <FullPageLoader />;
  }

  if (projectQueryResult?.error) {
    return <PresetErrorPage preset="500" />;
  }

  if (!projectQueryResult?.data) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <ResourcePageLayout
      resource={selectedProject}
      testId="component-list-page"
      isRefreshing={componentListQueryResult.isFetching}
      isLoading={componentListQueryResult.isLoading}
      onRefresh={() => {
        componentListQueryResult.refetch();
      }}
    >
      <PanelExtensionMounter
        extentionPoint={projectOverviewMainExtensionPoint}
      />
    </ResourcePageLayout>
  );
};

export default ProjectOverview;
