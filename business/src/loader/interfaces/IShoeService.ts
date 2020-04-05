import { Shoe, Review, SellOrder, BuyOrder } from "../../model";

export interface IShoeService {
  searchShoes: (key: string, page: number) => Promise<Shoe[]>;
  getShoeReviews: (token: string, shoeId: string) => Promise<Review[]>;
  addReview: (token: string, review: Review) => Promise<void>;
  getShoeInfo: (token: string, shoeId: string) => Promise<{
    relatedShoes: Shoe[],
    lowestSellOrder?: SellOrder,
    highestBuyOrder?: BuyOrder
  }>;
}