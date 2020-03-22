import { BaseService } from "./BaseService";
import HttpStatus from "http-status";
import { Catalog } from "../../model";
import { ICatalogService } from "../interfaces";

export class CatalogService extends BaseService implements ICatalogService {
  public async getAllCatalogs(token: string): Promise<Catalog[] | undefined> {
    const response = await this.apiClient.getInstance().get(`/catalogue/all`, {
      headers: {
        authorization: token
      }
    });

    if (
      response &&
      (response.status === HttpStatus.CREATED || response.status === HttpStatus.OK)
    ) {
      return response.data;
    }
    return undefined;
  }

  public async saveCatalog(
    token: string,
    catalog: Catalog,
    catalogID: string
  ): Promise<void> {
    await this.apiClient.getInstance().put(`/catalogue/${catalogID}`, catalog, {
      headers: {
        authorization: token
      }
    });
  }

  public async createNewCatalog(
    token: string,
    catalogTitle: string,
    catalogDescription: string,
    products: string[]
  ): Promise<void> {
    await this.apiClient.getInstance().post(
      `/catalogue/`,
      {
        title: catalogTitle,
        products: products,
        description: catalogDescription
      },
      {
        headers: {
          authorization: token
        }
      }
    );
  }

  public async getCatalogByTag(token: string, tag: string): Promise<Catalog> {
    const response = await this.apiClient.getInstance().get(`/catalogue?tag=${tag}`, {
      headers: {
        authorization: token
      }
    });

    return response.data.catalog;
  }
}
