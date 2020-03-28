import { SellOrder } from "../../model";

export interface IOrderService {
  createSellOrder(token: string, sellOrder: SellOrder): Promise<void>;
}