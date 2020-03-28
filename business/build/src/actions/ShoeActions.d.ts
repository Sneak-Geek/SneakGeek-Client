import { Dispatch, AnyAction } from "redux";
export declare const ShoeActions: {
    UPDATE_STATE_SEARCH_SHOES: string;
    UPDATE_STATE_GET_REVIEWES: string;
    UPDATE_STATE_GET_DETAIL: string;
};
export declare const updateStateSearchShoes: any;
export declare const updateStateGetReviews: any;
export declare const updateStateGetInfo: any;
export declare const searchShoes: (key: string, page: number) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
export declare const getReviews: (shoeId: string) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
export declare const getShoeInfo: (shoeId: string) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
