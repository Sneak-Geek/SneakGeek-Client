import { NetworkRequestState, CatalogPayload } from "../payload";
import { Catalog } from "../model";
import { updateCatalogState } from "../actions/CatalogActions";
import { handleActions, Action } from "redux-actions";

export type ICatalogState = {
  catalogState: {
    state: NetworkRequestState;
    error?: any;
    catalogs?: Catalog[];
  };
};

export const initialCatalogState: ICatalogState = {
  catalogState: {
    state: NetworkRequestState.NOT_STARTED
  }
};

export const CatalogReducers = handleActions<ICatalogState, any>(
  {
    [`${updateCatalogState}`]: (state: ICatalogState, action: Action<CatalogPayload>) => ({
      ...state,
      catalogState: {
        state: action.payload.state,
        error: action.payload.error,
        catalogs: action.payload.data
      }
    })
  },
  initialCatalogState
);
