import { Catalog } from "../../model";

export interface ICatalogService {
  getAllCatalogs(token: string): Promise<Catalog[] | undefined>;
}
