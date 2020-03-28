import { Dispatch, AnyAction } from "redux";
export declare const ProfileActions: {
    UPDATE_STATE_GET_USER_PROFILE: string;
    SET_PROFILE: string;
};
export declare const updateStateGetUserProfile: any;
export declare const updateProfile: any;
export declare const getUserProfile: () => (dispatch: Dispatch<AnyAction>) => Promise<void>;
