//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

export interface ICdnService {
  getImageUploadUrls(token: string, count: number): Promise<string[]>;
  uploadImage(localImgUrl: string, presignedCdnUrl: string): Promise<any>;
}
