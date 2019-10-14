import { IAccountService } from "../interfaces";
import { Account, Profile, AuthProvider } from "../../types";
export declare class AccountService implements IAccountService {
    private apiClient;
    constructor();
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
