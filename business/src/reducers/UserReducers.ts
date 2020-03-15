import {
  NetworkRequestState,
  AuthenticationPayload,
  GetUserProfilePayload
} from "../payload";
import { Account, Profile } from "../model";
import { handleActions, Action } from "redux-actions";
import { updateAuthenticationState } from "../actions/AuthenticationActions";
import { updateStateGetUserProfile } from "../actions";

export type IUserState = {
  accountState: {
    state: NetworkRequestState;
    error?: any;
    account?: Account;
  };
  profileState: {
    state: NetworkRequestState;
    error?: any;
    profile?: Profile;
  };
};

export const initialUserState: IUserState = {
  accountState: {
    state: NetworkRequestState.NOT_STARTED
  },
  profileState: {
    state: NetworkRequestState.NOT_STARTED
  }
};

export const UserReducers = handleActions<IUserState, any>(
  {
    [`${updateAuthenticationState}`]: (
      state: IUserState,
      action: Action<AuthenticationPayload>
    ) => ({
      ...state,
      accountState: {
        state: action.payload.state,
        error: action.payload.error,
        account: action.payload.data?.user
      }
    }),
    [`${updateStateGetUserProfile}`]: (
      state: IUserState,
      action: Action<GetUserProfilePayload>
    ) => ({
      ...state,
      profileState: {
        state: action.payload.state,
        error: action.payload.error,
        profile: action.payload.data?.profile
      }
    })
  },
  initialUserState
);
