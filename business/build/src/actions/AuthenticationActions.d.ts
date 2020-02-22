import { Dispatch } from "redux";
export declare const AuthenticationActions: {
    UPDATE_AUTHENTICATION_STATE: string;
};
export declare const updateAuthenticationState: import("redux-actions").ActionFunction1<import("../payload").NetworkPayload<{
    user: import("..").Account;
    token: string;
}>, import("redux-actions").Action<import("../payload").NetworkPayload<{
    user: import("..").Account;
    token: string;
}>>>;
export declare const getCurrentUser: () => (dispatch: Dispatch<any>) => Promise<void>;
export declare const authenticateWithEmail: (email: string, password: string) => (dispatch: Function) => Promise<void>;
