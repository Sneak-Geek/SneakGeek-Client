import { NetworkRequestState } from "../payload";
import { Account, Profile } from "../model";
export declare type IUserState = {
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
export declare const initialUserState: IUserState;
export declare const UserReducers: any;
