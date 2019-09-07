//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { TabHomeMainScreenContainer } from "./Tab.Home.Main/TabHomeMainScreen.Container";

import { TabSearchContainer } from "./Tab.Search/TabSearch.Container";
import { TabBuyMainScreenContainer } from "./Tab.Buy.Main/TabBuyMainScreen.Container";
import { TabSellMainScreenContainer as TabSellMain } from "./Tab.Sell.Main/TabSellMainScreen.Container";

import { TabUserMainScreenContainer as TabUserMain } from "./Tab.User.Main/TabUserMainScreen.Container";
import { TabUserEditScreenContainer as TabUserEdit } from "./Tab.User.Edit/TabUserEditScreen.Container";

const Tabs = {
  Home: {
    Main: TabHomeMainScreenContainer
  },
  Buy: {
    Main: TabBuyMainScreenContainer
  },
  Search: {
    Main: TabSearchContainer
  },
  Sell: {
    Main: TabSellMain
  },
  User: {
    Main: TabUserMain,
    Edit: TabUserEdit
  }
};

export default Tabs;
