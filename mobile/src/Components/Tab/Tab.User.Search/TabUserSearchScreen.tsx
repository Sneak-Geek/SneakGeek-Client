import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import {
    NavigationScreenProps
} from "react-navigation";
import { Input, Icon } from "react-native-elements";

export class TabUserSearchScreen extends React.Component {

    static navigationOptions = (transitionProp: NavigationScreenProps) => ({
        header: null
    });

    listHelp = [
        'Tổng quan',
        'Đặt mua, vận chuyển, trả',
        'Bán hàng',
    ]
    public render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.container}>
                    {this.renderSearchBar()}
                    {this.renderListHelp()}
                </View>
            </SafeAreaView>
        )
    }

    private renderSearchBar() {
        return (
            <View style={styles.containerSearch}>
                <Icon
                    type={"ionicon"}
                    name={"ios-arrow-back"}
                    size={28}
                    containerStyle={{ marginLeft: 10 }}
                />
                <Input
                    // ref={refInput => (this._searchInputComponent = refInput)}
                    onFocus={_event => this.setState({ searchFocus: true })}
                    placeholder={"Bạn muốn giúp gì"}
                    leftIcon={<Icon type={"ionicon"} name={"md-search"} size={25} color='rgba(0, 0, 0, 0.54)' />}
                    leftIconContainerStyle={{ marginRight: 20 }}
                    // rightIcon={
                    //     this.state.searchFocus && (
                    //         <Icon
                    //             type={"ionicon"}
                    //             name={"md-close"}
                    //             size={25}
                    //             onPress={this._toggleSearchFocus.bind(this)}
                    //         />
                    //     )
                    // }
                    inputStyle={{ fontSize: 17, fontFamily: 'RobotoCondensed-Regular' }}
                // onChangeText={this._search.bind(this)}
                // onSubmitEditing={this._onEndEditing.bind(this)}
                />
            </View>
        )
    }

    private renderListHelp() {
        return (
            this.listHelp.map((item, index) => {
                return (
                    <TouchableOpacity key={index} style={styles.item}>
                        <Text style={styles.titleItem}>{item}</Text>
                    </TouchableOpacity >
                )
            })
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'

    },
    containerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    titleItem: {
        fontSize: 34,
        fontFamily: 'RobotoCondensed-Bold',
        opacity: 0.3
    }
})