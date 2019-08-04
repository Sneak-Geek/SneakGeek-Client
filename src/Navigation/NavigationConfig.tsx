//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import * as React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import Tab from "../Components/Tab";
import { LoginScreenContainer } from "../Components/Login/LoginScreen.Container";
import { RouteNames } from "./RouteNames";
import { Icon } from "react-native-elements";
import { ModalRootContainer } from "../Components/Modal/Root/ModalRoot";

const BuyTabNavigator = createStackNavigator(
  {
    [`${RouteNames.Tabs.BuyTab.MainScreen}`]: { screen: Tab.Buy.Main }
  },
  {
    headerMode: "none",
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
    [`${RouteNames.Tabs.SellTab.MainScreen}`]: { screen: Tab.Sell.Main },
    [`${RouteNames.Tabs.SellTab.DetailScreen}`]: { screen: Tab.Sell.Detail }
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
    navigationOptions: {
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
    // headerMode: "none",
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
    [`${RouteNames.Tabs.TabRoot}`]: { screen: AppTabRoot },
    [`${RouteNames.Login}`]: { screen: LoginScreenContainer }
  },
  {
    initialRouteName: RouteNames.Login,
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: true
    }
  }
);

export const RootNavigator = createStackNavigator(
  {
    [`${RouteNames.AppNavigator}`]: { screen: AppNavigator },
    [`${RouteNames.Modal}`]: { screen: ModalRootContainer }
  },
  {
    initialRouteName: RouteNames.AppNavigator,
    mode: "modal",
    headerMode: "none",
    transparentCard: true,
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default createAppContainer(RootNavigator);
