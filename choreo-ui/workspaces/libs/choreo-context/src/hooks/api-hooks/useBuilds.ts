import { BuildList } from "@open-choreo/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useClient } from "../useClients";

export const useBuilds = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
) => {
  const client = useClient();
  const { data, error, isLoading, refetch } = useQuery<BuildList, Error>({
    queryKey: ["builds", client, orgHandle, projectHandle, componentHandle],
    queryFn: () => client.listBuilds(orgHandle, projectHandle, componentHandle),
  });
  return { builds: data, error, loading: isLoading, refetch };
};

export const useTriggerBuild = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
  commit?: string,
) => {
  const client = useClient();
  const queryClient = useQueryClient();
  const { data, error, isPending, mutate } = useMutation({
    mutationFn: async () =>
      client.postBuild(orgHandle, projectHandle, componentHandle, commit),
    onSuccess: () => {
      debounce(() => {
        queryClient.invalidateQueries({
          queryKey: [
            "builds",
            client,
            orgHandle,
            projectHandle,
            componentHandle,
          ],
        });
      }, 1000)();
    },
  });
  return { triggerBuild: mutate, error, loading: isPending, data };
};
