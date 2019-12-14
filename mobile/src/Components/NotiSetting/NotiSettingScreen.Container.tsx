//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { NotiSettingScreen } from "./NotiSettingScreen";
import { IAppState } from "../../Store";
import { RouteNames } from "../../Navigation";
import { NavigationActions } from "react-navigation";

const mapStateToProps = (_state: IAppState) => ({});
const mapDispatchToProps = (dispatch: Function) => ({

    
});

export const NotiSettingScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotiSettingScreen);
