//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import TabUserMainScreen from "./TabUserMainScreen";
import { IAppState } from "../../../Store";
import { NavigationActions } from "react-navigation";
import { RouteNames } from "../../../Navigation";

const mapStateToProps = (state: IAppState) => ({
  account: state.AccountState.currentAccount
});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    navigateToUserEdit: () => {
      dispatch(
        NavigationActions.navigate({
          routeName: RouteNames.Tabs.UserInfoTab.Edit
        })
      );
    },

    navigateToPayments: () => {
      dispatch(
        NavigationActions.navigate({
          routeName: RouteNames.PaymentOptions
        })
      );
    },

    navigateToShoeSize: () => {
      dispatch(
        NavigationActions.navigate({
          routeName: RouteNames.ShowSize
        })
      );
    },

    navigateToChangePassword: () => {
      dispatch(
        NavigationActions.navigate({
          routeName: RouteNames.ChangePassword
        })
      );
    },

    navigateToContactInfo: () => {
      dispatch(
        NavigationActions.navigate({
          routeName: RouteNames.ContactInfo
        })
      );
    },

    navigateToSearch: () => {
      dispatch(
        NavigationActions.navigate({
          routeName: RouteNames.Tabs.UserInfoTab.Search
        })
      )
    },

    navigateToUserKind: () => {
      dispatch(
        NavigationActions.navigate({
          routeName: RouteNames.UserKind,
        })
      )
    }
  };
};

export const TabUserMainScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabUserMainScreen);
