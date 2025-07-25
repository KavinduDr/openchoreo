import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import {
  useComponentList,
  useHomePath,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/choreo-context";
import React, { useMemo } from "react";
import { ResourceTable } from "@open-choreo/resource-views";
import {
  getComponentType,
  getResourceCreatedAt,
  getResourceDescription,
  getResourceDisplayName,
  getResourceName,
} from "@open-choreo/definitions";

const ComponentListPanel: React.FC = () => {
  const orgHandle = useOrgHandle();
  const projectHandle = useProjectHandle();
  const {
    data: components,
    isLoading,
    isError,
    refetch,
  } = useComponentList(orgHandle, projectHandle);
  const homePath = useHomePath();

  const componentList = useMemo(
    () =>
      components?.data?.items?.map((item) => ({
        id: getResourceName(item),
        name: getResourceDisplayName(item),
        description: getResourceDescription(item),
        type: getComponentType(item),
        lastUpdated: new Date(getResourceCreatedAt(item)),
        href: `${homePath}/component/${getResourceName(item)}`,
      })),
    [components, homePath],
  );

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return <PresetErrorPage preset="500" />;
  }

  if (!components) {
    return <PresetErrorPage preset="404" />;
  }

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
