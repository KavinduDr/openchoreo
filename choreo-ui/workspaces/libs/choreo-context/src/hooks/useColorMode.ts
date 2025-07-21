import { useGlobalState } from "./useGlobleState";
import { ActionType } from "../reducers/appState";

export const useColorMode = () => {
  const {
    appState: { colorMode },
    dispatch,
  } = useGlobalState();
  const setColorMode = (colorMode: "light" | "dark") => {
    dispatch({ type: ActionType.SET_COLOR_MODE, payload: colorMode });
  };
  return { colorMode, setColorMode };
};
