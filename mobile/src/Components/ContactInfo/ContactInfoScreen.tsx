import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import {
    StackActions,
    NavigationScreenProps,
} from "react-navigation";
import * as Assets from "../../Assets";
import { TextInput } from 'react-native-gesture-handler';

interface IContactInfoScreenProps {
    navigateToSendRequireSuccess: () => void;
}

export class ContactInfoScreen extends React.Component<IContactInfoScreenProps> {

    static navigationOptions = (transitionProp: NavigationScreenProps) => ({
        headerStyle: ({
            borderBottomWidth: 0,
        })
        ,
        title: "THÔNG TIN LIÊN HỆ",
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

    public render() {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    position: "relative",
                    backgroundColor: 'white'
                }}
            >
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.title}>Chúng tôi có thể giúp gì bạn</Text>
                        {this.renderSelect()}
                        {this.renderInput()}
                        {this.renderInfo()}
                    </ScrollView>
                    {this.renderButton()}
                </View>
            </SafeAreaView>
        )
    }

    private renderSelect() {
        return (
            <TouchableOpacity style={styles.selectContainer}>
                <Text style={styles.problem}>Vấn đề của tôi là</Text>
                <Image style={styles.icon} source={Assets.Icons.ArrowDropDown} />
            </TouchableOpacity>
        )
    }

    private renderInput() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Giới hạn 200 ký tự"
                    multiline
                />
            </View>
        )
    }

    private renderInfo() {
        return (
            <Text style={styles.info}>
                {`Công ty TNHH Sneal Geek Việt Nam\nSneak Geek Vietnam Company Ltd.\nEmail: help@sneakgeek.vn`}
            </Text>
        )
    }

    private renderButton() {
        return (
          <TouchableOpacity style={styles.buttonContainer} onPress={this.props.navigateToSendRequireSuccess}>
            <Text style={styles.titleButton}>Xác nhận</Text>
          </TouchableOpacity>
        )
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        paddingTop: 60,
        paddingBottom: 40,
        fontSize: 22,
        lineHeight: 26,
        fontFamily: 'RobotoCondensed-Bold',
        paddingHorizontal: 20,
    },
    selectContainer: {
        marginHorizontal: 20,
        height: 48,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    problem: {
        fontSize: 17,
        fontFamily: 'RobotoCondensed-Regular',
        fontStyle: 'italic'
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        right: 10,
        position: 'absolute',
    },
    inputContainer: {
        height: 132,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        marginTop: 24,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#C4C4C4',
        fontSize: 17,
        lineHeight: 24,
        fontFamily: 'RobotoCondensed-Regular',
    },
    info: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 13,
        lineHeight: 18,
        textAlign: 'center',
        paddingTop: 60
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