import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import { useComponentList } from "@open-choreo/choreo-context";
import {
  useHomePath,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import React from "react";
import { ResourceTable } from "@open-choreo/resource-views";

const ComponentListPanel: React.FC = () => {
  const orgHandle = useOrgHandle();
  const projectHandle = useProjectHandle();
  const {
    data: components,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useComponentList(orgHandle, projectHandle);
  const homePath = useHomePath();

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return <PresetErrorPage preset="500" />;
  }

  if (!components) {
    return <PresetErrorPage preset="404" />;
  }
  const componentList = components?.data?.items?.map((item) => ({
    id: item.name,
    name: item.name,
    description: item.type,
    type: item.type,
    lastUpdated: new Date(item.createdAt),
    href: `${homePath}/component/${item.name}`,
  }));
  return (
    <ResourceTable
      resources={componentList || []}
      resourceKind="component"
      onRefresh={() => {
        refetch();
      }}
      isLoading={isLoading}
      enableAvatar={true}
    />
  );
};

export default ComponentListPanel;
