import { NetworkRequestState } from "../payload";
import { Catalog } from "../model";
export declare type ICatalogState = {
    catalogState: {
        state: NetworkRequestState;
        error?: any;
        catalogs?: Catalog[];
    };
};
export declare const initialCatalogState: ICatalogState;
export declare const CatalogReducers: import("redux-actions").ReduxCompatibleReducer<ICatalogState, any>;
