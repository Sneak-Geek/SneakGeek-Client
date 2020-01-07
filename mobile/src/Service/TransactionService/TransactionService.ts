// !
// ! Copyright (c) 2019 - SneakGeek. All rights reserved
// !
import { ITransactionService } from "./ITransactionService";
import { getLatestPrice, SellOrder, Transaction, BuyOrder } from "../../Shared/Model";
import ApiClient, { baseUrl } from "../ApiClient";
import * as HttpStatus from "http-status";
import { injectable } from "inversify";
import SafariView from "react-native-safari-view";
import URI from "urijs";
import { container, Types } from "../../Config/Inversify";
import { IStoreProvider } from "../../Store";

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

  public async buyShoe(token: string, soldPrice: number, sellOrderId: string) {
    const headers = { authorization: token };
    const result = await ApiClient.post("/transaction/buy/new", { soldPrice, sellOrderId }, { headers });

    return result.data;
  }

  public async /** override */ getSellingHistory(token: string): Promise<{ sellHistory: SellOrder[] }> {
    const headers = { authorization: token };
    const result = await ApiClient.get("/transaction/sell/all", { headers });
    if (result && result.status === HttpStatus.OK) {
      return result.data;
    }

    return { sellHistory: [] };
  }

  public async /** override */ getBuyHistory(token: string): Promise<{ buyHistory: BuyOrder[] }> {
    const headers = { authorization: token };
    const result = await ApiClient.get("/transaction/buy/all", { headers });
    if (result) {
      return result.data;
    }

    return { buyHistory: [] };
  }

  public /** override */ launchIntlPaymentPage(sellOrder: SellOrder) {
    const buyerId = container
      .get<IStoreProvider>(Types.IStoreProvider)
      .getStore()
      .getState().AccountState.currentAccount?._id;

    const onePayIntlBaseUrl: string = "https://mtf.onepay.vn/vpcpay/vpcpay.op";
    let paymentUrl = new URI(onePayIntlBaseUrl);
    const params = {
      vpc_Version: "2",
      vpc_Command: "pay",
      vpc_AccessCode: "6BEB2546",
      vpc_Merchant: "TESTONEPAY",
      vpc_Currency: "VND",
      vpc_Locale: "vn",
      vpc_ReturnURL: `${baseUrl}/transaction/buy/new?buyerId=${buyerId}&sellOrderId=${
        sellOrder._id
      }&soldPrice=${getLatestPrice(sellOrder)}`,
      vpc_MerchTxnRef: `${sellOrder._id}|${buyerId}`,
      vpc_OrderInfo: sellOrder.shoe?.[0].title,
      vpc_Amount: getLatestPrice(sellOrder),
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

  public /** override */ launchDomesticPaymentPage(sellOrder: SellOrder) {
    const buyerId = container
      .get<IStoreProvider>(Types.IStoreProvider)
      .getStore()
      .getState().AccountState.currentAccount?._id;

    const onePayIntlBaseUrl: string = "https://mtf.onepay.vn/onecomm-pay/vpc.op";
    let paymentUrl = new URI(onePayIntlBaseUrl);
    const params = {
      vpc_Version: "2",
      vpc_Command: "pay",
      vpc_Currency: "VND",
      vpc_AccessCode: "D67342C2",
      vpc_Merchant: "ONEPAY",
      vpc_Locale: "vn",
      vpc_ReturnURL: `${baseUrl}/transaction/buy/new?buyerId=${buyerId}&sellOrderId=${
        sellOrder._id
      }&soldPrice=${getLatestPrice(sellOrder)}`,
      vpc_MerchTxnRef: sellOrder._id,
      vpc_OrderInfo: sellOrder.shoe?.[0].title,
      vpc_Amount: `${getLatestPrice(sellOrder)}00`,
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

  public async /** override */ getAvailableOrders(token: string, shoeId: string): Promise<SellOrder[]> {
    const headers = { authorization: token };

    const result = await ApiClient.get(`/transaction/orders?type=sell&shoeId=${shoeId}`, { headers });
    if (result && result.status === HttpStatus.OK) {
      return result.data.orders;
    }

    return [];
  }
}
