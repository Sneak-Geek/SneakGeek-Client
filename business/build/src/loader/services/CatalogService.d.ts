import { BaseService } from "./BaseService";
import { Catalog } from "../../model";
import { ICatalogService } from "../interfaces";
export declare class CatalogService extends BaseService implements ICatalogService {
    getAllCatalogs(token: string): Promise<Catalog[] | undefined>;
    saveCatalog(token: string, catalog: Catalog, catalogID: string): Promise<void>;
    createNewCatalog(token: string, catalogTitle: string, catalogDescription: string, products: string[]): Promise<void>;
    getCatalogByTag(token: string, tag: string): Promise<Catalog>;
}
