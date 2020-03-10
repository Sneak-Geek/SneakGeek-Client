import { IFacebookSDK, LoginResult, Permissions } from "business";
import * as Facebook from "expo-facebook";

let accessToken = '';

export const FacebookSdk: IFacebookSDK = {
  loginWithPermission: async (permissions: Permissions[]): Promise<LoginResult> => {
    const result: Facebook.FacebookLoginResult = await Facebook.logInWithReadPermissionsAsync({
      permissions: permissions.map(t => t.toString())
    });

    accessToken = result.type === 'cancel' ? '' : result.token;

    return result.type === 'cancel'
      ?
      {
        isCancelled: true,
        error: null,
        declinedPermissions: permissions,
        grantedPermissions: []
      }
      :
      {
        isCancelled: false,
        error: null,
        grantedPermissions: permissions,
        declinedPermissions: []
      };
  },

  getCurrentAccessToken: (): Promise<string> => {
    return Promise.resolve(accessToken);
  }
};
