//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import React from "react";
import "./style.css";
import { Form, Input, Button } from "semantic-ui-react";
import { History } from "history";

type Props = {
  history: History;
  emailLogin: (email: string, password: string) => void;
};

type State = {
  email: string;
  password: string;
};

export default class LoginScreen extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  public /** override */ render(): JSX.Element {
    return (
      <div className={"centered"}>
        <p>Đăng nhập qua</p>
        {this._renderFacebookAuth()}
        {this._renderGoogleAuth()}
        {this._renderEmailBasedAuth()}
      </div>
    );
  }

  private _renderFacebookAuth(): JSX.Element {
    return (
      <Button className={"ui facebook button"} onClick={() => this._facebookAuth()}>
        <i className={"facebook icon"}></i>
        Facebook
      </Button>
    );
  }

  private _renderGoogleAuth(): JSX.Element {
    return (
      <Button className={"ui google plus button"} onClick={() => this._googleAuth()}>
        <i className={"google icon"}></i>
        Google
      </Button>
    );
  }

  private _renderEmailBasedAuth(): JSX.Element {
    return (
      <div>
        <p>Hoặc sử dụng email</p>
        <Form>
          <Form.Field>
            <label>Email</label>
            <Input
              type={"email"}
              placeholder={"taikhoan@email.com"}
              defaultValue={this.state.email}
              onChange={(event, _) => {
                this.setState({
                  email: event.target.value
                });
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
              type={"password"}
              defaultValue={this.state.password}
              placeholder={"Password"}
              onChange={(event, _) => {
                this.setState({
                  password: event.target.value
                });
              }}
            />
          </Form.Field>
        </Form>
        <Button
          onClick={() => {
            this.props.emailLogin(this.state.email, this.state.password);
            this.props.history.replace("/home");
          }}>
          Đăng nhập
        </Button>
      </div>
    );
  }

  private _googleAuth(): void {}

  private _facebookAuth(): void {}
}
