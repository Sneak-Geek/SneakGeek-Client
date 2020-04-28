import { PriceData } from "./PriceData";
import { Shoe } from "./Shoe";
import { OrderStatus } from "../assets";

export type SellOrder = {
  _id?: string,
  id?: string,
  sellerId: string,
  shoeId: string | Shoe,
  shoeSize: string,
  isNewShoe: boolean,
  sellNowPrice: number | PriceData,
  productCondition?: {
    boxCondition?: string,
    isTainted?: boolean,
    isOutsoleWorn?: boolean,
    isTorn?: boolean,
    otherDetail?: string
  },
  status: OrderStatus,
  pictures?: Array<string>,
  isDeleted?: boolean
}