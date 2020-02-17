import { NetworkRequestState } from "../payload";
import { Profile } from "../model";
export declare type IProfileState = {
    profileState: {
        state: NetworkRequestState;
        error?: any;
        profile?: Profile;
    };
};
export declare const initialProfileState: IProfileState;
export declare const ProfileReducers: import("redux-actions").ReduxCompatibleReducer<IProfileState, any>;
