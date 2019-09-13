import React from 'react';
import './Login.scss';
import Form from 'react-bootstrap/Form';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

interface Props {};

interface State {};

export default class Login extends React.Component<Props, State> {

  private _facebookAuth(): void {
    FB.login(function(res: facebook.StatusResponse) {
      console.log(res);
    });
  }

  private _googleAuth(): void {

  }

  private _renderSocialButton(
    title: string,
    bgColor: string,
    icon: JSX.Element,
    onClick: () => void,
  ): JSX.Element {
    return (
      <button className="social-button" style={{backgroundColor: bgColor}} onClick={onClick}>
        {icon}
        <p className="social-button-title">{title}</p>
      </button>
    )
  }

  render() {
    return (
      <div className='centered'>
        <p>Đăng nhập qua</p>
        {this._renderSocialButton(
          "Tài khoản Facebook",
          "#0E4D92",
          <FaFacebookF className='social-icon'/>,
          this._facebookAuth,
        )}
        {this._renderSocialButton(
          "Tài khoản Google",
          "red",
          <FaGoogle className='social-icon'/>,
          this._googleAuth,
        )}
        <hr className='horizontal-divider'/>
        <p>Hoặc sử dụng email</p>
        <Form.Group className="email-login-form-wrapper">
          <Form.Control className='email-login-form' type="email" placeholder="taikhoan@email.com" />
        </Form.Group>
        <Form.Group className='email-login-form-wrapper'>
          <Form.Control className='email-login-form' type="password" placeholder="mật khẩu" />
        </Form.Group>
        <button className='login-button'>
          Đăng nhập
        </button>
      </div>
    );
  }
}
