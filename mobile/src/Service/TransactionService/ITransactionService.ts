//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { SellOrder } from "../../Shared/Model";

export interface ITransactionService {
  sellShoe(token: string, shoeOrder: SellOrder): Promise<void>;
  getSellingHistory(token: string): Promise<SellOrder[]>;
}
