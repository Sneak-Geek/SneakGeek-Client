//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { AuthProvider } from "../../types";
import { Profile, Account } from "../../model";

export interface IAccountService {
  login(
    token: string,
    provider: AuthProvider
  ): Promise<{ user: Account; token: string } | undefined>;
  emailAuth: (
    email: string,
    password: string,
    isSignUp: boolean
  ) => Promise<{ user: Account; token: string } | undefined>;
  getCurrentUser(
    accessToken: string
  ): Promise<{ user: Account; token: string } | undefined>;
  getUserProfile(accessToken: string): Promise<Profile | undefined>;
  updateProfile(token: string, userProfile: Partial<Profile>): Promise<Profile>;
}
