//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { handleActions, Action } from "redux-actions";
import { updateShoesData, updateSearchShoesState, SearchShoePayload } from "../Actions";
import { SearchShoeState } from "../Shared/State";

export type Shoe = {
  brand: string;
  category: string;
  colorway: string[];
  name: string;
  description?: string;
  media: {
    imageUrl: string;
  };
  shoe: string;
  urlKey: string;
  title: string;

  // indexing Shoe purpose only
  [key: string]: any;
};

export interface IAppContentState {
  shoes: Shoe[];
  shoesSearchResult: {
    shoes?: Shoe[];
    state: SearchShoeState;
    error?: any;
  };
}

const initialAppContentState = {
  shoes: [],
  shoesSearchResult: {
    state: SearchShoeState.NOT_STARTED
  }
};

export const AppContentReducers = handleActions<IAppContentState, any>(
  {
    [`${updateShoesData}`]: (state: IAppContentState, action: Action<Shoe[]>) => {
      return Object.assign({}, state, { shoes: action.payload });
    },
    [`${updateSearchShoesState}`]: (
      state: IAppContentState,
      action: Action<SearchShoePayload>
    ) => {
      const { payload } = action;
      let result = {
        ...state,
        shoesSearchResult: {
          shoes: payload.shoes,
          state: payload.state,
          error: payload.error
        }
      };

      if (payload.shoes && payload.shoes.length > 0) {
        result = { ...result, shoes: [...result.shoes, ...payload.shoes] };
      }

      return result;
    }
  },
  initialAppContentState
);
