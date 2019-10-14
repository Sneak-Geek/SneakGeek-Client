//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import React from "react";
import { Nav, InputGroup, FormControl, Row } from "react-bootstrap";
import { Route } from "react-router-dom";

import "./product.scss";

export class ProductScreen extends React.Component<{}> {
  private allTabs = [
    { name: "Tất cả", route: "#products/all" },
    { name: "Sản phẩm hot", route: "#products/hot" },
    { name: "Xem nhiều", route: "#products/frequent" }
  ];
  public /** override */ render(): JSX.Element {
    return (
      <div className="container-fluid">
        {this._renderNavBarTop()}
        {this._renderContent()}
      </div>
    );
  }

  private _renderNavBarTop(): JSX.Element {
    return (
      <Nav variant="tabs" defaultActiveKey="#products/all">
        {this.allTabs.map((tab, index) => (
          <Nav.Item key={index}>
            <Nav.Link href={tab.route}>{tab.name}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    );
  }

  private _renderContent(): JSX.Element {
    return (
      <div className="tab-route-container">
        <Route path="/products/all" render={this._renderAllProductsTab} />
        <Route path="/products/hot" render={() => this._renderHotProductsTab()} />
        <Route path="/products/frequent" render={() => this._renderFrequentProductsTab()} />
      </div>
    );
  }

  private _renderAllProductsTab(): JSX.Element {
    return (
      <div className="container-fluid column">
        <img src={"/Filter.svg"} />
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>
              <span className="glyphicon glyphicon-search"></span>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder="Tìm kiếm" aria-label="Tìm kiếm" />
        </InputGroup>
      </div>
    );
  }

  private _renderHotProductsTab(): JSX.Element {
    return <></>;
  }

  private _renderFrequentProductsTab(): JSX.Element {
    return <></>;
  }
}
