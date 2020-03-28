"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var redux_actions_1 = require("redux-actions");
var payload_1 = require("../payload");
var interfaces_1 = require("../loader/interfaces");
var kernel_1 = require("../loader/kernel");
var AuthenticationActions_1 = require("./AuthenticationActions");
exports.CatalogActions = {
    UPDATE_STATE_GET_ALL_CATALOG: "UPDATE_STATE_GET_ALL_CATALOG",
    UPDATE_STATE_GET_HOME_PAGE_CATALOGS: "UPDATE_STATE_GET_HOME_PAGE_CATALOGS"
};
exports.updateCatalogState = redux_actions_1.createAction(exports.CatalogActions.UPDATE_STATE_GET_ALL_CATALOG);
exports.updateGetHomeCatalogsState = redux_actions_1.createAction(exports.CatalogActions.UPDATE_STATE_GET_HOME_PAGE_CATALOGS);
exports.getAllCatalogs = function () {
    var catalogService = kernel_1.ObjectFactory.getObjectInstance(kernel_1.FactoryKeys.ICatalogService);
    var settings = kernel_1.ObjectFactory.getObjectInstance(kernel_1.FactoryKeys.ISettingsProvider);
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        var token, catalogPayload, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(exports.updateCatalogState({ state: payload_1.NetworkRequestState.REQUESTING }));
                    token = settings.getValue(interfaces_1.SettingsKey.CurrentAccessToken);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, catalogService.getAllCatalogs(token)];
                case 2:
                    catalogPayload = _a.sent();
                    if (!catalogPayload) return [3 /*break*/, 4];
                    return [4 /*yield*/, settings.loadServerSettings()];
                case 3:
                    _a.sent();
                    dispatch(exports.updateCatalogState({
                        state: payload_1.NetworkRequestState.SUCCESS,
                        data: catalogPayload
                    }));
                    return [3 /*break*/, 5];
                case 4:
                    dispatch(exports.updateCatalogState({
                        state: payload_1.NetworkRequestState.FAILED,
                        error: new Error("Empty catalog payload")
                    }));
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    dispatch(AuthenticationActions_1.updateAuthenticationState({ state: payload_1.NetworkRequestState.FAILED, error: error_1 }));
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
};
exports.getHomeCatalogs = function () {
    var catalogService = kernel_1.ObjectFactory.getObjectInstance(kernel_1.FactoryKeys.ICatalogService);
    var settings = kernel_1.ObjectFactory.getObjectInstance(kernel_1.FactoryKeys.ISettingsProvider);
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        var token, _a, Nike, Jordan, adidas, hot, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dispatch(exports.updateGetHomeCatalogsState({ state: payload_1.NetworkRequestState.REQUESTING }));
                    token = settings.getValue(interfaces_1.SettingsKey.CurrentAccessToken);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all([
                            catalogService.getCatalogByTag(token, "nike"),
                            catalogService.getCatalogByTag(token, "jordan"),
                            catalogService.getCatalogByTag(token, "adidas"),
                            catalogService.getCatalogByTag(token, "hot")
                        ])];
                case 2:
                    _a = _b.sent(), Nike = _a[0], Jordan = _a[1], adidas = _a[2], hot = _a[3];
                    dispatch(exports.updateGetHomeCatalogsState({
                        state: payload_1.NetworkRequestState.SUCCESS,
                        data: { Nike: Nike, Jordan: Jordan, adidas: adidas, hot: hot }
                    }));
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    dispatch(exports.updateGetHomeCatalogsState({
                        state: payload_1.NetworkRequestState.FAILED,
                        error: err_1
                    }));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
};
