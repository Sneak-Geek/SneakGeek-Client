//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiRequestState } from "../types";
import { createAction } from "redux-actions";
import { ObjectFactory, FactoryKey } from "../loader/factory";
import { SettingsKey } from "../loader/interfaces";
export var AccountActions;
(function (AccountActions) {
    AccountActions.Names = {
        UPDATE_AUTH_STATE: "UPDATE_AUTH_STATE",
        UPDATE_GET_USER_PROFILE_STATE: "UPDATE_GET_USER_PROFILE_STATE",
        UPDATE_UPDATE_USER_PROFILE_STATE: "UPDATE_UPDATE_USER_PROFILE_STATE"
    };
    AccountActions.updateAuthState = createAction(AccountActions.Names.UPDATE_AUTH_STATE);
    AccountActions.onPremAuth = (accessToken, provider) => {
        return (dispatch) => __awaiter(this, void 0, void 0, function* () {
            dispatch(AccountActions.updateAuthState({
                state: ApiRequestState.NOT_STARTED,
                data: {
                    authType: "OnPrem"
                }
            }));
            const accountService = ObjectFactory.getObjectInstance("IAccountService");
            const settings = ObjectFactory.getObjectInstance(FactoryKey.ISettingsProvider);
            try {
                const accountPayload = yield accountService.login(accessToken, provider);
                if (accountPayload) {
                    yield settings.setValue(SettingsKey.CurrentAccessToken, accountPayload.token);
                    yield settings.loadServerSettings();
                    dispatch(AccountActions.updateAuthState({
                        state: ApiRequestState.SUCCESS,
                        data: {
                            authType: "OnPrem",
                            account: accountPayload.user
                        }
                    }));
                }
            }
            catch (error) {
                dispatch(AccountActions.updateAuthState({
                    state: ApiRequestState.FAILED,
                    error,
                    data: {
                        authType: "OnPrem"
                    }
                }));
            }
        });
    };
    AccountActions.clientAuth = (provider) => {
        return (dispatch) => __awaiter(this, void 0, void 0, function* () {
            switch (provider) {
                case "facebook":
                    return dispatch(AccountActions.facebookClientAuth());
                case "google":
                    return dispatch(AccountActions.googleClientAuth());
                default:
                    return;
            }
        });
    };
    AccountActions.facebookClientAuth = () => {
        return (dispatch) => __awaiter(this, void 0, void 0, function* () {
            const permissions = ["public_profile", "email"];
            const fbSdk = ObjectFactory.getObjectInstance(FactoryKey.IFacebookSDK);
            try {
                const loginResult = yield fbSdk.loginWithPermission(permissions);
                if (loginResult.isCancelled) {
                    dispatch(AccountActions.updateAuthState({
                        state: ApiRequestState.CANCELED,
                        error: "User canceled",
                        data: {
                            authType: "ThirdParty"
                        }
                    }));
                }
                else {
                    const accessToken = yield fbSdk.getCurrentAccessToken();
                    dispatch(AccountActions.onPremAuth(accessToken, "facebook"));
                }
            }
            catch (error) {
                dispatch(AccountActions.updateAuthState({
                    state: ApiRequestState.FAILED,
                    error,
                    data: { authType: "ThirdParty" }
                }));
            }
        });
    };
    AccountActions.googleClientAuth = () => { };
})(AccountActions || (AccountActions = {}));
