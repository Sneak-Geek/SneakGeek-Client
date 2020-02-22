//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { IUserState } from "business";

export interface IAppState {
  router: {
    location: Location;
    action: any;
  };
  UserState: IUserState;
}
