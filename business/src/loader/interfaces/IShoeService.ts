import { Shoe, Review } from "../../model";

export interface IShoeService {
  searchShoes: (key: string, page: number) => Promise<Shoe[]>;
  getShoeReviews: (token: string, shoeId: string) => Promise<Review[]>;
  addReview: (token: string, review: Review) => Promise<void>;
}