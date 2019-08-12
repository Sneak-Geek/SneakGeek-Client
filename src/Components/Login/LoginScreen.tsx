//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import { SocialIcon, Input, Button, Icon } from "react-native-elements";
import { Account } from "../../Reducers";

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

export default class LoginScreen extends React.Component<ILoginScreenProps> {
  public /** override */ render() {
    return (
      <View style={styles.rootContainer}>
        {this._renderSocialContainer()}
        <View style={styles.separator} />
        {this._renderEmailBasedContainer()}
        {this._renderDebugDialog()}
      </View>
    );
  }

  private _renderSocialContainer() {
    return (
      <View style={styles.socialContainer}>
        <Text style={[styles.label, styles.socialLabel]}>Đăng nhập qua</Text>

        <SocialIcon
          style={styles.buttonContainer}
          title="Tài khoản Facebook"
          button
          type="facebook"
          fontWeight="normal"
          onPress={() => this.props.facebookLogin()}
        />

        <SocialIcon
          style={styles.buttonContainer}
          title={"Tài khoản Google"}
          button
          type={"google-plus-official"}
          fontWeight={"normal"}
          onPress={() => this.props.googleLogin()}
        />
      </View>
    );
  }

  private _renderEmailBasedContainer() {
    return (
      <View style={styles.emailBasedContainer}>
        <Text style={styles.label}>Hoặc sử dụng email</Text>
        <Input
          inputContainerStyle={styles.emailContainerStyle}
          placeholder={"taikhoan@email.com"}
          leftIcon={<Icon type={"ionicon"} name={"md-mail"} size={24} color={"#DADADA"} />}
          underlineColorAndroid={"transparent"}
          inputStyle={styles.emailInputStyle}
        />
        <Button
          title="Đăng nhập"
          buttonStyle={styles.authButton}
          onPress={() => this.props.navigateToHome()}
        />
      </View>
    );
  }

  private _renderDebugDialog(): JSX.Element | null {
    if (__DEV__) {
      return (
        <Icon
          reverse
          containerStyle={styles.debugDialogButton}
          name={"settings"}
          onPress={() => this.props.displayDebugDialog()}
        />
      );
    }

    return null;
  }
}
