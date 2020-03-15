import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RouteNames from './RouteNames';
import { ProductDetail } from '@screens/Product';
import { themes, strings } from '@resources';

const Stack = createStackNavigator();

export const ProductStack = (): JSX.Element => (
  <Stack.Navigator
    initialRouteName={RouteNames.Product.ProductDetail}
    headerMode={'none'}
  >
    <Stack.Screen name={RouteNames.Product.ProductDetail} component={ProductDetail} />
  </Stack.Navigator>
);
