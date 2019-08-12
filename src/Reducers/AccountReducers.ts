//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { handleActions, Action } from "redux-actions";
import * as Actions from "../Actions";

export interface Account {
  provider: "facebook" | "google";
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
    middleName: string;
  };
  photos: [{ value: string }];
}

export interface IAccountState {
  currentAccount: Account | null;
  isAuthenticating: boolean;
  authenticationError?: any;
  isAuthenticatingWithFacebook: boolean;
  isAuthenticationCancelled: boolean;
}

let initialState = {
  currentAccount: null,
  isAuthenticating: false,
  authenticationError: null,
  isAuthenticatingWithFacebook: false,
  isAuthenticationCancelled: false
};

export const AccountReducers = handleActions<IAccountState, any>(
  {
    [`${Actions.vsnkrsAuthenticate}`]: (state: IAccountState, _action: Action<any>) => {
      return Object.assign(state, { isAuthenticating: true, authenticationError: null });
    },
    [`${Actions.cancelThirdPartyAuthentication}`]: (
      state: IAccountState,
      _action: Action<any>
    ) => {
      return Object.assign(state, { isAuthenticationCancelled: true, isAuthenticating: false });
    },
    [`${Actions.authenticationComplete}`]: (state: IAccountState, action: Action<Account>) => {
      return Object.assign(state, { currentAccount: action.payload, isAuthenticating: false });
    },
    [`${Actions.authenticationError}`]: (state: IAccountState, action: Action<any>) => {
      return Object.assign(state, {
        authenticationError: action.payload,
        isAuthenticating: false
      });
    }
  },
  initialState
);
