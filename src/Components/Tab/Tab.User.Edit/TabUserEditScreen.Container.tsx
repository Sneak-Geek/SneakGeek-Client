//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { TabUserEditScreen } from "./TabUserEditScreen";
import { IAppState } from "../../../Store";

const mapStateToProps = (state: IAppState) => ({
  account: state.AccountState.currentAccount
});

export const TabUserEditScreenContainer = connect(mapStateToProps)(TabUserEditScreen);
