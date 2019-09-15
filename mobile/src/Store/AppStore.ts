//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { compose, createStore, applyMiddleware, Store, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import {
  AccountReducers,
  AppContentReducers,
  NavigationReducers,
  ModalReducers,
  TransactionReducers,
  NotificationReducers
} from "../Reducers";
import { navigationMiddleware } from "../Navigation/AppNavigator";

declare var window: any;

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (): Store<any> => {
  return createStore(
    combineReducers({
      NavigationState: NavigationReducers,
      AccountState: AccountReducers,
      AppContentState: AppContentReducers,
      ModalState: ModalReducers,
      TransactionState: TransactionReducers,
      NotificationState: NotificationReducers
    }),
    composeEnhancers(applyMiddleware(navigationMiddleware, thunkMiddleware))
  );
};

const store = configureStore();
export const AppStore = store;
