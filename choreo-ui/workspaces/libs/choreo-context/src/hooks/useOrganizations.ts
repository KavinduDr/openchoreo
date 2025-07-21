import { useQuery } from "@tanstack/react-query";
import { useClient } from "./useClient";
import { useOrgHandle } from "@open-choreo/plugin-core";

export const useOrganizationList = () => {
  const client = useClient();
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["organizations", client],
    queryFn: () => client.listOrganizations(),
  });
  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};

const useOrganization = (orgHandle: string) => {
  const client = useClient();
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["organization", orgHandle, client],
    queryFn: () => client.getOrganization(orgHandle),
  });
  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};

export const useSelectedOrganization = () => {
  const orgHandle = useOrgHandle();
  const { data, isLoading, isError, isFetching, refetch } =
    useOrganization(orgHandle);
  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};
