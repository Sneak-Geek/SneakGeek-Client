// !
// ! Copyright (c) 2019 - SneakGeek. All rights reserved
// !

import ApiClient from "../ApiClient";
import * as HttpStatus from "http-status";
import { IAccountService, AuthProvider, AccountPayload } from "./IAccountService";
import { injectable } from "inversify";
import { Profile } from "../../Shared/Model";

@injectable()
export class AccountService implements IAccountService {
  public async /** override */ login(
    token: string,
    provider: AuthProvider
  ): Promise<AccountPayload | undefined> {
    const headers = { access_token: token };
    const response = await ApiClient.post(`/account/${provider}`, {}, { headers });

    if (
      response &&
      (response.status === HttpStatus.CREATED || response.status === HttpStatus.OK)
    ) {
      return response.data as AccountPayload;
    }

    return undefined;
  }

  public async /** override */ getCurrentUser(
    accessToken: string
  ): Promise<AccountPayload | undefined> {
    const headers = { authorization: accessToken };
    const response = await ApiClient.get(`/account/get`, { headers });
    if (response && response.status === HttpStatus.OK) {
      return response.data as AccountPayload;
    }

    return undefined;
  }

  public async /** override */ addOnwedShoes(
    accessToken: string,
    shoeId: string,
    owned: Array<{ shoeSize: string; number: number }>
  ): Promise<boolean> {
    const headers = { authorization: accessToken };
    const response = await ApiClient.put(`/profile/own`, { shoeId, owned }, { headers });
    if (response && response.status === HttpStatus.OK) {
      return true;
    }

    return false;
  }

  public async /** override */ getUserProfile(
    accessToken: string
  ): Promise<Profile | undefined> {
    const headers = { authorization: accessToken };
    const response = await ApiClient.get("/profile", { headers });
    if (response && response.status === HttpStatus.OK) {
      return response.data;
    }

    return undefined;
  }

  public async /** override */ updateUserProfile(
    accessToken: string,
    newProfile: Partial<Profile>
  ): Promise<boolean> {
    const headers = { authorization: accessToken };
    const response = await ApiClient.put("/profile/update", newProfile, { headers });

    if (response && response.status === HttpStatus.OK) {
      return true;
    }

    return false;
  }
}
