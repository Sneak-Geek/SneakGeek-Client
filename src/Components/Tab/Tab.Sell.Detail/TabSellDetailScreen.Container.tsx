//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import { connect } from "react-redux";
import { IAppState } from "../../../Store";
import { TabSellDetailScreen } from "./TabSellDetailScreen";

const mapStateToProps = (_state: IAppState) => ({});

const mapDispatchToProps = (_dispatch: Function) => ({});

export const TabSellDetailScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabSellDetailScreen);
