import { Shoe } from "./Shoe";
import { OrderStatus } from "../assets";
import { PriceData } from "./PriceData";
import { SellOrder } from "./SellOrder";

export type BuyOrder = {
  _id: string,
  buyerId: string,
  shoe: string | Shoe,
  shoeSize: string,
  buyPrice: string | PriceData,
  sellOrder?: string | SellOrder,
  status?: OrderStatus,
  transactionId?: string
}