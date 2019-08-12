//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import TabUserMainScreen from "./TabUserMainScreen";
import { IAppState } from "../../../Store";
import { NavigationActions } from "react-navigation";
import { RouteNames } from "../../../Navigation";

const mapStateToProps = (_state: IAppState) => ({
  // shoes: state.AppContentState.shoes
});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    navigateToUserEdit: () => {
      const navConfig = {
        routeName: RouteNames.Tabs.UserInfoTab.Edit
        //   params: { isForSell: true }
      };
      dispatch(NavigationActions.navigate(navConfig));
    }
  };
};

export const TabUserMainScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabUserMainScreen);
