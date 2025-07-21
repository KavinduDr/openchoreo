import { useContext } from "react";
import { GlobalStateContext } from "../providers/GlobleStateProvider";

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
