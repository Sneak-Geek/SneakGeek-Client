//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { ForgotPasswordScreen } from "./ForgotPasswordScreen";
import { IAppState } from "../../Store";
import { RouteNames } from "../../Navigation";
import { StackActions } from "react-navigation";
import * as Actions from "../../Actions";

const mapStateToProps = (_state: IAppState) => ({});
const mapDispatchToProps = (dispatch: Function) => ({
 
  requestTokenConfirm: (email: string) => {
    return dispatch(Actions.requestTokenConfirm(email));
  },

  verifyToken: (email: string, token: string) => {
    return dispatch(Actions.verifyToken(email, token));
  },

  setNewPassword: (email: string, token: string, newPassword: string) => {
    return dispatch(Actions.setNewPassword(email, token, newPassword));
  },

  navigateToHome: () => {
    dispatch(
        StackActions.replace({
            routeName: RouteNames.Tabs.TabRoot
        }),
    );
},
});

export const ForgotPasswordScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);
