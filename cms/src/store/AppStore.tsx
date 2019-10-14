//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { createStore, applyMiddleware, Store, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { AccountReducers } from "../reducers";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";

export const history: History = createBrowserHistory();

const configureStore = (): Store<any> => {
  return createStore(
    combineReducers({
      router: connectRouter(history),
      AccountState: AccountReducers
    }),
    applyMiddleware(routerMiddleware(history), thunkMiddleware)
  );
};

const store = configureStore();
export const AppStore = store;
