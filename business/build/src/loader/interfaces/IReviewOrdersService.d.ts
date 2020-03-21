import { ReviewOrder } from "../../model";
export interface IReviewOrdersService {
    getAllSellOrders(token: string): Promise<ReviewOrder[] | undefined>;
    updateNewSellOrderReview(token: string, buyOrderId: string, buyOrderStatus: string): Promise<void>;
}
