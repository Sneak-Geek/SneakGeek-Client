//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { View, Image, Text } from "react-native";
import { Shoe } from "../../Reducers";

interface Props {
  shoe: Shoe;
  renderPriceOnly?: boolean;
}

export class HorizontalShoeCard extends React.Component<Props, {}> {
  render() {
    const { shoe, renderPriceOnly } = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingHorizontal: 14,
          marginBottom: 20
        }}
      >
        <Image
          source={{ uri: shoe.imageUrl, cache: "default" }}
          style={{ width: 100, aspectRatio: 2, flex: 1.5 }}
          resizeMode={"center"}
        />
        <View style={{ flex: 2.75, paddingHorizontal: 10 }}>
          <Text
            numberOfLines={2}
            textBreakStrategy={"highQuality"}
            ellipsizeMode={"tail"}
            style={{ fontSize: 13 }}
          >
            {shoe.title}
          </Text>
        </View>

        {renderPriceOnly ? this._renderPrice() : this._renderPriceWithPercentage()}
      </View>
    );
  }

  private _renderPrice() {
    return (
      <Text style={{ flex: 1.5, textAlign: "right" }} numberOfLines={1}>
        VND 3,150K
      </Text>
    );
  }

  private _renderPriceWithPercentage() {
    const bg = this.props.shoe.title.length % 2 === 0 ? "#FF2D55" : "#1ABC9C";
    return (
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Text>3,150K</Text>
        <View
          style={{
            backgroundColor: bg,
            paddingVertical: 9,
            paddingHorizontal: 5,
            borderRadius: 3
          }}
        >
          <Text style={{ color: "white" }}>15.3%</Text>
        </View>
      </View>
    );
  }
}
