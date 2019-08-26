// !
// ! Copyright (c) 2019 - SneakGeek. All rights reserved
// !

import ApiClient from "../ApiClient";
import * as HttpStatus from "http-status";
import { IAuthenticationService, AuthProvider, AccountPayload } from "./IAuthenticationService";
import { injectable } from "inversify";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  public async /** throws */ login(
    token: string,
    provider: AuthProvider
  ): Promise<AccountPayload | undefined> {
    const headers = { access_token: token };
    const response = await ApiClient.post(`/account/${provider}`, {}, { headers });
    if (response && response.status === HttpStatus.CREATED) {
      return response.data as AccountPayload;
    }

    return undefined;
  }

  public async /** override */ getCurrentUser(
    accessToken: string
  ): Promise<AccountPayload | undefined> {
    const headers = { authorization: accessToken };
    const response = await ApiClient.post(`/account/get`, { headers });
    if (response && response.status === HttpStatus.OK) {
      return response.data as AccountPayload;
    }

    return undefined;
  }
}
