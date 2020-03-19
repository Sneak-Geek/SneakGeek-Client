import { Dispatch, AnyAction } from "redux";
export declare const CatalogActions: {
    UPDATE_STATE_GET_ALL_CATALOG: string;
    UPDATE_STATE_GET_HOME_PAGE_CATALOGS: string;
};
export declare const updateCatalogState: import("redux-actions").ActionFunction1<import("../payload").NetworkPayload<import("..").Catalog[]>, import("redux-actions").Action<import("../payload").NetworkPayload<import("..").Catalog[]>>>;
export declare const updateGetHomeCatalogsState: import("redux-actions").ActionFunction1<import("../payload").NetworkPayload<{
    Nike: import("..").Catalog;
    Jordan: import("..").Catalog;
    adidas: import("..").Catalog;
    hot: import("..").Catalog;
}>, import("redux-actions").Action<import("../payload").NetworkPayload<{
    Nike: import("..").Catalog;
    Jordan: import("..").Catalog;
    adidas: import("..").Catalog;
    hot: import("..").Catalog;
}>>>;
export declare const getAllCatalogs: () => (dispatch: Dispatch<any>) => Promise<void>;
export declare const getHomeCatalogs: () => (dispatch: Dispatch<AnyAction>) => Promise<void>;
