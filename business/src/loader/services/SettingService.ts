import { ISettingService } from "../interfaces";
import { BaseService } from "./BaseService";

export class SettingService extends BaseService implements ISettingService {
  public async getServerSettings(token: string): Promise<Object> {
    const response = await this.apiClient.getInstance().get('/settings', {
      headers: {
        authorization: token
      }
    });

    return response.data;
  }
}