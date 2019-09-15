//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { createAction } from "redux-actions";
import { invariant } from "ts-invariant";
import { Account } from "../Reducers";
import { LoginManager, LoginResult, AccessToken } from "react-native-fbsdk";
import { GoogleSignin, User as GoogleUser } from "react-native-google-signin";
import AppConfig from "../Config/ThirdParty";
import { container, Types } from "../Config/Inversify";
import { IAuthenticationService } from "../Service/AuthenticationService";
import { IAppSettingsService, SettingsKeys } from "../Service/AppSettingsService";

export module AccountActions {
  export const AUTHENTICATE_ERROR = "AUTHENTICATION_ERROR";
  export const AUTHENTICATE_VSNKRS = "AUTHENTICATE_VSNKRS";
  export const AUTHENTICATION_COMPLETE = "AUTHENTICATION_COMPLETE";
  export const THIRD_PARTY_CANCELED_AUTH = "THIRD_PARTY_CANCELED_AUTH";
  export const GO_TO_LOGIN = "GO_TO_LOGIN";
}

export const cancelThirdPartyAuthentication = createAction<"facebook" | "google">(
  AccountActions.THIRD_PARTY_CANCELED_AUTH
);
export const authenticationError = createAction(AccountActions.AUTHENTICATE_ERROR);
export const vsnkrsAuthenticate = createAction(AccountActions.AUTHENTICATE_VSNKRS);
export const authenticationComplete = createAction<Account>(
  AccountActions.AUTHENTICATION_COMPLETE
);
export const goToLogin = createAction(AccountActions.GO_TO_LOGIN);

export const authenticateVsnkrsService = (
  accessToken: string,
  provider: "facebook" | "google"
) => {
  return async (dispatch: Function) => {
    dispatch(vsnkrsAuthenticate);
    try {
      const authService = container.get<IAuthenticationService>(Types.IAuthenticationService);
      const settings = container.get<IAppSettingsService>(Types.IAppSettingsService);

      const accountPayload = await authService.login(accessToken, provider);
      if (accountPayload) {
        await settings.setValue(SettingsKeys.CurrentAccessToken, accountPayload.token);
        await settings.loadServerSettings();
        dispatch(authenticationComplete(accountPayload.user));
      }
    } catch (error) {
      dispatch(authenticationError(error));
    }
  };
};

export const authenticate = (provider: "facebook" | "google") => {
  return async (dispatch: Function) => {
    if (provider === "facebook") {
      dispatch(facebookAuthenticate());
    } else {
      dispatch(googleAuthenticate());
    }
  };
};

export const facebookAuthenticate = () => {
  return async (dispatch: Function) => {
    try {
      const permissions = ["public_profile", "email"];
      const result: LoginResult = await LoginManager.logInWithPermissions(permissions);

      if (result.isCancelled) {
        dispatch(cancelThirdPartyAuthentication("facebook"));
      } else {
        const data = (await AccessToken.getCurrentAccessToken()) as AccessToken;
        invariant(data !== null);
        dispatch(authenticateVsnkrsService(data.accessToken.toString(), "facebook"));
      }
    } catch (error) {
      dispatch(authenticationError(error));
    }
  };
};

export const googleAuthenticate = () => {
  return async (dispatch: Function) => {
    try {
      await GoogleSignin.configure({
        webClientId: AppConfig.GOOGLE_WEB_CLIENT_ID,
        offlineAccess: true,
        forceConsentPrompt: true
      });
      await GoogleSignin.hasPlayServices();
      const userInfo: GoogleUser = await GoogleSignin.signIn();
      if (userInfo && userInfo.idToken) {
        dispatch(authenticateVsnkrsService(userInfo.idToken, "google"));
      }
    } catch (error) {
      dispatch(authenticationError(error));
    }
  };
};

export const getCurrentUser = (accessToken: string) => {
  return async (dispatch: Function) => {
    try {
      const authService = container.get<IAuthenticationService>(Types.IAuthenticationService);
      const accountPayload = await authService.getCurrentUser(accessToken);

      if (accountPayload) {
        dispatch(authenticationComplete(accountPayload.user));
      }
    } catch (error) {
      dispatch(authenticationError(error));
    }
  };
};
