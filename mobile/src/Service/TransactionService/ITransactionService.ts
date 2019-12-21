//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { Transaction, Shoe } from "../../Shared/Model";

export interface ITransactionService {
  sellShoe(token: string, shoeOrder: Transaction): Promise<void>;
  getSellingHistory(token: string): Promise<{ sellHistory: Transaction[]; shoes: Shoe[] }>;
  launchPaymentPage(): void;
}
