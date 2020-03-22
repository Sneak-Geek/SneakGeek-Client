import { Catalog, Shoe } from "../../model";

export interface ICatalogService {
  getAllCatalogs(token: string): Promise<Catalog[] | undefined>;
  createNewCatalog(
    token: string,
    catalogTitle: string,
    catalogDescription: string,
    products: string[]
  ): Promise<void>;
  saveCatalog(token: string, catalog: Catalog, catalogID: string): Promise<void>;
}
