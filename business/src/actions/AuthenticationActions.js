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
var kernel_1 = require("../loader/kernel");
var interfaces_1 = require("../loader/interfaces");
var ProfileActions_1 = require("./ProfileActions");
exports.AuthenticationActions = {
    UPDATE_AUTHENTICATION_STATE: "UPDATE_AUTHENTICATION_STATE"
};
exports.updateAuthenticationState = redux_actions_1.createAction(exports.AuthenticationActions.UPDATE_AUTHENTICATION_STATE);
exports.getCurrentUser = function () {
    var accountService = kernel_1.ObjectFactory.getObjectInstance(kernel_1.FactoryKeys.IAccountService);
    var settings = kernel_1.ObjectFactory.getObjectInstance(kernel_1.FactoryKeys.ISettingsProvider);
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        var token, accountPayload, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(exports.updateAuthenticationState({ state: payload_1.NetworkRequestState.REQUESTING }));
                    token = settings.getValue(interfaces_1.SettingsKey.CurrentAccessToken);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, accountService.getCurrentUser(token)];
                case 2:
                    accountPayload = _a.sent();
                    if (!accountPayload) return [3 /*break*/, 4];
                    return [4 /*yield*/, settings.loadServerSettings()];
                case 3:
                    _a.sent();
                    dispatch(exports.updateAuthenticationState({
                        state: payload_1.NetworkRequestState.SUCCESS,
                        data: accountPayload
                    }));
                    dispatch(ProfileActions_1.getUserProfile());
                    return [3 /*break*/, 5];
                case 4:
                    dispatch(exports.updateAuthenticationState({
                        state: payload_1.NetworkRequestState.FAILED,
                        error: new Error("Empty account")
                    }));
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    dispatch(exports.updateAuthenticationState({ state: payload_1.NetworkRequestState.FAILED, error: error_1 }));
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
};
exports.authenticateWithEmail = function (email, password, isSignUp) {
    if (isSignUp === void 0) { isSignUp = false; }
    var accountService = kernel_1.ObjectFactory.getObjectInstance(kernel_1.FactoryKeys.IAccountService);
    var settings = kernel_1.ObjectFactory.getObjectInstance(kernel_1.FactoryKeys.ISettingsProvider);
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        var accountPayload, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(exports.updateAuthenticationState({ state: payload_1.NetworkRequestState.REQUESTING }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, accountService.emailAuth(email, password, isSignUp)];
                case 2:
                    accountPayload = _a.sent();
                    if (!accountPayload) return [3 /*break*/, 6];
                    return [4 /*yield*/, settings.setValue(interfaces_1.SettingsKey.CurrentAccessToken, accountPayload.token)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, settings.loadServerSettings()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, dispatch(ProfileActions_1.getUserProfile())];
                case 5:
                    _a.sent();
                    dispatch(exports.updateAuthenticationState({
                        state: payload_1.NetworkRequestState.SUCCESS,
                        data: accountPayload
                    }));
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    dispatch(exports.updateAuthenticationState({ state: payload_1.NetworkRequestState.FAILED, error: error_2 }));
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
};
exports.authenticateWithFb = function () {
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        var permissions, fbSdk, accountService, settings, loginResult, accessToken, accountPayload, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    permissions = ["public_profile", "email"];
                    fbSdk = kernel_1.ObjectFactory.getObjectInstance(kernel_1.FactoryKeys.IFacebookSDK);
                    accountService = kernel_1.ObjectFactory.getObjectInstance(kernel_1.FactoryKeys.IAccountService);
                    settings = kernel_1.ObjectFactory.getObjectInstance(kernel_1.FactoryKeys.ISettingsProvider);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, fbSdk.loginWithPermission(permissions)];
                case 2:
                    loginResult = _a.sent();
                    if (!loginResult.isCancelled) return [3 /*break*/, 3];
                    dispatch(exports.updateAuthenticationState({
                        state: payload_1.NetworkRequestState.FAILED
                    }));
                    return [3 /*break*/, 7];
                case 3: return [4 /*yield*/, fbSdk.getCurrentAccessToken()];
                case 4:
                    accessToken = _a.sent();
                    return [4 /*yield*/, accountService.login(accessToken, "facebook")];
                case 5:
                    accountPayload = _a.sent();
                    return [4 /*yield*/, settings.setValue(interfaces_1.SettingsKey.CurrentAccessToken, accountPayload.token)];
                case 6:
                    _a.sent();
                    dispatch(exports.updateAuthenticationState({
                        state: payload_1.NetworkRequestState.SUCCESS,
                        data: accountPayload
                    }));
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_3 = _a.sent();
                    dispatch(exports.updateAuthenticationState({ state: payload_1.NetworkRequestState.FAILED, error: error_3 }));
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
};
