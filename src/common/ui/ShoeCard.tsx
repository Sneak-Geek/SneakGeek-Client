//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import * as React from "react";
import { Image, Text, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import { Shoe } from "../../Reducers";

interface IShoeCardProps {
  shoe: Shoe;
  style?: ViewStyle;
  onPress?: () => void;
}

export class ShoeCard extends React.Component<IShoeCardProps> {
  render() {
    const { shoe, style, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[styles.smallShoeContainer, style]}>
        <Image
          source={{ uri: shoe.media.imageUrl, cache: "default" }}
          resizeMode={"contain"}
          style={styles.smallShoeCard}
        />
        <Text
          style={styles.shoeSubTitle}
          numberOfLines={2}
          textBreakStrategy={"highQuality"}
          ellipsizeMode={"tail"}
        >
          {shoe.title}
        </Text>
        <Text style={styles.priceTag}>VND 3,150,000</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  smallShoeContainer: {
    flex: 1,
    maxWidth: 150,
    marginLeft: 20,
    marginBottom: 8,
    alignItems: "flex-start"
  },
  smallShoeCard: {
    flex: 1,
    width: 160,
    height: 80
  },
  shoeSubTitle: {
    fontSize: 12
  },
  priceTag: {
    marginTop: 15
  }
});
