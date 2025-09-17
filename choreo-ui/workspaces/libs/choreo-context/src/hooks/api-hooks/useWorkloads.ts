import { WorkloadList, WorkloadResponse } from "@open-choreo/api-client";
import { WorkloadSpec } from "@open-choreo/definitions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useClient } from "../useClients";

export const useWorkloads = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
) => {
  const client = useClient();
  const { data, error, isLoading, refetch } = useQuery<WorkloadList, Error>({
    queryKey: ["workloads", client, orgHandle, projectHandle, componentHandle],
    queryFn: () =>
      client.listWorkloads(orgHandle, projectHandle, componentHandle),
    enabled: !!orgHandle && !!projectHandle && !!componentHandle,
  });
  return {
    workloads: data?.data?.items,
    totalCount: data?.data?.totalCount,
    error,
    loading: isLoading,
    refetch,
  };
};

export const useCreateWorkload = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
) => {
  const client = useClient();
  const queryClient = useQueryClient();

  const { data, error, isPending, mutate } = useMutation<
    WorkloadResponse,
    Error,
    WorkloadSpec
  >({
    mutationFn: (workloadData) =>
      client.createWorkload(
        orgHandle,
        projectHandle,
        componentHandle,
        workloadData,
      ),
    onSuccess: () => {
      // Invalidate and refetch workloads after successful creation
      queryClient.invalidateQueries({
        queryKey: [
          "workloads",
          client,
          orgHandle,
          projectHandle,
          componentHandle,
        ],
      });
    },
  });

  return {
    createWorkload: mutate,
    error,
    loading: isPending,
    data: data?.data,
  };
};
