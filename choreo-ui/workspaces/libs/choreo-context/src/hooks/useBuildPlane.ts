import { BuildPlaneList } from "@open-choreo/api-client";
import { BuildPlane } from "@open-choreo/definitions";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "./useClient";

export const useBuildPlanes = (orgHandle: string, projectHandle: string) => {
  const client = useClient();
  const { data, error, isLoading } = useQuery<BuildPlaneList, Error>({
    queryKey: ["buildPlanes", client, orgHandle, projectHandle],
    queryFn: () => client.listBuildPlanes(orgHandle, projectHandle),
  });
  return { buildPlanes: data, error, loading: isLoading };
};

export const useBuildPlane = (
  orgHandle: string,
  projectHandle: string,
  buildId: string,
) => {
  const client = useClient();
  const { data, error, isLoading } = useQuery<
    { success: boolean; data: BuildPlane },
    Error
  >({
    queryKey: ["buildPlane", client, orgHandle, projectHandle, buildId],
    queryFn: () => client.getBuildPlane(orgHandle, projectHandle, buildId),
  });
  return { buildPlane: data, error, loading: isLoading };
};
