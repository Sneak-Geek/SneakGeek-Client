//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { AuthProvider, AuthPayload, ApiRequestPayload, ApiRequestState } from "../types";
import { createAction } from "redux-actions";
import { ObjectFactory, FactoryKey } from "../loader/factory";
import {
  IAccountService,
  ISettingsProvider,
  SettingsKey,
  IFacebookSDK
} from "../loader/interfaces";

export namespace AccountActions {
  export const Names = {
    UPDATE_AUTH_STATE: "UPDATE_AUTH_STATE",
    UPDATE_GET_USER_PROFILE_STATE: "UPDATE_GET_USER_PROFILE_STATE",
    UPDATE_UPDATE_USER_PROFILE_STATE: "UPDATE_UPDATE_USER_PROFILE_STATE"
  };

  export const updateAuthState = createAction<ApiRequestPayload<AuthPayload>>(
    Names.UPDATE_AUTH_STATE
  );

  export const onPremAuth = (accessToken: string, provider: AuthProvider) => {
    return async (dispatch: Function) => {
      dispatch(
        updateAuthState({
          state: ApiRequestState.NOT_STARTED,
          data: {
            authType: "OnPrem"
          }
        })
      );

      const accountService = ObjectFactory.getObjectInstance<IAccountService>(
        "IAccountService"
      );
      const settings = ObjectFactory.getObjectInstance<ISettingsProvider>(
        FactoryKey.ISettingsProvider
      );

      try {
        const accountPayload = await accountService.login(accessToken, provider);
        if (accountPayload) {
          await settings.setValue(SettingsKey.CurrentAccessToken, accountPayload.token);
          await settings.loadServerSettings();

          dispatch(
            updateAuthState({
              state: ApiRequestState.SUCCESS,
              data: {
                authType: "OnPrem",
                account: accountPayload.user
              }
            })
          );
        }
      } catch (error) {
        dispatch(
          updateAuthState({
            state: ApiRequestState.FAILED,
            error,
            data: {
              authType: "OnPrem"
            }
          })
        );
      }
    };
  };

  export const clientAuth = (provider: AuthProvider) => {
    return async (dispatch: Function) => {
      switch (provider) {
        case "facebook":
          return dispatch(facebookClientAuth());
        case "google":
          return dispatch(googleClientAuth());
        default:
          return;
      }
    };
  };

  export const facebookClientAuth = () => {
    return async (dispatch: Function) => {
      const permissions = ["public_profile", "email"];
      const fbSdk = ObjectFactory.getObjectInstance<IFacebookSDK>(FactoryKey.IFacebookSDK);
      try {
        const loginResult = await fbSdk.loginWithPermission(permissions);

        if (loginResult.isCancelled) {
          dispatch(
            updateAuthState({
              state: ApiRequestState.CANCELED,
              error: "User canceled",
              data: {
                authType: "ThirdParty"
              }
            })
          );
        } else {
          const accessToken = await fbSdk.getCurrentAccessToken();
          dispatch(onPremAuth(accessToken, "facebook"));
        }
      } catch (error) {
        dispatch(
          updateAuthState({
            state: ApiRequestState.FAILED,
            error,
            data: { authType: "ThirdParty" }
          })
        );
      }
    };
  };

  export const googleClientAuth = () => {};
}
