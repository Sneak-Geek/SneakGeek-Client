//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Button } from "react-native";
import { Shoe } from "../../../Reducers";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { ShoeProgressCircle } from "../../../Common/ui";
import PurchaseComponent from "../PurchaseComponent";
import { Icon } from "react-native-elements";
import {
  NavigationScreenOptions,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import * as Text from "../../../Common/ui/Text";

export interface ISellTabMainProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  shoes: Shoe[];
  navigateToSearch: () => void;
}

interface ISellTabState {
  shouldRenderSuccessToast: boolean;
}

export class TabSellMainScreen extends PurchaseComponent<ISellTabMainProps, ISellTabState> {
  static navigationOptions: NavigationScreenOptions = {
    header: null
  };

  public constructor(props: ISellTabMainProps) {
    super(props);
    this.state = {
      shouldRenderSuccessToast: true
    };
  }

  public /** override */ componentWillUnmount() {
    this.props.navigation.setParams({ isSellSuccess: null });
  }

  public /** override */ render(): React.ReactNode {
    return (
      <SafeAreaView style={{ position: "relative" }}>
        {this.props.navigation.getParam("isSellSuccess") &&
          this.state.shouldRenderSuccessToast &&
          this._renderSellSuccessToast()}
        <ScrollView>
          {this._renderCurrentSelling()}
          {this._renderInventory()}
          {this._renderHistory()}
        </ScrollView>
        {this._renderSellNewShoeButton()}
      </SafeAreaView>
    );
  }

  private _renderCurrentSelling(): React.ReactNode {
    const shoes = this.props.shoes.length > 0 ? this.props.shoes.slice(0, 5) : [];
    return (
      <View>
        {this.renderTitleWithSeeMore("Đang bán")}
        <FlatList
          style={{ marginVertical: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={shoes}
          renderItem={({ item, index }) => (
            <ShoeProgressCircle
              shoe={item}
              shoeData={{ isDropped: index % 3 === 0, percent: (5 - index) * 10 }}
            />
          )}
        />
      </View>
    );
  }

  private _renderInventory(): React.ReactNode {
    const shoes = this.props.shoes.length > 0 ? this.props.shoes.slice(10, 14) : [];
    return this.renderShoesList("Tủ đồ", shoes, false);
  }

  private _renderHistory(): React.ReactNode {
    const shoes = this.props.shoes.length > 0 ? this.props.shoes.slice(20, 24) : [];
    return this.renderShoesList("Lịch sử bán", shoes, true);
  }

  private _renderSellNewShoeButton() {
    return (
      <Icon
        reverse={true}
        type={"ionicon"}
        name={"md-add"}
        containerStyle={{ position: "absolute", bottom: 20, right: 20 }}
        onPress={() => this.props.navigateToSearch()}
      />
    );
  }

  private _renderSellSuccessToast() {
    return (
      <View style={styles.toastContainer}>
        <Text.Caption style={{ color: "#1ABC9C" }}>Đã đăng bán sản phẩm</Text.Caption>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              shouldRenderSuccessToast: false
            })
          }
        >
          <Text.Caption style={{ color: "white" }}>Đóng</Text.Caption>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    backgroundColor: "#000000",
    width: "100%",
    height: 32,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20
  }
});
