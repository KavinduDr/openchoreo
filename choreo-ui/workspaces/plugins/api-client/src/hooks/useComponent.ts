import { useClient } from "./useClient";
import { useQuery } from "@tanstack/react-query";

export const useComponent = (prorjectId: string, componentId: string) => {
  const client = useClient();
  return useQuery({
    queryKey: ["component", prorjectId, componentId],
    queryFn: () => client.getComponent(prorjectId, componentId),
  });
};
