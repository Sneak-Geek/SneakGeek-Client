//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!
import { ITransactionService } from "./ITransactionService";
import { SellOrder } from "../../Shared/Model";
import ApiClient from "../ApiClient";
import * as HttpStatus from "http-status";
import { injectable } from "inversify";

@injectable()
export class TransactionService implements ITransactionService {
  public async /** override */ sellShoe(token: string, shoeOrder: SellOrder): Promise<any> {
    const headers = { authorization: token };
    const result = await ApiClient.post("/transaction/sell/new", shoeOrder, { headers });
    if (result && result.status === HttpStatus.CREATED) {
      return result.data;
    }

    return undefined;
  }
}
