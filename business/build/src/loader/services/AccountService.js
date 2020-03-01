//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseService } from "./BaseService";
import HttpStatus from "http-status";
export class AccountService extends BaseService {
    emailLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.getInstance().post(`/account/email-login`, { email, password }, {
                headers: {
                    "Access-Control-Request-Method": "POST"
                }
            });
            if (response &&
                (response.status === HttpStatus.CREATED || response.status === HttpStatus.OK)) {
                return response.data;
            }
            return undefined;
        });
    }
    login(token, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = { access_token: token };
            const response = yield this.apiClient
                .getInstance()
                .post(`/account/${provider}`, {}, { headers });
            {
            }
            if (response &&
                (response.status === HttpStatus.CREATED || response.status === HttpStatus.OK)) {
                return response.data;
            }
            return undefined;
        });
    }
    getCurrentUser(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = { authorization: accessToken };
            const response = yield this.apiClient.getInstance().get(`/account`, { headers });
            if (response && response.status === HttpStatus.OK) {
                return response.data;
            }
            return undefined;
        });
    }
    getUserProfile(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = { authorization: accessToken };
            const response = yield this.apiClient.getInstance().get("/profile", { headers });
            if (response && response.status === HttpStatus.OK) {
                return response.data;
            }
            return undefined;
        });
    }
}
