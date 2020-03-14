import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RouteNames from './RouteNames';
import { AuthenticationStack } from './AuthenticationStack';
import { TabStack } from './TabStack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const RootStack = (): JSX.Element => (
  <NavigationContainer>
  <Stack.Navigator initialRouteName={RouteNames.Auth.Name} headerMode={'none'}>
    <Stack.Screen name={RouteNames.Auth.Name} component={AuthenticationStack} />
    <Stack.Screen name={RouteNames.Tab.Name} component={TabStack} options={{
      gestureEnabled: false
    }}/>
  </Stack.Navigator>
  </NavigationContainer>
);

export default RootStack;
