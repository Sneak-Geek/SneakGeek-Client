import { Dispatch, AnyAction } from "redux"
import { createAction } from "redux-actions"
import { SearchShoesPayload, NetworkRequestState } from "../payload"
import { ObjectFactory, FactoryKeys } from "../loader/kernel";
import { IShoeService } from "../loader/interfaces";
import { Shoe } from "../model";

export const ShoeActions = {
  UPDATE_STATE_SEARCH_SHOES: "UPDATE_STATE_SEARCH_SHOES",
}

export const updateStateSearchShoes = createAction<SearchShoesPayload>(ShoeActions.UPDATE_STATE_SEARCH_SHOES);

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