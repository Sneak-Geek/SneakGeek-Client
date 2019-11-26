import * as React from 'react';
import { View, StyleSheet, Text, TextInput, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import {
  StackActions,
  NavigationScreenProps,
} from "react-navigation";
import { Icon } from 'react-native-elements';
import * as Assets from "../../Assets";


interface IChangePasswordScreenState {
  showPass: boolean
}
export class ChangePasswordScreen extends React.Component<IChangePasswordScreenState> {

  static navigationOptions = (transitionProp: NavigationScreenProps) => ({
    headerStyle: ({
      borderBottomWidth: 0,
    })
    ,
    title: "ĐỔI MẬT KHẨU",
    headerLeft: (
      <Icon
        type={"ionicon"}
        name={"ios-arrow-back"}
        size={28}
        containerStyle={{ marginLeft: 10 }}
        onPress={() => transitionProp.navigation.dispatch(StackActions.popToTop())}
      />
    ),
    headerRight: (
      <Icon
        type={"ionicon"}
        name={"ios-share"}
        size={28}
        containerStyle={{ marginRight: 10 }}
      />
    )
  });

  state = {
    showPass: false,
  }

  public render() {
    let { showPass } = this.state;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          position: "relative",
          backgroundColor: 'white'
        }}
      >
        <View style={styles.container}>
          <View>
            <View style={styles.titleContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Mật khẩu hiện tại</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} onPress={() => this.setState({ showPass: !this.state.showPass })}>
                <Image source={Assets.Icons.Eye} style={styles.logo} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              selectionColor={Assets.Styles.AppPrimaryColor}
              placeholder="Điền mật khẩu hiện tại"
              secureTextEntry={!showPass}
            />
          </View>
          <View style={{ paddingTop: 40 }}>
            <View style={styles.titleContainer}>
              <Text style={styles.label}>Mật khẩu mới</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              selectionColor={Assets.Styles.AppPrimaryColor}
              placeholder="Điền mật khẩu mới"
            />
            <View style={{ paddingTop: 20 }}>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                selectionColor={Assets.Styles.AppPrimaryColor}
                placeholder="Xác nhận mật khẩu mới"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.titleButton}>Xác nhận</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  logo: {
    width: 24,
    height: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'RobotoCondensed-Regular',
    lineHeight: 19,
    opacity: 0.6,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#C4C4C4',
    padding: 0,
    color: '#999999',
    fontSize: 18,
    fontFamily: 'RobotoCondensed-Regular',
  },
  buttonContainer: {
    backgroundColor: 'black',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleButton: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular',
    color: 'white',
  }
})