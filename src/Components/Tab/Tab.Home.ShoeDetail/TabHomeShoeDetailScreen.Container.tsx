//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import { connect } from "react-redux";
import { TabHomeShoeDetailScreen } from "./TabHomeShoeDetailScreen";
import { IAppState } from "../../../Store";
import { RouteNames } from "../../../Navigation";
import { StackActions } from "react-navigation";
import { Shoe } from "../../../Reducers";

const mapStateToProps = (state: IAppState) => {
  return {
    shoes: state.AppContentState.shoes,
    routeIndex: state.NavigationState.index
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    navigateToShoeDetailWithReset: (_index: number, shoe: Shoe) => {
      const navConfig = {
        routeName: RouteNames.Tabs.HomeTab.ShoeDetailScreen,
        params: { shoe }
      };
      // dispatch(StackActions.pop({}));
      dispatch(StackActions.push(navConfig));
    }
  };
};

export const TabHomeShoeDetailScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabHomeShoeDetailScreen);
