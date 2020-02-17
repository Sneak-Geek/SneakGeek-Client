//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { AccountReducers } from "../reducers";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";

export const history: History = createBrowserHistory();

const rootReducers = combineReducers({
  router: connectRouter(history),
  AccountState: AccountReducers
});

const configureStore = (): any => {
  return createStore(rootReducers, applyMiddleware(routerMiddleware(history), thunkMiddleware));
};

export const AppStore = configureStore();
