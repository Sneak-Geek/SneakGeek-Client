import { Dispatch } from "redux";
export declare const AuthenticationActions: {
    UPDATE_AUTHENTICATION_STATE: string;
};
export declare const updateAuthenticationState: any;
export declare const getCurrentUser: () => (dispatch: Dispatch<any>) => Promise<void>;
export declare const authenticateWithEmail: (email: string, password: string, isSignUp?: boolean) => (dispatch: Function) => Promise<void>;
export declare const authenticateWithFb: () => (dispatch: Function) => Promise<void>;
