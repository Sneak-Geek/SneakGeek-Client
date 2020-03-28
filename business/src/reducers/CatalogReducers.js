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
var CatalogActions_1 = require("../actions/CatalogActions");
var redux_actions_1 = require("redux-actions");
exports.initialCatalogState = {
    catalogState: {
        state: payload_1.NetworkRequestState.NOT_STARTED
    },
    homepageCatalogState: {
        state: payload_1.NetworkRequestState.NOT_STARTED
    }
};
exports.CatalogReducers = redux_actions_1.handleActions((_a = {},
    _a["" + CatalogActions_1.updateCatalogState] = function (state, action) { return (__assign(__assign({}, state), { catalogState: {
            state: action.payload.state,
            error: action.payload.error,
            catalogs: action.payload.data
        } })); },
    _a["" + CatalogActions_1.updateGetHomeCatalogsState] = function (state, action) { return (__assign(__assign({}, state), { homepageCatalogState: {
            error: action.payload.error,
            state: action.payload.state,
            catalogs: action.payload.data
        } })); },
    _a), exports.initialCatalogState);
