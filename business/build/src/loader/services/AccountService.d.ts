import { IAccountService } from "../interfaces";
import { AuthProvider } from "../../types";
import { Account, Profile } from "../../model";
export declare class AccountService implements IAccountService {
    private apiClient;
    constructor();
    emailLogin(email: string, password: string): Promise<{
        user: Account;
        token: string;
    } | undefined>;
    login(token: string, provider: AuthProvider): Promise<{
        user: Account;
        token: string;
    } | undefined>;
    getCurrentUser(accessToken: string): Promise<{
        user: Account;
        token: string;
    } | undefined>;
    getUserProfile(accessToken: string): Promise<Profile | undefined>;
}
