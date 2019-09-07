//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

export interface ICdnService {
  uploadImage(localImgUrl: string, presignedCdnUrl: string): Promise<any>;
}