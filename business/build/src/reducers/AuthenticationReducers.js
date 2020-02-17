import { NetworkRequestState } from "../payload";
import { handleActions } from "redux-actions";
import { updateAuthenticationState } from "../actions/AuthenticationActions";
export const initialAccountState = {
    accountState: {
        state: NetworkRequestState.NOT_STARTED
    }
};
export const AccountReducers = handleActions({
    [`${updateAuthenticationState}`]: (state, action) => {
        var _a;
        return (Object.assign(Object.assign({}, state), { accountState: {
                state: action.payload.state,
                error: action.payload.error,
                account: (_a = action.payload.data) === null || _a === void 0 ? void 0 : _a.user
            } }));
    }
}, initialAccountState);
