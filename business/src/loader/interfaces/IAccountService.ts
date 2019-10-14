//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { AuthProvider, Profile, Account } from "../../types";

export interface IAccountService {
  login(
    token: string,
    provider: AuthProvider
  ): Promise<{ user: Account; token: string } | undefined>;
  getCurrentUser(accessToken: string): Promise<{ user: Account; token: string } | undefined>;
  getUserProfile(accessToken: string): Promise<Profile | undefined>;
}
