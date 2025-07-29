import {
  useHomePath,
  useOrgHandle,
  useProjectHandle,
  useSelectedComponent,
} from "@open-choreo/choreo-context";
import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import { useMemo } from "react";
import { ComponentView } from "@open-choreo/resource-views";

const ComponentDetails: React.FC = () => {
  const orgHandle = useOrgHandle();
  const projectHandle = useProjectHandle();
  const selectedComponent = useSelectedComponent();

  const {
    data: component,
    isLoading,
    isError,
    refetch,
  } = useSelectedComponent();

  const homePath = useHomePath();

  const componentDetails = useMemo(
    () => ({
      name: component?.data?.name,
      description: component?.data?.description,
      type: component?.data?.type,
      lastUpdated: new Date(component?.data?.createdAt),
      href: `${orgHandle}/${projectHandle}/component/${component?.data?.name}`,
    }),
    [component, homePath],
  );

  if (isLoading) {
    return <FullPageLoader />;
  }
  if (isError) {
    return <PresetErrorPage preset="500" />;
  }

  if (!component) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <ComponentView
      name={componentDetails.name}
      description={componentDetails.description}
      orgName={orgHandle}
      version={""}
      type={componentDetails.type}
      createdAt={componentDetails.lastUpdated.toISOString()}
      updatedAt={componentDetails.lastUpdated.toISOString()}
    />
  );
};

export default ComponentDetails;
