import { BaseService } from "./BaseService";
import HttpStatus from "http-status";
import { Catalog } from "../../model";
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
}
