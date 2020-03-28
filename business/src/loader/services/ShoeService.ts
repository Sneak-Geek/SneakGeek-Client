import { Shoe, Review, SellOrder, BuyOrder } from "../../model";
import { BaseService } from "./BaseService";
import { IShoeService } from "../interfaces/IShoeService";

export class ShoeService extends BaseService implements IShoeService {
  public async searchShoes(key: string, page: number = 0): Promise<Shoe[]> {
    const response = await this.apiClient.getInstance().get(`/shoe/find?page=${page}&title=${key}`);
    return response.data as Shoe[];
  }

  public async getShoeReviews(token: string, shoeId: string): Promise<Review[]> {
    const response = await this.apiClient.getInstance().get(`/review/${shoeId}`, {
      headers: {
        authorization: token
      }
    });

    return response.data.reviews as Review[];
  }

  public async addReview(token: string, review: Review): Promise<void> {
    return this.apiClient.getInstance().post(`/review/`,
      {
        shoeId: review.shoeId,
        rating: review.rating,
        description: review.description,
        imageUrls: review.imageUrls
      },
      {
        headers: {
          authorization: token
        }
      }
    );
  }

  public async getShoeInfo(token: string, shoeId: string): Promise<{
    relatedShoes: Shoe[],
    lowestSellOrder?: SellOrder,
    highestBuyOrder?: BuyOrder
  }> {
    const response = await this.apiClient.getInstance().get(`/shoe/detail?shoeId=${shoeId}`, {
      headers: {
        authorization: token,
      }
    });

    return response.data;
  }

  public async getLowestSellPrices(token: string, shoeId: string): Promise<{ minPrice: number; size: string; }[]> {
    const response = await this.apiClient.getInstance().get(`/shoe/sell-order/lowest-by-size?shoeId=${shoeId}`, {
      headers: {
        authorization: token
      }
    });

    return response.data as { minPrice: number, size: string }[];
  }

}