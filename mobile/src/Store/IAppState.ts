//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import {
  IAccountState,
  IAppContentState,
  IModalState,
  ITransactionState,
  INotificationState
} from "../Reducers";
import { NavigationState } from "react-navigation";

export interface IAppState {
  AccountState: IAccountState;
  NavigationState: NavigationState;
  AppContentState: IAppContentState;
  ModalState: IModalState;
  TransactionState: ITransactionState;
  NotificationState: INotificationState;
}

export type IStateProvider = () => IAppState;
