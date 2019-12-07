import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import {
    StackActions,
    NavigationScreenProps,
} from "react-navigation";
import { Icon } from 'react-native-elements';
import * as Assets from "../../Assets";

interface ISignUpScreenState {
    email: string;
    password: string;
    active: boolean;
}

interface ISignUpScreenProps {
    navigateToFotgotPassword: () => void;
    emailSignup: (email: string, password: string) => void;

}

export class SignUpScreen extends React.Component<ISignUpScreenProps, ISignUpScreenState> {

    static navigationOptions = (transitionProp: NavigationScreenProps) => ({
        headerStyle: ({
            borderBottomWidth: 0,
        })
        ,
        headerLeft: (
            <Icon
                type={"ionicon"}
                name={"ios-arrow-back"}
                size={28}
                containerStyle={{ marginLeft: 10 }}
                onPress={() => transitionProp.navigation.dispatch(StackActions.popToTop())}
            />
        ),
    });

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            active: false,
        }
    }

    checkEmail = () => {
        let { email } = this.state
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailformat)) {
            this.signup();
        }
        else {
            Alert.alert("Email không hợp lệ!");
        }
    }

    signup = () => {
        let { email, password } = this.state;
        this.props.emailSignup(email, password);
    }

    validateButton = () => {
        let { email, password } = this.state;
        if (email.length > 0 && password.length > 0) {
            this.setState({ active: true })
        } else {
            this.setState({ active: false })
        }
    }

    public render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>
                            {`Xin chào, email của bạn chưa đăng ký, mời\nbạn điền mật khẩu để tạo tài khoản mới:`}
                        </Text>
                        <View style={{ paddingHorizontal: 42 }}>
                            {this.renderEmail()}
                            {this.renderPassword()}
                            {this.renderForgot()}
                        </View>
                    </View>
                    {this.renderButton()}
                </View>
            </SafeAreaView>
        )
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
                    placeholderColor="rgba(0, 0, 0, 0.4)"
                    onChangeText={(email) => this.setState({ email }, () => this.validateButton())}
                    selectionColor={Assets.Styles.AppPrimaryColor}
                />
            </View>
        )
    }

    private renderPassword() {
        let { password } = this.state;
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    value={password}
                    placeholderColor="rgba(0, 0, 0, 0.4)"
                    onChangeText={(password) => this.setState({ password }, () => this.validateButton())}
                    selectionColor={Assets.Styles.AppPrimaryColor}
                />
            </View>
        )
    }

    private renderForgot() {
        return (
            <TouchableOpacity style={styles.forgotContainer} onPress={this.props.navigateToFotgotPassword}>
                <Text style={styles.forgotTitle} >Quên mật khẩu?</Text>
            </TouchableOpacity>
        )
    }

    private renderButton() {
        let { active } = this.state;
        return (
                <TouchableOpacity
                    style={[styles.buttonContainer, { backgroundColor: active === true ? Assets.Styles.AppPrimaryColor : '#C7C7C7' }]}
                    onPress={this.checkEmail}
                >
                    <Text style={[styles.titleButton, { color: active === true ? 'white' : 'black' }]}>Đăng ký</Text>
                </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
    },
    title: {
        fontSize: 18,
        lineHeight: 25,
        fontFamily: 'RobotoCondensed-Regular',
        textAlign: 'left',
        paddingLeft: 42,
    },
    inputContainer: {
        height: 52,
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        marginTop: 30,
    },
    email: {
        fontSize: 12,
        fontFamily: 'RobotoCondensed-Regular',
        color: 'black',
        opacity: 0.4,
        paddingLeft: 3,
        paddingRight: 5,
    },
    absolute: {
        position: 'absolute',
        left: 12,
        top: -7,
        backgroundColor: 'white',
    },
    input: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 16,
        flex: 1
    },
    forgotTitle: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    forgotContainer: {
        marginTop: 27,
        width: 120
    },
    buttonContainer: {
        height: 56,
        paddingHorizontal: 57,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleButton: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 18,
    }
})