//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import AppNavigator from "../Navigation/NavigationConfig";
import {
  NavigationState,
  NavigationAction,
  StackActions,
  NavigationActions
} from "react-navigation";
import { Action } from "redux-actions";
import { RouteNames } from "../Navigation/RouteNames";
import * as Actions from "../Actions";
import { TransactionReduxState } from "../Shared/State";

const initialAction = AppNavigator.router.getActionForPathAndParams(
  RouteNames.Splash
) as NavigationAction;

const initialState = AppNavigator.router.getStateForAction(initialAction);

export const NavigationReducers = (
  state: NavigationState = initialState,
  action: Action<any>
) => {
  let nextState;
  switch (action.type) {
    case Actions.AccountActions.AUTHENTICATION_COMPLETE:
      nextState = AppNavigator.router.getStateForAction(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: RouteNames.Tabs.TabRoot })]
        }),
        state
      );
      break;
    case Actions.NavigationActions.NAVIGATE_TO_LOGIN:
      nextState = AppNavigator.router.getStateForAction(
        StackActions.replace({
          routeName: RouteNames.Authentication
        }),
        state
      );
      break;
    case Actions.NavigationActions.NAVIGATE_TO_EMAIL_SIGNIN:
      nextState = AppNavigator.router.getStateForAction(
        StackActions.push({
          routeName: RouteNames.EmailSignIn,
          params: { email: action.payload }
        }),
        state
      );
      break;
    case Actions.NavigationActions.NAVIGATE_TO_EMAIL_SIGNUP:
      nextState = AppNavigator.router.getStateForAction(
        StackActions.push({
          routeName: RouteNames.EmailSignUp,
          params: { email: action.payload }
        }),
        state
      );
      break;
    case Actions.TransactionActionNames.UPDATE_SELL_ORDER_STATE:
      if (action.payload === TransactionReduxState.SELL_SUCCESS) {
        nextState = AppNavigator.router.getStateForAction(
          StackActions.replace({
            routeName: RouteNames.Tabs.TabRoot,
            params: {
              isSellSuccess: true
            },
            action: NavigationActions.navigate({
              routeName: RouteNames.Tabs.SellTab.MainScreen
            })
          }),
          state
        );
      }
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action as any, state);
  }

  return nextState || state;
};
