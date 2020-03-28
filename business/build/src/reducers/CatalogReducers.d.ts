import { NetworkRequestState } from "../payload";
import { Catalog } from "../model";
export declare type ICatalogState = {
    catalogState: {
        state: NetworkRequestState;
        error?: any;
        catalogs?: Catalog[];
    };
    homepageCatalogState: {
        state: NetworkRequestState;
        error?: any;
        catalogs?: {
            Nike: Catalog;
            Jordan: Catalog;
            adidas: Catalog;
            hot: Catalog;
        };
    };
};
export declare const initialCatalogState: ICatalogState;
export declare const CatalogReducers: any;
