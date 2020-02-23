import { Dispatch } from "redux";
export declare const CatalogActions: {
    UPDATE_STATE_GET_ALL_CATALOG: string;
};
export declare const updateCatalogState: import("redux-actions").ActionFunction1<import("../payload").NetworkPayload<import("..").Catalog[]>, import("redux-actions").Action<import("../payload").NetworkPayload<import("..").Catalog[]>>>;
export declare const getAllCatalogs: () => (dispatch: Dispatch<any>) => Promise<void>;
