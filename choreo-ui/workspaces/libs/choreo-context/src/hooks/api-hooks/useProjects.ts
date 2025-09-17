import { ProjectResponse } from "@open-choreo/api-client";
import { CreateProjectRequest } from "@open-choreo/definitions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useClient } from "../useClients";
import { useOrgHandle, useProjectHandle } from "../useUrlParams";

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

export const useCreateProject = (orgName: string) => {
  const client = useClient();
  const queryClient = useQueryClient();

  const { data, error, isPending, mutate } = useMutation<
    ProjectResponse,
    Error,
    CreateProjectRequest
  >({
    mutationFn: (payload: CreateProjectRequest) =>
      client.createProject(orgName, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", orgName, client],
      });
    },
  });

  return { createProject: mutate, error, loading: isPending, data };
};
