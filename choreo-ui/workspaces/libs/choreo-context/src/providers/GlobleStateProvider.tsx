import {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  useState,
} from "react";
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
  const [isLoggedIn] = useState(true); // TODO: Replace with actual auth state
  const [, setIsSignUp] = useState(false); // TODO: Replace with actual auth state

  useEffect(() => {
    let navUrl = "/"; // default to home
    if (!isLoggedIn) {
      navUrl = "/auth/login";
      if (window.location.pathname === "/auth/register") {
        navUrl = "/auth/register";
        setIsSignUp(true);
      } else if (window.location.pathname === "/auth/login") {
        navUrl = "/auth/login";
        setIsSignUp(false);
      }

      navigate(navUrl);
    } else {
      if (
        !orgHandle &&
        organizationList?.data?.items.length > 0 &&
        isLoggedIn
      ) {
        navigate(
          generatePath({
            orgHandle: getResourceName(organizationList?.data?.items[0]),
          }),
        );
      }
    }
    // if (!orgHandle && organizationList?.data?.items.length > 0 && isLoggedIn) {
    //   navigate(
    //     generatePath({
    //       orgHandle: getResourceName(organizationList?.data?.items[0]),
    //     }),
    //   );
    // } else {
    //   navigate(navUrl);
    // }
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
