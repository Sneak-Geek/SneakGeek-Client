import { Account, Profile, Catalog, Shoe, Review, SellOrder, BuyOrder } from "../model";
export declare enum NetworkRequestState {
    NOT_STARTED = 0,
    REQUESTING = 1,
    SUCCESS = 2,
    FAILED = 3
}
export declare type NetworkPayload<T> = {
    state: NetworkRequestState;
    error?: any;
    data?: T;
};
export declare type AuthenticationPayload = NetworkPayload<{
    user: Account;
    token: string;
}>;
export declare type GetUserProfilePayload = NetworkPayload<{
    profile: Profile;
}>;
export declare type CatalogPayload = NetworkPayload<Catalog[]>;
export declare type SearchShoesPayload = NetworkPayload<Shoe[]>;
export declare type GetReviewsPayload = NetworkPayload<Review[]>;
export declare type GetShoeInfoPayload = NetworkPayload<{
    relatedShoes: Shoe[];
    lowestSellOrder?: SellOrder;
    highestBuyOrder?: BuyOrder;
}>;
export declare type HomePageCatalogsPayload = NetworkPayload<{
    Nike: Catalog;
    Jordan: Catalog;
    adidas: Catalog;
    hot: Catalog;
}>;
