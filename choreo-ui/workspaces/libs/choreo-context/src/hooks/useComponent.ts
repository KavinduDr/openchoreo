import {
  useOrgHandle,
  useComponentHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import { useClient } from "./useClient";
import { useQuery } from "@tanstack/react-query";

export const useComponent = (
  orgName: string,
  projectId?: string,
  componentId?: string,
) => {
  const client = useClient();
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["component", projectId, componentId, orgName, client],
    queryFn: () => {
      if (projectId && componentId) {
        return client.getComponent(orgName, projectId, componentId);
      }
      return null;
    },
  });
  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};

export const useComponentList = (orgName: string, projectId?: string) => {
  const client = useClient();
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["componentList", projectId, orgName, client],
    queryFn: () => {
      if (projectId) {
        return client.listProjectComponents(orgName, projectId);
      }
      return null;
    },
  });
  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};

export const useSelectedComponent = () => {
  const projectHandle = useProjectHandle();
  const componentHandle = useComponentHandle();
  const orgHandle = useOrgHandle();
  const { data, isLoading, isError, isFetching, refetch } = useComponent(
    orgHandle,
    projectHandle,
    componentHandle,
  );
  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};
