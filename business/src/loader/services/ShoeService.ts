import { Shoe } from "../../model";
import { BaseService } from "./BaseService";
import { IShoeService } from "../interfaces/IShoeService";

export class ShoeService extends BaseService implements IShoeService {
  public async searchShoes(key: string, page: number = 0): Promise<Shoe[]> {
    try {
      const response = await this.apiClient.getInstance().get(`/shoe/find?page=${page}&title=${key}`);
      return response.data as Shoe[];
    } catch (error) {
      return [];
    }
  }
}