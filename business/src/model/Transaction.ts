import { SellOrder } from "./SellOrder";
import { BuyOrder } from "./BuyOrder";
import { TransactionStatus } from "../assets";

export type Transaction = {
  tracking: string;
  buyOrder: string | BuyOrder;
  sellOrder: string | SellOrder;
  feeBreakdown: {
    totalFee: number,
    shippingFeeFromSellerToSnkg: number,
    shippingFeeFromSnkgToBuyer: number,
    productPrice: number
  };
  status: TransactionStatus;
}