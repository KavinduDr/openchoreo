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
  dispatch: () => {
    /* default empty function */
  },
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
  const isLoggedIn = false; // TODO: Replace with actual auth state

  useEffect(() => {
    if (!orgHandle && organizationList?.data?.items.length > 0 && isLoggedIn) {
      navigate(
        generatePath({
          orgHandle: getResourceName(organizationList?.data?.items[0]),
        }),
      );
    } else {
      const navigateUrl = "/auth"; // Single route that handles both login and register
      navigate(navigateUrl);
    }
  }, [isLoggedIn, navigate, orgHandle, organizationList]);
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
