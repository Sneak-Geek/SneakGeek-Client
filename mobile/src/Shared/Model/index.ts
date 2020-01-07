//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

export interface Profile {
  _id: string;
  accountId: string;
  favoriteShoes: string[];
  ownedShoes: Array<{
    shoeId: string;
    owned: Array<{ number: number; shoeSize: string }>;
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
  userProvidedProfilePic?: string;
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

export type Transaction = {
  shoeId: string;
  shoeSize?: string;
  shoeCondition?: string;
  boxCondition?: string;
  isShoeTainted?: boolean;
  isOutSoleWorn?: boolean;
  isInsoleWorn?: boolean;
  isHeavilyTorn?: boolean;
  otherDetail?: string;
  currentPrice?: number;
  sellDuration?: { duration: number; unit: string };
  sellDeadline?: Date;
  shoePictures?: string[];
  createdAt?: Date;
};

export type Shoe = {
  _id: string;
  brand: string;
  category: string;
  colorway: string[];
  name: string;
  description?: string;
  imageUrl?: string;
  shoe: string;
  urlKey: string;
  title: string;

  // indexing Shoe purpose only
  [key: string]: any;
};
