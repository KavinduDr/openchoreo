import { createContext, Dispatch, useEffect, useReducer } from "react";
import { getResourceName } from "@open-choreo/definitions";
import { useNavigate } from "react-router";
import { useOrganizationList } from "../hooks";
import {
  appStateReducer,
  IAppState,
  IAppStateAction,
  initialState,
} from "../reducers/appState";
import { useOrgHandle } from "./../hooks/useUrlParams";
import { generatePath } from "./../paths/paths";

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
        generatePath({
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
