//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import AppNavigator from "../Navigation/NavigationConfig";
import { NavigationState, NavigationAction, StackActions } from "react-navigation";
import { Action } from "redux-actions";
import { RouteNames } from "../Navigation/RouteNames";
import * as Actions from "../Actions";

const initialAction = AppNavigator.router.getActionForPathAndParams(
  RouteNames.Splash
) as NavigationAction;

const initialState = AppNavigator.router.getStateForAction(initialAction);

export const NavigationReducers = (
  state: NavigationState = initialState,
  action: Action<any>
) => {
  switch (action.type) {
    case Actions.AccountActions.AUTHENTICATION_COMPLETE:
      return AppNavigator.router.getStateForAction(
        StackActions.replace({
          routeName: RouteNames.Tabs.TabRoot
        }),
        state
      );
    case Actions.AccountActions.GO_TO_LOGIN:
      return AppNavigator.router.getStateForAction(
        StackActions.replace({
          routeName: RouteNames.Login
        }),
        state
      );
    default:
      return AppNavigator.router.getStateForAction(action as any, state);
  }
};
