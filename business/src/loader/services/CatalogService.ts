import { BaseService } from "./BaseService";
import HttpStatus from "http-status";
import { Catalog, Shoe } from "../../model";
import { ICatalogService } from "../interfaces";

export class CatalogService extends BaseService implements ICatalogService {
  public async getAllCatalogs(token: string): Promise<Catalog[] | undefined> {
    const response = await this.apiClient.getInstance().get(`/catalogue/`, {
      headers: {
        authorization_token: token
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

  public async getShoes(token: string, value: any): Promise<Shoe[] | undefined> {
    const response = await this.apiClient.getInstance().get(`shoe/find?title=${value}`, {
      headers: {
        authorization_token: token
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
        authorization_token: token
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
          authorization_token: token
        }
      }
    );
  }
}
