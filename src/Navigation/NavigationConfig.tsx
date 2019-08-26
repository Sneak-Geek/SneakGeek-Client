//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import Tab from "../Components/Tab";
import { LoginScreenContainer } from "../Components/Login/LoginScreen.Container";
import { SellDetailScreenContainer } from "../Components/SellDetail/SellDetailScreen.Container";
import { RouteNames } from "./RouteNames";
import { Icon } from "react-native-elements";
import { SplashScreenContainer } from "../Components/Splash/SplashScreen";

const BuyTabNavigator = createStackNavigator(
  {
    [`${RouteNames.Tabs.BuyTab.MainScreen}`]: { screen: Tab.Buy.Main }
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        tintColor = tintColor as string;
        return <Icon type={"ionicon"} name={"md-trending-up"} size={28} color={tintColor} />;
      }
    }
  }
);

const SellTabNavigator = createStackNavigator(
  {
    [`${RouteNames.Tabs.SellTab.MainScreen}`]: { screen: Tab.Sell.Main }
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        tintColor = tintColor as string;
        return <Icon type={"ionicon"} name={"md-pricetag"} size={28} color={tintColor} />;
      }
    }
  }
);

const HomeTabNavigator = createStackNavigator(
  {
    [`${RouteNames.Tabs.HomeTab.MainScreen}`]: { screen: Tab.Home.Main },
    [`${RouteNames.Tabs.HomeTab.ShoeDetailScreen}`]: { screen: Tab.Home.ShoeDetail }
  },
  {
    headerMode: "none",
    navigationOptions: {
      header: null,
      tabBarIcon: ({ tintColor }) => {
        tintColor = tintColor as string;
        return <Icon type={"ionicon"} name={"md-home"} size={28} color={tintColor} />;
      }
    }
  }
);

const UserInfoTabNavigator = createStackNavigator(
  {
    [`${RouteNames.Tabs.UserInfoTab.Info}`]: { screen: Tab.User.Main },
    [`${RouteNames.Tabs.UserInfoTab.Edit}`]: { screen: Tab.User.Edit }
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        tintColor = tintColor as string;
        return <Icon type={"ionicon"} name={"md-person"} size={28} color={tintColor} />;
      }
    }
  }
);

const AppTabRoot = createBottomTabNavigator(
  {
    [`${RouteNames.Tabs.HomeTab.TabName}`]: { screen: HomeTabNavigator },
    [`${RouteNames.Tabs.SearchTab}`]: { screen: Tab.Search.Main },
    [`${RouteNames.Tabs.BuyTab.TabName}`]: { screen: BuyTabNavigator },
    [`${RouteNames.Tabs.SellTab.TabName}`]: { screen: SellTabNavigator },
    [`${RouteNames.Tabs.UserInfoTab.TabName}`]: { screen: UserInfoTabNavigator }
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: "black",
      inactiveTintColor: "lightgrey"
    },
    defaultNavigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.setParams({ isForSell: false });
        defaultHandler();
      }
    }
  }
);

export const AppNavigator = createStackNavigator(
  {
    [`${RouteNames.Tabs.TabRoot}`]: {
      screen: AppTabRoot,
      navigationOptions: {
        header: null
      }
    },
    [`${RouteNames.Splash}`]: { screen: SplashScreenContainer },
    [`${RouteNames.Login}`]: { screen: LoginScreenContainer },
    [`${RouteNames.Tabs.SellTab.DetailScreen}`]: { screen: SellDetailScreenContainer }
  },
  {
    initialRouteName: RouteNames.Splash,
    mode: "card",
    navigationOptions: {
      gesturesEnabled: true
    }
  }
);

export default createAppContainer(AppNavigator);
