import { useSelectedProject } from "@open-choreo/choreo-context";
import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import {
  PanelExtensionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";
import { ResourcePageLayout } from "@open-choreo/resource-views";
import {
  Box,
  GridContainer,
  GridItem,
  useChoreoTheme,
} from "@open-choreo/design-system";

export const projectOverviewMainExtensionPoint: PluginExtensionPoint = {
  id: "project-overview-page-body",
  type: PluginExtensionType.PANEL,
};

export const projectOverviewSecondaryExtensionPoint: PluginExtensionPoint = {
  id: "project-overview-side-panels",
  type: PluginExtensionType.PANEL,
};

const ProjectOverview: React.FC = () => {
  const {
    data: selectedProject,
    isLoading,
    isError,
    isFetching,
  } = useSelectedProject();

  const theme = useChoreoTheme();

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
      <GridContainer>
        <GridItem size={{ xs: 12, sm: 12, md: 8, lg: 9, xl: 10 }}>
          <PanelExtensionMounter
            extentionPoint={projectOverviewMainExtensionPoint}
          />
        </GridItem>
        <GridItem size={{ xs: 12, sm: 12, md: 4, lg: 3, xl: 1 }}>
          <Box display="flex" flexDirection="row" gap={theme.spacing(2)}>
            <PanelExtensionMounter
              extentionPoint={projectOverviewSecondaryExtensionPoint}
            />
          </Box>
        </GridItem>
      </GridContainer>
    </ResourcePageLayout>
  );
};

export default ProjectOverview;
