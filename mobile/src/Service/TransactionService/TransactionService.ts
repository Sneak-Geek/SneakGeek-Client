//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!
import { ITransactionService } from "./ITransactionService";
import { Transaction, Shoe } from "../../Shared/Model";
import ApiClient from "../ApiClient";
import * as HttpStatus from "http-status";
import { injectable } from "inversify";

@injectable()
export class TransactionService implements ITransactionService {
  public async /** override */ sellShoe(token: string, shoeOrder: Transaction): Promise<any> {
    const headers = { authorization: token };
    const result = await ApiClient.post("/transaction/sell/new", shoeOrder, { headers });
    if (result && result.status === HttpStatus.CREATED) {
      return result.data;
    }

    return undefined;
  }

  public async /** override */ getSellingHistory(
    token: string
  ): Promise<{ sellHistory: Transaction[]; shoes: Shoe[] }> {
    const headers = { authorization: token };
    const result = await ApiClient.get("/transaction/sell/all", { headers });
    if (result && result.status === HttpStatus.OK) {
      return result.data;
    }

    return { sellHistory: [], shoes: [] };
  }
}
