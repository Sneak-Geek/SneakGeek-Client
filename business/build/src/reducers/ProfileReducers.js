import { NetworkRequestState } from "../payload";
import { handleActions } from "redux-actions";
import { updateStateGetUserProfile } from "../actions";
export const initialProfileState = {
    profileState: {
        state: NetworkRequestState.NOT_STARTED
    }
};
export const ProfileReducers = handleActions({
    [`${updateStateGetUserProfile}`]: (state, action) => {
        var _a;
        return (Object.assign(Object.assign({}, state), { accountState: {
                state: action.payload.state,
                error: action.payload.error,
                account: (_a = action.payload.data) === null || _a === void 0 ? void 0 : _a.profile
            } }));
    }
}, initialProfileState);
