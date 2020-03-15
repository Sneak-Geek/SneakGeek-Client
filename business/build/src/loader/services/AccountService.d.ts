import { IAccountService } from "../interfaces";
import { AuthProvider } from "../../types";
import { Account, Profile } from "../../model";
import { BaseService } from "./BaseService";
export declare class AccountService extends BaseService implements IAccountService {
    emailAuth(email: string, password: string, isSignUp?: boolean): Promise<{
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
