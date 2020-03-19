import { NetworkRequestState } from "../payload";
import { handleActions } from "redux-actions";
import { updateStateGetReviews } from "../actions/ShoeActions";
export const initialProductState = {
    reviewState: {
        state: NetworkRequestState.NOT_STARTED,
        reviews: []
    },
};
export const ProductReducers = handleActions({
    [`${updateStateGetReviews}`]: (state, action) => (Object.assign(Object.assign({}, state), { reviewState: Object.assign(Object.assign({}, state.reviewState), { reviews: action.payload.data || [], state: action.payload.state, error: action.payload.error }) }))
}, initialProductState);
