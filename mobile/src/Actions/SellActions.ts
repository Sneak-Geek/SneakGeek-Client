//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { createAction } from "redux-actions";

namespace SellOrderActionNames {
  export const UPDATE_SELL_ORDER_STATE = "UPDATE_SELL_ORDER_STAGE";
}

export const updateSellOrderStage = createAction(SellOrderActionNames.UPDATE_SELL_ORDER_STATE);

export const uploadSellOrder = () => {
  return (dispatch: Function) => {
    dispatch(updateSellOrderStage());
  };
};
