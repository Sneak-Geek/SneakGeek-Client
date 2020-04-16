import { Shoe } from "./Shoe";
import { OrderStatus } from "../assets";
import { PriceData } from "./PriceData";
import { SellOrder } from "./SellOrder";

export type BuyOrder = {
  _id: string,
  buyerId: string,
  shoe: string | Shoe,
  shoeSize: string,
  /**
   * buyPrice's type:
   * - string: ID of the PriceData
   * - PriceData: populated object
   * - number: for object creation purpose
   */
  buyPrice: string | PriceData | number,
  sellOrder?: string | SellOrder,
  status?: OrderStatus,
  transactionId?: string
}