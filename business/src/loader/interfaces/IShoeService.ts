import { Shoe, Review, SellOrder, BuyOrder } from "../../model";

export interface IShoeService {
  searchShoes: (
    token: string,
    key: string,
    page: number,
    gender?: string,
    brand?: string[]
  ) => Promise<{ count: number; shoes: Shoe[] }>;
  getShoeReviews: (token: string, shoeId: string) => Promise<Review[]>;
  addReview: (token: string, review: Review) => Promise<void>;
  getShoeInfo: (
    token: string,
    shoeId: string
  ) => Promise<{
    relatedShoes: Shoe[];
    lowestSellOrder?: SellOrder;
    highestBuyOrder?: BuyOrder;
  }>;
  getReviewStats: (
    token: string,
    shoeId: string
  ) => Promise<
    | Array<{
        count: number;
        rating: number;
      }>
    | undefined
  >;
  updateRequestProduct: (
    token: string,
    title: string,
    brand: string,
    gender?: string,
    imageUrls?: string[]
  ) => Promise<void>;
}
