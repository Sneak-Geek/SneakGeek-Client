//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { handleActions, Action } from "redux-actions";
import { TransactionReduxState, NetworkRequestState } from "../Shared/State";
import { updateSellState, updateGetSellHistory } from "../Actions";
import { Transaction, Shoe } from "../Shared/Model";
import { SellOrderHistoryPayload } from "../Shared/Payload";

export interface ITransactionState {
  sell: {
    state: TransactionReduxState;
  };
  sellHistory: {
    state: NetworkRequestState;
    sellHistory: Transaction[];
    shoes: Shoe[];
    error?: any;
  };
}

const initialState: ITransactionState = {
  sell: {
    state: TransactionReduxState.SELL_NOT_STARTED
  },
  sellHistory: {
    state: NetworkRequestState.NOT_STARTED,
    sellHistory: [],
    shoes: []
  }
};

export const TransactionReducers = handleActions<ITransactionState, any>(
  {
    [`${updateSellState}`]: (
      state: ITransactionState,
      action: Action<TransactionReduxState>
    ) => {
      return {
        ...state,
        sell: { ...state.sell, state: action.payload }
      };
    },
    [`${updateGetSellHistory}`]: (
      state: ITransactionState,
      action: Action<Partial<SellOrderHistoryPayload>>
    ) => {
      return {
        ...state,
        sellHistory: {
          ...state.sellHistory,
          ...action.payload
        }
      };
    }
  },
  initialState
);
