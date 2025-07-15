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
import { useBasePath } from "@open-choreo/plugin-core";
import { GlobalStateProvider } from "./GlobleStateProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export interface ApiClientProviderProps {
  children: ReactNode;
}

export interface IApiClientContext {
  state: IAppState;
  dispatch: Dispatch<IAppStateAction>;
  apiClient: ChoreoClient;
}

export const ApiClientContext = createContext<IApiClientContext>({
  state: initialState,
  dispatch: () => {},
  apiClient: new ChoreoClient(),
});

const ApiClientProvider: React.FC<ApiClientProviderProps> = (
  props: ApiClientProviderProps,
) => {
  const basePath = useBasePath();

  const apiClient = useMemo(
    () => new ChoreoClient({ baseUrl: basePath }),
    [basePath],
  );

  const queryClient = useMemo(() => new QueryClient(), []);
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return (
    <QueryClientProvider client={queryClient}>
      <ApiClientContext.Provider value={{ apiClient, state, dispatch }}>
        <GlobalStateProvider>{props.children}</GlobalStateProvider>
      </ApiClientContext.Provider>
    </QueryClientProvider>
  );
};

export default ApiClientProvider;
