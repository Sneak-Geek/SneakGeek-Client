export type BuyOrder = {
  buyerId: string,
  shoeId: string,
  buyPrice: string,
  sellOrder?: string,
  status?: string,
  transactionId?: string
}