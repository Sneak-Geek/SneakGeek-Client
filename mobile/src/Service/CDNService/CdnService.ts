//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { ICdnService } from "./ICdnService";
import axios from "axios";
import * as uuid from "uuid";

export class CdnService implements ICdnService {
  public uploadImage(localImgUrl: string, presignedCdnUrl: string): Promise<any> {
    return axios.put(
      presignedCdnUrl,
      {
        uri: localImgUrl,
        type: "image/jpeg",
        name: uuid.v1()
      },
      {
        headers: {
          "Content-Type": "image/jpeg"
        }
      }
    );
  }
}
