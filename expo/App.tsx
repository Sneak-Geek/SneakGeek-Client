import React, { useState, useEffect } from 'react';
import RootStack from './src/navigations/RootStack';
import * as Font from 'expo-font';
import { ActivityIndicator } from 'react-native';
import { SplashScreen } from 'expo';
import * as Facebook from 'expo-facebook';
import {
  ObjectFactory as Factory,
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
  ISettingService,
  SettingService,
  IOrderService,
  OrderService,
} from 'business';
import { Provider } from 'react-redux';
import { SettingsProvider, FacebookSdk } from 'common';
import { AppStore } from 'store/AppStore';
import { InAppNotification } from '@screens/InAppNotification';
import { AppLoadingIndicator } from '@screens/AppLoadingIndicator';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export default function App(): JSX.Element {
  const [fontLoaded, setFontLoaded] = useState(false);

  const initializeFonts = (): Promise<void> => {
    return Font.loadAsync({
      Roboto: require('./assets/fonts/Roboto.ttf'),
      RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
      RobotoItalic: require('./assets/fonts/Roboto-Italic.ttf'),
      RobotoBoldItalic: require('./assets/fonts/Roboto-Bold-Italic.ttf'),
      RobotoLight: require('./assets/fonts/Roboto-Light.ttf'),
    });
  };

  const initializeFbSdk = (): Promise<void> => {
    return Facebook.initializeAsync('1521812747994918', 'SneakGeek');
  };

  const initializeBusinessDep = async (): Promise<void> => {
    const settingsProvider = new SettingsProvider();
    await settingsProvider.load();

    Factory.register<IEnvVar>(Keys.IEnvVar, {
      '__DEV__': __DEV__,
      devUrl: 'http://10.0.0.52:8080/api/v1',
      prodUrl: 'https://sneakgeek-test.azurewebsites.net/api/v1'
    });
    Factory.register<ISettingsProvider>(Keys.ISettingsProvider, settingsProvider);
    Factory.register<IFacebookSDK>(Keys.IFacebookSDK, new FacebookSdk());
    Factory.register<IAccountService>(Keys.IAccountService, new AccountService());
    Factory.register<ICatalogService>(Keys.ICatalogService, new CatalogService());
    Factory.register<IShoeService>(Keys.IShoeService, new ShoeService());
    Factory.register<ISettingService>(Keys.ISettingService, new SettingService());
    Factory.register<IOrderService>(Keys.IOrderService, new OrderService());
  };

  useEffect(() => {
    Promise.all([initializeBusinessDep(), initializeFbSdk(), initializeFonts()]).then(
      () => {
        setFontLoaded(true);
      },
    );
  });

  if (fontLoaded) {
    return (
      <Provider store={AppStore}>
        {
          //@ts-ignore
          <InAppNotification />
        }
        {
          //@ts-ignore
          <AppLoadingIndicator />
        }
        <ActionSheetProvider>
          <RootStack />
        </ActionSheetProvider>
      </Provider>
    );
  }

  return <ActivityIndicator />;
}
