//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { IAccountState, IAppContentState, IModalState } from "../Reducers";
import { NavigationState } from "react-navigation";

export interface IAppState {
  AccountState: IAccountState;
  NavigationState: NavigationState;
  AppContentState: IAppContentState;
  ModalState: IModalState;
}

export type IStateProvider = () => IAppState;
