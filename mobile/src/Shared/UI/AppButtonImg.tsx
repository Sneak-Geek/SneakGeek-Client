//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { ViewStyle, View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from ".";
import { Constant } from "../Constants";
// import Constant from "../Constants";

interface Props {
  containerStyle?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  renderImg?: () => void;
  type? : string
}
export const APP_BTN= {
    BUTTON_TYPE: {
        BACK: {
            name: "back",
            icoName: "ios-arrow-back",
            typeVector: Constant.VECTOR_ICONS_TYPE.IONICON,
        },
        ADD: {
            name: "add",
            icoName: "md-add",
            typeVector: Constant.VECTOR_ICONS_TYPE.IONICON
        }
    }
}
export class AppButtonImg extends React.PureComponent<Props> {

    /**
     * Render image inside button
     */
    _renderChildren = (typeBtn = APP_BTN.BUTTON_TYPE.BACK.name) => {
        switch (typeBtn) {
            case APP_BTN.BUTTON_TYPE.BACK.name: {
                return (
                    this._renderBtnWithVectorIconName(APP_BTN.BUTTON_TYPE.BACK)
                )
            }
            case APP_BTN.BUTTON_TYPE.ADD.name: {
                return (
                    this._renderBtnWithVectorIconName(APP_BTN.BUTTON_TYPE.ADD)
                )
            }
            default: {
                return (
                    this._renderTitleBtn()
                )
            }
            
        }
    }

    /**
     * Render default back button
     */
    _renderBtnWithVectorIconName = (typeBtn = APP_BTN.BUTTON_TYPE.BACK) => {
        switch (typeBtn.typeVector) {
            case Constant.VECTOR_ICONS_TYPE.IONICON: {
                return (
                    <Ionicons name={typeBtn.icoName} size={25}/>
                )
            }
            case Constant.VECTOR_ICONS_TYPE.MATERIAL_COMMUNITY: {
                return (
                    <MaterialCommunity name={typeBtn.icoName} size={25}/>
                )
            }
            default: {
                return this._renderTitleBtn()
            }
        }
    }

    /**
     * Render default text for button
     */
    _renderTitleBtn = (text = "") => {
        return (
            <Text.Subhead>{text}</Text.Subhead>
        )
    }
    render() {
        return (
        <TouchableOpacity onPress={this.props.onPress}>
            <View style={[this.props.containerStyle, styles.buttonContainer]}>
                {this._renderChildren(this.props.type ? this.props.type : APP_BTN.BUTTON_TYPE.BACK.name)}
            </View>
        </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 36,
    marginLeft: 20,
  }
});
