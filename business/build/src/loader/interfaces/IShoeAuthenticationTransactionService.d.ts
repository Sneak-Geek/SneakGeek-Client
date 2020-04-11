import { ShoeAuthentication } from "../../model";
export interface IShoeAuthenticationTransactionService {
    getPendingAuthenticationTransaction(token: string): Promise<ShoeAuthentication[] | undefined>;
    updateAuthenticationStatus(token: string, transactionId: string, authenticationStatus: string, description: string): Promise<void>;
}
