//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import * as React from "react";
import { Shoe } from "../../../Reducers";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  NavigationScreenProp,
  NavigationRoute,
  StackActions,
  FlatList,
  BottomTabBarProps
} from "react-navigation";
import {
  ShoeConditionRequiredInfoComponent,
  ShoeConditionExtraInfoComponent,
  ShoeSetPriceComponent
} from "./ChildComponents";
import { Icon } from "react-native-elements";
import styles from "./styles";

export interface ISellDetailScreenProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export class TabSellDetailScreen extends React.Component<ISellDetailScreenProps, {}> {
  static navigationOptions = (navigationConfig: BottomTabBarProps) => ({
    title: "Đăng sản phẩm",
    headerLeft: (
      <Icon
        type={"ionicon"}
        name={"ios-arrow-back"}
        size={28}
        containerStyle={{ marginLeft: 10 }}
        onPress={() => navigationConfig.navigation.dispatch(StackActions.pop({ n: 1 }))}
      />
    )
  });

  private shoe: Shoe;

  public constructor /** override */(props: ISellDetailScreenProps) {
    super(props);
    this.shoe = this.props.navigation.getParam("shoeForSell");
  }

  public /** override */ render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        {this._renderShoeDetail()}
        {this._renderSellerContent()}
        {this._renderNextButton()}
      </View>
    );
  }

  private _renderShoeDetail() {
    return (
      <View style={styles.shoeDetailContainer}>
        <Image
          source={{ uri: this.shoe.media.imageUrl, cache: "default" }}
          style={{ width: 120, aspectRatio: 2 }}
          resizeMode={"contain"}
        />

        <View style={styles.shoeDetailTextContainer}>
          <Text style={{ fontSize: 18 }}>{this.shoe.title}</Text>
          <Text style={{ fontSize: 13, marginTop: 3 }} numberOfLines={1} ellipsizeMode={"tail"}>
            Colorway: {this.shoe.colorway}
          </Text>
        </View>
      </View>
    );
  }

  private _renderSellerContent() {
    const contents = [
      <ShoeConditionRequiredInfoComponent key={0} />,
      <ShoeConditionExtraInfoComponent key={1} />,
      <ShoeSetPriceComponent key={2} />
    ];

    return (
      <FlatList
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        data={contents}
        renderItem={({ item }) => item}
        alwaysBounceHorizontal={false}
      />
    );
  }

  private _renderNextButton() {
    return (
      <TouchableOpacity style={styles.nextButtonStyle}>
        <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>Tiếp tục</Text>
      </TouchableOpacity>
    );
  }
}
