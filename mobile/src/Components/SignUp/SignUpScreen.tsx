//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { View, SafeAreaView } from "react-native";
import styles from "./styles";
import { Input, Button } from "react-native-elements";
import { Account } from "../../Shared/Model";
import { Text, AppButtonImg } from "../../Shared/UI";
import * as Assets from "../../Assets";
import * as StringUtil from "../../Utilities/StringUtil";
import { APP_BTN } from "../../Shared/UI/AppButtonImg";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface ISignUpScreenProps {
  currentAccount: Account | null;
  isAuthenticating: boolean;
  authenticationError?: any;

  // dispatch props
  goBack: () => void;
}

interface State {
  currentEmail: string;
  currentPassword: string;
}

export default class SignUpScreen extends React.Component<ISignUpScreenProps, State> {
  static navigationOptions = {
    header: null
  };

  public constructor /** override */(props: ISignUpScreenProps) {
    super(props);
    this.state = {
      currentEmail: "",
      currentPassword: ""
    };
  }

  public /** override */ render() {
    return (
      <SafeAreaView style={styles.rootContainer}>
        {this._renderBackButton()}
        {this._renderSocialContainer()}
        {this._renderInputFieldsBasedContainer()}
        {this._renderForgetPass()}
        {this._renderRegisterBtn()}
      </SafeAreaView>
    );
  }

  private _renderBackButton() {
    return (
       <AppButtonImg type={APP_BTN.BUTTON_TYPE.BACK.name} onPress={()=>this.props.goBack()}/>
    )
  }

  private _renderForgetPass() {
    return (
        <View style={[styles.titleContainer, {alignSelf: "flex-start"}]}>
          <TouchableOpacity onPress={()=>{}}>
            <Text.Body style={[styles.label, {textDecorationLine: "underline"}]}>Quên mật khẩu</Text.Body>
          </TouchableOpacity>
        </View>
    )
  }

  private _renderSocialContainer() {
    return (
      <View style={styles.titleContainer}>
        <Text.Body style={styles.label}>Xin chào, email của bạn chưa đăng ký, mời bạn điền mật khẩu để tạo tài khoản mới:</Text.Body>
      </View>
    );
  }

  private _renderRegisterBtn() {
    return (
      <View style={{position: "absolute", bottom: 40, alignSelf: "center"}}>
        <Button
          title="Đăng ký"
          buttonStyle={[
            styles.authButtonContainer,
            {
              backgroundColor: StringUtil.isValidEmail(this.state.currentEmail)
                ? Assets.Styles.ButtonPrimaryColor
                : Assets.Styles.ButtonDisabledColor
            }
          ]}
          onPress={() => {}}
        />
      </View>
    )
  }

  private _renderInputFieldsBasedContainer() {
    return (
      <View style={styles.emailBasedContainer}>
        <View style={{ flex: 1, width: "100%" }}>
          <Input
            value={this.state.currentEmail}
            onChangeText={currentEmail => this.setState({ currentEmail })}
            containerStyle={{ width: "100%", paddingHorizontal: 0 }}
            inputContainerStyle={styles.emailContainerStyle}
            placeholder={"taikhoan@email.com"}
            leftIcon={false}
            underlineColorAndroid={"transparent"}
            inputStyle={styles.emailInputStyle}
          />
          <Input
            value={this.state.currentPassword}
            onChangeText={currentPassword => this.setState({ currentPassword })}
            containerStyle={{ width: "100%", paddingHorizontal: 0 }}
            inputContainerStyle={styles.emailContainerStyle}
            placeholder={"Mật khẩu"}
            leftIcon={false}
            secureTextEntry
            underlineColorAndroid={"transparent"}
            inputStyle={styles.emailInputStyle}
          />
        </View>
      </View>
    );
  }
}
