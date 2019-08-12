//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";

// Needed for InversifyJS
import "reflect-metadata";

import AppNavigator from "./Navigation/AppNavigator";
import { Provider } from "react-redux";
import { AppStore } from "./Store";

export default class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={AppStore}>
        <AppNavigator />
      </Provider>
    );
  }
}
