import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
  IAccountService,
  AccountService,
  ISettingsProvider,
} from 'business';
import { Provider } from 'react-redux';
import { SettingsProvider, FacebookSdk } from 'common';
import { AppStore } from 'store/AppStore';
import { InAppNotification } from '@screens/InAppNotification';
import { AppLoadingIndicator } from '@screens/AppLoadingIndicator';

const initializeBusinessDep = (): void => {
  ObjectFactory.register<IEnvVar>(Keys.IEnvVar, {
    __DEV__: __DEV__,
  });
  ObjectFactory.register<IAccountService>(Keys.IAccountService, new AccountService());
  ObjectFactory.register<ISettingsProvider>(
    Keys.ISettingsProvider,
    new SettingsProvider(),
  );
  ObjectFactory.register<IFacebookSDK>(Keys.IFacebookSDK, FacebookSdk);
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
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </Provider>
    );
  }

  return <ActivityIndicator />;
}
