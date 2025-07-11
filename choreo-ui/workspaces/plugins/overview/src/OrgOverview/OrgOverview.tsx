import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
} from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/choreo-context";
import {
  PanelExtensionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
  useHomePath,
} from "@open-choreo/plugin-core";
import React from "react";
import { IconButton, RefreshIcon, Rotate, useChoreoTheme } from "@open-choreo/design-system";
import {
  getResourceDescription,
  getResourceDisplayName,
} from "@open-choreo/definitions";

export const organizationOverviewMainExtensionPoint: PluginExtensionPoint = {
  id: "org-overview-page-body",
  type: PluginExtensionType.PANEL,
};

const OrgOverview: React.FC = () => {
  const {
    projectListQueryResult,
    selectedOrganization,
    organizationListQueryResult,
  } = useGlobalState();
  const theme = useChoreoTheme();
  if (organizationListQueryResult?.isLoading) {
    return <FullPageLoader />;
  }

  if (organizationListQueryResult?.error) {
    return <PresetErrorPage preset="500" />;
  }

  if (!organizationListQueryResult?.data) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <PageLayout
      testId="overview-page"
      title={getResourceDisplayName(selectedOrganization)}
      description={getResourceDescription(selectedOrganization)}
      actions={
        <IconButton
          size="small"
       
          onClick={() => {
            projectListQueryResult.refetch();
          }}
        >
          <Rotate disabled={!projectListQueryResult.isFetching} color={theme.pallet.primary.main}>
            <RefreshIcon fontSize="inherit" />
          </Rotate>
        </IconButton>
      }
    >
      <PanelExtensionMounter
        extentionPoint={organizationOverviewMainExtensionPoint}
      />
    </PageLayout>
  );
};

export default OrgOverview;
