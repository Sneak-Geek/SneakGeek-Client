import { ApiClient } from "./ApiClient";
import { ObjectFactory, FactoryKeys } from "../kernel";
export class BaseService {
    constructor() {
        this.apiClient = new ApiClient.Builder()
            .registerDevState(ObjectFactory.getObjectInstance(FactoryKeys.IEnvVar).__DEV__)
            .registerDevUrl("http://localhost:8080/api/v1")
            .registerProdUrl("https://sneakgeek-test.azurewebsites.net/api/v1")
            .build();
    }
}
