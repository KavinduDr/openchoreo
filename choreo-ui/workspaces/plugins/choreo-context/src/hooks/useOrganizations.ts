import { useQuery } from "@tanstack/react-query";
import { useClient } from "./useClient";

export const useOrganizationList = () => {
  const client = useClient();
  return useQuery({
    queryKey: ["organizations", client],
    queryFn: () => client.listOrganizations(),
  });
};
