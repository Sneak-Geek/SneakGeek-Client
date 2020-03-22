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
export const ShoeActions = {
    UPDATE_STATE_SEARCH_SHOES: "UPDATE_STATE_SEARCH_SHOES",
    UPDATE_STATE_GET_REVIEWES: "UPDATE_STATE_GET_REVIEWS",
};
export const updateStateSearchShoes = createAction(ShoeActions.UPDATE_STATE_SEARCH_SHOES);
export const updateStateGetReviews = createAction(ShoeActions.UPDATE_STATE_SEARCH_SHOES);
export const searchShoes = (key, page) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        dispatch(updateStateSearchShoes({
            state: NetworkRequestState.REQUESTING,
        }));
        const shoeService = ObjectFactory.getObjectInstance(FactoryKeys.IShoeService);
        try {
            const shoes = yield shoeService.searchShoes(key, page);
            dispatch(updateStateSearchShoes({
                state: NetworkRequestState.SUCCESS,
                data: shoes
            }));
        }
        catch (error) {
            dispatch(updateStateSearchShoes({
                state: NetworkRequestState.FAILED,
                error
            }));
        }
    });
};
export const getReviews = (shoeId) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        dispatch(updateStateGetReviews({ state: NetworkRequestState.REQUESTING }));
        const shoeService = ObjectFactory.getObjectInstance(FactoryKeys.IShoeService);
        const settings = ObjectFactory.getObjectInstance(FactoryKeys.ISettingsProvider);
        const token = settings.getValue(SettingsKey.CurrentAccessToken);
        try {
            const reviews = yield shoeService.getShoeReviews(token, shoeId);
            dispatch(updateStateGetReviews({
                state: NetworkRequestState.SUCCESS,
                data: reviews
            }));
        }
        catch (error) {
            dispatch(updateStateGetReviews({
                state: NetworkRequestState.FAILED,
                error,
            }));
        }
    });
};
