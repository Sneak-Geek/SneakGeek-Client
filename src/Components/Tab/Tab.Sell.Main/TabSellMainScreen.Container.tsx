//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import { connect } from "react-redux";
import { TabSellMainScreen } from "./TabSellMainScreen";
import { IAppState } from "../../../Store";
import { NavigationActions } from "react-navigation";
import { RouteNames } from "../../../Navigation";

const mapStateToProps = (state: IAppState) => ({
  shoes: state.AppContentState.shoes
});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    navigateToSearch: () => {
      const navConfig = {
        routeName: RouteNames.Tabs.SearchTab,
        params: { isForSell: true }
      };
      dispatch(NavigationActions.navigate(navConfig));
    }
  };
};

export const TabSellMainScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabSellMainScreen);
