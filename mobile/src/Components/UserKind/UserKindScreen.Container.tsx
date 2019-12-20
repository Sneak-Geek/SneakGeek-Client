//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { UserKindScreen } from "./UserKindScreen";
import { IAppState } from "../../Store";
import { RouteNames } from "../../Navigation";
import { StackActions } from "react-navigation";
const mapStateToProps = (_state: IAppState) => ({});
const mapDispatchToProps = (dispatch: Function) => ({

    navigateToHome: () => {
        dispatch(
            StackActions.replace({
                routeName: RouteNames.Tabs.TabRoot
            }),
        );
    },
});

export const UserKindScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserKindScreen);
