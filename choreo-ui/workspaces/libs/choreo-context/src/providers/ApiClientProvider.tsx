import React, {
  createContext,
  Dispatch,
  ReactNode,
  useMemo,
  useReducer,
} from "react";
import {
  appStateReducer,
  IAppState,
  IAppStateAction,
  initialState,
} from "../reducers/appState";
import { ChoreoClient } from "@open-choreo/api-client";
import { GlobalStateProvider } from "./GlobleStateProvider";
import {
  QueryClientProvider,
  QueryClient,
  MutationCache,
  QueryCache,
} from "@tanstack/react-query";

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

const ApiClientProvider: React.FC<ApiClientProviderProps> = (
  props: ApiClientProviderProps,
) => {
  // Initialize state with basePath from props
  const initialAppState = {
    ...initialState,
    basePath: props.basePath,
  };

  const [state, dispatch] = useReducer(appStateReducer, initialAppState);

  // Use the basePath from state (which includes the one from props)
  const basePath = state.basePath || "";

  const apiClient = useMemo(
    () => new ChoreoClient({ baseUrl: basePath }),
    [basePath],
  );

  const queryClient = useMemo(
    () =>
      new QueryClient({
        mutationCache: new MutationCache({
          onError: (error) => {
            console.error(error);
          },
        }),
        queryCache: new QueryCache({
          onError: (error) => {
            console.error(error);
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
        <GlobalStateProvider>{props.children}</GlobalStateProvider>
      </ApiClientContext.Provider>
    </QueryClientProvider>
  );
};

export default ApiClientProvider;
