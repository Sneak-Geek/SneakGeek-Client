import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import {strings, themes, images} from 'resources';
import {StackNavigationProp} from '@react-navigation/stack';
import RouteNames from 'navigations/RouteNames';
import {connect} from 'utilities/ReduxUtilities';
import {
  authenticateWithFb,
  authenticateWithGoogle,
  NetworkRequestState,
  authenticateWithApple,
  Account,
} from 'business';
import {IAppState} from 'store/AppStore';
import {AppText} from 'screens/Shared';

type Props = {
  accountState: {account: Account; state: NetworkRequestState; error?: any};
  navigation: StackNavigationProp<any>;
  facebookLogin: () => void;
  googleLogin: () => void;
  appleLogin: () => void;
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  button: {
    borderRadius: themes.ButtonBorderRadius,
    height: themes.RegularButtonHeight,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: themes.AppSecondaryColor,
    borderWidth: 0,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  titleStyle: {
    color: 'white',
    ...themes.TextStyle.callout,
  },
  iconStyle: {
    width: themes.IconSize,
    aspectRatio: 1,
    marginLeft: 10,
    marginRight: 20,
  },
  logo: {
    width: 350,
    height: 350,
    tintColor: themes.AppAccentColor,
  },
  emailIconStyle: {
    width: themes.IconSize,
    height: themes.IconSize - 4,
    marginLeft: 10,
    marginRight: 20,
  },
  emailLoginStyle: {
    marginTop: 10,
    textAlign: 'center',
    color: 'black',
  },
});

@connect(
  (state: IAppState) => ({
    accountState: state.UserState.accountState,
  }),
  (dispatch: Function) => ({
    facebookLogin: (): void => {
      dispatch(authenticateWithFb());
    },
    googleLogin: (): void => {
      dispatch(authenticateWithGoogle());
    },
    appleLogin: (): void => {
      dispatch(authenticateWithApple());
    },
  }),
)
export class LoginScreen extends React.Component<Props> {
  public render(): JSX.Element {
    return (
      <ImageBackground source={images.Home} style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar barStyle={'light-content'} />
          {!this.props.accountState.account && (
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={styles.buttonContainer}>
                {this._renderFacebookLogin()}
                {this._renderGoogleLogin()}
                {this._renderAppleLogin()}
                {this._renderEmailSignUp()}
                {this._renderEmailLogin()}
              </View>
            </View>
          )}
        </SafeAreaView>
      </ImageBackground>
    );
  }

  private _renderFacebookLogin(): JSX.Element {
    return (
      <Button
        type={'solid'}
        title={strings.ContinueFacebook}
        icon={<Image source={images.Facebook} style={styles.iconStyle} />}
        titleStyle={styles.titleStyle}
        buttonStyle={{
          backgroundColor: themes.FacebookThemeColor,
          ...styles.button,
        }}
        onPress={(): void => {
          this.props.facebookLogin();
        }}
      />
    );
  }

  private _renderGoogleLogin() {
    return (
      <Button
        type={'outline'}
        buttonStyle={{backgroundColor: 'white', ...styles.button}}
        title={strings.ContinueGoogle}
        icon={<Image source={images.Google} style={styles.iconStyle} />}
        titleStyle={{...styles.titleStyle, color: 'black'}}
        onPress={(): void => {
          this.props.googleLogin();
        }}
      />
    );
  }

  private _renderAppleLogin() {
    return (
      <Button
        type={'outline'}
        buttonStyle={{backgroundColor: 'white', ...styles.button}}
        title={strings.ContinueApple}
        icon={<Image source={images.Apple} style={styles.iconStyle} />}
        titleStyle={{...styles.titleStyle, color: 'black'}}
        onPress={this.props.appleLogin.bind(this)}
      />
    );
  }

  private _renderEmailSignUp() {
    return (
      <Button
        type={'outline'}
        buttonStyle={{
          backgroundColor: themes.AppPrimaryColor,
          ...styles.button,
        }}
        title={strings.SignUpEmail}
        icon={<Image source={images.Email} style={styles.emailIconStyle} />}
        titleStyle={styles.titleStyle}
        onPress={() => this.props.navigation.push(RouteNames.Auth.EmailSignUp)}
      />
    );
  }

  private _renderEmailLogin() {
    return (
      <AppText.Subhead
        style={styles.emailLoginStyle}
        onPress={(): void => {
          this.props.navigation.push(RouteNames.Auth.EmailLogin);
        }}>
        {strings.MemberAlready}{' '}
        <AppText.Callout>{strings.SignIn}</AppText.Callout>
      </AppText.Subhead>
    );
  }
}
