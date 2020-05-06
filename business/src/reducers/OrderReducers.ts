import { Shoe, BuyOrder, SellOrder } from "../model";
import { Action } from "redux-actions";
import { buyShoe, updateGetSellOrdersState, updateGetBuyOrdersState } from "../actions";
import { NetworkRequestState, GetSellOrdersPayload, GetBuyOrdersPayload } from "../payload";
import { handleActionsWithReset } from "./HanldeActionWithReset";

export type IOrderState = {
  sellState: {
    shoe?: Shoe;
  };
  buyState: {
    shoe?: Shoe;
    size?: string;
  };
  buyOrdersState: {
    state: NetworkRequestState;
    orders: BuyOrder[];
    error?: any;
  };
  sellOrdersState: {
    state: NetworkRequestState;
    orders: SellOrder[];
    error?: any;
  };
};

export const initialState: IOrderState = {
  buyState: {},
  sellState: {},
  buyOrdersState: {
    state: NetworkRequestState.NOT_STARTED,
    orders: [],
  },
  sellOrdersState: {
    state: NetworkRequestState.NOT_STARTED,
    orders: [],
  },
};

export const OrderReducers = handleActionsWithReset<IOrderState, any>(
  {
    [`${buyShoe}`]: (
      state: IOrderState,
      action: Action<{ shoe?: Shoe; size?: string }>
    ) => ({
      ...state,
      buyState: {
        ...state.buyState,
        shoe: action.payload.shoe || state.buyState.shoe,
        size: action.payload.size || state.buyState.size,
      },
    }),
    [`${updateGetSellOrdersState}`]: (
      state: IOrderState,
      action: Action<GetSellOrdersPayload>
    ) => ({
      ...state,
      sellOrdersState: {
        ...state.sellOrdersState,
        state: action.payload.state,
        error: action.payload.error,
        orders: action.payload.data ?? state.sellOrdersState.orders,
      },
    }),
    [`${updateGetBuyOrdersState}`]: (
      state: IOrderState,
      action: Action<GetBuyOrdersPayload>
    ) => ({
      ...state,
      buyOrdersState: {
        ...state.buyOrdersState,
        state: action.payload.state,
        error: action.payload.error,
        orders: action.payload.data ?? state.buyOrdersState.orders,
      },
    }),
  },
  initialState
);
