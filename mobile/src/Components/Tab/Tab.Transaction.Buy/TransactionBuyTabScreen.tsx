//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { SafeAreaView, StyleSheet, Text, ScrollView, View } from "react-native";
import { Shoe } from "../../../Shared/Model";
import { TransactionShoeCard } from "../../../Shared/UI";

export interface ITransactionBuyTabScreenProps {
  shoes: Shoe[];
  // fetchShoes: () => void;
  // navigateToShoeDetail: (shoe: Shoe) => void;
}

export class TransactionBuyTabScreen extends React.Component<ITransactionBuyTabScreenProps> {
  static navigationOptions = {
    tabBarLabel: "Đang mua"
  };

  public /** override */ render(): JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Sản phẩm đang mua</Text>
          <View style={styles.line} />
          <TransactionShoeCard
            mode="buy"
            name="Adidas Pharell NMD Human"
          />
          <TransactionShoeCard
            mode="sell"
            name="Adidas Pharell NMD Human Adidas Pharell NMD Human Adidas Pharell NMD Human Adidas Pharell NMD Human"
          />
          <TransactionShoeCard
            mode="history"
            name="Adidas Pharell NMD Human Adidas Pharell NMD Human Adidas Pharell NMD Human Adidas Pharell NMD Human"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontFamily: 'RobotoCondensed-Regular',
    paddingTop: 30,
    paddingBottom: 24,
    paddingLeft: 14,
  },
  line: {
    height: 0.3,
    backgroundColor: '#BCBBC1',
    marginHorizontal: 20,
  }
})