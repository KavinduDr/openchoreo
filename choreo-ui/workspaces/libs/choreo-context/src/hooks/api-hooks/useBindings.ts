import { useEffect, useState } from "react";
import {
  ComponentBindingList,
  ComponentBindingResponse,
} from "@open-choreo/api-client";
import { BindingStatus, UpdateBindingRequest } from "@open-choreo/definitions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useClient } from "../useClients";

export const useComponentBindings = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
) => {
  const client = useClient();
  const [enableAutoRefresh, setEnableAutoRefresh] = useState(false);
  const { data, error, isLoading, refetch } = useQuery<
    ComponentBindingList,
    Error
  >({
    queryKey: [
      "componentBindings",
      client,
      orgHandle,
      projectHandle,
      componentHandle,
    ],
    queryFn: () =>
      client.listComponentBindings(orgHandle, projectHandle, componentHandle),
    refetchInterval: enableAutoRefresh ? 5000 : false,
  });

  useEffect(() => {
    if (
      data?.data?.items?.some(
        (item) => item.status.status === BindingStatus.IN_PROGRESS,
      )
    ) {
      setEnableAutoRefresh(true);
    }
    return () => {
      setEnableAutoRefresh(false);
    };
  }, [data?.data?.items, enableAutoRefresh, refetch]);
  return { bindings: data, error, loading: isLoading, refetch };
};

export const useUpdateComponentBinding = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
  bindingName: string,
) => {
  const client = useClient();
  const queryClient = useQueryClient();
  const { data, error, isPending, mutate } = useMutation<
    ComponentBindingResponse,
    Error,
    UpdateBindingRequest
  >({
    mutationFn: (updateData: UpdateBindingRequest) =>
      client.updateComponentBinding(
        orgHandle,
        projectHandle,
        componentHandle,
        bindingName,
        updateData,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "componentBindings",
          client,
          orgHandle,
          projectHandle,
          componentHandle,
        ],
      });
    },
  });
  return { updateBinding: mutate, error, loading: isPending, data };
};
