import { SellOrder, BuyOrder, Transaction } from "../../../model";

export type PaymentType = "intl" | "domestic";
export type OrderType = "BuyOrder" | "SellOrder";
export type SellOrderEditInput = {
  orderId: string;
  sellNowPrice?: number;
  productCondition?: {
    isTainted?: boolean;
    isOutsoleWorn?: boolean;
    isTorn?: boolean;
    otherDetail?: boolean;
  };
};

export interface IOrderService {
  createSellOrder(token: string, sellOrder: SellOrder): Promise<void>;
  createBuyOrder(token: string, buyOrder: Partial<BuyOrder>): Promise<void>;
  getLowestSellPrices: (token: string, shoeId: string) => Promise<{ minPrice: number, size: string }[]>;
  getMatchingSellOrder: (token: string, shoeId: string, size: string) => Promise<SellOrder>;
  getTotalFee: (token: string, sellOrderId: string) => Promise<{ shippingFee: number, shoePrice: number }>;
  getCheckoutUrlForPurchase: (token: string, paymentType: PaymentType, sellOrderId: string, buyOrderId?: string) => Promise<string>;
  getUserOrders: (token: string, type: OrderType) => Promise<Array<BuyOrder> | Array<SellOrder>>;
  getTransactionBySellOrder: (token: string, sellOrderId: string) => Promise<Transaction>;
  getSellOrderInfoForBuy(token: string, shoeId: string, shoeSize: string): Promise<{
    lowestSellOrder?: SellOrder;
    highestBuyOrderPrice?: number;
  }>;
  updateSellOrder: (token: string, order: SellOrderEditInput) => Promise<void>;
  cancelSellOrder: (token: string, orderId: string) => Promise<void>;
  getSellOrderById: (token: string, orderId: string) => Promise<SellOrder>;
}