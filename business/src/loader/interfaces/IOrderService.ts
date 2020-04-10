import { SellOrder, BuyOrder, Transaction } from "../../model";

export type PaymentType = "intl" | "domestic";
export type OrderType = "BuyOrder" | "SellOrder";

export interface IOrderService {
  createSellOrder(token: string, sellOrder: SellOrder): Promise<void>;
  getLowestSellPrices: (token: string, shoeId: string) => Promise<{ minPrice: number, size: string }[]>;
  getMatchingSellOrder: (token: string, shoeId: string, size: string) => Promise<SellOrder>;
  getTotalFee: (token: string, sellOrderId: string) => Promise<{ shippingFee: number, shoePrice: number }>;
  getCheckoutUrlForPurchase: (token: string, paymentType: PaymentType, sellOrderId: string, buyOrderId?: string) => Promise<string>;
  getUserOrders: (token: string, type: OrderType) => Promise<Array<BuyOrder> | Array<SellOrder>>;
  getTransactionBySellOrder: (token: string, sellOrderId: string) => Promise<Transaction>;
}