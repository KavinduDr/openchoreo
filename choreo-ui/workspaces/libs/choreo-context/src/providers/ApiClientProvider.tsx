import React, {
  createContext,
  Dispatch,
  ReactNode,
  useMemo,
  useReducer,
} from "react";
import { ChoreoClient } from "@open-choreo/api-client";
import { logger } from "@open-choreo/logging";
import {
  QueryClientProvider,
  QueryClient,
  MutationCache,
  QueryCache,
} from "@tanstack/react-query";
import {
  appStateReducer,
  IAppState,
  IAppStateAction,
  initialState,
} from "../reducers/appState";
import { GlobalStateProvider } from "./GlobleStateProvider";

export interface ApiClientProviderProps {
  children: ReactNode;
  basePath?: string;
}

export interface IApiClientContext {
  state: IAppState;
  dispatch: Dispatch<IAppStateAction>;
  apiClient: ChoreoClient;
  basePath?: string;
}

export const ApiClientContext = createContext<IApiClientContext>({
  state: initialState,
  dispatch: () => {},
  apiClient: new ChoreoClient(),
  basePath: undefined,
});

export const ApiClientProvider: React.FC<ApiClientProviderProps> = (
  props: ApiClientProviderProps,
) => {
  const { basePath, children } = props;
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  // Use the basePath from state (which includes the one from props)

  const apiClient = useMemo(
    () => new ChoreoClient({ baseUrl: basePath }),
    [basePath],
  );

  const queryClient = useMemo(
    () =>
      new QueryClient({
        mutationCache: new MutationCache({
          onError: (error) => {
            logger.error(error);
          },
        }),
        queryCache: new QueryCache({
          onError: (error) => {
            logger.error(error);
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retryOnMount: false,
            retry: 3,
            staleTime: 1000 * 10,
          },
        },
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ApiClientContext.Provider
        value={{ apiClient, basePath, state, dispatch }}
      >
        <GlobalStateProvider>{children}</GlobalStateProvider>
      </ApiClientContext.Provider>
    </QueryClientProvider>
  );
};

export default ApiClientProvider;
