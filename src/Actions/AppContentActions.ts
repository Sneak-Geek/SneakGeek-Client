//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import { createAction } from "redux-actions";
import { Shoe } from "../Reducers";
import { AppContentService } from "../Service";

namespace AppContentActionNames {
  export const FETCH_SHOES = "FETCH_SHOES";
  export const UPDATE_FETCH_SHOES_ERROR = "UPDATE_FETCH_SHOES_ERROR";
  export const UPDATE_SHOES_DATA = "UPDATE_SHOES_DATA";
}

export const updateStatusFetchShoes = createAction<boolean>(AppContentActionNames.FETCH_SHOES);
export const updateShoesData = createAction<Shoe[]>(AppContentActionNames.UPDATE_SHOES_DATA);
export const updateFetchShoesError = createAction<any>(
  AppContentActionNames.UPDATE_FETCH_SHOES_ERROR
);

export const fetchShoes = () => {
  return async (dispatch: Function) => {
    dispatch(updateFetchShoesError(null));
    dispatch(updateStatusFetchShoes(true));
    try {
      const shoes = await AppContentService.getShoes();
      dispatch(updateShoesData(shoes));
    } catch (error) {
    } finally {
      dispatch(updateStatusFetchShoes(false));
    }
  };
};
