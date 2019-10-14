//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import React from "react";
import "./style.css";
import Form from "react-bootstrap/Form";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

type Props = {
  facebookAuth: () => void;
};

export default class LoginScreen extends React.Component<Props> {
  public /** override */ render(): JSX.Element {
    return (
      <div className="centered">
        <p>Đăng nhập qua</p>
        {this._renderFacebookAuth()}
        {this._renderGoogleAuth()}
        <hr className="horizontal-divider" />
        {this._renderEmailBasedAuth()}
      </div>
    );
  }

  private _renderFacebookAuth(): JSX.Element {
    return (
      <button className="social-button facebook" onClick={this._facebookAuth.bind(this)}>
        <FaFacebookF className="social-icon" />
        <p className="social-button-title">Tài khoản Facebook</p>
      </button>
    );
  }

  private _renderGoogleAuth(): JSX.Element {
    return (
      <button className="social-button google" onClick={this._googleAuth.bind(this)}>
        <FaGoogle className="social-icon" />
        <p className="social-button-title">Tài khoản Google</p>
      </button>
    );
  }

  private _renderEmailBasedAuth(): JSX.Element {
    return (
      <div>
        <p>Hoặc sử dụng email</p>
        <Form.Group className="email-login-form-wrapper">
          <Form.Control
            className="email-login-form"
            type="email"
            placeholder="taikhoan@email.com"
          />
        </Form.Group>
        <Form.Group className="email-login-form-wrapper">
          <Form.Control className="email-login-form" type="password" placeholder="mật khẩu" />
        </Form.Group>
        <button className="login-button">Đăng nhập</button>
      </div>
    );
  }

  private _googleAuth(): void {}

  private _facebookAuth(): void {
    this.props.facebookAuth();
  }
}
