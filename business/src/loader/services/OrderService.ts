import { IOrderService } from "../interfaces";
import { BaseService } from "./BaseService";
import { SellOrder } from "../../model";

export class OrderService extends BaseService implements IOrderService {
  public async createSellOrder(token: string, sellOrder: SellOrder): Promise<void> {
    const response = await this.apiClient.getInstance().post(`/order/sell-order/new`, {
      shoeId: sellOrder.shoeId,
      shoeSize: sellOrder.shoeSize,
      sellNowPrice: (sellOrder.sellNowPrice as number),
      productCondition: sellOrder.productCondition,
      pictures: sellOrder.pictures,
      isNewShoe: sellOrder.isNewShoe
    }, {
      headers: {
        authorization: token
      }
    });

    return response.data;
  }
}