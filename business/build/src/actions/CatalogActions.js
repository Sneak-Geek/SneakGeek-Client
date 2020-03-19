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
import { SettingsKey } from "../loader/interfaces";
import { ObjectFactory, FactoryKeys } from "../loader/kernel";
import { updateAuthenticationState } from "./AuthenticationActions";
export const CatalogActions = {
    UPDATE_STATE_GET_ALL_CATALOG: "UPDATE_STATE_GET_ALL_CATALOG",
    UPDATE_STATE_GET_HOME_PAGE_CATALOGS: "UPDATE_STATE_GET_HOME_PAGE_CATALOGS"
};
export const updateCatalogState = createAction(CatalogActions.UPDATE_STATE_GET_ALL_CATALOG);
export const updateGetHomeCatalogsState = createAction(CatalogActions.UPDATE_STATE_GET_HOME_PAGE_CATALOGS);
export const getAllCatalogs = () => {
    const catalogService = ObjectFactory.getObjectInstance(FactoryKeys.ICatalogService);
    const settings = ObjectFactory.getObjectInstance(FactoryKeys.ISettingsProvider);
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        dispatch(updateCatalogState({ state: NetworkRequestState.REQUESTING }));
        const token = settings.getValue(SettingsKey.CurrentAccessToken);
        try {
            const catalogPayload = yield catalogService.getAllCatalogs(token);
            if (catalogPayload) {
                yield settings.loadServerSettings();
                dispatch(updateCatalogState({
                    state: NetworkRequestState.SUCCESS,
                    data: catalogPayload
                }));
            }
            else {
                dispatch(updateCatalogState({
                    state: NetworkRequestState.FAILED,
                    error: new Error("Empty catalog payload")
                }));
            }
        }
        catch (error) {
            dispatch(updateAuthenticationState({ state: NetworkRequestState.FAILED, error }));
        }
    });
};
export const getHomeCatalogs = () => {
    const catalogService = ObjectFactory.getObjectInstance(FactoryKeys.ICatalogService);
    const settings = ObjectFactory.getObjectInstance(FactoryKeys.ISettingsProvider);
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        dispatch(updateGetHomeCatalogsState({ state: NetworkRequestState.REQUESTING }));
        const token = settings.getValue(SettingsKey.CurrentAccessToken);
        try {
            const [Nike, Jordan, adidas, hot] = yield Promise.all([
                catalogService.getCatalogByTag(token, "nike"),
                catalogService.getCatalogByTag(token, "jordan"),
                catalogService.getCatalogByTag(token, "adidas"),
                catalogService.getCatalogByTag(token, "hot")
            ]);
            dispatch(updateGetHomeCatalogsState({
                state: NetworkRequestState.SUCCESS,
                data: { Nike, Jordan, adidas, hot }
            }));
        }
        catch (err) {
            dispatch(updateGetHomeCatalogsState({
                state: NetworkRequestState.FAILED,
                error: err
            }));
        }
    });
};
