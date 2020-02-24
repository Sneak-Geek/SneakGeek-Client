//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!
export const FactoryKeys = {
    IEnvVar: Symbol.for("IEnvVar"),
    IAccountService: Symbol.for("IAccountService"),
    IFacebookSDK: Symbol.for("IFacebookSDK"),
    ISettingsProvider: Symbol.for("ISettingsProvider"),
    ICatalogService: Symbol.for("ICatalogService")
};
