import { Account, Profile, Catalog } from "../model";
export declare enum NetworkRequestState {
    NOT_STARTED = 0,
    REQUESTING = 1,
    SUCCESS = 2,
    FAILED = 3
}
export declare type NetworkPayload<T> = {
    state: NetworkRequestState;
    error?: any;
    data?: T;
};
export declare type AuthenticationPayload = NetworkPayload<{
    user: Account;
    token: string;
}>;
export declare type GetUserProfilePayload = NetworkPayload<{
    profile: Profile;
}>;
export declare type CatalogPayload = NetworkPayload<Catalog[]>;
