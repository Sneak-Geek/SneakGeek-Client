//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { handleActions, Action } from "redux-actions";
import { TransactionState } from "../Shared/State";
import { updateSellState } from "../Actions";

export interface ITransactionState {
  sell: {
    state: TransactionState;
  };
}

const initialState: ITransactionState = {
  sell: {
    state: TransactionState.SELL_NOT_STARTED
  }
};

export const TransactionReducers = handleActions<ITransactionState, any>(
  {
    [`${updateSellState}`]: (state: ITransactionState, action: Action<TransactionState>) => ({
      ...state,
      sell: { ...state.sell, state: action.payload }
    })
  },
  initialState
);
