import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
} from "@open-choreo/common-views";
import { useSelectedOrganization } from "@open-choreo/choreo-context";
import {
  PanelExtensionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
  useHomePath,
} from "@open-choreo/plugin-core";
import React from "react";
import {
  IconButton,
  RefreshIcon,
  Rotate,
  useChoreoTheme,
} from "@open-choreo/design-system";
import {
  getResourceDescription,
  getResourceDisplayName,
} from "@open-choreo/definitions";
import { ResourcePageLayout } from "@open-choreo/resource-views";

export const organizationOverviewMainExtensionPoint: PluginExtensionPoint = {
  id: "org-overview-page-body",
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
      <PanelExtensionMounter
        extentionPoint={organizationOverviewMainExtensionPoint}
      />
    </ResourcePageLayout>
  );
};

export default OrgOverview;
