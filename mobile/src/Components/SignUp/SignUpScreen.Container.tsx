//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { SignUpScreen } from "./SignUpScreen";
import { IAppState } from "../../Store";
import { RouteNames } from "../../Navigation";
import { NavigationActions } from "react-navigation";

const mapStateToProps = (_state: IAppState) => ({});
const mapDispatchToProps = (dispatch: Function) => ({
    navigateToFotgotPassword: () => {
        dispatch(
          NavigationActions.navigate({
            routeName: RouteNames.ForgotPassword
          })
        );
      },
});

export const SignUpScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);
