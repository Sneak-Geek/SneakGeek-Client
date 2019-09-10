//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { createAction } from "redux-actions";
import { container, Types } from "../Config/Inversify";
import { ICdnService } from "../Service";
import { TransactionState } from "../Shared/State";
import { IAppSettings, SettingsKeys } from "../Config/Settings";

export const SellOrderActionNames = {
  UPDATE_SELL_ORDER_STATE: "UPDATE_SELL_ORDER_STAGE"
};

export const updateSellState = createAction<TransactionState>(
  SellOrderActionNames.UPDATE_SELL_ORDER_STATE
);

export const sellShoes = (localImgUrls: string[]) => {
  return async (dispatch: Function) => {
    dispatch(updateSellState(TransactionState.SELL_UPLOADING));
    const appSettings = container.get<IAppSettings>(Types.IAppSettings);
    const cdnService = container.get<ICdnService>(Types.ICdnService);

    await appSettings.load();
    const token = appSettings.getValue(SettingsKeys.CurrentAccessToken);
    const presignedUrls = await cdnService.getImageUploadUrls(token, localImgUrls.length);
    const imgUploadPromise = [];

    for (let i = 0; i < localImgUrls.length; i++) {
      imgUploadPromise.push(cdnService.uploadImage(localImgUrls[i], presignedUrls[i]));
    }

    try {
      dispatch(updateSellState(TransactionState.SELL_UPLOADING_PICTURES));
      await Promise.all(imgUploadPromise);
      dispatch(updateSellState(TransactionState.SELL_PICTURES_UPLOADED));
    } catch (error) {
      console.log("Error uploading images");
      dispatch(updateSellState(TransactionState.SELL_FAILURE));
    }
  };
};
