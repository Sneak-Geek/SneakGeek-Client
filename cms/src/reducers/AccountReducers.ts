//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { handleActions, Action } from "redux-actions";
import { AccountActions } from "business";

export type IAccountState = {
  authenticationStatus: number;
};

const initialState: IAccountState = {
  authenticationStatus: 0
};

export const AccountReducers = handleActions<IAccountState, any>(
  {
    [`${AccountActions.updateAuthState}`]: (state, action: Action<any>) => {
      return state;
    }
  },
  initialState
);
