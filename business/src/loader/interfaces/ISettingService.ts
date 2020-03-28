export interface ISettingService {
  getServerSettings(token: string): Promise<Object>;
}