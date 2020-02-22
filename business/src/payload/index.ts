import { Account, Profile } from "../model";

export enum NetworkRequestState {
    NOT_STARTED,
    REQUESTING,
    SUCCESS,
    FAILED
}

export type NetworkPayload<T> = {
    state: NetworkRequestState;
    error?: any;
    data?: T
};

export type AuthenticationPayload = NetworkPayload<{ user: Account, token: string }>;
export type GetUserProfilePayload = NetworkPayload<{ profile: Profile }>;