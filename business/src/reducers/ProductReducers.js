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
var ShoeActions_1 = require("../actions/ShoeActions");
exports.initialProductState = {
    reviewState: {
        state: payload_1.NetworkRequestState.NOT_STARTED,
        reviews: []
    },
    infoState: {
        state: payload_1.NetworkRequestState.NOT_STARTED,
        relatedShoes: []
    }
};
exports.ProductReducers = redux_actions_1.handleActions((_a = {},
    _a["" + ShoeActions_1.updateStateGetReviews] = function (state, action) { return (__assign(__assign({}, state), { reviewState: __assign(__assign({}, state.reviewState), { reviews: action.payload.data || [], state: action.payload.state, error: action.payload.error }) })); },
    _a["" + ShoeActions_1.updateStateGetInfo] = function (state, action) {
        var _a, _b, _c;
        return (__assign(__assign({}, state), { infoState: __assign(__assign({}, state.infoState), { relatedShoes: ((_a = action.payload.data) === null || _a === void 0 ? void 0 : _a.relatedShoes) || [], highestBuyOrder: (_b = action.payload.data) === null || _b === void 0 ? void 0 : _b.highestBuyOrder, lowestSellOrder: (_c = action.payload.data) === null || _c === void 0 ? void 0 : _c.lowestSellOrder, state: action.payload.state, error: action.payload.error }) }));
    },
    _a), exports.initialProductState);
