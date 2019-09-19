//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { Container } from "inversify";
import { StoreProvider, IStoreProvider } from "../../Store";
import { Types } from "./Types";
import { IAppSettingsService, AppSettingsService } from "../../Service/AppSettingsService";
import {
  IAccountService,
  AccountService,
  AppContentService,
  IAppContentService,
  ICdnService,
  CdnService,
  ITransactionService,
  TransactionService
} from "../../Service";

export const container = new Container();

container.bind<IStoreProvider>(Types.IStoreProvider).to(StoreProvider);
container.bind<IAccountService>(Types.IAccountService).to(AccountService);
container.bind<IAppContentService>(Types.IAppContentService).to(AppContentService);
container.bind<ICdnService>(Types.ICdnService).to(CdnService);
container.bind<ITransactionService>(Types.ITransactionService).to(TransactionService);

// binding settings
container
  .bind<IAppSettingsService>(Types.IAppSettingsService)
  .toConstantValue(new AppSettingsService());
