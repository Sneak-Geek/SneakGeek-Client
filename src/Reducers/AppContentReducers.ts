//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { handleActions, Action } from "redux-actions";
import { updateShoesData } from "../Actions";

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
}

const initialAppContentState = {
  shoes: []
};

export const AppContentReducers = handleActions<IAppContentState, any>(
  {
    [`${updateShoesData}`]: (state: IAppContentState, action: Action<Shoe[]>) => {
      return Object.assign({}, state, { shoes: action.payload });
    }
  },
  initialAppContentState
);
