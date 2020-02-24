import { createAction } from "redux-actions";
import { CatalogPayload, NetworkRequestState } from "../payload";
import { ICatalogService, ISettingsProvider, SettingsKey } from "../loader/interfaces";
import { ObjectFactory, FactoryKeys } from "../loader/kernel";
import { Dispatch } from "redux";
import { updateAuthenticationState } from "./AuthenticationActions";

export const CatalogActions = {
  UPDATE_STATE_GET_ALL_CATALOG: "UPDATE_STATE_GET_ALL_CATALOG"
};

export const updateCatalogState = createAction<CatalogPayload>(
  CatalogActions.UPDATE_STATE_GET_ALL_CATALOG
);

export const getAllCatalogs = () => {
  const catalogService = ObjectFactory.getObjectInstance<ICatalogService>(
    FactoryKeys.ICatalogService
  );
  const settings = ObjectFactory.getObjectInstance<ISettingsProvider>(
    FactoryKeys.ISettingsProvider
  );

  return async (dispatch: Dispatch<any>) => {
    dispatch(updateCatalogState({ state: NetworkRequestState.REQUESTING }));
    const token = settings.getValue(SettingsKey.CurrentAccessToken);

    try {
      const catalogPayload = await catalogService.getAllCatalogs(token);
      if (catalogPayload) {
        await settings.loadServerSettings();
        dispatch(
          updateCatalogState({
            state: NetworkRequestState.SUCCESS,
            data: catalogPayload
          })
        );
      } else {
        dispatch(
          updateCatalogState({
            state: NetworkRequestState.FAILED,
            error: new Error("Empty catalog payload")
          })
        );
      }
    } catch (error) {
      dispatch(updateAuthenticationState({ state: NetworkRequestState.FAILED, error }));
    }
  };
};
