//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import AppNavigator from "../Navigation/NavigationConfig";
import { NavigationState, NavigationAction } from "react-navigation";
import { Action } from "redux-actions";
import { RouteNames } from "../Navigation/RouteNames";

const initialAction = AppNavigator.router.getActionForPathAndParams(
  RouteNames.Login
) as NavigationAction;

const initialState = AppNavigator.router.getStateForAction(initialAction);

export const NavigationReducers = (
  state: NavigationState = initialState,
  action: Action<any>
) => {
  switch (action.type) {
    default:
      return AppNavigator.router.getStateForAction(action as any, state);
  }
};
