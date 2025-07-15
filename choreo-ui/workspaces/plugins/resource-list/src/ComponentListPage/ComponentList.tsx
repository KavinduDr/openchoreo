import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
} from "@open-choreo/common-views";
import { useComponentList } from "@open-choreo/choreo-context";
import {
  PanelExtensionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import React from "react";
import { useIntl } from "react-intl";
import { RefreshIcon, Rotate, IconButton } from "@open-choreo/design-system";

export const componentListMainExtensionPoint: PluginExtensionPoint = {
  id: "component-list-page-body",
  type: PluginExtensionType.PANEL,
};

const ComponentList: React.FC = () => {
  const { formatMessage } = useIntl();
  const orgHandle = useOrgHandle();
  const projectHandle = useProjectHandle();
  const { isLoading, isError, isFetching, refetch } = useComponentList(
    orgHandle,
    projectHandle,
  );
  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return <PresetErrorPage preset="500" />;
  }
  return (
    <PageLayout
      testId="component-list"
      actions={
        <IconButton
          testId="component-list-refresh-button"
          size="small"
          onClick={() => {
            refetch();
          }}
        >
          <Rotate disabled={!isFetching}>
            <RefreshIcon fontSize="inherit" />
          </Rotate>
        </IconButton>
      }
      title={formatMessage({
        id: "componentListPage.title",
        defaultMessage: "Components List",
      })}
    >
      <PanelExtensionMounter extentionPoint={componentListMainExtensionPoint} />
    </PageLayout>
  );
};

export default ComponentList;
