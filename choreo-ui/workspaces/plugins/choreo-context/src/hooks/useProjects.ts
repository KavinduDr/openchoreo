import { useQuery } from "@tanstack/react-query";
import { useClient } from "./useClient";

export const useProjectList = (orgName: string) => {
  const client = useClient();
  return useQuery({
    queryKey: ["projects", orgName, client],
    queryFn: () => client.listProjects(orgName),
  });
};

export const useProject = (orgName: string, projectId?: string) => {
  const client = useClient();
  return useQuery({
    queryKey: ["project", projectId, orgName, client],
    queryFn: () => {
      if (projectId) {
        return client.getProject(orgName, projectId);
      }
      return null;
    },
  });
};
