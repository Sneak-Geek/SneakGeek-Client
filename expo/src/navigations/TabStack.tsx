import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RouteNames from './RouteNames';
import { themes, strings, images } from '@resources';
import { Icon } from 'react-native-elements';
import { AccountTabMain, AccountTabEditProfile, AccountTabFaq } from '@screens/AccountTab';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeTabMain } from '@screens/HomeTab/HomeTabMain';
import { SearchTabMain } from '@screens/SearchTab/SearchTabMain';
import { Image } from 'react-native';
import {
  ObjectFactory as Factory,
  ISettingsProvider,
  FactoryKeys as Keys,
} from 'business';
import { CatalogSeeMore } from '@screens/HomeTab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  SellOrders,
  TransactionDetail,
  BuyOrders,
} from '@screens/TransactionTab';
import { ProductRequest } from '@screens/SearchTab';

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
    <AccountStack.Screen
      name={RouteNames.Tab.AccountTab.Faq}
      component={AccountTabFaq}
      options={{
        ...themes.headerStyle,
        title: strings.InfoAppSetting
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
        headerLeft: () => (
          <Image
            source={images.Logo}
            style={{
              width: themes.IconSize * 1.5,
              height: themes.IconSize * 1.5,
              marginLeft: 3,
            }}
          />
        ),
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
    <HomeStack.Screen
      name={RouteNames.Tab.HomeTab.SeeMore}
      component={CatalogSeeMore}
      options={{
        title: strings.SeeMore,
        ...themes.headerStyle,
      }}
    />
  </HomeStack.Navigator>
);

const SearchStack = createStackNavigator();
const SearchTab = (): JSX.Element => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name={RouteNames.Tab.SearchTab.Main}
      component={SearchTabMain}
      options={{
        headerShown: false,
        headerTransparent: true,
      }}
    />
    <SearchStack.Screen
      name={RouteNames.Tab.SearchTab.ProductRequest}
      component={ProductRequest}
      options={{
        ...themes.headerStyle,
        title: strings.RequestNewProduct,
      }}
    />
  </SearchStack.Navigator>
);

const TopTab = createMaterialTopTabNavigator();

const TransactionTopTabs = (): JSX.Element => (
  <TopTab.Navigator tabBarOptions={themes.TabTopHeader}>
    <TopTab.Screen
      component={BuyOrders}
      name={RouteNames.Tab.TransactionTab.Buy}
      options={{
        title: strings.BuyHistory,
      }}
    />
    <TopTab.Screen
      component={SellOrders}
      name={RouteNames.Tab.TransactionTab.Sell}
      options={{
        title: strings.SellHistory,
      }}
    />
  </TopTab.Navigator>
);

const TransactionStack = createStackNavigator();
const TransactionTab = (): JSX.Element => (
  <TransactionStack.Navigator>
    <TransactionStack.Screen
      name={RouteNames.Tab.TransactionTab.Main}
      component={TransactionTopTabs}
      options={{
        ...themes.headerStyle,
        title: strings.TransactionTab,
      }}
    />
    <TransactionStack.Screen
      name={RouteNames.Tab.TransactionTab.Detail}
      component={TransactionDetail}
      options={{
        ...themes.headerStyle,
        title: strings.TransactionDetail,
      }}
    />
  </TransactionStack.Navigator>
);

export const TabStack = (): JSX.Element => {
  useEffect(() => {
    const settingsProvider = Factory.getObjectInstance<ISettingsProvider>(
      Keys.ISettingsProvider,
    );
    settingsProvider.loadServerSettings();
  });

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: themes.TextStyle.footnoteRegular,
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
};
