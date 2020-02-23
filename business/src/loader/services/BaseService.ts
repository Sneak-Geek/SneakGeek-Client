import { ApiClient } from "./ApiClient";
import { ObjectFactory, FactoryKeys } from "../kernel";
import { IEnvVar } from "../interfaces";

export abstract class BaseService {
  protected apiClient: ApiClient.Instance;

  public constructor() {
    this.apiClient = new ApiClient.Builder()
      .registerDevState(
        ObjectFactory.getObjectInstance<IEnvVar>(FactoryKeys.IEnvVar).__DEV__
      )
      .registerDevUrl("http://localhost:8080/api/v1")
      .registerProdUrl("https://sneakgeek-test.azurewebsites.net/api/v1")
      .build();
  }
}
