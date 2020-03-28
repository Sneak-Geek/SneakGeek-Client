import { Account } from "./Account";
export declare type Review = {
    _id?: string;
    reviewedBy: Account;
    shoeId: string;
    rating: number;
    description: string;
    imageUrls: string[];
    createdAt: string | Date;
    updatedAt: string | Date;
};
