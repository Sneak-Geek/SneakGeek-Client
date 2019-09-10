//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

export interface ICdnService {
  uploadImage(localImgUrl: string, presignedCdnUrl: string): Promise<any>;
}
