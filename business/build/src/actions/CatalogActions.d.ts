import { Dispatch, AnyAction } from "redux";
export declare const CatalogActions: {
    UPDATE_STATE_GET_ALL_CATALOG: string;
    UPDATE_STATE_GET_HOME_PAGE_CATALOGS: string;
};
export declare const updateCatalogState: any;
export declare const updateGetHomeCatalogsState: any;
export declare const getAllCatalogs: () => (dispatch: Dispatch<any>) => Promise<void>;
export declare const getHomeCatalogs: () => (dispatch: Dispatch<AnyAction>) => Promise<void>;
