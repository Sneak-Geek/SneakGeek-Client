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
export class ShoeService extends BaseService {
    searchShoes(key, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.getInstance().get(`/shoe/find?page=${page}&title=${key}`);
            return response.data;
        });
    }
    getShoeReviews(token, shoeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.getInstance().get(`/review/${shoeId}`, {
                headers: {
                    authorization: token
                }
            });
            return response.data.reviews;
        });
    }
    addReview(token, review) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiClient.getInstance().post(`/review/`, {
                shoeId: review.shoeId,
                rating: review.rating,
                description: review.description,
                imageUrls: review.imageUrls
            }, {
                headers: {
                    authorization: token
                }
            });
        });
    }
    getShoeInfo(token, shoeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.getInstance().get(`/shoe/detail?shoeId=${shoeId}`, {
                headers: {
                    authorization: token,
                }
            });
            return response.data;
        });
    }
    getLowestSellPrices(token, shoeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.getInstance().get(`/shoe/sell-order/lowest-by-size?shoeId=${shoeId}`, {
                headers: {
                    authorization: token
                }
            });
            return response.data;
        });
    }
}
