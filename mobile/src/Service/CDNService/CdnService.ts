//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { ICdnService } from "./ICdnService";
import ApiClient from "../ApiClient";
import * as HttpStatus from "http-status";
import { injectable } from "inversify";

@injectable()
export class CdnService implements ICdnService {
  public async /** override **/ getImageUploadUrls(
    token: string,
    count: number
  ): Promise<string[]> {
    const headers = { authorization: token };
    const response = await ApiClient.get(`/transaction/sell/get-img-url?count=${count}`, {
      headers
    });

    if (response && response.status === HttpStatus.OK) {
      return response.data as string[];
    }

    return [];
  }

  public uploadImage(localImgUrl: string, presignedCdnUrl: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", presignedCdnUrl);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === HttpStatus.OK) {
          resolve();
        } else {
          reject();
        }
      };

      xhr.send({
        uri: localImgUrl,
        type: "image/jpeg"
      });
    });
  }
}
