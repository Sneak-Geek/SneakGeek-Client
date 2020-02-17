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
export const ProfileActions = {
    UPDATE_STATE_GET_USER_PROFILE: "UPDATE_GET_USER_PROFILE"
};
export const updateStateGetUserProfile = createAction(ProfileActions.UPDATE_STATE_GET_USER_PROFILE);
export const getUserProfile = () => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        const accountService = ObjectFactory.getObjectInstance(FactoryKeys.IAccountService);
        const settings = ObjectFactory.getObjectInstance(FactoryKeys.ISettingsProvider);
        dispatch(updateStateGetUserProfile({ state: NetworkRequestState.REQUESTING }));
        const token = settings.getValue(SettingsKey.CurrentAccessToken);
        try {
            const profile = yield accountService.getUserProfile(token);
            if (profile) {
                updateStateGetUserProfile({ state: NetworkRequestState.SUCCESS, data: { profile } });
            }
            else {
                updateStateGetUserProfile({ state: NetworkRequestState.FAILED, error: new Error("Empty profile ") });
            }
        }
        catch (error) {
            updateStateGetUserProfile({ state: NetworkRequestState.FAILED, error });
        }
    });
};
