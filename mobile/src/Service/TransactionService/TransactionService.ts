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

  public launchIntlPaymentPage() {
    const onePayIntlBaseUrl: string = "https://mtf.onepay.vn/vpcpay/vpcpay.op";
    let paymentUrl = new URI(onePayIntlBaseUrl);
    const params = {
      vpc_Version: "2",
      vpc_Command: "pay",
      vpc_AccessCode: "6BEB2546",
      vpc_Merchant: "TESTONEPAY",
      vpc_Locale: "vi",
      vpc_ReturnURL: "https://google.com",
      vpc_MerchTxnRef: "asdohdaso48aosdf",
      vpc_OrderInfo: "Mo ta don hang",
      vpc_Amount: "15000000",
      vpc_TicketNo: "97.115.137.252",
      AgainLink: "https://google.com",
      Title: "Thanh toán",
      vpc_SecureHash: "6D0870CDE5F24F34F3915FB0045120DB"
    };

    Object.keys(params).forEach(key => {
      // @ts-ignore
      paymentUrl = paymentUrl.addQuery(key, params[key]);
    });

    SafariView.show({ url: paymentUrl.toString() });
  }

  public launchDomesticPaymentPage() {
    const onePayIntlBaseUrl: string = "https://mtf.onepay.vn/onecomm-pay/vpc.op";
    let paymentUrl = new URI(onePayIntlBaseUrl);
    const params = {
      vpc_Version: "2",
      vpc_Command: "pay",
      vpc_AccessCode: "D67342C2",
      vpc_Merchant: "ONEPAY",
      vpc_Locale: "vi",
      vpc_ReturnURL: "https://microsoft.com",
      vpc_MerchTxnRef: "asdohdaso48aosdfasf",
      vpc_OrderInfo: "Mo ta don hang",
      vpc_Amount: "15000000",
      vpc_TicketNo: "97.115.137.252",
      AgainLink: "https://google.com",
      Title: "Thanh toán",
      vpc_SecureHash: "A3EFDFABA8653DF2342E8DAC29B51AF0"
    };

    Object.keys(params).forEach(key => {
      // @ts-ignore
      paymentUrl = paymentUrl.addQuery(key, params[key]);
    });

    SafariView.show({ url: paymentUrl.toString() });
  }
}
