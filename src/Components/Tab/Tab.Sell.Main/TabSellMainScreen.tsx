//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import * as React from "react";
import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { Shoe } from "../../../Reducers";
import { FlatList } from "react-native-gesture-handler";
import { ShoeProgressCircle } from "../../../common/ui";
import PurchaseComponent from "../PurchaseComponent";
import { Icon } from "react-native-elements";
import { NavigationScreenOptions } from "react-navigation";

export interface ISellTabMainProps {
  shoes: Shoe[];
  navigateToSearch: () => void;
}

export class TabSellMainScreen extends PurchaseComponent<ISellTabMainProps, {}> {
  static navigationOptions: NavigationScreenOptions = {
    header: null
  };

  render(): React.ReactNode {
    return (
      <SafeAreaView>
        <ScrollView>
          {this._renderBalance()}
          {this._renderCurrentSelling()}
          {this._renderInventory()}
          {this._renderHistory()}
        </ScrollView>
        {this._renderSellNewShoeButton()}
      </SafeAreaView>
    );
  }

  private _renderBalance(): React.ReactNode {
    return (
      <View style={{ paddingHorizontal: 20, marginVertical: 25 }}>
        <Text style={{ fontSize: 22 }}>Số dư tài khoản</Text>
        <Text style={{ fontSize: 32 }}>VND 31,200,200</Text>
      </View>
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
}
