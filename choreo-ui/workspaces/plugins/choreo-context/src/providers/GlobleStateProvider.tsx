import { createContext, Dispatch, useEffect, useReducer } from "react";
import {
  appStateReducer,
  IAppState,
  IAppStateAction,
  initialState,
} from "../reducers/appState";
import { useOrganizationList } from "../hooks";
import { useNavigate } from "react-router";
import { genaratePath, useOrgHandle } from "@open-choreo/plugin-core";
import { getResourceName } from "@open-choreo/definitions";

export interface GlobalState {
  appState: IAppState;
  dispatch: Dispatch<IAppStateAction>;
}

export const GlobalStateContext = createContext<GlobalState>({
  appState: initialState,
  dispatch: () => {},
});

export function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [appState, dispatch] = useReducer(appStateReducer, initialState);
  const orgHandle = useOrgHandle();
  const { data: organizationList } = useOrganizationList();
  useEffect(() => {
    if (!orgHandle && organizationList?.data?.items.length > 0) {
      navigate(
        genaratePath({
          orgHandle: getResourceName(organizationList?.data?.items[0]),
        }),
      );
    }
  }, [orgHandle, organizationList]);
  return (
    <GlobalStateContext.Provider
      value={{
        appState,
        dispatch,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
