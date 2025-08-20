import { BuildList } from "@open-choreo/api-client";
import { Build } from "@open-choreo/definitions";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "./useClient";

export const useBuilds = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
) => {
  const client = useClient();
  const { data, error, isLoading } = useQuery<BuildList, Error>({
    queryKey: ["builds", client, orgHandle, projectHandle, componentHandle],
    queryFn: () => client.listBuilds(orgHandle, projectHandle),
  });
  return { builds: data, error, loading: isLoading };
};

export const useBuild = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
  buildId: string,
) => {
  const client = useClient();
  const { data, error, isLoading } = useQuery<
    { success: boolean; data: Build },
    Error
  >({
    queryKey: [
      "build",
      client,
      orgHandle,
      projectHandle,
      componentHandle,
      buildId,
    ],
    queryFn: () => client.getBuild(orgHandle, projectHandle, buildId),
  });
  return { build: data, error, loading: isLoading };
};
