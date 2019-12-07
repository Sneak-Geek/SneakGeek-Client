//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { Shoe } from "../../../Shared/Model";
import { FlatList } from "react-native-gesture-handler";
import { View, Image, StyleSheet } from "react-native";
import { Text, TransactionShoeCard } from "../../../Shared/UI";
import { Icon } from "react-native-elements";
import { Styles, Icons } from "../../../Assets";

export interface ITransactionSellTabProps {
  shoes: Shoe[];
  navigateToSearch: () => void;
  onShoeClick: () => void;
}

export class TransactionSellTab extends React.Component<ITransactionSellTabProps> {
  static navigationOptions = {
    tabBarLabel: "Đang bán"
  };

  public /** override */ componentDidMount() { }

  public /** override */ render(): JSX.Element {
    return (
      <View style={{ flex: 1, alignItems: "stretch" }}>
        {this._renderSellTransactions()}
        {this._renderSellButton()}
      </View>
    );
  }

  private _renderSellTransactions(): JSX.Element {
    // if (this.props.shoes.length === 0) {
    //   return <Text.Callout>Hiện tại bạn chưa bán sản phẩm nào</Text.Callout>;
    // }

    return (
      <View>
        <TransactionShoeCard
          mode='sell'
          onPress={this.props.onShoeClick}
        />
        <TransactionShoeCard
          mode='sell'
        />
        <TransactionShoeCard
          mode='sell'
        />
      </View>
      // <FlatList
      //   style={{ flex: 1 }}
      //   data={this.props.shoes.slice(0, 10)}
      //   keyExtractor={(_itm, idx) => idx.toString()}
      //   renderItem={({ item }) => this._renderSellItem(item)}
      // />
    );
  }

  private _renderSellButton(): JSX.Element {
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

  // private _renderSellItem(shoe: Shoe): JSX.Element {
  //   return (
  //     <View>
  //       <View style={styles.transactionItemContainer}>
  //         <Image
  //           source={{ uri: shoe.imageUrl }}
  //           style={{ width: 90, height: 90 }}
  //           resizeMode={"contain"}
  //         />
  //         <View style={{ flex: 3, marginLeft: 25 }}>
  //           <Text.Callout>{shoe.title}</Text.Callout>
  //           <View style={styles.remainingTimeContainer}>
  //             <Image source={Icons.Clock} style={styles.clockIcon} />
  //             <Text.Footnote>18 giờ 18 phút</Text.Footnote>
  //           </View>
  //           <View style={styles.priceContainer}>
  //             <View>
  //               <Text.Subhead>Giá đăng</Text.Subhead>
  //               <Text.Callout style={{ color: Styles.TextPrimaryColor }}>
  //                 1,400,000đ
  //               </Text.Callout>
  //             </View>
  //             <View style={{ alignItems: "flex-end" }}>
  //               <Text.Subhead>Giá đề nghị</Text.Subhead>
  //               <Text.Callout style={{ color: Styles.AppPrimaryColor }}>
  //                 10,400,000đ
  //               </Text.Callout>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //       <View style={styles.listDivider} />
  //       {/* <TransactionShoeCard 
  //         mode='sell'
  //       /> */}
  //     </View>
  //   );
  // }
}

const styles = StyleSheet.create({
  transactionItemContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 25,
    alignItems: "center"
  },

  remainingTimeContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center"
  },

  clockIcon: { width: 18, aspectRatio: 1, tintColor: "black", marginRight: 5 },

  priceContainer: { flexDirection: "row", marginTop: 25, justifyContent: "space-between" },

  listDivider: {
    marginHorizontal: 25,
    height: 1,
    backgroundColor: "gainsboro"
  }
});
