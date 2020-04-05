import { Shoe } from "./Shoe";
import { OrderStatus } from "../assets";

export type BuyOrder = {
  buyerId: string,
  shoeId: string | Shoe,
  buyPrice: string,
  sellOrder?: string,
  status?: OrderStatus,
  transactionId?: string
}