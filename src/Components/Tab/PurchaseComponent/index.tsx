//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Shoe } from "../../../Reducers";
import { HorizontalShoeCard } from "../../Shared";

export default class PurchaseComponents<P = {}, S = {}> extends React.Component<P, S> {
  public /** abstract */ render(): React.ReactNode {
    return null;
  }

  public renderShoesList(title: string, shoes: Shoe[], renderPriceOnly: boolean) {
    return (
      <View>
        {this.renderTitleWithSeeMore(title)}
        <FlatList
          data={shoes}
          keyExtractor={shoe => shoe.title}
          style={{ marginVertical: 20 }}
          renderItem={({ item }) => (
            <HorizontalShoeCard shoe={item} renderPriceOnly={renderPriceOnly} />
          )}
        />
      </View>
    );
  }

  public renderTitleWithSeeMore(title: string): React.ReactNode {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.seeMore}>Xem thêm</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 14
  },

  title: {
    fontSize: 22
  },

  seeMore: {
    fontSize: 14,
    color: "#979797"
  }
});
