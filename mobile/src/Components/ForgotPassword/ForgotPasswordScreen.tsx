import * as React from 'react'
import { View, StyleSheet, Text, Image, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import {
    StackActions,
    NavigationScreenProps,
} from "react-navigation";
import * as Assets from "../../Assets";

interface IForgotPasswordScreenState {
    type: string;
    email: string;
    code: string;
    passwordConfirm: string;
    password: string;
}

interface IForgotPasswordScreenProps {
    requestTokenConfirm: (email: string) => Promise<{ message: string }>;
    verifyToken: (email: string, token: string) => Promise<{ message: string }>;
    setNewPassword: (email: string, token: string, newPassword: string) => Promise<{ message: string }>;
    navigateToHome: () => void;
}

export class ForgotPasswordScreen extends React.Component<IForgotPasswordScreenProps, IForgotPasswordScreenState> {

    static navigationOptions = (transitionProp: NavigationScreenProps) => ({
        headerStyle: ({
            borderBottomWidth: 0,
        })
        ,
        headerTitleStyle: { fontSize: 22, fontFamily: 'RobotoCondensed-Bold', },
        title: "Quên mật khẩu",
        headerLeft: (
            <Icon
                type={"ionicon"}
                name={"ios-arrow-back"}
                size={28}
                containerStyle={{ marginLeft: 10 }}
                onPress={() => transitionProp.navigation.dispatch(StackActions.pop({ n: 1 }))}
            />
        ),
    });

    constructor(props: any) {
        super(props)
        this.state = {
            email: '',
            code: '',
            passwordConfirm: '',
            password: '',
            type: 'inputEmail',
        }
    }

    onBack = (transitionProp: NavigationScreenProps) => {
        let { type } = this.state;
        if (type === "inputEmail") {
            transitionProp.navigation.dispatch(StackActions.pop({ n: 1 }))
        }
        if (type === "inputCode") {
            this.setState({ type: 'inputEmail' });
        }
    }

    onPress = async () => {
        let { type, email, code, password, passwordConfirm } = this.state;
        if (type === "inputEmail") {
            let res: { message: string } = await this.props.requestTokenConfirm(email);
            console.log("TCL: ForgotPasswordScreen -> onPress -> res", res)
            if (res) {
                this.setState({ type: 'inputCode' });
            } else { Alert.alert('Thông báo','Email không chính xác')}
        }
        if (type === "inputCode") {
            let res = await this.props.verifyToken(email, code);
            if (res) {
                this.setState({ type: 'inputPassword' });
            } else { Alert.alert('Thông báo', 'Mã code không chính xác')}
        }
        if (type === "inputPassword") {
            if (password.length < 1) {
                Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu');
                return;
            }
            if (password !== passwordConfirm) {
                Alert.alert('Thông báo', 'Mật khẩu không trùng nhau');
                return;
            }
            let res = await this.props.setNewPassword(email, code, password);
            if (res) {
                this.props.navigateToHome();
            } else {Alert.alert('Thông báo', 'Quá trình xử lý đã xảy ra lỗi!\nVui lòng thử lại.')}
        }
    }

    public render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <ScrollView>

                        {this.renderContent()}
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7} onPress={this.onPress}>
                    <Text style={styles.titleButton}>TIẾP TỤC</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    private renderContent() {
        let { type } = this.state;
        switch (type) {
            case 'inputEmail':
                return this.renderInputEmail();
            case 'inputCode':
                return this.renderInputCode();
            case 'inputPassword':
                return this.renderInputPassword();
        }
        return null;
    }


    private renderInputEmail() {
        let { email } = this.state;
        return (
            <View>
                <Text style={styles.title}>{`Để khôi phục lại mật khẩu, bạn cần điền địa chỉ email của tài khoản đăng nhập:`}</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.absolute}>
                        <Text style={styles.email}>Email</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Email của bạn"
                        value={email}
                        placeholderColor="rgba(0, 0, 0, 0.4)"
                        onChangeText={(email) => this.setState({ email })}
                        selectionColor={Assets.Styles.AppPrimaryColor}
                        autoCapitalize="none"
                    />
                </View>
                <Image source={Assets.Icons.Thumb1}
                    style={{
                        marginTop: 100,
                        width: 261,
                        height: 261,
                        resizeMode: 'contain', marginLeft: 26
                    }}
                />
            </View>
        )
    }

    private renderInputCode() {
        let { code } = this.state;
        return (
            <View>
                <Text style={styles.title}>{`Email chứa mã code để đặt lại mật khẩu đã được gửi đến hòm thư của bạn.`}</Text>
                <Text style={[styles.title, { paddingTop: 20 }]}>{`Nhập mã code trong email của bạn vào đây:`}</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.absolute}>
                        <Text style={styles.email}>Mã code</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Mã code"
                        value={code}
                        placeholderColor="rgba(0, 0, 0, 0.4)"
                        onChangeText={(code) => this.setState({ code })}
                        selectionColor={Assets.Styles.AppPrimaryColor}
                        autoCapitalize="none"
                    />
                </View>
                <Image source={Assets.Icons.Thumb2}
                    style={{
                        marginTop: 54,
                        width: 261,
                        height: 261,
                        resizeMode: 'contain', marginLeft: 26
                    }}
                />
            </View>
        )
    }

    private renderInputPassword() {
        let { password, passwordConfirm } = this.state;
        return (
            <View>
                <Text style={styles.title}>{`Điền mật khẩu mới cho tài khoản của bạn`}</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.absolute}>
                        <Text style={styles.email}>Mật khẩu</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu của bạn"
                        value={password}
                        placeholderColor="rgba(0, 0, 0, 0.4)"
                        onChangeText={(password) => this.setState({ password })}
                        selectionColor={Assets.Styles.AppPrimaryColor}
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Điền lại mật khẩu"
                        value={passwordConfirm}
                        placeholderColor="rgba(0, 0, 0, 0.4)"
                        onChangeText={(passwordConfirm) => this.setState({ passwordConfirm })}
                        selectionColor={Assets.Styles.AppPrimaryColor}
                        autoCapitalize="none"
                    />
                </View>
                <Image source={Assets.Icons.Thumb3}
                    style={{
                        marginTop: 48,
                        width: 261,
                        height: 261,
                        resizeMode: 'contain',
                        marginLeft: 20,
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 48,
        paddingHorizontal: 42,
    },
    title: {
        fontSize: 18,
        fontFamily: 'RobotoCondensed-Regular',
        lineHeight: 25
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
    buttonContainer: {
        backgroundColor: 'black',
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleButton: {
        fontSize: 17,
        fontFamily: 'RobotoCondensed-Regular',
        color: 'white',
    }
})