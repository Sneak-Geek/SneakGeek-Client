//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import { createAction } from "redux-actions";
// import { Facebook, Google } from "expo";
import { invariant } from "ts-invariant";
import * as Service from "../Service";
import { Account } from "../Reducers";
import { StackActions } from "react-navigation";
import { RouteNames } from "../Navigation";
import { LoginManager, LoginResult, AccessToken } from "react-native-fbsdk";

export module AccountActions {
  export const AUTHENTICATE_ERROR = "AUTHENTICATION_ERROR";
  export const AUTHENTICATE_VSNKRS = "AUTHENTICATE_VSNKRS";
  export const AUTHENTICATION_COMPLETE = "AUTHENTICATION_COMPLETE";
  export const THIRD_PARTY_CANCELED_AUTH = "THIRD_PARTY_CANCELED_AUTH";
}

export const cancelThirdPartyAuthentication = createAction<"facebook" | "google">(
  AccountActions.THIRD_PARTY_CANCELED_AUTH
);
export const authenticationError = createAction(AccountActions.AUTHENTICATE_ERROR);
export const vsnkrsAuthenticate = createAction(AccountActions.AUTHENTICATE_VSNKRS);
export const authenticationComplete = createAction<Account>(
  AccountActions.AUTHENTICATION_COMPLETE
);

export const authenticateVsnkrsService = (
  accessToken: string,
  provider: "facebook" | "google"
) => {
  return async (dispatch: Function) => {
    dispatch(vsnkrsAuthenticate);
    try {
      const account = await Service.AuthenticationService.login(accessToken, provider);
      if (account) {
        dispatch(authenticationComplete(account));
        dispatch(
          StackActions.replace({
            routeName: RouteNames.Tabs.TabRoot
          })
        );
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
    }
    // else {
    //   dispatch(googleAuthenticate());
    // }
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

// export const googleAuthenticate = () => {
//   return async (dispatch: Function) => {
//     try {
//       const result = await Google.logInAsync({
//         androidClientId: Config.GOOGLE_ANDROID_ID,
//         iosClientId: Config.GOOGLE_IOS_ID
//       });
//       if (result.type === "cancel") {
//         dispatch(cancelThirdPartyAuthentication("google"));
//       } else {
//         dispatch(authenticateVsnkrsService(result.accessToken, "google"));
//       }
//     } catch (error) {
//       dispatch(authenticationError(error));
//     }
//   };
// };