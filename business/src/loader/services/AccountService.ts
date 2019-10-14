//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { IAccountService } from "../interfaces";
import { Account, Profile, AuthProvider } from "../../types";
import { ApiClient } from "./ApiClient";
import { ObjectFactory, FactoryKey } from "../factory";
import { IEnvVar } from "../interfaces";
import HttpStatus from "http-status";

export class AccountService implements IAccountService {
  private apiClient: ApiClient.Instance;

  public constructor() {
    this.apiClient = new ApiClient.Builder()
      .registerDevState(ObjectFactory.getObjectInstance<IEnvVar>(FactoryKey.IEnvVar).__DEV__)
      .registerDevUrl("http://localhost:8080/api/v1")
      .registerProdUrl("")
      .build();
  }

  public async login(
    token: string,
    provider: AuthProvider
  ): Promise<{ user: Account; token: string } | undefined> {
    const headers = { access_token: token };
    const response = await this.apiClient
      .getInstance()
      .post(`/account/${provider}`, {}, { headers });

    if (
      response &&
      (response.status === HttpStatus.CREATED || response.status === HttpStatus.OK)
    ) {
      return response.data;
    }

    return undefined;
  }
  public async getCurrentUser(
    accessToken: string
  ): Promise<{ user: Account; token: string } | undefined> {
    const headers = { authorization: accessToken };
    const response = await this.apiClient.getInstance().get(`/account/get`, { headers });

    if (response && response.status === HttpStatus.OK) {
      return response.data;
    }

    return undefined;
  }

  public async getUserProfile(accessToken: string): Promise<Profile | undefined> {
    const headers = { authorization: accessToken };
    const response = await this.apiClient.getInstance().get("/profile", { headers });

    if (response && response.status === HttpStatus.OK) {
      return response.data;
    }

    return undefined;
  }
}
