import { BaseService } from "./BaseService";
import { IReviewOrdersService } from "../interfaces";
import { ReviewOrder } from "../../model";
export declare class ReviewOrdersService extends BaseService implements IReviewOrdersService {
    getAllSellOrders(token: string): Promise<ReviewOrder[] | undefined>;
    updateNewSellOrderReview(token: string, sellOrderId: string, sellOrderStatus: string): Promise<void>;
}
