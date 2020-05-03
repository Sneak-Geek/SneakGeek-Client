//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { IAccountService } from "./IAccountService";
import { AuthProvider } from "../../../types";
import { Account, Profile } from "../../../model";
import { BaseService } from "../BaseService";
import HttpStatus from "http-status";

export class AccountService extends BaseService implements IAccountService {
  public async emailAuth(
    email: string,
    password: string,
    isSignUp: boolean = false
  ): Promise<{ account: Account; token: string } | undefined> {
    const endpoint = isSignUp ? `/account/auth/email/signup` : `/account/auth/email/login`;
    const response = await this.apiClient.getInstance().post(
      endpoint,
      { email, password },
      {
        headers: {
          "Access-Control-Request-Method": "POST",
        },
      }
    );

    if (
      response &&
      (response.status === HttpStatus.CREATED || response.status === HttpStatus.OK)
    ) {
      return response.data;
    }

    return undefined;
  }

  public async login(
    token: string,
    provider: AuthProvider
  ): Promise<{ account: Account; token: string } | undefined> {
    const headers = { access_token: token };
    const response = await this.apiClient
      .getInstance()
      .post(`/account/auth/${provider}`, {}, { headers });
    {
    }
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
  ): Promise<{ account: Account; token: string } | undefined> {
    const headers = { authorization: accessToken };
    const response = await this.apiClient.getInstance().get(`/account`, { headers });

    if (response && response.status === HttpStatus.OK) {
      return response.data;
    }

    return undefined;
  }

  public async getUserProfile(accessToken: string): Promise<Profile | undefined> {
    const headers = { authorization: accessToken };
    const response = await this.apiClient.getInstance().get("/profile", { headers });

    if (response && response.status === HttpStatus.OK) {
      return response.data.profile;
    }

    return undefined;
  }

  public async updateProfile(token: string, profile: Partial<Profile>): Promise<Profile> {
    const response = await this.apiClient.getInstance().put("/profile/update", profile, {
      headers: {
        authorization: token,
      },
    });

    return response.data.profile as Profile;
  }
}
