import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import { useSelectedOrganization } from "@open-choreo/choreo-context";
import {
  PanelExtensionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";
import {
  Box,
  GridContainer,
  GridItem,
  useChoreoTheme,
} from "@open-choreo/design-system";
import { ResourcePageLayout } from "@open-choreo/resource-views";

export const organizationOverviewMainExtensionPoint: PluginExtensionPoint = {
  id: "org-overview-page-body",
  type: PluginExtensionType.PANEL,
};
export const organizationOverviewSecondaryExtensionPoint: PluginExtensionPoint =
  {
    id: "org-overview-side-panels",
    type: PluginExtensionType.PANEL,
  };

const OrgOverview: React.FC = () => {
  const {
    data: selectedOrganization,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useSelectedOrganization();

  const theme = useChoreoTheme();
  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return <PresetErrorPage preset="500" />;
  }

  if (!selectedOrganization) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <ResourcePageLayout
      resource={selectedOrganization?.data}
      testId="org-overview-page"
      isRefreshing={isFetching}
      isLoading={isLoading}
      onRefresh={() => {
        refetch();
      }}
    >
      <GridContainer>
        <GridItem size={{ xs: 12, sm: 12, md: 8, lg: 9, xl: 10 }}>
          <PanelExtensionMounter
            extentionPoint={organizationOverviewMainExtensionPoint}
          />
        </GridItem>
        <GridItem size={{ xs: 12, sm: 12, md: 4, lg: 3, xl: 1 }}>
          <Box display="flex" flexDirection="row" gap={theme.spacing(2)}>
            <PanelExtensionMounter
              extentionPoint={organizationOverviewSecondaryExtensionPoint}
            />
          </Box>
        </GridItem>
      </GridContainer>
    </ResourcePageLayout>
  );
};

export default OrgOverview;
