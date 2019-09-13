//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { TabSellMainScreen } from "./TabSellMainScreen";
import { IAppState } from "../../../Store";
import { NavigationActions } from "react-navigation";
import { RouteNames } from "../../../Navigation";
import { getSellHistory, getShoesByIds } from "../../../Actions";

const mapStateToProps = (state: IAppState) => {
  return {
    shoes: state.AppContentState.shoes,
    sellHistory: state.TransactionState.sellHistory
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    navigateToSearch: () => {
      const navConfig = {
        routeName: RouteNames.Tabs.SearchTab,
        params: { isForSell: true }
      };
      dispatch(NavigationActions.navigate(navConfig));
    },
    getSellHistory: () => {
      dispatch(getSellHistory());
    },
    getShoesByIds: (ids: string[]) => {
      dispatch(getShoesByIds(ids));
    }
  };
};

export const TabSellMainScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabSellMainScreen);
