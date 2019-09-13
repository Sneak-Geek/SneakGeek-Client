//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import ApiClient from "../ApiClient";
import { Shoe } from "../../Shared/Model";
import { IAppContentService } from "./IAppContentService";
import * as HttpStatus from "http-status";
import { injectable } from "inversify";

@injectable()
export class AppContentService implements IAppContentService {
  public async getShoes(): Promise<Shoe[]> {
    const response = await ApiClient.get("/shoe/all");
    if (response && response.status === HttpStatus.OK) {
      return response.data as Shoe[];
    }

    return [];
  }

  public async searchShoes(key: string): Promise<Shoe[]> {
    const response = await ApiClient.get(`/shoe/find?key=${key}`);
    if (response && response.status === HttpStatus.OK) {
      return response.data as Shoe[];
    }

    return [];
  }

  public async getShoesByIds(token: string, ids: string[]): Promise<Shoe[]> {
    const idParam = ids.join(",");
    const headers = { authorization: token };
    const response = await ApiClient.get(`/shoe/get?ids=${idParam}`, { headers });

    if (response && response.status === HttpStatus.OK) {
      return response.data as Shoe[];
    }

    return [];
  }
}
