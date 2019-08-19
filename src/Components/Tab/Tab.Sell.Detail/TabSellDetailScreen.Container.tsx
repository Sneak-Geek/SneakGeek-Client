//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { IAppState } from "../../../Store";
import { TabSellDetailScreen } from "./TabSellDetailScreen";
import { StackActions } from "react-navigation";
import { RouteNames } from "../../../Navigation";

const mapStateToProps = (_state: IAppState) => ({});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    uploadShoes: () => {
      dispatch(
        StackActions.push({
          routeName: RouteNames.Tabs.SellTab.MainScreen,
          params: {
            isSellSuccess: true
          }
        })
      );
    }
  };
};

export const TabSellDetailScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabSellDetailScreen);
