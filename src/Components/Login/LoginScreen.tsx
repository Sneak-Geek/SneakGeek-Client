//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { Input, Button, Icon } from "react-native-elements";
import { Account } from "../../Reducers";
import * as Text from "../Shared/Text";
import { Assets } from "../../Assets";
import * as StringUtil from "../../Utilities/StringUtil";

export interface ILoginScreenProps {
  currentAccount: Account | null;
  isAuthenticating: boolean;
  authenticationError?: any;
  isAuthenticatingWithFacebook: boolean;
  isAuthenticationCancelled: boolean;

  // dispatch props
  facebookLogin: () => void;
  googleLogin: () => void;
  navigateToHome: () => void;
  displayDebugDialog: () => void;
}

interface State {
  currentEmail: string;
}

export default class LoginScreen extends React.Component<ILoginScreenProps, State> {
  static navigationOptions = {
    header: null
  };

  public constructor /** override */(props: ILoginScreenProps) {
    super(props);
    this.state = {
      currentEmail: ""
    };
  }

  public /** override */ render() {
    return (
      <View style={styles.rootContainer}>
        {this._renderSocialContainer()}
        <View style={styles.separator} />
        {this._renderEmailBasedContainer()}
      </View>
    );
  }

  private _renderSocialContainer() {
    return (
      <View style={styles.socialContainer}>
        <Text.Body style={[styles.label, styles.socialLabel]}>Đăng nhập qua</Text.Body>
        {this._renderSocialButton(
          "Tài khoản Facebook",
          Assets.Icons.Facebook,
          this.props.facebookLogin
        )}
        {this._renderSocialButton(
          "Tài khoản Google",
          Assets.Icons.Google,
          this.props.googleLogin
        )}
      </View>
    );
  }

  private _renderSocialButton(title: string, icon: any, onPress: () => void): JSX.Element {
    return (
      <TouchableOpacity onPress={onPress} style={styles.socialButton}>
        <View style={styles.socialButtonInner}>
          <Image source={icon} />
          <Text.Body style={styles.socialButtonText}>{title}</Text.Body>
        </View>
      </TouchableOpacity>
    );
  }

  private _renderEmailBasedContainer() {
    return (
      <View style={styles.emailBasedContainer}>
        <Text.Body style={styles.label}>Hoặc sử dụng email</Text.Body>
        <Input
          value={this.state.currentEmail}
          onChangeText={currentEmail => this.setState({ currentEmail })}
          inputContainerStyle={styles.emailContainerStyle}
          placeholder={"taikhoan@email.com"}
          leftIcon={
            <Icon
              type={"ionicon"}
              name={"md-mail"}
              size={24}
              color={Assets.Styles.ButtonDisabledColor}
            />
          }
          underlineColorAndroid={"transparent"}
          inputStyle={styles.emailInputStyle}
        />
        <View style={styles.authButtonContainer}>
          <Button
            title="Đăng nhập"
            buttonStyle={[
              styles.authButton,
              {
                backgroundColor: StringUtil.isValidEmail(this.state.currentEmail)
                  ? Assets.Styles.ButtonPrimaryColor
                  : Assets.Styles.ButtonDisabledColor
              }
            ]}
            onPress={() => this.props.navigateToHome()}
          />
        </View>
      </View>
    );
  }
}
