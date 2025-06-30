export interface IAppState {
  sharedState: object | null;
}

export const initialState: IAppState = {
  sharedState: null,
};

export enum ActionType {
  SET_SHARED_STATE = "SET_SHARED_STATE",
}

export type IAppStateAction = {
  type: ActionType.SET_SHARED_STATE;
  payload: object;
};

export const appStateReducer = (state: IAppState, action: IAppStateAction) => {
  switch (action.type) {
    case ActionType.SET_SHARED_STATE:
      return { ...state, sharedState: action.payload };
    default:
      return state;
  }
};
