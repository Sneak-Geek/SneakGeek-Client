import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
    NavigationScreenProps
} from "react-navigation";
import SmoothPicker from "react-native-smooth-picker";
import * as Assets from "../../Assets";

interface IUserKindScreenProps {

}

interface IUserKindScreenState {
    selectedGender: { id: number, title: string },
    selectedBrand: { id: number, title: string },
    selectedCountry: { id: number, title: string },
    selectedSize: { id: number, title: string },
}
export class UserKindScreen extends React.Component<IUserKindScreenProps, IUserKindScreenState> {
    static navigationOptions = (transitionProp: NavigationScreenProps) => ({
        header: null
    });

    constructor(props: any) {
        super(props);
        this.state = {
            selectedGender: { id: 0, title: '' },
            selectedBrand: { id: 0, title: '' },
            selectedCountry: { id: 0, title: '' },
            selectedSize: { id: 0, title: '' },
        }
    }

    gender = [
        'NAM', 'NỮ', 'TRẺ EM',
    ]

    brand = [
        'nike', 'adidas', 'puma', 'onisugatiger'
    ]

    country = ['US', 'UK', 'EU']

    
    size = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13', '14', '15', '16']
    handleChange = (index: number, item: string, title: string) => {
        let newObj = { id: index, title: item }
        switch (title) {
            case 'GIỚI TÍNH':
                this.setState({ selectedGender: newObj })
                break;
            case 'THƯƠNG HIỆU':
                this.setState({ selectedBrand: newObj })
                break;
            case 'TIÊU CHUẨN SIZE':
                this.setState({ selectedCountry: newObj })
                break;
            case 'CỠ GIÀY':
                this.setState({ selectedSize: newObj })
                break;
            default:
                break;
        }
    };

    public render() {
        let { selectedGender, selectedBrand, selectedCountry, selectedSize } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, paddingTop: 60 }}>
                    <ScrollView>
                        <Text style={styles.title}>Loại giày ưa thích của bạn:</Text>
                        {this._renderPicker(this.gender, 'GIỚI TÍNH', selectedGender)}
                        {this._renderPicker(this.brand, 'THƯƠNG HIỆU', selectedBrand)}
                        {this._renderPicker(this.country, 'TIÊU CHUẨN SIZE', selectedCountry)}
                        {this._renderPicker(this.size, 'CỠ GIÀY', selectedSize)}
                    </ScrollView>
                </View>
                {this._renderButton()}
            </SafeAreaView>
        )
    }

    private _renderPicker(data: any, title: string, selectedType: { id: number, title: string }) {
        return (
            <View style={{ paddingTop: 14 }}>
                <Text style={styles.subTitle}>{title}</Text>
                <View style={{ height: 80, backgroundColor: '#EEEEEE' }}>
                    <SmoothPicker
                        showsHorizontalScrollIndicator={false}
                        style={{ height: 50 }}
                        horizontal
                        magnet
                        offsetSelection={0}
                        scrollAnimation
                        data={data}
                        startMargin={Assets.Device.WIDTH / 2}
                        onSelected={({ item, index }) => this.handleChange(index, item, title)}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.containerItem}>
                                    <Text style={[styles.titleItem, { opacity: selectedType.id === index ? 1 : 0.3 }]}>{item}</Text>
                                </View>
                            )
                        }
                        }
                    />
                </View>
            </View>
        )
    }

    private _renderButton() {
        return (
                <TouchableOpacity
                    style={[styles.buttonContainer, { backgroundColor:'black' }]}
                >
                    <Text style={[styles.titleButton, { color: 'white' }]}>Xác nhận</Text>
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
        fontSize: 34,
        lineHeight: 41,
        fontFamily: 'RobotoCondensed-Bold',
        paddingLeft: 20,
        paddingBottom: 30,
    },
    subTitle: {
        fontFamily: 'RobotoCondensed-Bold',
        fontSize: 14,
        paddingBottom: 9,
        paddingLeft: 20,
        opacity: 0.6,
    },
    titleItem: {
        fontSize: 18,
        fontFamily: 'RobotoCondensed-Regular',
    },
    containerItem: {
        height: 80,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
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