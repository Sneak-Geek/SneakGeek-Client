export interface Shoe {
  _id: string;
  brand: string;
  category: string;
  colorway: string[];
  name: string;
  description?: string;
  imageUrl?: string;
  shoe: string;
  urlKey: string;
  title: string;
  retailPrice?: number;
  releaseDate?: string;
  reviewStats: {
    avgRating: number;
    totalReviews: number;
    fiveStarReviews: number;
    fourStarReviews: number;
    threeStarReviews: number;
    twoStarReviews: number;
    oneStarReviews: number;
  };
}
