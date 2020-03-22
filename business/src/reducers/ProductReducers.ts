import { NetworkRequestState, GetReviewsPayload } from "../payload";
import { Review } from "../model";
import { handleActions, Action } from "redux-actions";
import { updateStateGetReviews } from "../actions/ShoeActions";

export type IProductState = {
  reviewState: {
    state: NetworkRequestState;
    error?: any;
    reviews: Review[];
  };
};

export const initialProductState: IProductState = {
  reviewState: {
    state: NetworkRequestState.NOT_STARTED,
    reviews: []
  },
};

export const ProductReducers = handleActions<IProductState, any>({
  [`${updateStateGetReviews}`]: (state: IProductState, action: Action<GetReviewsPayload>) => ({
    ...state,
    reviewState: {
      ...state.reviewState,
      reviews: action.payload.data || [],
      state: action.payload.state,
      error: action.payload.error
    }
  })
}, initialProductState);