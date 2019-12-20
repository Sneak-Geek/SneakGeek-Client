//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { SignInScreen } from "./SignInScreen";
import { IAppState } from "../../Store";
import { RouteNames } from "../../Navigation";
import { NavigationActions } from "react-navigation";
import * as Actions from "../../Actions";

const mapStateToProps = (state: IAppState) => ({
  isAuthenticating: state.AccountState.isAuthenticating,
  authenticationError: state.AccountState.authenticationError
});

const mapDispatchToProps = (dispatch: Function) => ({
  emailLogin: (email: string, password: string) => {
    dispatch(Actions.emailLogin(email, password));
  },

  navigateToFotgotPassword: (email: string) => {
    dispatch(
      NavigationActions.navigate({
        routeName: RouteNames.ForgotPassword,
        params: { email }
      })
    );
  }
});

export const SignInScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
