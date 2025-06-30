import { useContext } from "react";
import {
  ApiClientContext,
  IApiClientContext,
} from "../providers/ApiClientProvider";

export const useClient = () => {
  const { apiClient } = useContext<IApiClientContext>(ApiClientContext);
  return apiClient;
};
