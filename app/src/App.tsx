import React, {useState, useEffect} from 'react';
import RootStack from 'navigations/RootStack';
import {ActivityIndicator} from 'react-native';
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
  ICdnService,
  CdnService,
} from 'business';
import {Provider} from 'react-redux';
import {SettingsProvider, FacebookSdk} from 'common';
import {AppStore} from 'store/AppStore';
import {InAppNotification} from 'screens/InAppNotification';
import {AppLoadingIndicator} from 'screens/AppLoadingIndicator';

export default function App(): JSX.Element {
  const [depLoaded, setDepLoaded] = useState(false);
  const initializeBusinessDep = async (): Promise<void> => {
    const settingsProvider = new SettingsProvider();
    await settingsProvider.load();

    Factory.register<IEnvVar>(Keys.IEnvVar, {
      dev: __DEV__,
      devUrl: 'http://192.168.0.11:8080/api/v1',
      prodUrl: 'https://sneakgeek-test.azurewebsites.net/api/v1',
    });
    Factory.register<ISettingsProvider>(
      Keys.ISettingsProvider,
      settingsProvider,
    );
    Factory.register<IFacebookSDK>(Keys.IFacebookSDK, new FacebookSdk());
    Factory.register<IAccountService>(
      Keys.IAccountService,
      new AccountService(),
    );
    Factory.register<ICatalogService>(
      Keys.ICatalogService,
      new CatalogService(),
    );
    Factory.register<IShoeService>(Keys.IShoeService, new ShoeService());
    Factory.register<ISettingService>(
      Keys.ISettingService,
      new SettingService(),
    );
    Factory.register<IOrderService>(Keys.IOrderService, new OrderService());
    Factory.register<ICdnService>(Keys.ICdnService, new CdnService());
  };

  useEffect(() => {
    Promise.all([initializeBusinessDep()]).then(() => {
      setDepLoaded(true);
    });
  });

  if (depLoaded) {
    return (
      <Provider store={AppStore}>
        <InAppNotification />
        <AppLoadingIndicator />
        <RootStack />
      </Provider>
    );
  }

  return <ActivityIndicator />;
}
