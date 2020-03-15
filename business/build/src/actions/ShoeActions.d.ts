import { Dispatch, AnyAction } from "redux";
import { Shoe } from "../model";
export declare const ShoeActions: {
    UPDATE_STATE_SEARCH_SHOES: string;
};
export declare const updateStateSearchShoes: import("redux-actions").ActionFunction1<import("../payload").NetworkPayload<Shoe[]>, import("redux-actions").Action<import("../payload").NetworkPayload<Shoe[]>>>;
export declare const searchShoes: (key: string, page: number) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
