import { NetworkRequestState } from "../payload";
import { Review } from "../model";
export declare type IProductState = {
    reviewState: {
        state: NetworkRequestState;
        error?: any;
        reviews: Review[];
    };
};
export declare const initialProductState: IProductState;
export declare const ProductReducers: import("redux-actions").ReduxCompatibleReducer<IProductState, any>;
