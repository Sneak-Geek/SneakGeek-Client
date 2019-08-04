//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import { IStoreProvider } from "./IStoreProvider";
import { Store } from "redux";
import { IAppState } from "./IAppState";
import { injectable } from "inversify";

@injectable()
export class StoreProvider implements IStoreProvider {
  public getStore(): Store<IAppState> {
    const store = require("./AppStore").AppStore;
    return store;
  }
}
