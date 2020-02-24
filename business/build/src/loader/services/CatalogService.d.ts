import { BaseService } from "./BaseService";
import { Catalog } from "../../model";
import { ICatalogService } from "../interfaces";
export declare class CatalogService extends BaseService implements ICatalogService {
    getAllCatalogs(token: string): Promise<Catalog[] | undefined>;
}
