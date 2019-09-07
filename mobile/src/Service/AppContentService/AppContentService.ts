//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import ApiClient from "../ApiClient";
import { Shoe } from "../../Reducers";
import { IAppContentService } from "./IAppContentService";
import httpStatus = require("http-status");
import { injectable } from "inversify";

@injectable()
export class AppContentService implements IAppContentService {
  public async getShoes(): Promise<Shoe[]> {
    const response = await ApiClient.get("/shoe/all");
    if (response && response.status === httpStatus.OK) {
      return response.data as Shoe[];
    }

    return [];
  }

  public async searchShoes(key: string): Promise<Shoe[]> {
    const response = await ApiClient.get(`/shoe/find?key=${key}`);
    if (response && response.status === httpStatus.OK) {
      return response.data as Shoe[];
    }

    return [];
  }
}
