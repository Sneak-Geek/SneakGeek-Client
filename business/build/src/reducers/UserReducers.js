import { NetworkRequestState } from "../payload";
import { handleActions } from "redux-actions";
import { updateAuthenticationState } from "../actions/AuthenticationActions";
import { updateStateGetUserProfile, updateProfile } from "../actions";
export const initialUserState = {
    accountState: {
        state: NetworkRequestState.NOT_STARTED
    },
    profileState: {
        state: NetworkRequestState.NOT_STARTED
    }
};
export const UserReducers = handleActions({
    [`${updateAuthenticationState}`]: (state, action) => {
        var _a;
        return (Object.assign(Object.assign({}, state), { accountState: {
                state: action.payload.state,
                error: action.payload.error,
                account: (_a = action.payload.data) === null || _a === void 0 ? void 0 : _a.user
            } }));
    },
    [`${updateStateGetUserProfile}`]: (state, action) => {
        var _a;
        return (Object.assign(Object.assign({}, state), { profileState: {
                state: action.payload.state,
                error: action.payload.error,
                profile: (_a = action.payload.data) === null || _a === void 0 ? void 0 : _a.profile
            } }));
    },
    [`${updateProfile}`]: (state, action) => (Object.assign(Object.assign({}, state), { profileState: Object.assign(Object.assign({}, state.profileState), { error: null, profile: action.payload }) }))
}, initialUserState);
