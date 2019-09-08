//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { container, Types } from "../Config/Inversify";
import { IAppSettings } from "../Config/Settings";
import { SettingsKeys } from "../Config/Settings/SettingsKeys";
import { getCurrentUser, goToLogin } from "./AccountActions";
import SplashScreen from "react-native-splash-screen";

export const bootstrap = () => {
  return async (dispatch: Function) => {
    const settingsProvider = container.get<IAppSettings>(Types.IAppSettings);
    await settingsProvider.load();
    SplashScreen.hide();

    const accessToken = settingsProvider.getValue(SettingsKeys.CurrentAccessToken);
    if (accessToken) {
      await dispatch(getCurrentUser(accessToken));
    } else {
      dispatch(goToLogin());
    }
  };
};
