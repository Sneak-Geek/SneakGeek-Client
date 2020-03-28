import { PriceData } from "./PriceData";

export type SellOrder = {
  _id?: string,
  id?: string,
  sellerId: string,
  shoeId: string,
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
  pictures?: Array<string>,
  isDeleted?: boolean
}