import { createAction } from "redux-actions";
import { AuthenticationPayload, NetworkRequestState } from "../payload";
import { ObjectFactory, FactoryKeys } from "../loader/kernel";
import { IAccountService, ISettingsProvider } from "../loader/interfaces";
import { SettingsKey } from "../loader/interfaces";
import { getUserProfile } from "./ProfileActions";

export const AuthenticationActions = {
  UPDATE_AUTHENTICATION_STATE: "UPDATE_AUTHENTICATION_STATE"
};

export const updateAuthenticationState = createAction<AuthenticationPayload>(
  AuthenticationActions.UPDATE_AUTHENTICATION_STATE
);

export const authenticateWithEmail = (email: string, password: string) => {
  const accountService = ObjectFactory.getObjectInstance<IAccountService>(FactoryKeys.IAccountService);
  const settings = ObjectFactory.getObjectInstance<ISettingsProvider>(FactoryKeys.ISettingsProvider);

  return async (dispatch: Function) => {
    dispatch(updateAuthenticationState({ state: NetworkRequestState.REQUESTING }));
    try {
      const accountPayload = await accountService.emailLogin(email, password);
      if (accountPayload) {
        await settings.setValue(SettingsKey.CurrentAccessToken, accountPayload.token);
        await settings.loadServerSettings();

        await dispatch(getUserProfile());
        dispatch(updateAuthenticationState({ state: NetworkRequestState.SUCCESS, ...accountPayload }));
      }
    } catch (error) {
      dispatch(updateAuthenticationState({ state: NetworkRequestState.FAILED, error }));
    }
  };
};
