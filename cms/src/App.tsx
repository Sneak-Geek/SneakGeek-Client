//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import React from "react";
import { Route, Switch } from "react-router-dom";
import { LoginScreenContainer } from "./components/LoginScreen";
import { Provider } from "react-redux";
import { AppStore } from "./store/AppStore";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store/AppStore";
import { HomeScreen } from "./components/HomeScreen/HomeScreen";

export default class App extends React.Component<{}> {
  public /** override */ render(): JSX.Element {
    return (
      <Provider store={AppStore}>
        <ConnectedRouter history={history}>
          <>
            <Switch>
              <Route path="/login" component={LoginScreenContainer} />
              <Route path="/home" component={HomeScreen} />
            </Switch>
          </>
        </ConnectedRouter>
      </Provider>
    );
  }
}
