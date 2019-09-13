//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Shoe } from "../../../Shared/Model";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { ShoeProgressCircle, Text } from "../../../Shared/UI";
import PurchaseComponent from "../PurchaseComponent";
import { Icon } from "react-native-elements";
import {
  NavigationScreenOptions,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import * as Assets from "../../../Assets";
import { SellOrder } from "../../../Shared/Model";
import { NetworkRequestState } from "../../../Shared/State";

export interface ISellTabMainProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  shoes: Shoe[];
  sellHistory: { state: NetworkRequestState; history: SellOrder[]; error?: any };

  navigateToSearch: () => void;
  getSellHistory: () => void;
  getShoesById: (ids: string[]) => void;
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

  public /** override */ componentDidMount() {
    this.props.getSellHistory();
  }

  public /** override */ componentWillUnmount() {
    this.props.navigation.setParams({ isSellSuccess: false });
  }

  public /** override */ render(): React.ReactNode {
    return (
      <SafeAreaView style={{ position: "relative" }}>
        {this.props.navigation.getParam("isSellSuccess") &&
          this.state.shouldRenderSuccessToast &&
          this._renderSellSuccessToast()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {this._renderCurrentSelling()}
          {this._renderInventory()}
          {this._renderHistory()}
        </ScrollView>
        {this._renderSellNewShoeButton()}
      </SafeAreaView>
    );
  }

  private _renderCurrentSelling(): JSX.Element {
    const { sellHistory } = this.props;
    const shoes = this.props.shoes.length > 0 ? this.props.shoes.slice(0, 5) : [];

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
        {this.renderTitleWithSeeMore("Đang bán")}
        {sellHistory.state === NetworkRequestState.REQUESTING && (
          <ActivityIndicator size={"small"} />
        )}
        {sellHistory.state === NetworkRequestState.SUCCESS && sellHistory.history === [] && (
          <Text.Subhead>Hiện tại bạn chưa bán đôi giày nào</Text.Subhead>
        )}
        {sellHistory.state === NetworkRequestState.FAILED && sellHistory.history.length > 0 && (
          <FlatList
            style={{ marginVertical: 20 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={shoes}
            renderItem={({ item, index }) => (
              <ShoeProgressCircle
                key={index}
                shoe={item}
                shoeData={{ isDropped: index % 3 === 0, percent: (5 - index) * 10 }}
              />
            )}
          />
        )}
        {sellHistory.state === NetworkRequestState.FAILED && (
          <Text.Subhead>Đã có lỗi xảy ra. Vui lòng thử lại</Text.Subhead>
        )}
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
        <Text.Footnote style={{ color: Assets.Styles.AppPrimaryColor }}>
          Đã đăng bán sản phẩm
        </Text.Footnote>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              shouldRenderSuccessToast: false
            })
          }
        >
          <Text.Footnote style={{ color: "white" }}>Đóng</Text.Footnote>
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
