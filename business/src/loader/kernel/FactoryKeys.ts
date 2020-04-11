//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

export const FactoryKeys = {
  IEnvVar: Symbol.for("IEnvVar"),
  IAccountService: Symbol.for("IAccountService"),
  IFacebookSDK: Symbol.for("IFacebookSDK"),
  ISettingsProvider: Symbol.for("ISettingsProvider"),
  ICatalogService: Symbol.for("ICatalogService"),
  IShoeService: Symbol.for("IShoeService"),
<<<<<<< HEAD
  ISettingService: Symbol.for("ISettingService"),
  IOrderService: Symbol.for("IOrderService"),
  IReviewOrdersService: Symbol.for("IReviewOrdersService"),
||||||| merged common ancestors
  IReviewOrdersService: Symbol.for("IReviewOrdersService")
=======
  IReviewOrdersService: Symbol.for("IReviewOrdersService"),
  IShoeAuthenticationTransactionService: Symbol.for(
    "IShoeAuthenticationTransactionService"
  ),
>>>>>>> Implement fucntion to update authorization transaction status
};
