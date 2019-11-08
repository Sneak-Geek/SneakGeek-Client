//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { IAppState } from "../../../Store";
import { TransactionBuyTabScreen } from "./TransactionBuyTabScreen";

const mapStateToProps = (_state: IAppState) => ({});
const mapDispatchToProps = (_dispatch: Function) => ({});

export const TransactionBuyTabScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionBuyTabScreen);
