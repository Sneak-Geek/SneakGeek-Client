//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { SignInScreen } from "./SignInScreen";
import { IAppState } from "../../Store";
import { RouteNames } from "../../Navigation";
import { NavigationActions } from "react-navigation";
import * as Actions from "../../Actions";

const mapStateToProps = (_state: IAppState) => ({});
const mapDispatchToProps = (dispatch: Function) => ({
  emailLogin: (email: string, password: string) => {
    dispatch(Actions.emailLogin(email, password));
  },

  navigateToFotgotPassword: () => {
    dispatch(
      NavigationActions.navigate({
        routeName: RouteNames.ForgotPassword
      })
    );
  },
});

export const SignInScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
