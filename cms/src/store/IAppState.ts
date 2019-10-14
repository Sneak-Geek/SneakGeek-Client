//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { IAccountState } from "../reducers";

export interface IAppState {
  RouterState: {
    location: Location;
    action: any;
  };
  AccountState: IAccountState;
}
