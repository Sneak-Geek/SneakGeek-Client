import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LoginScreen,
  EmailLoginScreen,
  EmailSignUpScreen,
  ForgotPasswordScreen,
} from '@screens/Authentication';
import RouteNames from './RouteNames';
import { themes, strings } from '@resources';

const Stack = createStackNavigator();

const AuthenticationStack = (): JSX.Element => (
  <Stack.Navigator initialRouteName={RouteNames.Auth.Login}>
    <Stack.Screen
      name={RouteNames.Auth.Login}
      component={LoginScreen}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name={RouteNames.Auth.EmailLogin}
      component={EmailLoginScreen}
      options={{
        title: strings.SignIn,
        ...themes.headerStyle,
      }}
    />
    <Stack.Screen name={RouteNames.Auth.EmailSignUp} component={EmailSignUpScreen} />
    <Stack.Screen
      name={RouteNames.Auth.ForgotPassword}
      component={ForgotPasswordScreen}
      options={{
        title: strings.ForgotPassword,
        ...themes.headerStyle,
      }}
    />
  </Stack.Navigator>
);

const RootStack = (): JSX.Element => (
  <Stack.Navigator initialRouteName={RouteNames.Auth.Name} headerMode={'none'}>
    <Stack.Screen name={RouteNames.Auth.Name} component={AuthenticationStack} />
  </Stack.Navigator>
);

export default RootStack;
