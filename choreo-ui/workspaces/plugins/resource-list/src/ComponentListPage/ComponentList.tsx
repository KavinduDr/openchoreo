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
  const { componentListQueryResult } = useGlobalState();
  return (
    <PageLayout
      testId="component-list"
      actions={
        <IconButton
          size="small"
          onClick={() => {
            componentListQueryResult.refetch();
          }}
        >
          <Rotate disabled={!componentListQueryResult.isFetching}>
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
