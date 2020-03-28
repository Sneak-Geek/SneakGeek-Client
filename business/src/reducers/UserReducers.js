"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
exports.__esModule = true;
var payload_1 = require("../payload");
var redux_actions_1 = require("redux-actions");
var AuthenticationActions_1 = require("../actions/AuthenticationActions");
var actions_1 = require("../actions");
exports.initialUserState = {
    accountState: {
        state: payload_1.NetworkRequestState.NOT_STARTED
    },
    profileState: {
        state: payload_1.NetworkRequestState.NOT_STARTED
    }
};
exports.UserReducers = redux_actions_1.handleActions((_a = {},
    _a["" + AuthenticationActions_1.updateAuthenticationState] = function (state, action) {
        var _a;
        return (__assign(__assign({}, state), { accountState: {
                state: action.payload.state,
                error: action.payload.error,
                account: (_a = action.payload.data) === null || _a === void 0 ? void 0 : _a.user
            } }));
    },
    _a["" + actions_1.updateStateGetUserProfile] = function (state, action) {
        var _a;
        return (__assign(__assign({}, state), { profileState: {
                state: action.payload.state,
                error: action.payload.error,
                profile: (_a = action.payload.data) === null || _a === void 0 ? void 0 : _a.profile
            } }));
    },
    _a["" + actions_1.updateProfile] = function (state, action) { return (__assign(__assign({}, state), { profileState: __assign(__assign({}, state.profileState), { error: null, profile: action.payload }) })); },
    _a), exports.initialUserState);
