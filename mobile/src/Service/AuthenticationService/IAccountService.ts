//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { Account, Profile } from "../../Shared/Model";

export type AuthProvider = "facebook" | "google";
export type AccountPayload = { user: Account; token: string };

export interface IAccountService {
  login(token: string, provider: AuthProvider): Promise<AccountPayload | undefined>;
  getCurrentUser(accessToken: string): Promise<AccountPayload | undefined>;
  getUserProfile(accessToken: string): Promise<Profile | undefined>;
  updateUserProfile(accessToken: string, newProfile: Partial<Profile>): Promise<boolean>;
  addOnwedShoes(accessToken: string, shoeId: string): Promise<boolean>;
}
