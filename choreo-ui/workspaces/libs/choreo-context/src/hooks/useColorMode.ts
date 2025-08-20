import { ActionType } from "../reducers/appState";
import { useGlobalState } from "./useGlobleState";

export const useColorMode = () => {
  const {
    appState: { colorMode },
    dispatch,
  } = useGlobalState();
  const setColorMode = (cMode: "light" | "dark") => {
    dispatch({ type: ActionType.SET_COLOR_MODE, payload: cMode });
  };
  return { colorMode, setColorMode };
};
