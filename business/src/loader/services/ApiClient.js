"use strict";
//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!
exports.__esModule = true;
var axios_1 = require("axios");
var ApiClient;
(function (ApiClient) {
    var Builder = /** @class */ (function () {
        function Builder() {
        }
        Builder.prototype.registerDevUrl = function (devUrl) {
            this.devUrl = devUrl;
            return this;
        };
        Builder.prototype.registerProdUrl = function (prodUrl) {
            this.prodUrl = prodUrl;
            return this;
        };
        Builder.prototype.registerDevState = function (isDev) {
            this.isDev = isDev;
            return this;
        };
        Builder.prototype.build = function () {
            return new Instance(axios_1["default"].create({
                baseURL: this.isDev ? this.devUrl : this.prodUrl,
                timeout: 10000
            }));
        };
        return Builder;
    }());
    ApiClient.Builder = Builder;
    var Instance = /** @class */ (function () {
        function Instance(axiosIsnt) {
            this.axiosInstance = axiosIsnt;
        }
        Instance.prototype.getInstance = function () {
            if (this.axiosInstance === undefined) {
                throw new Error("Axios instance is not properly configured");
            }
            return this.axiosInstance;
        };
        return Instance;
    }());
    ApiClient.Instance = Instance;
})(ApiClient = exports.ApiClient || (exports.ApiClient = {}));
