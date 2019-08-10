//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import * as React from "react";
import { ScrollView, View, Dimensions, StyleSheet, Text } from "react-native";
import * as StringUtil from "../../../../Utilities/StringFormatterUtil";
import { SellOrder } from "../TabSellDetailScreen";

interface Props {
  orderSummary: SellOrder;
}

export class ShoeSellOrderSummaryComponent extends React.PureComponent<Props> {
  public /** override */ render(): JSX.Element {
    return (
      <ScrollView style={{ flex: 1, width: Dimensions.get("screen").width }}>
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {this._renderPriceSummary()}
          {this._renderDescription()}
          {this._renderSellDuration()}
          {this._renderPictures()}
        </View>
      </ScrollView>
    );
  }

  private _renderPriceSummary(): JSX.Element {
    const price = this.props.orderSummary.price ? this.props.orderSummary.price.toString() : "";

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Giá bán</Text>
        <Text style={styles.detail}>VND {StringUtil.toCurrencyString(price)}</Text>
      </View>
    );
  }

  private _renderDescription(): JSX.Element {
    const { orderSummary } = this.props;
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Miêu tả</Text>
        <Text style={styles.detail}>
          Cỡ {orderSummary.shoeSize}, {orderSummary.shoeCondition}, {orderSummary.boxCondition}
        </Text>
      </View>
    );
  }

  private _renderSellDuration(): JSX.Element | null {
    const { orderSummary } = this.props;
    const { sellDuration } = orderSummary;

    if (!sellDuration) {
      return null;
    }

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Thời gian đăng sản phẩm</Text>
        <Text style={styles.detail}>
          {sellDuration.duration} {sellDuration.unit}
        </Text>
      </View>
    );
  }

  private _renderPictures(): JSX.Element {
    return <></>;
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 16
  },

  title: {
    fontSize: 16
  },

  detail: {
    fontSize: 18,
    color: "#1ABC9C",
    marginTop: 10
  }
});
