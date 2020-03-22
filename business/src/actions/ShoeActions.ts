import { Dispatch, AnyAction } from "redux"
import { createAction } from "redux-actions"
import { SearchShoesPayload, NetworkRequestState } from "../payload"
import { ObjectFactory, FactoryKeys } from "../loader/kernel";
import { IShoeService, ISettingsProvider, SettingsKey } from "../loader/interfaces";
import { Shoe, Review } from "../model";

export const ShoeActions = {
  UPDATE_STATE_SEARCH_SHOES: "UPDATE_STATE_SEARCH_SHOES",
  UPDATE_STATE_GET_REVIEWES: "UPDATE_STATE_GET_REVIEWS",
};

export const updateStateSearchShoes = createAction<SearchShoesPayload>(ShoeActions.UPDATE_STATE_SEARCH_SHOES);
export const updateStateGetReviews = createAction<any>(ShoeActions.UPDATE_STATE_SEARCH_SHOES);

export const searchShoes = (key: string, page: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(updateStateSearchShoes({
      state: NetworkRequestState.REQUESTING,
    }));
    const shoeService = ObjectFactory.getObjectInstance<IShoeService>(FactoryKeys.IShoeService);
    try {
      const shoes: Shoe[] = await shoeService.searchShoes(key, page);

      dispatch(updateStateSearchShoes({
        state: NetworkRequestState.SUCCESS,
        data: shoes
      }));
    } catch (error) {
      dispatch(updateStateSearchShoes({
        state: NetworkRequestState.FAILED,
        error
      }));
    }
  }
}

export const getReviews = (shoeId: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(updateStateGetReviews({ state: NetworkRequestState.REQUESTING }));

    const shoeService = ObjectFactory.getObjectInstance<IShoeService>(FactoryKeys.IShoeService);
    const settings = ObjectFactory.getObjectInstance<ISettingsProvider>(FactoryKeys.ISettingsProvider);
    const token = settings.getValue(SettingsKey.CurrentAccessToken);

    try {
      const reviews: Review[] = await shoeService.getShoeReviews(token, shoeId);

      dispatch(updateStateGetReviews({
        state: NetworkRequestState.SUCCESS,
        data: reviews
      }));
    } catch (error) {
      dispatch(updateStateGetReviews({
        state: NetworkRequestState.FAILED,
        error,
      }));
    }
  }
}