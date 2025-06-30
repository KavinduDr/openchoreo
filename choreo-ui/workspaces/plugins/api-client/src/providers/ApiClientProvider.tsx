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
import { ChoreoClient } from "@open-choreo/api-client-lib";
import { useBasePath } from "@open-choreo/plugin-core";

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

const ApiClientPanel: React.FC<ApiClientProviderProps> = (
  props: ApiClientProviderProps,
) => {
  const basePath = useBasePath();
  const apiClient = useMemo(
    () => new ChoreoClient({ baseUrl: basePath }),
    [basePath],
  );
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return (
    <ApiClientContext.Provider value={{ apiClient, state, dispatch }}>
      {props.children}
    </ApiClientContext.Provider>
  );
};

export default ApiClientPanel;
