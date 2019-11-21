//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Shoe } from "../../Shared/Model";
import { StringUtils } from "../../Utilities";
import * as Assets from "../../Assets";

interface Props {
  // shoe: Shoe;
  // renderPriceOnly?: boolean;
  name?: string;
  mode: 'buy' | 'sell' | 'history';
}

export class TransactionShoeCard extends React.Component<Props, {}> {
  render() {
    // const { shoe, renderPriceOnly } = this.props;
    const { mode } = this.props;
    return (
      <View>
        {mode === 'buy' && this.renderBuy()}
        {mode === 'sell' && this.renderSell()}
        {mode === 'history' && this.renderHistory()}
      </View>
    )
  }

  renderBuy() {
    const { name } = this.props;
    return (
      <TouchableOpacity style={styles.container} activeOpacity={0.7}>
        <Image style={styles.image} source={{ uri: 'https://www.flightclub.com/media/catalog/product/cache/1/image/1600x1140/9df78eab33525d08d6e5fb8d27136e95/2/0/201357_01.jpg' }} />
        <View style={{ flex: 1, paddingTop: 30, }}>
          <View style={styles.row}>
            <View>
              <Text style={styles.title}>Ngày đặt giá</Text>
              <Text style={styles.time}>12/02/2019</Text>
            </View>
            <View>
              <Text style={[styles.title, { textAlign: 'right' }]}>Giá mua</Text>
              <Text style={[styles.price, { textAlign: 'right', color: '#FF2D55' }]}>VND 1.800.000</Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <View>
              <Text style={[styles.title, { paddingBottom: 6 }]} numberOfLines={2} ellipsizeMode="tail">{name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={Assets.Icons.Clock} style={{ tintColor: 'black', width: 19, height: 19, resizeMode: 'contain', marginRight: 3 }} />
                <Text style={styles.time}>18 giờ 8 phút</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderSell() {
    const { name } = this.props;
    return (
      <TouchableOpacity style={styles.container} activeOpacity={0.7}>
        <Image style={styles.image} source={{ uri: 'https://www.flightclub.com/media/catalog/product/cache/1/image/1600x1140/9df78eab33525d08d6e5fb8d27136e95/2/0/201357_01.jpg' }} />
        <View style={{ flex: 1, paddingTop: 30, }}>
          <View style={styles.row}>
            <View>
              <Text style={styles.title}>Giá đăng</Text>
              <Text style={styles.time}>VND 1.200.000</Text>
            </View>
            <View>
              <Text style={[styles.title, { textAlign: 'right' }]}>Giá đề nghị</Text>
              <Text style={[styles.price, { textAlign: 'right', color: '#1ABC9C' }]}>VND 1.800.000</Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <View>
              <Text style={[styles.title, { paddingBottom: 6 }]} numberOfLines={2} ellipsizeMode="tail">{name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={Assets.Icons.Clock} style={{ tintColor: 'black', width: 19, height: 19, resizeMode: 'contain', marginRight: 3 }} />
                <Text style={styles.time}>18 giờ 8 phút</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

    )
  }

  renderHistory() {
    const { name } = this.props;
    return (
      <TouchableOpacity style={styles.containerHistory}>
        <Image style={styles.historyImage} source={{ uri: 'https://www.flightclub.com/media/catalog/product/cache/1/image/1600x1140/9df78eab33525d08d6e5fb8d27136e95/2/0/201357_01.jpg' }} />
        <View style={styles.contentHistoryContainer}>
          <View style={{ flex: 2, paddingRight: 11 }}>
            <Text style={[styles.time, { textAlign: 'left' }]} numberOfLines={2} ellipsizeMode="tail">{name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={[styles.time, { textAlign: 'right' }]}>3.111.000</Text>
              <Text style={styles.VND}>đ</Text>
            </View>
            <Text style={[styles.method, { textAlign: 'right' }]}>MUA</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderBottomWidth: 0.3,
    borderColor: '#BCBBC1',
    height: 150,
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginLeft: 4,
    marginRight: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 17,
  },
  title: {
    fontSize: 14,
    fontFamily: "RobotoCondensed-Regular",
    opacity: 0.4
  },
  time: {
    fontSize: 14,
    fontFamily: "RobotoCondensed-Regular",
  },
  price: {
    fontSize: 14,
    fontFamily: "RobotoCondensed-Regular",
  },
  method: {
    fontSize: 14,
    fontFamily: "RobotoCondensed-Bold",
    opacity: 0.3
  },
  containerHistory: {
    height: 93,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 20,
  },
  historyImage: {
    width: 90,
    height: 47,
    marginRight: 14,
    resizeMode: 'contain',
  },
  contentHistoryContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  VND: {
    fontSize: 7,
    fontFamily: "RobotoCondensed-Bold",
  }
});
