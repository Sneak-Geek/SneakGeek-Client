//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import TabSearch from "./TabSearch";
import { IAppState } from "../../../Store";
import { NavigationActions } from "react-navigation";
import { RouteNames } from "../../../Navigation";
import { Shoe } from "../../../Reducers";

const mapStateToProps = (state: IAppState) => {
  return {
    shoes: state.AppContentState.shoes
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  onShoeClick: (isForSell: boolean, shoe: Shoe) => {
    if (isForSell) {
      const navAction = NavigationActions.navigate({
        routeName: RouteNames.Tabs.SellTab.DetailScreen,
        params: { shoeForSell: shoe }
      });
      dispatch(navAction);
    }
  }
});

export const TabSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabSearch);
