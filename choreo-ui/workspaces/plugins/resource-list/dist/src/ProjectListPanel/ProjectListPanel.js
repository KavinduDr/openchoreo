import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import { useProjectList } from "@open-choreo/choreo-context";
import { PanelExtensionMounter, PluginExtensionType, } from "@open-choreo/plugin-core";
import { genaratePath, useOrgHandle } from "@open-choreo/choreo-context";
import { useMemo, useState } from "react";
import { Box, SearchBar } from "@open-choreo/design-system";
import { useIntl } from "react-intl";
import { getResourceCreatedAt, getResourceDescription, getResourceDisplayName, getResourceName, getResourceStatus, } from "@open-choreo/definitions";
import { ResourceList } from "@open-choreo/resource-views";
export const organizationOverviewActionsExtensionPoint = {
    id: "org-overview-page-actions",
    type: PluginExtensionType.PANEL,
};
export const ProjectListPanel = () => {
    const orgHandle = useOrgHandle();
    const { data: projectList, isLoading, isError } = useProjectList(orgHandle);
    const [search, setSearch] = useState("");
    const { formatMessage } = useIntl();
    const projects = useMemo(() => projectList?.data?.items
        ?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
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
    })), [projectList, search, orgHandle]);
    if (isLoading) {
        return _jsx(FullPageLoader, {});
    }
    if (isError) {
        return _jsx(PresetErrorPage, { preset: "500" });
    }
    if (!projectList) {
        return _jsx(PresetErrorPage, { preset: "404" });
    }
    return (_jsxs(Box, { display: "flex", flexDirection: "column", gap: 16, children: [_jsxs(Box, { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4, children: [_jsx(Box, { flexGrow: 1, children: _jsx(SearchBar, { inputValue: search, color: "secondary", bordered: true, onChange: (value) => setSearch(value), testId: "search-bar", placeholder: formatMessage({
                                id: "overview.orgOverview.searchPlaceholder",
                                defaultMessage: "Search projects",
                            }) }) }), _jsx(PanelExtensionMounter, { extentionPoint: organizationOverviewActionsExtensionPoint })] }), _jsx(ResourceList, { resources: projects })] }));
};
//# sourceMappingURL=ProjectListPanel.js.map