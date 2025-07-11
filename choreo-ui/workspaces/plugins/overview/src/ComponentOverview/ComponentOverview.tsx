import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
} from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/choreo-context";
import React from "react";
import {
  PanelExtensionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import {
  getResourceDescription,
  getResourceDisplayName,
} from "@open-choreo/definitions";
import { RefreshIcon, Rotate, IconButton, useChoreoTheme } from "@open-choreo/design-system";

export const componentOverviewMainExtensionPoint: PluginExtensionPoint = {
  id: "component-overview-page-body",
  type: PluginExtensionType.PANEL,
};
const ComponentOverview: React.FC = () => {
  const { componentQueryResult, selectedComponent } = useGlobalState();
  const theme = useChoreoTheme();

  if (componentQueryResult?.isLoading) {
    return <FullPageLoader />;
  }

  if (componentQueryResult?.error) {
    return <PresetErrorPage preset="500" />;
  }

  if (!componentQueryResult?.data) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <PageLayout
      testId="overview-page"
      title={getResourceDisplayName(selectedComponent)}
      description={getResourceDescription(selectedComponent)}
      actions={
        <IconButton
          size="small"
          onClick={() => {
            componentQueryResult.refetch();
          }}
        >
          <Rotate disabled={!componentQueryResult.isFetching} color={theme.pallet.primary.main}>
            <RefreshIcon fontSize="inherit" />
          </Rotate>
        </IconButton>
      }
    >
      <PanelExtensionMounter
        extentionPoint={componentOverviewMainExtensionPoint}
      />
    </PageLayout>
  );
};

export default ComponentOverview;
