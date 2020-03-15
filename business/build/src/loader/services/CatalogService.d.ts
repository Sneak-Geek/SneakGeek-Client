import { BaseService } from "./BaseService";
import { Catalog, Shoe } from "../../model";
import { ICatalogService } from "../interfaces";
export declare class CatalogService extends BaseService implements ICatalogService {
    getAllCatalogs(token: string): Promise<Catalog[] | undefined>;
    getShoes(token: string, value: any): Promise<Shoe[] | undefined>;
    saveCatalog(token: string, catalog: Catalog, catalogID: string): Promise<void>;
    createNewCatalog(token: string, catalogTitle: string, catalogDescription: string, products: string[]): Promise<void>;
}
