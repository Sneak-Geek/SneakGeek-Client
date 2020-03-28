import { NetworkRequestState } from "../payload";
import { Review, SellOrder, BuyOrder, Shoe } from "../model";
export declare type IProductState = {
    reviewState: {
        state: NetworkRequestState;
        error?: any;
        reviews: Review[];
    };
    infoState: {
        state: NetworkRequestState;
        error?: any;
        relatedShoes: Shoe[];
        lowestSellOrder?: SellOrder;
        highestBuyOrder?: BuyOrder;
    };
};
export declare const initialProductState: IProductState;
export declare const ProductReducers: any;
