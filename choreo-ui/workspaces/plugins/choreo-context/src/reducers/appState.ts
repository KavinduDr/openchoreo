export interface IAppState {
  colorMode: "light" | "dark";
}

export const initialState: IAppState = {
  colorMode: "light",
};

export enum ActionType {
  SET_COLOR_MODE = "SET_COLOR_MODE",
}

export type IAppStateAction = {
  type: ActionType.SET_COLOR_MODE;
  payload: "light" | "dark";
};

export const appStateReducer = (state: IAppState, action: IAppStateAction) => {
  switch (action.type) {
    case ActionType.SET_COLOR_MODE:
      return { ...state, colorMode: action.payload };
    default:
      return state;
  }
};
