//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { ShoeRequireScreen } from "./ShoeRequireScreen";
import { IAppState } from "../../Store";
import { RouteNames } from "../../Navigation";
import { NavigationActions } from "react-navigation";

const mapStateToProps = (_state: IAppState) => ({});
const mapDispatchToProps = (dispatch: Function) => ({
  navigateToRequireSuccess: () => {
    const navConfig = {
      routeName: RouteNames.RequireSuccess,
    };
    dispatch(NavigationActions.navigate(navConfig));
  }
});

export const ShoeRequireScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoeRequireScreen);
