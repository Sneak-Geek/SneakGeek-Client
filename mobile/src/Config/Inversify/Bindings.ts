//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { Container } from "inversify";
import { StoreProvider, IStoreProvider } from "../../Store";
import { Types } from "./Types";
import { IAppSettings, AppSettings } from "../Settings";
import {
  IAuthenticationService,
  AuthenticationService,
  AppContentService,
  IAppContentService,
  ICdnService,
  CdnService,
  ITransactionService,
  TransactionService
} from "../../Service";

export const container = new Container();

container.bind<IStoreProvider>(Types.IStoreProvider).to(StoreProvider);
container.bind<IAuthenticationService>(Types.IAuthenticationService).to(AuthenticationService);
container.bind<IAppContentService>(Types.IAppContentService).to(AppContentService);
container.bind<ICdnService>(Types.ICdnService).to(CdnService);
container.bind<ITransactionService>(Types.ITransactionService).to(TransactionService);

// binding settings
container.bind<IAppSettings>(Types.IAppSettings).toConstantValue(new AppSettings());
