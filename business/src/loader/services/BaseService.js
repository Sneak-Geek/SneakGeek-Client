"use strict";
exports.__esModule = true;
var ApiClient_1 = require("./ApiClient");
var kernel_1 = require("../kernel");
var BaseService = /** @class */ (function () {
    function BaseService() {
        var env = kernel_1.ObjectFactory.getObjectInstance(kernel_1.FactoryKeys.IEnvVar);
        this.apiClient = new ApiClient_1.ApiClient.Builder()
            .registerDevState(env.__DEV__)
            .registerDevUrl(env.devUrl || "https://localhost:8080/api/v1")
            .registerProdUrl(env.prodUrl || "https://sneakgeek-test.azurewebsites.net/api/v1")
            .build();
    }
    return BaseService;
}());
exports.BaseService = BaseService;
