//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import ApiClient from "../Service/ApiClient";
import { Shoe } from "../Reducers";

export class AppContentService {
  public static getShoes() {
    return new Promise<Shoe[]>((resolve, reject) => {
      ApiClient.get(`/shoes/all`)
        .then(result => {
          if (result && result.status >= 200 && result.status < 300) {
            resolve(result.data);
          } else {
            reject(result);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
