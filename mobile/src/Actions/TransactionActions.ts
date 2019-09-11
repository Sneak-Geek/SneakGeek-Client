//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { createAction } from "redux-actions";
import { container, Types } from "../Config/Inversify";
import { ICdnService, ITransactionService } from "../Service";
import { TransactionState } from "../Shared/State";
import { SellOrder } from "../Shared/Model";
import { IAppSettings, SettingsKeys } from "../Config/Settings";
import { NavigationActions, StackActions } from "react-navigation";
import { RouteNames } from "../Navigation";

export const SellOrderActionNames = {
  UPDATE_SELL_ORDER_STATE: "UPDATE_SELL_ORDER_STAGE"
};

export const updateSellState = createAction<TransactionState>(
  SellOrderActionNames.UPDATE_SELL_ORDER_STATE
);

export const sellShoes = (sellOrder: SellOrder) => {
  return async (dispatch: Function) => {
    dispatch(updateSellState(TransactionState.SELL_UPLOADING));
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
        dispatch(updateSellState(TransactionState.SELL_PICTURES_UPLOADED));
        sellOrder.shoePictures = presignedUrls;
        await transactionService.sellShoe(token, sellOrder);
        dispatch(updateSellState(TransactionState.SELL_SUCCESS));
      }
    } catch (error) {
      console.log(`Error selling shoes`, error);
      dispatch(updateSellState(TransactionState.SELL_FAILURE));
    }
  };
};
