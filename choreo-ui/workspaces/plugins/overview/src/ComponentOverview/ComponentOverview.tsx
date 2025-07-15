import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
} from "@open-choreo/common-views";
import { useSelectedComponent } from "@open-choreo/choreo-context";
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
import {
  RefreshIcon,
  Rotate,
  IconButton,
  useChoreoTheme,
} from "@open-choreo/design-system";
import { ResourcePageLayout } from "@open-choreo/resource-views";

export const componentOverviewMainExtensionPoint: PluginExtensionPoint = {
  id: "component-overview-page-body",
  type: PluginExtensionType.PANEL,
};
const ComponentOverview: React.FC = () => {
  const {
    data: selectedComponent,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useSelectedComponent();
  const theme = useChoreoTheme();

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return <PresetErrorPage preset="500" />;
  }

  if (!selectedComponent) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <ResourcePageLayout
      resource={selectedComponent?.data}
      testId="component-overview-page"
      isRefreshing={isFetching}
      isLoading={isLoading}
    >
      <PanelExtensionMounter
        extentionPoint={componentOverviewMainExtensionPoint}
      />
    </ResourcePageLayout>
  );
};

export default ComponentOverview;
