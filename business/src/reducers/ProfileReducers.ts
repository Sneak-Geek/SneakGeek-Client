import { NetworkRequestState, GetUserProfilePayload } from "../payload";
import { Profile } from "../model";
import { handleActions, Action } from "redux-actions";
import { updateStateGetUserProfile } from "../actions";

export type IProfileState = {
  profileState: {
    state: NetworkRequestState;
    error?: any;
    profile?: Profile;
  };
};

export const initialProfileState: IProfileState = {
  profileState: {
    state: NetworkRequestState.NOT_STARTED
  }
};

export const ProfileReducers = handleActions<IProfileState, any>(
  {
    [`${updateStateGetUserProfile}`]: (state: IProfileState, action: Action<GetUserProfilePayload>) => ({
      ...state,
      accountState: {
        state: action.payload.state,
        error: action.payload.error,
        account: action.payload.data?.profile
      }
    })
  },
  initialProfileState
);
