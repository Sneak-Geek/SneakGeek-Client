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
import {
  GetUserProfilePayload,
  UpdateUserProfilePayload,
  CheckAccountWithEmailPayload
} from "../Shared/Payload";
import { NetworkRequestState } from "../Shared/State";
import { navigateToEmailSignIn, navigateToEmailSignUp } from "./NavigationActions";

export module AccountActions {
  export const AUTHENTICATE_ERROR = "AUTHENTICATION_ERROR";
  export const AUTHENTICATE_ON_PREM = "AUTHENTICATE_ON_PREM";
  export const AUTHENTICATION_COMPLETE = "AUTHENTICATION_COMPLETE";
  export const THIRD_PARTY_CANCELED_AUTH = "THIRD_PARTY_CANCELED_AUTH";
  export const GO_TO_LOGIN = "GO_TO_LOGIN";
  export const UPDATE_STATE_GET_USER_PROFILE = "UPDATE_GET_USER_PROFILE";
  export const UPDATE_STATE_UPDATE_USER_PROFILE = "UPDATE_UPDATE_USER_PROFILE";
  export const UPDATE_STATE_CHECK_ACCOUNT_WITH_EMAIL =
    "UPDATE_STATE_CHECK_ACCOUNT_WITH_EMAIL";
  export const EMAIL_SIGNUP = "EMAIL_SIGNUP";
  export const EMAIL_LOGIN = "EMAIL_LOGIN";
}

export const cancelThirdPartyAuthentication = createAction<"facebook" | "google">(
  AccountActions.THIRD_PARTY_CANCELED_AUTH
);
export const authenticationError = createAction(AccountActions.AUTHENTICATE_ERROR);
export const onPremAuthenticate = createAction(AccountActions.AUTHENTICATE_ON_PREM);
export const authenticationComplete = createAction<Account>(
  AccountActions.AUTHENTICATION_COMPLETE
);
export const updateStateGetUserProfile = createAction<GetUserProfilePayload>(
  AccountActions.UPDATE_STATE_GET_USER_PROFILE
);
export const updateStateUpdateUserProfile = createAction<UpdateUserProfilePayload>(
  AccountActions.UPDATE_STATE_UPDATE_USER_PROFILE
);
export const updateStateCheckAccountWithEmail = createAction<CheckAccountWithEmailPayload>(
  AccountActions.UPDATE_STATE_CHECK_ACCOUNT_WITH_EMAIL
);

export const signup = createAction(AccountActions.EMAIL_SIGNUP);
export const login = createAction(AccountActions.EMAIL_LOGIN);

export const checkAccountWithEmail = (email: string) => {
  return async (dispatch: Function) => {
    try {
      dispatch(
        updateStateCheckAccountWithEmail({
          state: NetworkRequestState.REQUESTING,
          error: null
        })
      );
      const accountService = container.get<IAccountService>(Types.IAccountService);
      const response = await accountService.isAccountWithEmailExists(email);
      const accountExists = response.existStatus;
      dispatch(
        updateStateCheckAccountWithEmail({
          state: NetworkRequestState.SUCCESS,
          existStatus: accountExists,
          error: null
        })
      );
      if (accountExists) {
        dispatch(navigateToEmailSignIn(email));
      } else {
        dispatch(navigateToEmailSignUp());
      }
    } catch (error) {
      dispatch(
        updateStateCheckAccountWithEmail({ error, state: NetworkRequestState.FAILED })
      );
    }
  };
};

export const setNewPassword = (_email: string, _token: string, _newPassword: string) => {
  return async (dispatch: Function) => {
    try {
      // const accountService = container.get<IAccountService>(Types.IAccountService);
      // const response = await accountService.setNewPassword(email, token, newPassword);
      // if (response) {
      //   return response;
      // }
    } catch (error) {
      dispatch(notifyError());
    }
  };
};

export const verifyToken = (email: string, token: string) => {
  return async (dispatch: Function) => {
    try {
      const accountService = container.get<IAccountService>(Types.IAccountService);
      const response = await accountService.verifyConfirmationToken(email, token);
      if (response) {
        return response;
      }
    } catch (error) {
      dispatch(notifyError());
    }
  };
};

export const requestTokenConfirm = (email: string) => {
  return async (dispatch: Function) => {
    try {
      const accountService = container.get<IAccountService>(Types.IAccountService);

      const token = await accountService.requestConfirmationToken(email);
      if (token) {
        return token;
      }
    } catch (error) {
      dispatch(notifyError());
    }
  };
};

export const emailSignup = (email: string, password: string) => {
  return async (dispatch: Function) => {
    dispatch(signup());
    try {
      const accountService = container.get<IAccountService>(Types.IAccountService);
      const settings = container.get<IAppSettingsService>(Types.IAppSettingsService);

      const accountPayload = await accountService.signupEmail(email, password);
      console.log("TCL: emailSignup -> accountPayload", accountPayload);
      if (accountPayload) {
        await settings.setValue(SettingsKeys.CurrentAccessToken, accountPayload.token);
        await settings.loadServerSettings();

        await dispatch(getUserProfile(accountPayload.token));
        dispatch(showNotification("Đăng ký thành công"));
        // return accountPayload;
      }
    } catch (error) {
      dispatch(authenticationError(error));
    }
  };
};

export const emailLogin = (email: string, password: string) => {
  return async (dispatch: Function) => {
    dispatch(login());
    try {
      const accountService = container.get<IAccountService>(Types.IAccountService);
      const settings = container.get<IAppSettingsService>(Types.IAppSettingsService);

      const accountPayload = await accountService.loginEmail(email, password);
      console.log("TCL: emailLogin -> accountPayload", accountPayload);
      if (accountPayload) {
        await settings.setValue(SettingsKeys.CurrentAccessToken, accountPayload.token);
        await settings.loadServerSettings();

        await dispatch(getUserProfile(accountPayload.token));
        dispatch(authenticationComplete(accountPayload.user));
        dispatch(notifyLoginSuccess());
      }
    } catch (error) {
      dispatch(showNotification("Email hoặc mật khẩu không chính xác!"));
    }
  };
};

export const notifyError = () => {
  return (dispatch: Function) => {
    dispatch(showNotification("Xảy ra lỗi!"));
  };
};

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
    dispatch(onPremAuthenticate());
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
    dispatch(updateStateGetUserProfile({ state: NetworkRequestState.REQUESTING }));
    try {
      const accountService = container.get<IAccountService>(Types.IAccountService);
      const userProfile = await accountService.getUserProfile(accessToken);
      if (userProfile) {
        dispatch(
          updateStateGetUserProfile({
            state: NetworkRequestState.SUCCESS,
            profile: userProfile
          })
        );
      }
    } catch (error) {
      dispatch(updateStateGetUserProfile({ state: NetworkRequestState.FAILED, error }));
    }
  };
};

export const updateUserProfile = (data: Partial<Profile>) => {
  return async (dispatch: Function) => {
    dispatch(updateStateUpdateUserProfile({ state: NetworkRequestState.REQUESTING }));
    try {
      const appSettings = container.get<IAppSettingsService>(Types.IAppSettingsService);
      const accountService = container.get<IAccountService>(Types.IAccountService);
      const accessToken = appSettings.getSettings().CurrentAccessToken as string;

      const result: boolean = await accountService.updateUserProfile(accessToken, data);

      if (result) {
        await dispatch(getUserProfile(accessToken));
        dispatch(showNotification("Cập nhật hồ sơ cá nhân thành công"));
        dispatch(updateStateUpdateUserProfile({ state: NetworkRequestState.SUCCESS }));
      }
    } catch (error) {
      dispatch(updateStateUpdateUserProfile({ state: NetworkRequestState.FAILED, error }));
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
        const success: boolean = await accountService.addOnwedShoes(
          accessToken,
          shoeId,
          owned
        );

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
