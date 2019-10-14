//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { AccountActions } from "business";
import LoginScreen from "./LoginScreen";

const mapDispatchToProps = (dispatch: Function) => ({
  facebookAuth: () => {
    dispatch(AccountActions.facebookClientAuth());
  }
});

export const LoginScreenContainer = connect(
  null,
  mapDispatchToProps
)(LoginScreen);
