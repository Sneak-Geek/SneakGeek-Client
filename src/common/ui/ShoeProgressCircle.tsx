//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import * as React from "react";
import { Shoe } from "../../Reducers";
import { View, Image, Text } from "react-native";
import ProgressCircle from "react-native-progress-circle";

interface Props {
  shoe: Shoe;
  shoeData: {
    percent: number;
    isDropped: boolean;
  };
}

export class ShoeProgressCircle extends React.Component<Props, {}> {
  render(): React.ReactNode {
    const { shoe, shoeData } = this.props;
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ProgressCircle
          percent={shoeData.percent}
          radius={50}
          borderWidth={2}
          color={shoeData.isDropped ? "#1ABC9C" : "#FF2D55"}
          shadowColor={"#DADADA"}
          bgColor={"white"}
          outerCircleStyle={{ marginLeft: 12, marginBottom: 15 }}
        >
          <Image
            source={{ uri: shoe.media.imageUrl, cache: "default" }}
            style={{ width: 80, aspectRatio: 1 }}
            resizeMode={"contain"}
          />
        </ProgressCircle>
        <Text style={{ fontSize: 12 }}>VND 3,150,000</Text>
      </View>
    );
  }
}
