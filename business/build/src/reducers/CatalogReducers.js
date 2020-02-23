import { NetworkRequestState } from "../payload";
import { updateCatalogState } from "../actions/CatalogActions";
import { handleActions } from "redux-actions";
export const initialCatalogState = {
    catalogState: {
        state: NetworkRequestState.NOT_STARTED
    }
};
export const CatalogReducers = handleActions({
    [`${updateCatalogState}`]: (state, action) => (Object.assign(Object.assign({}, state), { catalogState: {
            state: action.payload.state,
            error: action.payload.error,
            catalogs: action.payload.data
        } }))
}, initialCatalogState);
