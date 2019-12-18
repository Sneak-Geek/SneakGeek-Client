//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { handleActions, Action } from "redux-actions";
import * as Actions from "../Actions";
import { Account, Profile } from "../Shared/Model";
import {
  GetUserProfilePayload,
  UpdateUserProfilePayload,
  CheckAccountWithEmailPayload
} from "../Shared/Payload";
import { NetworkRequestState } from "../Shared/State";

export interface IAccountState {
  currentAccount: Account | null;
  userProfileState: {
    state: NetworkRequestState;
    profile?: Profile;
    error?: any;
  };
  updateProfileState: {
    state: NetworkRequestState;
    error?: any;
  };
  checkAccountWithEmailState: {
    state: NetworkRequestState;
    error?: any;
    existStatus?: boolean;
  };
  isAuthenticating: boolean;
  authenticationError?: any;
  isAuthenticatingWithFacebook: boolean;
  isAuthenticationCancelled: boolean;
}

let initialState: IAccountState = {
  currentAccount: null,
  userProfileState: {
    state: NetworkRequestState.NOT_STARTED
  },
  updateProfileState: {
    state: NetworkRequestState.NOT_STARTED
  },
  checkAccountWithEmailState: {
    state: NetworkRequestState.NOT_STARTED
  },
  isAuthenticating: false,
  authenticationError: null,
  isAuthenticatingWithFacebook: false,
  isAuthenticationCancelled: false
};

export const AccountReducers = handleActions<IAccountState, any>(
  {
    [`${Actions.onPremAuthenticate}`]: (state: IAccountState, _action: Action<any>) => {
      return Object.assign(state, { isAuthenticating: true, authenticationError: null });
    },
    [`${Actions.cancelThirdPartyAuthentication}`]: (
      state: IAccountState,
      _action: Action<any>
    ) => {
      return Object.assign(state, {
        isAuthenticationCancelled: true,
        isAuthenticating: false
      });
    },
    [`${Actions.authenticationComplete}`]: (
      state: IAccountState,
      action: Action<Account>
    ) => {
      return Object.assign(state, {
        currentAccount: action.payload,
        isAuthenticating: false
      });
    },
    [`${Actions.authenticationError}`]: (state: IAccountState, action: Action<any>) => {
      return Object.assign(state, {
        authenticationError: action.payload,
        isAuthenticating: false
      });
    },
    [`${Actions.updateStateGetUserProfile}`]: (
      state: IAccountState,
      action: Action<GetUserProfilePayload>
    ) => ({
      ...state,
      userProfileState: {
        ...state.userProfileState,
        ...action.payload
      }
    }),
    [`${Actions.updateStateUpdateUserProfile}`]: (
      state: IAccountState,
      action: Action<UpdateUserProfilePayload>
    ) => ({
      ...state,
      updateProfileState: {
        ...state.updateProfileState,
        ...action.payload
      }
    }),
    [`${Actions.updateStateCheckAccountWithEmail}`]: (
      state: IAccountState,
      action: Action<CheckAccountWithEmailPayload>
    ) => ({
      ...state,
      checkAccountWithEmailState: {
        ...state.checkAccountWithEmailState,
        ...action.payload
      }
    })
  },
  initialState
);
