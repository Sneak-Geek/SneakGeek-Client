//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { createAction } from "redux-actions";
import { Shoe } from "../Reducers";
import { IAppContentService } from "../Service";
import { SearchShoeState } from "../Shared/State";
import { container, Types } from "../Config/Inversify";

namespace AppContentActionNames {
  export const FETCH_SHOES = "FETCH_SHOES";
  export const UPDATE_FETCH_SHOES_ERROR = "UPDATE_FETCH_SHOES_ERROR";
  export const UPDATE_SHOES_DATA = "UPDATE_SHOES_DATA";

  export const UPDATE_SEARCH_SHOE_STATE = "UPDATE_SEARCH_SHOE_STATE";
}

export const updateStatusFetchShoes = createAction<boolean>(AppContentActionNames.FETCH_SHOES);
export const updateShoesData = createAction<Shoe[]>(AppContentActionNames.UPDATE_SHOES_DATA);
export const updateFetchShoesError = createAction<any>(
  AppContentActionNames.UPDATE_FETCH_SHOES_ERROR
);

export type SearchShoePayload = { state: SearchShoeState; shoes?: Shoe[]; error?: any };

export const updateSearchShoesState = createAction<SearchShoePayload>(
  AppContentActionNames.UPDATE_SEARCH_SHOE_STATE
);

export const fetchShoes = () => {
  return async (dispatch: Function) => {
    dispatch(updateFetchShoesError(null));
    dispatch(updateStatusFetchShoes(true));
    try {
      const appContentService = container.get<IAppContentService>(Types.IAppContentService);
      const shoes = await appContentService.getShoes();
      dispatch(updateShoesData(shoes));
    } catch (error) {
    } finally {
      dispatch(updateStatusFetchShoes(false));
    }
  };
};

export const searchShoes = (keyword: string) => {
  return async (dispatch: Function) => {
    dispatch(updateSearchShoesState({ state: SearchShoeState.SEARCHING, error: undefined }));
    try {
      const appContentService = container.get<IAppContentService>(Types.IAppContentService);
      const shoes = await appContentService.searchShoes(keyword);
      dispatch(
        updateSearchShoesState({ state: SearchShoeState.SUCCESS, shoes, error: undefined })
      );
    } catch (error) {
      dispatch(updateSearchShoesState({ state: SearchShoeState.FAILED, error }));
    }
  };
};
