import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import { useProjectList } from "@open-choreo/choreo-context";
import {
  genaratePath,
  PanelExtensionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
  useOrgHandle,
} from "@open-choreo/plugin-core";
import React, { useMemo, useState } from "react";
import { Box, SearchBar } from "@open-choreo/design-system";
import { useIntl } from "react-intl";
import {
  getResourceCreatedAt,
  getResourceDescription,
  getResourceDisplayName,
  getResourceName,
  getResourceStatus,
} from "@open-choreo/definitions";
import { ResourceList } from "@open-choreo/resource-views";

export const organizationOverviewActionsExtensionPoint: PluginExtensionPoint = {
  id: "org-overview-page-actions",
  type: PluginExtensionType.PANEL,
};

export const ProjectListPanel: React.FC = () => {
  const orgHandle = useOrgHandle();
  const { data: projectList, isLoading, isError } = useProjectList(orgHandle);
  const [search, setSearch] = useState("");
  const { formatMessage } = useIntl();

  const projects = useMemo(
    () =>
      projectList?.data?.items
        ?.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((item) => ({
          id: item.name,
          name: getResourceDisplayName(item),
          description: getResourceDescription(item) || "",
          type: getResourceStatus(item),
          lastUpdated: getResourceCreatedAt(item),
          href: genaratePath({
            orgHandle,
            projectHandle: getResourceName(item),
          }),
        })),
    [projectList, search, orgHandle],
  );

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return <PresetErrorPage preset="500" />;
  }

  if (!projectList) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <Box display="flex" flexDirection="column" gap={16}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={4}
      >
        <Box flexGrow={1}>
          <SearchBar
            inputValue={search}
            color="secondary"
            bordered
            onChange={(value) => setSearch(value)}
            testId="search-bar"
            placeholder={formatMessage({
              id: "overview.orgOverview.searchPlaceholder",
              defaultMessage: "Search projects",
            })}
          />
        </Box>
        <PanelExtensionMounter
          extentionPoint={organizationOverviewActionsExtensionPoint}
        />
      </Box>
      <ResourceList resources={projects} />
    </Box>
  );
};
