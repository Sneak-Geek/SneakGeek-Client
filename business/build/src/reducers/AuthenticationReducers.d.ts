import { NetworkRequestState } from "../payload";
import { Account } from "../model";
export declare type IAuthenticationState = {
    accountState: {
        state: NetworkRequestState;
        error?: any;
        account?: Account;
    };
};
export declare const initialAccountState: IAuthenticationState;
export declare const AccountReducers: import("redux-actions").ReduxCompatibleReducer<IAuthenticationState, any>;
