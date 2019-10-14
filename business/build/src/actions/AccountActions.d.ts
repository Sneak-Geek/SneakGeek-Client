import { AuthPayload, ApiRequestPayload } from "../types";
export declare namespace AccountActions {
    const Names: {
        UPDATE_AUTH_STATE: string;
        UPDATE_GET_USER_PROFILE_STATE: string;
        UPDATE_UPDATE_USER_PROFILE_STATE: string;
    };
    const updateAuthState: import("redux-actions").ActionFunction1<ApiRequestPayload<AuthPayload>, import("redux-actions").Action<ApiRequestPayload<AuthPayload>>>;
    const onPremAuth: (accessToken: string, provider: "facebook" | "google") => (dispatch: Function) => Promise<void>;
    const clientAuth: (provider: "facebook" | "google") => (dispatch: Function) => Promise<any>;
    const facebookClientAuth: () => (dispatch: Function) => Promise<void>;
    const googleClientAuth: () => void;
}
