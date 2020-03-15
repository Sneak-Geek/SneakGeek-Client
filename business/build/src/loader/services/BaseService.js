import { ApiClient } from "./ApiClient";
import { ObjectFactory, FactoryKeys } from "../kernel";
export class BaseService {
    constructor() {
        const env = ObjectFactory.getObjectInstance(FactoryKeys.IEnvVar);
        this.apiClient = new ApiClient.Builder()
            .registerDevState(env.__DEV__)
            .registerDevUrl(env.devUrl || "https://localhost:8080/api/v1")
            .registerProdUrl(env.prodUrl || "https://sneakgeek-test.azurewebsites.net/api/v1")
            .build();
    }
}
