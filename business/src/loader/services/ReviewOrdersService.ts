import { BaseService } from "./BaseService";
import { IReviewOrdersService } from "../interfaces";
import { ReviewOrder } from "../../model";
import HttpStatus from "http-status";

export class ReviewOrdersService extends BaseService implements IReviewOrdersService {
  public async getAllSellOrders(token: string): Promise<ReviewOrder[] | undefined> {
    const response = await this.apiClient.getInstance().get("order/sell-order/all", {
      headers: {
        authorization: token,
      },
    });
    if (
      response &&
      (response.status === HttpStatus.CREATED || response.status === HttpStatus.OK)
    ) {
      return response.data;
    }
    return undefined;
  }

  public async updateNewSellOrderReview(
    token: string,
    sellOrderId: string,
    sellOrderStatus: string
  ): Promise<void> {
    await this.apiClient.getInstance().patch(
      "order/sell-order/set-status",
      {
        sellOrderId: sellOrderId,
        sellOrderStatus: sellOrderStatus,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  }
}
