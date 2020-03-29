import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RouteNames from './RouteNames';
import { NewSellOrder, SizeSelection, BuyConfirmation } from '@screens/Order';
import { strings, themes } from '@resources';

const Stack = createStackNavigator();

export const OrderStack = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen
      name={RouteNames.Order.NewSellOrder}
      component={NewSellOrder}
      options={{
        headerTransparent: true,
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={RouteNames.Order.SizeSelection}
      component={SizeSelection}
      options={{
        title: strings.ChooseSize,
        ...themes.headerStyle,
      }}
    />
    <Stack.Screen
      name={RouteNames.Order.BuyConfirmation}
      component={BuyConfirmation}
      options={{
        title: strings.Checkout,
        ...themes.headerStyle,
      }}
    />
  </Stack.Navigator>
);
