import { IShoeAuthenticationTransactionService } from "../interfaces/IShoeAuthenticationTransactionService";
import { BaseService } from "./BaseService";
import { ShoeAuthentication } from "../../model";
export declare class ShoeAuthenticationTransactionService extends BaseService implements IShoeAuthenticationTransactionService {
    getPendingAuthenticationTransaction(token: string): Promise<ShoeAuthentication[] | undefined>;
    updateAuthenticationStatus(token: string, transactionId: string, authenticationStatus: string, description: string): Promise<void>;
}
