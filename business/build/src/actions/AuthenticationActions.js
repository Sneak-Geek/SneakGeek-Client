var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createAction } from "redux-actions";
import { NetworkRequestState } from "../payload";
import { ObjectFactory, FactoryKeys } from "../loader/kernel";
import { SettingsKey } from "../loader/interfaces";
import { getUserProfile } from "./ProfileActions";
export const AuthenticationActions = {
    UPDATE_AUTHENTICATION_STATE: "UPDATE_AUTHENTICATION_STATE"
};
export const updateAuthenticationState = createAction(AuthenticationActions.UPDATE_AUTHENTICATION_STATE);
export const authenticateWithEmail = (email, password) => {
    const accountService = ObjectFactory.getObjectInstance(FactoryKeys.IAccountService);
    const settings = ObjectFactory.getObjectInstance(FactoryKeys.ISettingsProvider);
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        dispatch(updateAuthenticationState({ state: NetworkRequestState.REQUESTING }));
        try {
            const accountPayload = yield accountService.emailLogin(email, password);
            if (accountPayload) {
                yield settings.setValue(SettingsKey.CurrentAccessToken, accountPayload.token);
                yield settings.loadServerSettings();
                yield dispatch(getUserProfile());
                dispatch(updateAuthenticationState(Object.assign({ state: NetworkRequestState.SUCCESS }, accountPayload)));
            }
        }
        catch (error) {
            dispatch(updateAuthenticationState({ state: NetworkRequestState.FAILED, error }));
        }
    });
};
