import { Shoe, Review, SellOrder, BuyOrder } from "../../model";
import { BaseService } from "./BaseService";
import { IShoeService } from "../interfaces/IShoeService";

export class ShoeService extends BaseService implements IShoeService {
  public async searchShoes(
    token: string,
    key: string,
    page: number = 0,
    gender?: string,
    brand?: string[]
  ): Promise<{ count: number; shoes: Shoe[] }> {
    let queryUrl = `/shoe/find?page=${page}`;
    if (key.length > 0) {
      queryUrl += `&title=${key}`;
    }

    if (gender && gender.length > 0) {
      queryUrl += `&gender=${gender}`;
    }

    if (brand && brand.length > 0) {
      queryUrl += `&brand=${brand.join(",")}`;
    }

    const response = await this.apiClient.getInstance().get(queryUrl, {
      headers: {
        authorization: token,
      },
    });
    return response.data;
  }

  public async getShoeReviews(token: string, shoeId: string): Promise<Review[]> {
    const response = await this.apiClient.getInstance().get(`/review?shoeId=${shoeId}`, {
      headers: {
        authorization: token,
      },
    });

    return response.data.reviews as Review[];
  }

  public async addReview(token: string, review: Review): Promise<void> {
    return this.apiClient.getInstance().post(
      `/review/`,
      {
        shoeId: review.shoeId,
        rating: review.rating,
        description: review.description,
        imageUrls: review.imageUrls,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  }

  public async getShoeInfo(
    token: string,
    shoeId: string
  ): Promise<{
    relatedShoes: Shoe[];
    lowestSellOrder?: SellOrder;
    highestBuyOrder?: BuyOrder;
  }> {
    const response = await this.apiClient
      .getInstance()
      .get(`/shoe/detail?shoeId=${shoeId}`, {
        headers: {
          authorization: token,
        },
      });
    return response.data;
  }

  public async getReviewStats(
    token: string,
    shoeId: string
  ): Promise<
    | Array<{
        count: number;
        rating: number;
      }>
    | undefined
  > {
    const response = await this.apiClient
      .getInstance()
      .get(`/review/stats?shoeId=${shoeId}`, {
        headers: {
          authorization: token,
        },
      });
    return response.data;
  }

  public async updateRequestProduct(
    token: string,
    title: string,
    brand: string,
    gender?: string,
    imageUrls?: string[]
  ): Promise<void> {
    await this.apiClient.getInstance().post(
      "/product-request/",
      {
        title: title,
        brand: brand,
        gender: gender,
        imageUrls: imageUrls,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  }
}
