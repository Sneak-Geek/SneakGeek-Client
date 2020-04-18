import { IFacebookSDK, LoginResult, Permissions } from "business";
import * as Facebook from "expo-facebook";

let accessToken = '';

export class FacebookSdk implements IFacebookSDK {
  public async loginWithPermission(permissions: Permissions[]): Promise<LoginResult> {
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
  }

  public getCurrentAccessToken(): Promise<string> {
    return Promise.resolve(accessToken);
  }
}
