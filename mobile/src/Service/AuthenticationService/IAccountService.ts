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
  addOnwedShoes(
    accessToken: string,
    shoeId: string,
    owned: Array<{ shoeSize: string; number: number }>
  ): Promise<boolean>;
  signupEmail(email: string, password: string): Promise<AccountPayload | undefined>;
  loginEmail(email: string, password: string): Promise<AccountPayload | undefined>;
  requestToken(email: string): Promise<any>;
  verifyToken(email: string, token: string): Promise<any>;
  setNewPassword(email: string, token: string, newPassword: string): Promise<boolean>;
  checkEmail(emai: string): Promise<any>;
}
