//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import * as React from "react";

// Needed for InversifyJS
import "reflect-metadata";

import AppNavigator from "./Navigation/AppNavigator";
import { Provider } from "react-redux";
import { AppStore } from "./Store";

export default class Index extends React.Component<{}> {
  render() {
    return (
      <Provider store={AppStore}>
        <AppNavigator />
      </Provider>
    );
  }
}
