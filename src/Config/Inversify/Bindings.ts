//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { Container } from "inversify";
import { StoreProvider, IStoreProvider } from "../../Store";
import { Types } from "./Types";
import { IAppSettings, AppSettings } from "../Settings";
import {
  IAuthenticationService,
  AuthenticationService
} from "../../Service/AuthenticationService";

export const container = new Container();

container.bind<IStoreProvider>(Types.IStoreProvider).to(StoreProvider);
container.bind<IAppSettings>(Types.IAppSettings).to(AppSettings);
container.bind<IAuthenticationService>(Types.IAuthenticationService).to(AuthenticationService);
