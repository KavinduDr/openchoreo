import {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  useState,
} from "react";
// import { useAuth } from "@open-choreo/auth-core";
import { getResourceName } from "@open-choreo/definitions";
import { useNavigate } from "react-router";
import { useOrganizationList, useLocalStorageState } from "../hooks";
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
  const [, setIsSignUp] = useState(false); // TODO: Replace with actual auth state
  const thunderUser = useLocalStorageState("thunder_user");
  const isLoggedIn = thunderUser && thunderUser.length > 0;

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
      } else if (
        !orgHandle &&
        organizationList?.data?.items.length > 0 &&
        isLoggedIn
      ) {
        navigate("/");
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
  }, [
    navigate,
    orgHandle,
    organizationList,
    localStorage.getItem("thunder_user"),
  ]);
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
