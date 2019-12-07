//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { createAction } from "redux-actions";
import { container, Types } from "../Config/Inversify";
import { ICdnService, ITransactionService } from "../Service";
import { TransactionReduxState, NetworkRequestState } from "../Shared/State";
import { Transaction } from "../Shared/Model";
import { SellOrderHistoryPayload } from "../Shared/Payload";
import { IAppSettingsService, SettingsKeys } from "../Service/AppSettingsService";
import { showNotification } from "./NotificationActions";

export const TransactionActionNames = {
  UPDATE_SELL_ORDER_STATE: "UPDATE_SELL_ORDER_STAGE",
  UPDATE_GET_SELL_HISTORY: "UPDATE_GET_SELL_HISTORY"
};

export const updateSellState = createAction<TransactionReduxState>(
  TransactionActionNames.UPDATE_SELL_ORDER_STATE
);

export const updateGetSellHistory = createAction<SellOrderHistoryPayload>(
  TransactionActionNames.UPDATE_GET_SELL_HISTORY
);

export const sellShoes = (sellOrder: Transaction) => {
  return async (dispatch: Function) => {
    dispatch(updateSellState(TransactionReduxState.SELL_UPLOADING));
    const appSettings = container.get<IAppSettingsService>(Types.IAppSettingsService);
    const cdnService = container.get<ICdnService>(Types.ICdnService);
    const transactionService = container.get<ITransactionService>(
      Types.ITransactionService
    );

    const pictures = sellOrder.shoePictures;
    const token = appSettings.getValue(SettingsKeys.CurrentAccessToken);

    try {
      if (pictures && pictures.length > 0) {
        const presignedUrls = await cdnService.getImageUploadUrls(token, pictures.length);
        const imgUploadPromise = [];

        for (let i = 0; i < pictures.length; i++) {
          imgUploadPromise.push(cdnService.uploadImage(pictures[i], presignedUrls[i]));
        }

        await Promise.all(imgUploadPromise);
        dispatch(updateSellState(TransactionReduxState.SELL_PICTURES_UPLOADED));
        sellOrder.shoePictures = presignedUrls;
      }

      await transactionService.sellShoe(token, sellOrder);
      dispatch(showNotification("Đã bán thành công sản phẩm"));
      dispatch(updateSellState(TransactionReduxState.SELL_SUCCESS));
    } catch (error) {
      console.log(`Error selling shoes`, error);
      dispatch(updateSellState(TransactionReduxState.SELL_FAILURE));
    }
  };
};

export const getSellHistory = () => {
  return async (dispatch: Function) => {
    dispatch(updateGetSellHistory({ state: NetworkRequestState.REQUESTING }));
    const appSettings = container.get<IAppSettingsService>(Types.IAppSettingsService);
    const transactionService = container.get<ITransactionService>(
      Types.ITransactionService
    );
    const token = appSettings.getValue(SettingsKeys.CurrentAccessToken);

    try {
      const { sellHistory, shoes } = await transactionService.getSellingHistory(token);

      dispatch(
        updateGetSellHistory({ state: NetworkRequestState.SUCCESS, sellHistory, shoes })
      );
    } catch (error) {
      dispatch(updateGetSellHistory({ state: NetworkRequestState.FAILED, error }));
    }
  };
};
