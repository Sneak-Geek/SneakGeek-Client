// !
// ! Copyright (c) 2019 - SneakGeek. All rights reserved
// !

import { Account } from "../Reducers";
import ApiClient from "../Service/ApiClient";
import * as HttpStatus from "http-status";

export type AuthProvider = "facebook" | "google";

export class AuthenticationService {
  public static async /** throws */ login(
    token: string,
    provider: AuthProvider
  ): Promise<Account | undefined> {
    const headers = { access_token: token };
    const response = await ApiClient.post(`/account/${provider}`, {}, { headers });
    if (response && response.status === HttpStatus.CREATED) {
      const account: Account = response.data.user;
      return account;
    }

    return undefined;
  }
}
