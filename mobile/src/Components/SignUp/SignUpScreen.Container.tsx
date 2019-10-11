//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { IAppState } from "../../Store";
import SignUpScreen from "./SignUpScreen";
import { NavigationActions } from "react-navigation";

const mapStateToProps = (state: IAppState) => {
  const AccountState = state.AccountState;
  return {
    currentAccount: AccountState.currentAccount,
    isAuthenticating: AccountState.isAuthenticating,
    authenticationError: AccountState.authenticationError,
    isAuthenticatingWithFacebook: AccountState.isAuthenticatingWithFacebook,
    isAuthenticationCancelled: AccountState.isAuthenticationCancelled
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    goBack: () => {
      dispatch(NavigationActions.back())
    }
  };
};

export const SignUpScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);
