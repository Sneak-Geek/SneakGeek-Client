//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { Account } from "../../Reducers";

export type AuthProvider = "facebook" | "google";
export type AccountPayload = { user: Account; token: string };

export interface IAuthenticationService {
  login(token: string, provider: AuthProvider): Promise<AccountPayload | undefined>;
  getCurrentUser(accessToken: string): Promise<AccountPayload | undefined>;
}
