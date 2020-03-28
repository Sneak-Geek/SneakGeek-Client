import { Shoe, Review, SellOrder, BuyOrder } from "../../model";
import { BaseService } from "./BaseService";
import { IShoeService } from "../interfaces/IShoeService";
export declare class ShoeService extends BaseService implements IShoeService {
    searchShoes(key: string, page?: number): Promise<Shoe[]>;
    getShoeReviews(token: string, shoeId: string): Promise<Review[]>;
    addReview(token: string, review: Review): Promise<void>;
    getShoeInfo(token: string, shoeId: string): Promise<{
        relatedShoes: Shoe[];
        lowestSellOrder?: SellOrder;
        highestBuyOrder?: BuyOrder;
    }>;
    getLowestSellPrices(token: string, shoeId: string): Promise<{
        minPrice: number;
        size: string;
    }[]>;
}
