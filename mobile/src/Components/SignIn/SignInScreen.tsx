import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
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
import { Text } from "../../Shared/UI";

interface ISignInScreenState {
  email: string;
  password: string;
  isEmailValid: boolean;
}

interface ISignInScreenProps {
  isAuthenticating: boolean;
  authenticationError: any;
  navigateToFotgotPassword: (email: string) => void;
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
    ),
    headerTitleStyle: Text.TextStyle.title2,
    title: "Đăng nhập"
  });

  public constructor(props: ISignInScreenProps) {
    super(props);
    this.state = {
      email: this.props.navigation ? this.props.navigation.getParam("email") : "",
      password: "",
      isEmailValid: false
    };
  }

  private login() {
    let { email, password, isEmailValid: active } = this.state;
    if (active) {
      this.props.emailLogin(email, password);
    }
  }

  private validateButton() {
    let { email, password } = this.state;
    let res = StringUtil.isValidEmail(email);
    if (res === true && password.length > 0) {
      this.setState({ isEmailValid: true });
    } else {
      this.setState({ isEmailValid: false });
    }
  }

  public componentDidUpdate(prevProps: ISignInScreenProps) {
    if (
      this.props.authenticationError &&
      prevProps.authenticationError !== this.props.authenticationError
    ) {
      Alert.alert("Mật khẩu không đúng, vui lòng thử lại");
    }
  }

  public render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Text.Body style={styles.title}>Vui lòng nhập mật khẩu để đăng nhập</Text.Body>
            <View style={{ paddingHorizontal: 42 }}>
              {this.renderEmail()}
              {this.renderPassword()}
              {this.renderForgot()}
            </View>
          </View>
          {this.renderButton()}
          <KeyboardSpacer
            topSpacing={Assets.Device.isIphoneX ? -Assets.Device.bottomSpace : 0}
          />
        </View>
      </SafeAreaView>
    );
  }

  private renderEmail() {
    let { email } = this.state;
    return (
      <View style={styles.inputContainer}>
        <View style={styles.absolute}>
          <Text.Footnote style={styles.email}>Email</Text.Footnote>
        </View>
        <TextInput
          style={styles.input}
          placeholder={"Email của bạn"}
          value={email}
          placeholderTextColor={"rgba(0, 0, 0, 0.4)"}
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
          placeholderTextColor={"rgba(0, 0, 0, 0.4)"}
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
        onPress={() => this.props.navigateToFotgotPassword(this.state.email)}
      >
        <Text.Body style={styles.forgotTitle}>Quên mật khẩu?</Text.Body>
      </TouchableOpacity>
    );
  }

  private renderButton() {
    const { isEmailValid } = this.state;
    return (
      <Button
        title={this.props.isAuthenticating ? "Đang đăng nhập..." : "Đăng nhập"}
        buttonStyle={[
          styles.authButtonContainer,
          {
            backgroundColor: isEmailValid
              ? Assets.Styles.ButtonPrimaryColor
              : Assets.Styles.ButtonDisabledColor
          }
        ]}
        titleStyle={Text.TextStyle.body}
        onPress={this.login.bind(this)}
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
    lineHeight: 25,
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
