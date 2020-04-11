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
export class ShoeAuthenticationTransactionService extends BaseService {
    getPendingAuthenticationTransaction(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.apiClient
                    .getInstance()
                    .get(`/transaction/pending-authentication-transactions`, {
                    headers: {
                        authorization: token,
                    },
                });
                if (response &&
                    (response.status === HttpStatus.CREATED || response.status === HttpStatus.OK)) {
                    const transactions = response.data;
                    const result = transactions.pendingAuthenticationTransaction.map((transaction) => {
                        return {
                            title: transaction.sellOrder.product.title,
                            imageUrl: transaction.sellOrder.product.imageUrl,
                            brand: transaction.sellOrder.product.brand,
                            size: transaction.sellOrder.shoeSize,
                            isNew: transaction.sellOrder.isNewShoe,
                            images: transaction.sellOrder.pictures,
                            condition: undefined,
                            trackingId: transaction.tracking.ghnDeliverFromSellerCode,
                            status: transaction.latestTrackingStatus.status,
                            uploadDate: "",
                            transactionId: transaction._id,
                        };
                    });
                    return result;
                }
                else {
                    return undefined;
                }
            }
            catch (error) {
                return error;
            }
        });
    }
    updateAuthenticationStatus(token, transactionId, authenticationStatus, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.apiClient.getInstance().put(`/transaction/update-authentication-status`, {
                    transactionId: transactionId,
                    authenticationStatus: authenticationStatus,
                    description: description,
                }, {
                    headers: {
                        authorization: token,
                    },
                });
            }
            catch (error) { }
        });
    }
}
