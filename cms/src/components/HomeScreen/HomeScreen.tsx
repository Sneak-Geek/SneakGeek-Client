//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Navbar, Nav, NavItem, Row } from "react-bootstrap";
import "./home.scss";
import { ProductScreen } from "../ProductScreen/ProductScreen";

export class HomeScreen extends React.Component<{}> {
  render() {
    return (
      <div className="dashboard-container">
        {this._renderTopNav()}
        <Row>
          {this._renderSideNav()}
          {this._renderMainRouter()}
        </Row>
      </div>
    );
  }

  private _renderTopNav(): JSX.Element {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Navbar.Brand>
          <img src="/Logo.svg" className="d-inline-block align-top" />
        </Navbar.Brand>
      </Navbar>
    );
  }

  private _renderSideNav() {
    const navs = [
      { name: "Sản phẩm", icon: "glyphicon glyphicon-th-list", href: "#/products" },
      { name: "Bài viết", icon: "glyphicon glyphicon-file", href: "#/posts" },
      { name: "Tài khoản", icon: "glyphicon glyphicon-user", href: "#/account" }
    ];
    return (
      <div className="side-nav">
        <Nav className="flex-column" defaultActiveKey="#/products">
          {navs.map((nav, idx) => (
            <div className={"side-nav-item"} key={idx}>
              <NavItem className="row jutify-content-center align-self-start">
                <span className={`${nav.icon} side-nav-icon`}></span>
                <a href={nav.href}>
                  <span>{nav.name}</span>
                </a>
              </NavItem>
            </div>
          ))}
        </Nav>
      </div>
    );
  }

  private _renderMainRouter() {
    return (
      <HashRouter basename="" hashType={"noslash"}>
        <div className={"container"}>
          <Route path="/products" component={ProductScreen} />
          <Route path="/posts" component={ProductScreen} />
          <Route path="/account" component={ProductScreen} />
        </div>
      </HashRouter>
    );
  }
}
