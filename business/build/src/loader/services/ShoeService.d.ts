import { Shoe, Review } from "../../model";
import { BaseService } from "./BaseService";
import { IShoeService } from "../interfaces/IShoeService";
export declare class ShoeService extends BaseService implements IShoeService {
    searchShoes(key: string, page?: number): Promise<Shoe[]>;
    getShoeReviews(token: string, shoeId: string): Promise<Review[]>;
    addReview(token: string, review: Review): Promise<void>;
}
