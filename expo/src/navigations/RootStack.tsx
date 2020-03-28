import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RouteNames from './RouteNames';
import { AuthenticationStack } from './AuthenticationStack';
import { TabStack } from './TabStack';
import { NavigationContainer } from '@react-navigation/native';
import { ProductStack } from './ProductStack';
import { Shoe, Catalog } from 'business';

export type RootStackParams = {
  ProductDetail: { shoe: Shoe };
  ProductNewReview: { shoe: Shoe };
  ProductAllReviews: { shoe: Shoe };
  SizeSelection: { shoe: Shoe };
  Login: undefined;
  EmailSignUp: undefined;
  EmailLogin: undefined;
  HomeTab: undefined;
  HomeTabMain: undefined;
  CatalogSeeMore: { catalog: Catalog };
  SearchTabMain: undefined;
  TrasactionTabMain: undefined;
  AccountTabMain: undefined;
  AccountTabEditProfile: undefined;
  NewSellOrder: { shoe: Shoe };
};

const Stack = createStackNavigator();

const RootStack = (): JSX.Element => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={RouteNames.Auth.Name} headerMode={'none'}>
      <Stack.Screen name={RouteNames.Auth.Name} component={AuthenticationStack} />
      <Stack.Screen
        name={RouteNames.Tab.Name}
        component={TabStack}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name={RouteNames.Product.Name} component={ProductStack} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootStack;
