import { Catalog, Shoe } from "../../model";

export interface ICatalogService {
  getAllCatalogs(token: string): Promise<Catalog[] | undefined>;
  createNewCatalog(
    token: string,
    catalogTitle: string,
    catalogDescription: string,
    products: string[]
  ): Promise<void>;
  getShoes(token: string, value: any): Promise<Shoe[] | undefined>;
  saveCatalog(token: string, catalog: Catalog, catalogID: string): Promise<void>;
  getCatalogByTag(token: string, tag: string): Promise<Catalog>;
}
