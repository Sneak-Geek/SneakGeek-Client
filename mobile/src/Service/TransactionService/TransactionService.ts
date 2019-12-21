//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!
import { ITransactionService } from "./ITransactionService";
import { Transaction, Shoe } from "../../Shared/Model";
import ApiClient from "../ApiClient";
import * as HttpStatus from "http-status";
import { injectable } from "inversify";
import SafariView from "react-native-safari-view";
import URI from "urijs";

@injectable()
export class TransactionService implements ITransactionService {
  private onePayBaseUrl: string = "https://mtf.onepay.vn/vpcpay/vpcpay.op";

  public async /** override */ sellShoe(
    token: string,
    shoeOrder: Transaction
  ): Promise<any> {
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

  public launchPaymentPage() {
    let paymentUrl = new URI(this.onePayBaseUrl);
    const params = {
      vpc_Version: "2",
      vpc_Command: "pay",
      vpc_AccessCode: "6BEB2546",
      vpc_Merchant: "TESTONEPAY",
      vpc_Locale: "vn",
      vpc_ReturnUrl: "https://microsoft.com",
      vpc_MerchTxnRef: "asdoho48",
      vpc_OrderInfo: "97.113.137.252",
      vpc_Amount: "15000000",
      vpc_TicketNo: "",
      AgainLink: "https://google.com",
      Title: "Thanh toán",
      vpc_SecureHash: "6D0870CDE5F24F34F3915FB0045120DB"
    };

    for (let key in Object.keys(params)) {
      // @ts-ignore
      const val = params[key] as string;
      paymentUrl = paymentUrl.addQuery(key, val);
    }

    SafariView.show({ url: paymentUrl.toString() });
  }
}
