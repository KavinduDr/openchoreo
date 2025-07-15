import { useClient } from "./useClient";
import { useQuery } from "@tanstack/react-query";

export const useComponent = (
  orgName: string,
  prorjectId?: string,
  componentId?: string,
) => {
  const client = useClient();
  return useQuery({
    queryKey: ["component", prorjectId, componentId, orgName, client],
    queryFn: () => {
      if (prorjectId && componentId) {
        return client.getComponent(orgName, prorjectId, componentId);
      }
      return null;
    },
  });
};

export const useComponentList = (orgName: string, projectId?: string) => {
  const client = useClient();
  return useQuery({
    queryKey: ["componentList", projectId, orgName, client],
    queryFn: () => {
      if (projectId) {
        return client.listProjectComponents(orgName, projectId);
      }
      return null;
    },
  });
};
