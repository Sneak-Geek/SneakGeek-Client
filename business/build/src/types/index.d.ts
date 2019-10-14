export declare type AuthProvider = "facebook" | "google";
export declare enum ApiRequestState {
    NOT_STARTED = 0,
    REQUESTING = 1,
    SUCCESS = 2,
    CANCELED = 3,
    FAILED = 4
}
export interface Profile {
    _id: string;
    accountId: string;
    favoriteShoes: string[];
    ownedShoes: Array<{
        shoeId: string;
        owned: Array<{
            number: number;
            shoeSize: string;
        }>;
    }>;
    userProvidedName?: {
        firstName: string;
        middleName: string;
        lastName: string;
    };
    userProvidedAddress?: string;
    userProvidedGender?: string;
    userProvidedShoeSize?: string;
    userProvidedEmail?: string;
    userProvidedPhoneNumber?: string;
}
export interface Account {
    isVerified: boolean;
    accessLevel: number;
    _id: string;
    profileId: string;
    createdAt: string;
    updatedAt: string;
    accountProvider: "facebook" | "google";
    accountIdByProvider: string;
    accountNameByProvider: {
        familyName: string;
        givenName: string;
        middleName: string;
    };
    accountGenderByProvider: string;
    accountEmailByProvider: string;
    accountProfilePicByProvider: string;
    isAuthenticating: boolean;
    authenticationError: any;
    isAuthenticatingWithFacebook: boolean;
    isAuthenticationCancelled: boolean;
}
export declare type ApiRequestPayload<T> = {
    state: ApiRequestState;
    error?: any;
    data: T;
};
export declare type AuthType = "ThirdParty" | "OnPrem";
export declare type AuthPayload = {
    authType: AuthType;
    account?: Account;
};
