//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import { Container } from "inversify";
import { StoreProvider, IStoreProvider } from "../../Store";
import { Types } from "./Types";

export const container = new Container();
container.bind<IStoreProvider>(Types.IStoreProvider).to(StoreProvider);
// container.bind<ApiClient>(Types.ApiClient).to(ApiClient);
// container.bind<AppContentService>(Types.AppContentService).to(AppContentService);
// container.bind<AuthenticationService>(Types.AuthenticationService).to(AuthenticationService);
