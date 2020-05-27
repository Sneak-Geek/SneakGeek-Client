import React from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, FlatList, Alert, ScrollView, Dimensions} from 'react-native';
import { AppText, BottomButton } from 'screens/Shared';
import { strings, themes } from 'resources';
import { getDependency } from 'utilities';
import { IAccountService } from 'business/src';
import { FactoryKeys } from 'business';
import { StackNavigationProp } from '@react-navigation/stack';
import RouteNames from 'navigations/RouteNames';

type Props = {
  navigation?: StackNavigationProp<any>;
}

enum Status {
  ERROR,
  SUCCESS,
}

type State = {
  currentScreen: number;
  currentScreenStatus: Status;
  email: string;
  passCode: string;
  passWord: string;
  reenteredPassWord: string;
}

type ForgotPasswordComponents = {
  render: () => JSX.Element;
  canProceed: () => boolean;
}

const styles = StyleSheet.create({
  input: {
  ...themes.TextStyle.callout,
  paddingLeft: 15,
  flex: 1,
  },
  bodyInfoContainer: {
    paddingTop: 30,
    width: Dimensions.get("screen").width,
    paddingHorizontal: 40
  },
  emailContainer: {
      height: 52,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
      marginBottom: 17,
  },
  bodyContainer: {
    flex: 1,
  },
  textStyle: {
    height: 52,
    lineHeight: 25,
    marginBottom: 17,
  },
  incorrectEmailStyle: {
    ...themes.TextStyle.callout,
    paddingLeft: 15,
    flex: 1,
  }
});

export class ForgotPasswordScreen extends React.Component<Props, State> {
  private readonly _accountService = getDependency<IAccountService>(
    FactoryKeys.IAccountService,
  ); 
  private _childFlatList: FlatList<ForgotPasswordComponents>;

  private childComponents: ForgotPasswordComponents[];

  constructor(props: Props){
    super(props);
    this.state = {
      currentScreenStatus: Status.ERROR,
      currentScreen: 0,
      email: '',
      passCode: '',
      passWord: '',
      reenteredPassWord:'',
    };
    this.childComponents = [
      {
        render: (): JSX.Element => {return this._renderChildComponent(strings.ForgotPasswordStep1,undefined,strings.EmailStringCap)},
        canProceed: (): boolean => {
          const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          return Boolean(this.state.email.match(regEx) || this.state.email === ''
        )}
      },
      {
        render: (): JSX.Element => {return this._renderChildComponent(strings.ForgotPasswordStep2a,strings.ForgotPasswordStep2b,strings.PassCode)},
        canProceed: (): boolean => {
          return Boolean(
            true
          );
        }
      },
      {
        render: (): JSX.Element => {return this._renderChildComponent(strings.ForgotPasswordStep3,undefined,strings.Password, strings.ReenterPassword)},
        canProceed: (): boolean => {
          return Boolean(
            this.state.passWord===this.state.reenteredPassWord
          );
        }
      },
    ];
  }

  render(): JSX.Element{
    return(
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.bodyContainer}>
          {this._renderForgotPasswordContents()}
        </View>
        {this._renderBottomButton(strings.Continue)}
      </SafeAreaView>
    );
  }

  private _renderForgotPasswordContents(): JSX.Element {
    return(
      <FlatList
        ref={(ref) => (this._childFlatList = ref)}
        bounces={false}
        style={{marginTop: 10, height: '100%'}}
        horizontal={true}
        pagingEnabled={true}
        data={this.childComponents}
        renderItem={({item}) => item.render()}
        alwaysBounceHorizontal={false}
        scrollEnabled={false}
        keyExtractor={(_item, idx) => idx.toString()}
      />
    );
  }

  private _renderChildComponent(text1: string = " ", text2: string = undefined, inputType1:string= undefined, inputType2: string = undefined): JSX.Element {
    return(
        <View style={styles.bodyInfoContainer}>
          {text1 && <AppText.Body style={styles.textStyle}>{text1}</AppText.Body>}
          {text2 && <AppText.Body style={styles.textStyle}>{text2}</AppText.Body>}
          {inputType1 && this._renderEmailPlaceHolder(inputType1)}
          {inputType2 && this._renderEmailPlaceHolder(inputType2)}  
        </View>
    );
  }

  private _renderEmailPlaceHolder(inputType: string): JSX.Element{
    let inputPlaceHolder: JSX.Element;

    switch(inputType){
      case strings.EmailStringCap:
        inputPlaceHolder = 
        <View style={styles.emailContainer}>
          <TextInput
            autoFocus={true}
            style={this.childComponents[this.state.currentScreen].canProceed() ? styles.input : styles.incorrectEmailStyle}
            placeholder={strings.Email}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            selectionColor={themes.AppSecondaryColor}
            autoCapitalize={'none'}
            
          />
        </View>
        break;
      case strings.PassCode:
        inputPlaceHolder = 
        <View style={styles.emailContainer}>
          <TextInput
            autoFocus={true}
            style={styles.input}
            placeholder={strings.PassCode}
            value={this.state.passCode}
            onChangeText={(passCode) => this.setState({ passCode })}
            selectionColor={themes.AppSecondaryColor}
            autoCapitalize={'none'}
          />
        </View>
        break;
      case strings.Password:
        inputPlaceHolder = 
        <View style={styles.emailContainer}>
          <TextInput
            autoFocus={true}
            style={styles.input}
            secureTextEntry={true}
            placeholder={strings.Password}
            value={this.state.passWord}
            onChangeText={(passWord) => this.setState({ passWord })}
            selectionColor={themes.AppSecondaryColor}
            autoCapitalize={'none'}
          />
        </View>
        break;
      case strings.ReenterPassword:
        inputPlaceHolder = 
        <View style={styles.emailContainer}>
          <TextInput
            autoFocus={true}
            style={styles.input}
            placeholder={strings.ReenterPassword}
            secureTextEntry={true}
            value={this.state.reenteredPassWord}
            onChangeText={(reenteredPassWord) => this.setState({ reenteredPassWord })}
            selectionColor={themes.AppSecondaryColor}
            autoCapitalize={'none'}
          />
        </View>
        break;
      default:
        break;
    }
    return inputPlaceHolder;
  }

  private _renderBottomButton(title: string){
    return(<BottomButton title={title}  style={{ backgroundColor: themes.AppPrimaryColor, position:'absolute' }} onPress={this._handleContinueButton.bind(this)}></BottomButton>);
  }

  private async _handleContinueButton() {
    const {currentScreen} = this.state;
    const shouldContinue = this.childComponents[
      currentScreen
    ].canProceed();
    const canGoNext = shouldContinue && this.state.currentScreen < this.childComponents.length - 1;
    const nextIndex = this.state.currentScreen + 1;

    switch(currentScreen){
      case 0:
        if(!shouldContinue){
          Alert.alert(strings.NotEmailType);
          return;
        }
          await this._getForgotPasswordToken();
          if(this.state.currentScreenStatus===Status.ERROR){
            Alert.alert(strings.EmailNotFound);
            return;
          }
          break;
      case 1:
        await this._verifyForgotPasswordToken();
        if(this.state.currentScreenStatus===Status.ERROR){
          Alert.alert(strings.ResetPasswordVerificationError);
          return;
        }
        break;
      case 2:
        if(!shouldContinue){
          Alert.alert(strings.UnmatchedPasswords);
          return;
        }
        await this._resetPassword();
        if(this.state.currentScreenStatus===Status.ERROR){
          Alert.alert(strings.Error);
          return;
        }else{
          Alert.alert(strings.PasswordResetSuccess);
        }
        break;
      default:
        break;
    }
    
    if(canGoNext && this.state.currentScreenStatus === Status.SUCCESS)
      this.setState({currentScreen: nextIndex, currentScreenStatus: Status.ERROR}, () => { 
        this._childFlatList.scrollToIndex({
        index: nextIndex,
        animated: true,
      });});

      if(this.state.currentScreenStatus === Status.SUCCESS && this.state.currentScreen === 2){
        this.props.navigation.navigate(RouteNames.Auth.EmailLogin);
      }
    }

  private async _getForgotPasswordToken(){
    try{
      await this._accountService.getForgotPasswordToken(this.state.email);
      this.setState({currentScreenStatus: Status.SUCCESS});
    }catch(error){
      this.setState({currentScreenStatus: Status.ERROR});
    }
  }

  private async _verifyForgotPasswordToken(){
    try{
      await this._accountService.verifyForgotPasswordToken(this.state.passCode);
      this.setState({currentScreenStatus: Status.SUCCESS});
    }catch (error){
      this.setState({currentScreenStatus: Status.ERROR});
    }
  }

  private async _resetPassword(){
    try{
      await this._accountService.resetPassword(this.state.passWord, this.state.passCode);
      this.setState({currentScreenStatus: Status.SUCCESS});
    }catch(error){
      this.setState({currentScreenStatus: Status.ERROR});
    }
  }

}
