import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RouteNames from './RouteNames';
import { ProductDetail, AllReviews, NewReview, NewSellOrder } from '@screens/Product';
import { themes, strings } from '@resources';
import { SizeSelection } from '@screens/Product/SizeSelection';

const Stack = createStackNavigator();

export const ProductStack = (): JSX.Element => (
  <Stack.Navigator initialRouteName={RouteNames.Product.ProductDetail}>
    <Stack.Screen
      name={RouteNames.Product.ProductDetail}
      component={ProductDetail}
      options={{
        headerTransparent: true,
        headerShown: false,
      }}
    />
    <Stack.Screen name={RouteNames.Product.AllReviews} component={AllReviews} />
    <Stack.Screen
      name={RouteNames.Product.NewReview}
      component={NewReview}
      options={{
        ...themes.headerStyle,
        title: strings.NewReview,
      }}
    />
    <Stack.Screen
      name={RouteNames.Product.NewSellOrder}
      component={NewSellOrder}
      options={{
        headerTransparent: true,
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={RouteNames.Product.SizeSelection}
      component={SizeSelection}
      options={{
        title: strings.ChooseSize,
        ...themes.headerStyle,
      }}
    />
  </Stack.Navigator>
);
