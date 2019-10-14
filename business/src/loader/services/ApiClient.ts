//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import axios, { AxiosInstance } from "axios";

export namespace ApiClient {
  export class Builder {
    private isDev: boolean | undefined;
    private devUrl: string | undefined;
    private prodUrl: string | undefined;

    public registerDevUrl(devUrl: string): Builder {
      this.devUrl = devUrl;
      return this;
    }

    public registerProdUrl(prodUrl: string): Builder {
      this.prodUrl = prodUrl;
      return this;
    }

    public registerDevState(isDev: boolean): Builder {
      this.isDev = isDev;
      return this;
    }

    public build(): Instance {
      return new Instance(
        axios.create({
          baseURL: this.isDev ? this.devUrl : this.prodUrl,
          timeout: 10000
        })
      );
    }
  }

  export class Instance {
    private axiosInstance: AxiosInstance | undefined;

    public constructor(axiosIsnt: AxiosInstance) {
      this.axiosInstance = axiosIsnt;
    }

    public getInstance(): AxiosInstance {
      if (this.axiosInstance === undefined) {
        throw new Error("Axios instance is not properly configured");
      }

      return this.axiosInstance;
    }
  }
}
