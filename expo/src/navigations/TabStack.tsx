import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RouteNames from './RouteNames';
import { themes, strings } from '@resources';
import { Icon } from 'react-native-elements';
import { AccountTabMain } from '@screens/AccountTab/AccountTabMain';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountTabEditProfile } from '@screens/AccountTab/AccountTabEditProfile';
import { HomeTabMain } from '@screens/HomeTab/HomeTabMain';
import { SearchTabMain } from '@screens/SearchTab/SearchTabMain';
import { TransactionTabMain } from '@screens/TransactionTab/TransactionTabMain';

const Tab = createBottomTabNavigator();

const TabBarIcon = (name: string) => ({ color, size }): JSX.Element => (
  <Icon name={name} size={size} color={color} />
);

const AccountStack = createStackNavigator();
const AccountTab = (): JSX.Element => (
  <AccountStack.Navigator>
    <AccountStack.Screen
      name={RouteNames.Tab.AccountTab.Main}
      component={AccountTabMain}
      options={{
        title: 'Tài khoản',
        ...themes.headerStyle,
      }}
    />
    <AccountStack.Screen
      name={RouteNames.Tab.AccountTab.EditProfile}
      component={AccountTabEditProfile}
      options={{
        headerShown: false,
        headerTransparent: true,
      }}
    />
  </AccountStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeTab = (): JSX.Element => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name={RouteNames.Tab.HomeTab.Main}
      component={HomeTabMain}
      options={{
        ...themes.headerStyle,
        title: strings.HomeTabTitle,
        headerRight: () => (
          <Icon
            name={'bell-outline'}
            type={'material-community'}
            size={themes.IconSize}
            containerStyle={{ marginRight: 12 }}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

const SearchStack = createStackNavigator();
const SearchTab = (): JSX.Element => (
  <SearchStack.Navigator headerMode={'none'}>
    <SearchStack.Screen
      name={RouteNames.Tab.SearchTab.Main}
      component={SearchTabMain}
    />
  </SearchStack.Navigator>
);

const TransactionStack = createStackNavigator();
const TransactionTab = (): JSX.Element => (
  <TransactionStack.Navigator>
    <TransactionStack.Screen
      name={RouteNames.Tab.TransactionTab.Main}
      component={TransactionTabMain}
      options={{
        ...themes.headerStyle,
        title: strings.TransactionTab,
      }}
    />
  </TransactionStack.Navigator>
);

export const TabStack = (): JSX.Element => (
  <Tab.Navigator
    tabBarOptions={{
      labelStyle: themes.TextStyle.footnote,
      activeTintColor: themes.AppPrimaryColor,
      inactiveTintColor: themes.AppDisabledColor,
    }}
  >
    <Tab.Screen
      name={RouteNames.Tab.HomeTab.Name}
      component={HomeTab}
      options={{
        tabBarIcon: TabBarIcon('home'),
        title: strings.HomeTab,
      }}
    />
    <Tab.Screen
      name={RouteNames.Tab.SearchTab.Name}
      component={SearchTab}
      options={{
        tabBarIcon: TabBarIcon('search'),
        title: strings.SearchTab,
      }}
    />
    <Tab.Screen
      name={RouteNames.Tab.TransactionTab.Name}
      component={TransactionTab}
      options={{
        tabBarIcon: TabBarIcon('shopping-cart'),
        title: strings.TransactionTab,
      }}
    />
    <Tab.Screen
      name={RouteNames.Tab.AccountTab.Name}
      component={AccountTab}
      options={{
        tabBarIcon: TabBarIcon('person'),
        title: strings.UserTab,
      }}
    />
  </Tab.Navigator>
);
