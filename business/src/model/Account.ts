import { Profile } from "./Profile";

export type Account = {
<<<<<<< HEAD
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
};
||||||| merged common ancestors
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
};
=======
    isVerified: boolean;
    accessLevel: number;
    _id: string;
    profile: string | Partial<Profile>;
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
};
>>>>>>> master
