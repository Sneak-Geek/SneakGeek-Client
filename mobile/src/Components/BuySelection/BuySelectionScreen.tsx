// !
// ! Copyright (c) 2019 - SneakGeek. All rights reserved
// !

import * as React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import { getLatestPrice, SellOrder, Shoe } from "../../Shared/Model";
import { Icon } from "react-native-elements";
import { NavigationRoute, NavigationScreenProp, ScreenProps, StackActions } from "react-navigation";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "../../Shared/UI";
import { Styles } from "../../Assets";
import { container, Types } from "../../Config/Inversify";
import { IAppSettings } from "../../Service/AppSettingsService";

export interface IBuySelectionScreenProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  availableSellOrders?: SellOrder[];

  // dispatch props
  navigateToPayment: (order?: SellOrder) => void;
}

export interface IBuySelectionScreenState {
  selectedSize: number;
}

export class BuySelectionScreen extends React.Component<IBuySelectionScreenProps, IBuySelectionScreenState> {
  public static navigationOptions = (navigationConfig: ScreenProps) => ({
    title: "Chọn cỡ và giá",
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

  private shoeId: string;
  private isOldCondition: boolean;

  public constructor(props: IBuySelectionScreenProps) {
    super(props);
    this.shoeId = this.props.availableSellOrders?.[0].shoeId || "";
    this.isOldCondition = this.props.navigation.getParam("isOldCondition");

    if (typeof this.shoeId === "undefined" || typeof this.isOldCondition === "undefined") {
      throw new Error("Invalid arguments to buy shoe");
    }

    this.state = {
      selectedSize: -1
    };
  }

  public /** override */ render(): JSX.Element {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this._renderShoeImage()}
          {this._renderDivider()}
          {this._renderAvailableSellOrders()}
          {this._renderConfirmButton()}
        </View>
      </SafeAreaView>
    );
  }

  private _renderShoeImage() {
    const shoe = this.props.availableSellOrders?.[0].shoe?.[0] as Shoe;
    return (
      <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 20 }}>
        <Image source={{ uri: shoe.imageUrl }} style={{ width: 200, aspectRatio: 1.5 }} />
        <Text.Body style={{ marginTop: 15 }}>{shoe.title}</Text.Body>
      </View>
    );
  }

  private _renderDivider() {
    return <View style={{ width: "100%", height: 2, backgroundColor: Styles.AppShadowColor }} />;
  }

  private _renderAvailableSellOrders() {
    const settings = container.get<IAppSettings>(Types.IAppSettingsService);
    const shoeSizes: string[] = settings.getSettings().RemoteSettings.shoeSizes.Adult || [];

    return (
      <FlatList
        style={{ alignSelf: "center", marginHorizontal: 5, marginTop: 15 }}
        numColumns={4}
        data={shoeSizes.map(t => parseFloat(t))}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => this._renderPricePerSize(item)}
      />
    );
  }

  private _renderPricePerSize(size: number) {
    const order = this.props.availableSellOrders?.find(t => t.shoeSize === size.toString());
    const price = order ? getLatestPrice(order) / (1000000 * 1.0) : -1;
    const backgroundColor = size === this.state.selectedSize ? Styles.AppModalBackground : "white";
    return (
      <TouchableOpacity onPress={() => this._onSelectSize(size, price)}>
        <View style={[styles.priceContainer, { backgroundColor }]}>
          <Text.Callout style={{ color: Styles.AppPrimaryColor, marginHorizontal: 10 }}>
            {price !== -1 ? `${price}M` : "-"}
          </Text.Callout>
          <Text.Footnote>Cỡ: {size}</Text.Footnote>
        </View>
      </TouchableOpacity>
    );
  }

  private _onSelectSize(size: number, price: number) {
    {
      if (price !== -1 && size !== this.state.selectedSize) {
        this.setState({ selectedSize: size });
      }

      if (size === this.state.selectedSize) {
        this.setState({ selectedSize: -1 });
      }
    }
  }

  private _renderConfirmButton() {
    const order = this.props.availableSellOrders?.find(t => t.shoeSize === this.state.selectedSize.toString());
    const backgroundColor = this.state.selectedSize !== -1 ? Styles.AppPrimaryColor : Styles.AppSecondaryColorBlurred;

    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          flex: 1,
          right: 0,
          height: 52,
          backgroundColor,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          style={{ alignSelf: "stretch", alignItems: "center", justifyContent: "center", flex: 1 }}
          disabled={this.state.selectedSize === -1}
          onPress={() => this.props.navigateToPayment(order)}
        >
          <Text.Body style={{ color: Styles.TextSecondaryColor, textAlign: "center" }}>Tiếp tục</Text.Body>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  priceContainer: {
    minWidth: 80,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: Styles.AppPrimaryColor,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: 5
  }
});
