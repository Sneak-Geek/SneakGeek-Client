//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { createAction } from "redux-actions";
import { invariant } from "ts-invariant";
import { Account, Profile } from "../Shared/Model";
import { LoginManager, LoginResult, AccessToken } from "react-native-fbsdk";
import { GoogleSignin, User as GoogleUser } from "react-native-google-signin";
import AppConfig from "../Config/ThirdParty";
import { container, Types } from "../Config/Inversify";
import { IAccountService } from "../Service/AuthenticationService";
import { IAppSettingsService, SettingsKeys } from "../Service/AppSettingsService";
import { showNotification } from "./NotificationActions";
import { GetUserProfilePayload, UpdateUserProfilePayload } from "../Shared/Payload";
import { NetworkRequestState } from "../Shared/State";

export module AccountActions {
  export const AUTHENTICATE_ERROR = "AUTHENTICATION_ERROR";
  export const AUTHENTICATE_VSNKRS = "AUTHENTICATE_VSNKRS";
  export const AUTHENTICATION_COMPLETE = "AUTHENTICATION_COMPLETE";
  export const THIRD_PARTY_CANCELED_AUTH = "THIRD_PARTY_CANCELED_AUTH";
  export const GO_TO_LOGIN = "GO_TO_LOGIN";
  export const UPDATE_GET_USER_PROFILE = "UPDATE_GET_USER_PROFILE";
  export const UPDATE_UPDATE_USER_PROFILE = "UPDATE_UPDATE_USER_PROFILE";
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
export const updateGetUserProfile = createAction<GetUserProfilePayload>(
  AccountActions.UPDATE_GET_USER_PROFILE
);
export const updateUpdateUserProfile = createAction<UpdateUserProfilePayload>(
  AccountActions.UPDATE_UPDATE_USER_PROFILE
);

export const notifyLoginSuccess = () => {
  return (dispatch: Function) => {
    dispatch(showNotification("Đăng nhập thành công"));
  };
};

export const authenticateVsnkrsService = (
  accessToken: string,
  provider: "facebook" | "google"
) => {
  return async (dispatch: Function) => {
    dispatch(vsnkrsAuthenticate);
    try {
      const accountService = container.get<IAccountService>(Types.IAccountService);
      const settings = container.get<IAppSettingsService>(Types.IAppSettingsService);

      const accountPayload = await accountService.login(accessToken, provider);
      if (accountPayload) {
        await settings.setValue(SettingsKeys.CurrentAccessToken, accountPayload.token);
        await settings.loadServerSettings();

        await dispatch(getUserProfile(accountPayload.token));
        dispatch(authenticationComplete(accountPayload.user));
        dispatch(notifyLoginSuccess());
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
      const accountService = container.get<IAccountService>(Types.IAccountService);
      const accountPayload = await accountService.getCurrentUser(accessToken);

      dispatch(getUserProfile(accessToken));

      if (accountPayload) {
        dispatch(notifyLoginSuccess());
        dispatch(authenticationComplete(accountPayload.user));
      }
    } catch (error) {
      dispatch(authenticationError(error));
    }
  };
};

export const getUserProfile = (accessToken: string) => {
  return async (dispatch: Function) => {
    dispatch(updateGetUserProfile({ state: NetworkRequestState.REQUESTING }));
    try {
      const accountService = container.get<IAccountService>(Types.IAccountService);
      const userProfile = await accountService.getUserProfile(accessToken);

      if (userProfile) {
        dispatch(
          updateGetUserProfile({ state: NetworkRequestState.SUCCESS, profile: userProfile })
        );
      }
    } catch (error) {
      dispatch(updateGetUserProfile({ state: NetworkRequestState.FAILED, error }));
    }
  };
};

export const updateUserProfile = (data: Partial<Profile>) => {
  return async (dispatch: Function) => {
    dispatch(updateUpdateUserProfile({ state: NetworkRequestState.REQUESTING }));
    try {
      const appSettings = container.get<IAppSettingsService>(Types.IAppSettingsService);
      const accountService = container.get<IAccountService>(Types.IAccountService);
      const accessToken = appSettings.getSettings().CurrentAccessToken as string;

      const result: boolean = await accountService.updateUserProfile(accessToken, data);

      if (result) {
        await dispatch(getUserProfile(accessToken));
        dispatch(showNotification("Cập nhật hồ sơ cá nhân thành công"));
        dispatch(updateUpdateUserProfile({ state: NetworkRequestState.SUCCESS }));
      }
    } catch (error) {
      dispatch(updateUpdateUserProfile({ state: NetworkRequestState.FAILED, error }));
    }
  };
};

export const addOwnedShoe = (
  shoeId: string,
  owned: Array<{ shoeSize: string; number: number }>
) => {
  return async (dispatch: Function) => {
    try {
      const appSettings = container.get<IAppSettingsService>(Types.IAppSettingsService);
      const accountService = container.get<IAccountService>(Types.IAccountService);
      const accessToken = appSettings.getSettings().CurrentAccessToken;

      if (accessToken) {
        const success: boolean = await accountService.addOnwedShoes(accessToken, shoeId, owned);

        if (success) {
          dispatch(showNotification("Đã thêm thành công"));
          dispatch(getUserProfile(accessToken));
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
};
