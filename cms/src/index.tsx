import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  ObjectFactory,
  IEnvVar,
  FactoryKeys,
  IAccountService,
  AccountService,
  IFacebookSDK,
  ISettingsProvider,
  ICatalogService,
  CatalogService,
  IReviewOrdersService,
  ReviewOrdersService,
  ShoeService,
  IShoeService
} from "business";
import { FacebookSdk } from "./services";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { SettingsProvider } from "./services/SettingsProvider";

ObjectFactory.register<IEnvVar>(FactoryKeys.IEnvVar, {
  __DEV__: process.env.NODE_ENV !== "production",
  devUrl: "http://localhost:8080/api/v1"
});
ObjectFactory.register<IAccountService>(FactoryKeys.IAccountService, new AccountService());
ObjectFactory.register<ICatalogService>(FactoryKeys.ICatalogService, new CatalogService());
ObjectFactory.register<IFacebookSDK>(FactoryKeys.IFacebookSDK, new FacebookSdk());
ObjectFactory.register<IReviewOrdersService>(FactoryKeys.IReviewOrdersService, new ReviewOrdersService());
ObjectFactory.register<ISettingsProvider>(
  FactoryKeys.ISettingsProvider,
  new SettingsProvider()
);
ObjectFactory.register<IShoeService>(FactoryKeys.IShoeService, new ShoeService());

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
