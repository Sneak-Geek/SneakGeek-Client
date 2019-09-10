//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { IAppState } from "../../Store";
import { SellDetailScreen } from "./SellDetailScreen";
import { NavigationActions } from "react-navigation";
import { RouteNames } from "../../Navigation";
import { sellShoes } from "../../Actions/TransactionActions";

const mapStateToProps = (state: IAppState) => ({
  transactionState: state.TransactionState
});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    uploadShoes: async (pictures: string[]) => {
      await dispatch(sellShoes(pictures));

      dispatch(
        NavigationActions.navigate({
          routeName: RouteNames.Tabs.SellTab.MainScreen,
          params: {
            isSellSuccess: true
          }
        })
      );
    }
  };
};

export const SellDetailScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellDetailScreen);
