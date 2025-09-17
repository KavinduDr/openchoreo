import {
  ComponentResponse,
  PromoteComponentResponse,
} from "@open-choreo/api-client";
import {
  CreateComponentRequest,
  PromoteComponentRequest,
} from "@open-choreo/definitions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useClient } from "../useClients";
import {
  useOrgHandle,
  useComponentHandle,
  useProjectHandle,
} from "../useUrlParams";

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

export const useCreateComponent = (orgName: string, projectId: string) => {
  const client = useClient();
  const queryClient = useQueryClient();

  const { data, error, isPending, mutate } = useMutation<
    ComponentResponse,
    Error,
    CreateComponentRequest
  >({
    mutationFn: (payload: CreateComponentRequest) =>
      client.createComponent(orgName, projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["componentList", projectId, orgName, client],
      });
    },
  });

  return { createComponent: mutate, error, loading: isPending, data };
};

export const usePromoteComponent = (
  orgName: string,
  projectId: string,
  componentId: string,
) => {
  const client = useClient();
  const queryClient = useQueryClient();

  const { data, error, isPending, mutate } = useMutation<
    PromoteComponentResponse,
    Error,
    PromoteComponentRequest
  >({
    mutationFn: (payload: PromoteComponentRequest) =>
      client.promoteComponent(orgName, projectId, componentId, payload),
    onSuccess: () => {
      // Invalidate bindings queries since promotion creates new bindings
      queryClient.invalidateQueries({
        queryKey: ["bindings"],
      });
      // Also invalidate component data
      queryClient.invalidateQueries({
        queryKey: ["component", projectId, componentId, orgName, client],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "componentBindings",
          client,
          orgName,
          projectId,
          componentId,
        ],
      });
    },
  });

  return { promoteComponent: mutate, error, loading: isPending, data };
};
