import { Dispatch, AnyAction } from "redux";
export declare const ProfileActions: {
    UPDATE_STATE_GET_USER_PROFILE: string;
};
export declare const updateStateGetUserProfile: import("redux-actions").ActionFunction1<import("../payload").NetworkPayload<{
    profile: import("..").Profile;
}>, import("redux-actions").Action<import("../payload").NetworkPayload<{
    profile: import("..").Profile;
}>>>;
export declare const getUserProfile: () => (dispatch: Dispatch<AnyAction>) => Promise<void>;
