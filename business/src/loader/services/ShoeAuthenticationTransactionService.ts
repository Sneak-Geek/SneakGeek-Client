import { IShoeAuthenticationTransactionService } from "../interfaces/IShoeAuthenticationTransactionService";
import { BaseService } from "./BaseService";
import HttpStatus from "http-status";
import { ShoeAuthentication } from "../../model";

export class ShoeAuthenticationTransactionService extends BaseService
  implements IShoeAuthenticationTransactionService {
  public async getPendingAuthenticationTransaction(
    token: string
  ): Promise<ShoeAuthentication[] | undefined> {
    try {
      const response = await this.apiClient
        .getInstance()
        .get(`/transaction/pending-authentication-transactions`, {
          headers: {
            authorization: token,
          },
        });
      if (
        response &&
        (response.status === HttpStatus.CREATED || response.status === HttpStatus.OK)
      ) {
        const transactions = response.data;
        const result = transactions.pendingAuthenticationTransaction.map(
          (transaction: any) => {
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
          }
        );
        return result;
      } else {
        return undefined;
      }
    } catch (error) {
      return error;
    }
  }

  public async updateAuthenticationStatus(
    token: string,
    transactionId: string,
    authenticationStatus: string,
    description: string
  ): Promise<void> {
    try {
      await this.apiClient.getInstance().put(
        `/transaction/update-authentication-status`,
        {
          transactionId: transactionId,
          authenticationStatus: authenticationStatus,
          description: description,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
    } catch (error) {}
  }
}
