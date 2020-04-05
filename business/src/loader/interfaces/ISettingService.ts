import { District, Ward } from "../../model";

export interface ISettingService {
  getServerSettings(token: string): Promise<Object>;
  getValidShippingAddress(token: string): Promise<{
    districts: District[],
    wards: Map<number, Ward[]>
  }>;
}