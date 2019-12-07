//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { handleActions, Action } from "redux-actions";
import { updateShoesData, updateSearchShoesState, updateGetShoesState } from "../Actions";
import { Shoe } from "../Shared/Model";
import { SearchShoePayload, GetShoesPayload } from "../Shared/Payload";
import { NetworkRequestState } from "../Shared/State";

export interface IAppContentState {
  shoes: Shoe[];
  getShoesState: {
    state: NetworkRequestState;
    shoes?: Shoe[];
    error?: any;
  };
  searchShoesState: {
    shoes?: Shoe[];
    state: NetworkRequestState;
    error?: any;
  };
}

const initialAppContentState: IAppContentState = {
  shoes: [],
  getShoesState: {
    state: NetworkRequestState.NOT_STARTED,
    shoes: []
  },
  searchShoesState: {
    shoes: [],
    state: NetworkRequestState.NOT_STARTED
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
    },
    [`${updateGetShoesState}`]: (
      state: IAppContentState,
      action: Action<GetShoesPayload>
    ) => ({
      ...state,
      getShoesState: {
        ...state.getShoesState,
        ...action.payload
      }
    })
  },
  initialAppContentState
);
