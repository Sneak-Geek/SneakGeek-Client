//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { Image, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import * as Text from "./Text";
import { Shoe } from "../../Reducers";
import * as StringsUtil from "../../Utilities/StringUtil";

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
          source={{ uri: shoe.imageUrl, cache: "default" }}
          resizeMode={"center"}
          style={styles.smallShoeCard}
        />
        <Text.Subhead
          style={{ marginTop: 30, alignSelf: "flex-start" }}
          numberOfLines={2}
          textBreakStrategy={"highQuality"}
          ellipsizeMode={"tail"}
        >
          {shoe.title}
        </Text.Subhead>
        <Text.Body style={styles.priceTag}>{StringsUtil.toCurrencyString("3150000")}</Text.Body>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  smallShoeContainer: {
    flex: 1,
    flexDirection: "column",
    maxWidth: 150,
    marginLeft: 30,
    marginBottom: 8,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },

  smallShoeCard: {
    flex: 1,
    width: 140,
    height: 90
  },
  priceTag: {
    marginTop: 15
  }
});
