import React, { useState, useEffect } from 'react';
import RootStack from './src/navigations/RootStack';
import * as Font from 'expo-font';
import { ActivityIndicator } from 'react-native';
import { SplashScreen } from 'expo';
import * as Facebook from 'expo-facebook';
import {
  ObjectFactory,
  FactoryKeys as Keys,
  IFacebookSDK,
  IEnvVar,
  ISettingsProvider,
  IAccountService,
  AccountService,
  ICatalogService,
  CatalogService,
  IShoeService,
  ShoeService,
} from 'business';
import { Provider } from 'react-redux';
import { SettingsProvider, FacebookSdk } from 'common';
import { AppStore } from 'store/AppStore';
import { InAppNotification } from '@screens/InAppNotification';
import { AppLoadingIndicator } from '@screens/AppLoadingIndicator';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const initializeBusinessDep = async (): Promise<void> => {
  const settingsProvider = new SettingsProvider();
  await settingsProvider.load();

  ObjectFactory.register<IEnvVar>(Keys.IEnvVar, {
    __DEV__: __DEV__,
    devUrl: 'http://10.0.0.159:8080/api/v1',
  });
  ObjectFactory.register<ISettingsProvider>(Keys.ISettingsProvider, settingsProvider);
  ObjectFactory.register<IFacebookSDK>(Keys.IFacebookSDK, FacebookSdk);
  ObjectFactory.register<IAccountService>(Keys.IAccountService, new AccountService());
  ObjectFactory.register<ICatalogService>(Keys.ICatalogService, new CatalogService());
  ObjectFactory.register<IShoeService>(Keys.IShoeService, new ShoeService());
};

const initializeFbSdk = (): Promise<void> => {
  return Facebook.initializeAsync('1521812747994918', 'sneakgeek');
};

const initializeFonts = (): Promise<void> => {
  return Font.loadAsync({
    Roboto: require('./assets/fonts/Roboto.ttf'),
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
    RobotoItalic: require('./assets/fonts/Roboto-Italic.ttf'),
    RobotoBoldItalic: require('./assets/fonts/Roboto-Bold-Italic.ttf'),
    RobotoLight: require('./assets/fonts/Roboto-Light.ttf'),
  });
};

export default function App(): JSX.Element {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHide();

    Promise.all([initializeBusinessDep(), initializeFbSdk(), initializeFonts()]).then(
      () => {
        SplashScreen.hide();
        setFontLoaded(true);
      },
    );
  });

  if (fontLoaded) {
    return (
      <Provider store={AppStore}>
        <InAppNotification />
        <AppLoadingIndicator />
        <ActionSheetProvider>
          <RootStack />
        </ActionSheetProvider>
      </Provider>
    );
  }

  return <ActivityIndicator />;
}
