//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!
import axios from "axios";
export var ApiClient;
(function (ApiClient) {
    class Builder {
        registerDevUrl(devUrl) {
            this.devUrl = devUrl;
            return this;
        }
        registerProdUrl(prodUrl) {
            this.prodUrl = prodUrl;
            return this;
        }
        registerDevState(isDev) {
            this.isDev = isDev;
            return this;
        }
        build() {
            return new Instance(axios.create({
                baseURL: this.isDev ? this.devUrl : this.prodUrl,
                timeout: 10000
            }));
        }
    }
    ApiClient.Builder = Builder;
    class Instance {
        constructor(axiosIsnt) {
            this.axiosInstance = axiosIsnt;
        }
        getInstance() {
            if (this.axiosInstance === undefined) {
                throw new Error("Axios instance is not properly configured");
            }
            return this.axiosInstance;
        }
    }
    ApiClient.Instance = Instance;
})(ApiClient || (ApiClient = {}));
