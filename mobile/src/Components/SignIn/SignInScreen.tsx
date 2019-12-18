import * as React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import {
  StackActions,
  NavigationScreenProps,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import { Icon, Button } from "react-native-elements";
import * as Assets from "../../Assets";
import * as StringUtil from "../../Utilities/StringUtil";
import KeyboardSpacer from "react-native-keyboard-spacer";

interface ISignInScreenState {
  email: string;
  password: string;
  active: boolean;
}

interface ISignInScreenProps {
  navigateToFotgotPassword: () => void;
  emailLogin: (email: string, password: string) => void;
  navigation?: NavigationScreenProp<NavigationRoute>;
}

export class SignInScreen extends React.Component<ISignInScreenProps, ISignInScreenState> {
  static navigationOptions = (transitionProp: NavigationScreenProps) => ({
    headerStyle: {
      borderBottomWidth: 0
    },
    headerLeft: (
      <Icon
        type={"ionicon"}
        name={"ios-arrow-back"}
        size={28}
        containerStyle={{ marginLeft: 10 }}
        onPress={() => transitionProp.navigation.dispatch(StackActions.popToTop())}
      />
    )
  });

  state = {
    email: this.props.navigation ? this.props.navigation.getParam("email") : "",
    password: "",
    active: false
  };

  login = () => {
    let { email, password, active } = this.state;
    if (active) {
      this.props.emailLogin(email, password);
    } else {
      Alert.alert("Thông báo", "Email hoặc mật khẩu không chính xác");
    }
  };

  validateButton = () => {
    let { email, password } = this.state;
    let res = StringUtil.isValidEmail(email);
    if (res === true && password.length > 0) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  };

  public render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{`Vui lòng nhập mật khẩu để đăng nhập`}</Text>
            <View style={{ paddingHorizontal: 42 }}>
              {this.renderEmail()}
              {this.renderPassword()}
              {this.renderForgot()}
            </View>
          </View>
          {this.renderButton()}
          {Assets.Device.IS_IOS && (
            <KeyboardSpacer
              topSpacing={Assets.Device.isIphoneX ? -Assets.Device.bottomSpace : 0}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }

  private renderEmail() {
    let { email } = this.state;
    return (
      <View style={styles.inputContainer}>
        <View style={styles.absolute}>
          <Text style={styles.email}>Email</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email của bạn"
          value={email}
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onChangeText={email => this.setState({ email }, () => this.validateButton())}
          selectionColor={Assets.Styles.AppPrimaryColor}
          autoCapitalize="none"
        />
      </View>
    );
  }

  private renderPassword() {
    let { password } = this.state;
    return (
      <View style={styles.inputContainer}>
        <TextInput
          autoFocus
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onChangeText={password =>
            this.setState({ password }, () => this.validateButton())
          }
          selectionColor={Assets.Styles.AppPrimaryColor}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
    );
  }

  private renderForgot() {
    return (
      <TouchableOpacity
        style={styles.forgotContainer}
        onPress={this.props.navigateToFotgotPassword}
      >
        <Text style={styles.forgotTitle}>Quên mật khẩu?</Text>
      </TouchableOpacity>
    );
  }

  private renderButton() {
    let { active } = this.state;
    return (
      <Button
        title="Đăng nhập"
        buttonStyle={[
          styles.authButtonContainer,
          {
            backgroundColor: active
              ? Assets.Styles.AppPrimaryColor
              : Assets.Styles.ButtonDisabledColor
          }
        ]}
        titleStyle={{
          fontSize: 18,
          fontFamily: "RobotoCondensed-Regular"
        }}
        onPress={this.login}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1
  },
  title: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: "RobotoCondensed-Regular",
    textAlign: "left",
    paddingLeft: 42
  },
  inputContainer: {
    height: 52,
    justifyContent: "center",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    marginTop: 30
  },
  email: {
    fontSize: 12,
    fontFamily: "RobotoCondensed-Regular",
    color: "black",
    opacity: 0.4,
    paddingLeft: 3,
    paddingRight: 5
  },
  absolute: {
    position: "absolute",
    left: 12,
    top: -7,
    backgroundColor: "white"
  },
  input: {
    fontFamily: "RobotoCondensed-Regular",
    fontSize: 16,
    flex: 1
  },
  forgotTitle: {
    fontFamily: "RobotoCondensed-Regular",
    fontSize: 16,
    textDecorationLine: "underline"
  },
  forgotContainer: {
    marginTop: 27,
    width: 120
  },
  buttonContainer: {
    height: 56,
    paddingHorizontal: 57,
    justifyContent: "center",
    borderRadius: 4
  },
  titleButton: {
    fontFamily: "RobotoCondensed-Regular",
    fontSize: 18
  },
  authButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: Assets.Styles.ButtonHeight
  }
});
