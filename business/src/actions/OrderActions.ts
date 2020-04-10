import { createAction } from "redux-actions"
import { Shoe, BuyOrder, SellOrder } from "../model"
import { GetBuyOrdersPayload, GetSellOrdersPayload, NetworkRequestState } from "../payload";
import { ObjectFactory, FactoryKeys } from "../loader/kernel";
import { ISettingsProvider, IOrderService, SettingsKey, OrderType } from "../loader/interfaces";

export const OrderActions = {
  BUY_SHOE: "BUY_SHOE",
  UPDATE_GET_BUY_ORDERS_STATE: "UPDATE_GET_BUY_ORDERS_STATE",
  UPDATE_GET_SELL_ORDERS_STATE: "UPDATE_GET_SELL_ORDERS_STATE"
}

export const buyShoe = createAction<{
  shoe?: Shoe, size?: string;
}>(OrderActions.BUY_SHOE);

export const updateGetBuyOrdersState = createAction<GetBuyOrdersPayload>(OrderActions.UPDATE_GET_BUY_ORDERS_STATE);
export const updateGetSellOrdersState = createAction<GetSellOrdersPayload>(OrderActions.UPDATE_GET_SELL_ORDERS_STATE);

export const getOrders = (type: OrderType) => {
  const settings = ObjectFactory.getObjectInstance<ISettingsProvider>(FactoryKeys.ISettingsProvider);
  const orderService = ObjectFactory.getObjectInstance<IOrderService>(FactoryKeys.IOrderService);
  const updateAction = type === "BuyOrder" ? updateGetBuyOrdersState : updateGetSellOrdersState;

  return async (dispatch: Function) => {
    dispatch(updateAction({ state: NetworkRequestState.REQUESTING }));
    try {
      const orders = await orderService.getUserOrders(settings.getValue(SettingsKey.CurrentAccessToken), type);
      dispatch(updateAction({
        state: NetworkRequestState.SUCCESS,
        // @ts-ignore
        data: orders as BuyOrder[] | SellOrder[]
      }));
    } catch (error) {
      dispatch(updateAction({
        state: NetworkRequestState.FAILED,
        error
      }));
    }
  }
}