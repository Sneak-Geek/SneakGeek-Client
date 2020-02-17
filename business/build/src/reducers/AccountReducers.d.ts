import { NetworkRequestState } from "../payload";
import { Account } from "../model";
export declare type IAccountState = {
    accountState: {
        state: NetworkRequestState;
        error?: any;
        account?: Account;
    };
};
export declare const initialAccountState: IAccountState;
export declare const AccountReducers: import("redux-actions").ReduxCompatibleReducer<IAccountState, any>;
