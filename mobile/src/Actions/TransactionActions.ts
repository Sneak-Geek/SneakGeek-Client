//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { createAction } from "redux-actions";
import { container, Types } from "../Config/Inversify";
import { ICdnService, ITransactionService } from "../Service";
import { TransactionReduxState, NetworkRequestState } from "../Shared/State";
import { SellOrder } from "../Shared/Model";
import { SellOrderHistoryPayload } from "../Shared/Payload";
import { IAppSettings, SettingsKeys } from "../Config/Settings";

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

export const sellShoes = (sellOrder: SellOrder) => {
  return async (dispatch: Function) => {
    dispatch(updateSellState(TransactionReduxState.SELL_UPLOADING));
    const appSettings = container.get<IAppSettings>(Types.IAppSettings);
    const cdnService = container.get<ICdnService>(Types.ICdnService);
    const transactionService = container.get<ITransactionService>(Types.ITransactionService);

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
        await transactionService.sellShoe(token, sellOrder);
        dispatch(updateSellState(TransactionReduxState.SELL_SUCCESS));
      }
    } catch (error) {
      console.log(`Error selling shoes`, error);
      dispatch(updateSellState(TransactionReduxState.SELL_FAILURE));
    }
  };
};

export const getSellHistory = () => {
  return async (dispatch: Function) => {
    dispatch(updateGetSellHistory({ state: NetworkRequestState.REQUESTING }));
    const appSettings = container.get<IAppSettings>(Types.IAppSettings);
    const transactionService = container.get<ITransactionService>(Types.ITransactionService);
    const token = appSettings.getValue(SettingsKeys.CurrentAccessToken);

    try {
      const history: SellOrder[] = await transactionService.getSellingHistory(token);
      dispatch(updateGetSellHistory({ state: NetworkRequestState.SUCCESS, history }));
    } catch (error) {
      dispatch(updateGetSellHistory({ state: NetworkRequestState.FAILED, error }));
    }
  };
};
