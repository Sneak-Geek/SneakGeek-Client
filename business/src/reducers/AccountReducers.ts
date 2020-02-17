import { NetworkRequestState, AuthenticationPayload } from "../payload";
import { Account } from "../model";
import { handleActions, Action } from "redux-actions";
import { updateAuthenticationState } from "../actions/AuthenticationActions";

export type IAccountState = {
  accountState: {
    state: NetworkRequestState;
    error?: any;
    account?: Account;
  };
};

export const initialAccountState: IAccountState = {
  accountState: {
    state: NetworkRequestState.NOT_STARTED
  }
};

export const AccountReducers = handleActions<IAccountState, any>(
  {
    [`${updateAuthenticationState}`]: (state: IAccountState, action: Action<AuthenticationPayload>) => ({
      ...state,
      accountState: {
        state: action.payload.state,
        error: action.payload.error,
        account: action.payload.data?.user
      }
    })
  },
  initialAccountState
);
