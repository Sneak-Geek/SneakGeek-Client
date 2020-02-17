//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { createStore, applyMiddleware, Store, combineReducers, CombinedState } from "redux";
import thunkMiddleware from "redux-thunk";
import { Dispatch, Action } from "redux";
import { AccountReducers } from "../reducers";
import { connectRouter, routerMiddleware, LocationChangeAction } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { IAppState } from "./IAppState";

export const history: History = createBrowserHistory();

const configureStore = (): Store<CombinedState<IAppState>, LocationChangeAction | Action<any>> =>
  createStore(
    combineReducers({
      RouterState: connectRouter(history),
      AccountState: AccountReducers
    }),
    applyMiddleware(routerMiddleware(history), thunkMiddleware)
  );

export const AppStore = configureStore();
