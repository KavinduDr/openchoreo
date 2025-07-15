import { useQuery } from "@tanstack/react-query";
import { useClient } from "./useClient";
import { useOrgHandle, useProjectHandle } from "@open-choreo/plugin-core";

export const useProjectList = (orgName: string) => {
  const client = useClient();
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["projects", orgName, client],
    queryFn: () => client.listProjects(orgName),
  });
  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};

export const useProject = (orgName: string, projectId?: string) => {
  const client = useClient();
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["project", projectId, orgName, client],
    queryFn: () => {
      if (projectId) {
        return client.getProject(orgName, projectId);
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

export const useSelectedProject = () => {
  const projectHandle = useProjectHandle();
  const orgHandle = useOrgHandle();
  const { data, isLoading, isError, isFetching, refetch } = useProject(
    orgHandle,
    projectHandle,
  );
  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};
