//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { View, TouchableOpacity, Image, SafeAreaView } from "react-native";
import styles from "./styles";
import { Input, Button, Icon } from "react-native-elements";
import { Account } from "../../Shared/Model";
import { Text } from "../../Shared/UI";
import * as Assets from "../../Assets";
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
  navigateToSignUp: () => void;
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
      <SafeAreaView style={styles.rootContainer}>
        {this._renderSocialContainer()}
        <View style={styles.separator} />
        {this._renderEmailBasedContainer()}
      </SafeAreaView>
    );
  }

  private _renderSocialContainer() {
    return (
      <View style={styles.socialContainer}>
        <Text.Body style={styles.label}>Đăng nhập qua</Text.Body>
        {this._renderSocialButton(
          "Tài khoản Google",
          Assets.Icons.Google,
          this.props.googleLogin
        )}
          {this._renderSocialButton(
          "Tài khoản Facebook",
          Assets.Icons.Facebook,
          this.props.facebookLogin
        )}
        {this._renderSocialButton(
          "Tài khoản Zalo",
          Assets.Icons.Zalo,
          this.props.navigateToSignUp
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
        <View style={{ flex: 1, width: "100%" }}>
          <Text.Body style={styles.socialLabel}>Hoặc sử dụng email</Text.Body>
          <Input
            value={this.state.currentEmail}
            onChangeText={currentEmail => this.setState({ currentEmail })}
            containerStyle={{ width: "100%", paddingHorizontal: 0 }}
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
        </View>
        <Button
          title="Đăng nhập"
          buttonStyle={[
            styles.authButtonContainer,
            {
              backgroundColor: StringUtil.isValidEmail(this.state.currentEmail)
                ? Assets.Styles.ButtonPrimaryColor
                : Assets.Styles.ButtonDisabledColor
            }
          ]}
          onPress={() => this.props.navigateToHome()}
        />
      </View>
    );
  }
}
