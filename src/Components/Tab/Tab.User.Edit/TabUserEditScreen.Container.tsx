//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { TabUserEditScreen } from "./TabUserEditScreen";
import { IAppState } from "../../../Store";

const mapStateToProps = (_state: IAppState) => ({});

const mapDispatchToProps = (_dispatch: Function) => ({});

export const TabUserEditScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabUserEditScreen);
