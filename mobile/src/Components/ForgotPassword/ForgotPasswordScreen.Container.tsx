//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { ForgotPasswordScreen } from "./ForgotPasswordScreen";
import { IAppState } from "../../Store";
import { RouteNames } from "../../Navigation";
import { NavigationActions } from "react-navigation";
import * as Actions from "../../Actions";

const mapStateToProps = (_state: IAppState) => ({});
const mapDispatchToProps = (dispatch: Function) => ({
 
  requestTokenConfirm: (email: string) => {
    return dispatch(Actions.requestTokenConfirm(email));
  },

});

export const ForgotPasswordScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);
