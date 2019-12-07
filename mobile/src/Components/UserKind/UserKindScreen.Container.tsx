//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { UserKindScreen } from "./UserKindScreen";
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

export const UserKindScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserKindScreen);
