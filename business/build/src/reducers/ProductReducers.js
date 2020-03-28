import { NetworkRequestState } from "../payload";
import { handleActions } from "redux-actions";
import { updateStateGetReviews, updateStateGetInfo } from "../actions/ShoeActions";
export const initialProductState = {
    reviewState: {
        state: NetworkRequestState.NOT_STARTED,
        reviews: []
    },
    infoState: {
        state: NetworkRequestState.NOT_STARTED,
        relatedShoes: []
    }
};
export const ProductReducers = handleActions({
    [`${updateStateGetReviews}`]: (state, action) => (Object.assign(Object.assign({}, state), { reviewState: Object.assign(Object.assign({}, state.reviewState), { reviews: action.payload.data || [], state: action.payload.state, error: action.payload.error }) })),
    [`${updateStateGetInfo}`]: (state, action) => {
        var _a, _b, _c;
        return (Object.assign(Object.assign({}, state), { infoState: Object.assign(Object.assign({}, state.infoState), { relatedShoes: ((_a = action.payload.data) === null || _a === void 0 ? void 0 : _a.relatedShoes) || [], highestBuyOrder: (_b = action.payload.data) === null || _b === void 0 ? void 0 : _b.highestBuyOrder, lowestSellOrder: (_c = action.payload.data) === null || _c === void 0 ? void 0 : _c.lowestSellOrder, state: action.payload.state, error: action.payload.error }) }));
    }
}, initialProductState);
