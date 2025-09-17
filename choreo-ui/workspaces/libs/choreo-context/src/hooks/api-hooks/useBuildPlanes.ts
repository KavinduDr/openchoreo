import { BuildPlaneList } from "@open-choreo/api-client";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "../useClients";

export const useBuildPlanes = (orgHandle: string) => {
  const client = useClient();
  const { data, error, isLoading, refetch } = useQuery<BuildPlaneList, Error>({
    queryKey: ["buildPlanes", client, orgHandle],
    queryFn: () => client.listBuildPlanes(orgHandle),
  });
  return { buildPlanes: data, error, loading: isLoading, refetch };
};
