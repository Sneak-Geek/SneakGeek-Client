//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import { Shoe } from "../../Reducers";
import {
  StackActions,
  NavigationScreenProp,
  NavigationRoute,
  NavigationScreenProps
} from "react-navigation";
import { Icon } from "react-native-elements";
import styles from "./styles";
import { AppButton, ShoeCard, Text } from "../../Shared/UI";
import StarRating from "react-native-star-rating";
import { LineChart, YAxis, Grid } from "react-native-svg-charts";
import * as Assets from "../../Assets";
import { toCurrencyString } from "../../Utilities/StringUtil";

export interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
  shoes: Shoe[];
  routeIndex: number;
  navigateToShoeDetailWithReset: (index: number, shoe: Shoe) => void;
}

interface State {
  favorited: boolean;
  bottomBuyerHeight?: number;
  isBuyTabClicked?: boolean;
  priceListIndex: number;
}

export class ShoeDetailScreen extends React.Component<Props, State> {
  static navigationOptions = (transitionProp: NavigationScreenProps) => ({
    title: "Chi tiết sản phẩm",
    headerLeft: (
      <Icon
        type={"ionicon"}
        name={"ios-arrow-back"}
        size={28}
        containerStyle={{ marginLeft: 10 }}
        onPress={() => transitionProp.navigation.dispatch(StackActions.popToTop())}
      />
    ),
    headerRight: (
      <Icon
        type={"ionicon"}
        name={"ios-share"}
        size={28}
        containerStyle={{ marginRight: 10 }}
      />
    )
  });

  private shoe: Shoe;

  constructor(props: Props) {
    super(props);

    this.shoe = this.props.navigation.getParam("shoe");
    this.state = {
      favorited: false,
      priceListIndex: 0
    };
  }

  public /** override */ render(): JSX.Element {
    const bottomHeightStyle = this.state.bottomBuyerHeight
      ? { marginBottom: this.state.bottomBuyerHeight + 20 }
      : {};
    return (
      <SafeAreaView
        style={{
          flex: 1,
          position: "relative",
          backgroundColor: Assets.Styles.AppSecondaryColorBlurred
        }}
      >
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, ...bottomHeightStyle }}>
              {this._renderShoeImages()}
              {this._renderUserBehaviorButtons()}
              {this._renderShoeTitle()}
              {this._renderShoeDescription()}
              {this._renderPriceGraph()}
              {this._renderShoeDetail()}
              {this._renderShoeRatings()}
              {this._renderRelatedShoes()}
            </View>
          </ScrollView>
          {this._renderBuyerSection()}
        </View>
      </SafeAreaView>
    );
  }

  private _renderShoeImages(): JSX.Element {
    return (
      <View style={styles.shoeImageContainer}>
        <Image
          source={{ uri: this.shoe.imageUrl }}
          style={{ width: "100%", aspectRatio: 2 }}
          resizeMode={"contain"}
        />
      </View>
    );
  }

  private _renderUserBehaviorButtons(): JSX.Element {
    return (
      <View style={styles.userButtonContainer}>
        <Icon
          type={"ionicon"}
          name={this.state.favorited ? "ios-heart" : "ios-heart-empty"}
          size={28}
          onPress={() => this.setState(s => ({ ...s, favorited: !s.favorited }))}
        />
        <View style={{ flexDirection: "row" }}>
          <AppButton
            title={"Đã có"}
            containerStyle={[styles.buttonStyle, { marginRight: 10 }]}
          />
          <AppButton title={"Bán"} containerStyle={styles.buttonStyle} />
        </View>
      </View>
    );
  }

  private _renderShoeTitle(): JSX.Element {
    return (
      <Text.Title2 style={styles.shoeTitle} numberOfLines={2}>
        {this.shoe.title}
      </Text.Title2>
    );
  }

  private _renderShoeDescription(): JSX.Element | null {
    if (!this.shoe.description) {
      return null;
    }

    return <Text.Body style={{ marginHorizontal: 30 }}>{this.shoe.description}</Text.Body>;
  }

  private _renderPriceGraph(): JSX.Element | null {
    const data = [80, 81, 82, 80, 75, 85, 90, 95, 85, 92, 90, 98, 100];
    const contentInset = { top: 20, bottom: 20 };

    return (
      <View style={{ height: 200, flexDirection: "row", paddingHorizontal: 20 }}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{
            fill: "grey",
            fontSize: 10
          }}
          numberOfTicks={5}
        />
        <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={data}
          svg={{
            stroke: Assets.Styles.AppPrimaryColor,
            strokeWidth: 3,
            strokeLinecap: "round"
          }}
          contentInset={contentInset}
          numberOfTicks={5}
        >
          <Grid />
        </LineChart>
      </View>
    );
  }

  private _renderShoeDetail(): JSX.Element {
    const fieldMapping = new Map<string, string>([
      ["title", "Tên sản phẩm"],
      ["colorway", "Màu chủ đạo"],
      ["brand", "Hãng"],
      ["category", "Phân khúc"]
    ]);
    const views: JSX.Element[] = [];
    fieldMapping.forEach((value: string, key: string) =>
      views.push(
        <View style={styles.infoRow}>
          <Text.Caption style={{ color: "gray" }}>{value.toUpperCase()}</Text.Caption>
          <Text.Body style={{ maxWidth: "60%", textAlign: "right" }} numberOfLines={2}>
            {this.shoe[key]}
          </Text.Body>
        </View>
      )
    );
    return <View style={{ paddingHorizontal: 20 }}>{views}</View>;
  }

  private _renderShoeRatings(): JSX.Element {
    const starColor: string = Assets.Styles.AppPrimaryColor;
    return (
      <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 40 }}>
        <View style={styles.ratingContainer}>
          <Text.Heading style={styles.ratingTitle}>
            {"Đánh giá sản phẩm".toUpperCase()}
          </Text.Heading>
          <Text.Heading style={styles.ratingTitle}>3.5/5</Text.Heading>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={styles.reviewTitleContainer}>
            <Text.Caption style={{ textAlign: "center", fontWeight: "normal" }}>
              Hoàng Phạm
            </Text.Caption>
            <StarRating
              disabled={true}
              maxStars={5}
              starSize={17}
              rating={3.5}
              emptyStarColor={starColor}
              fullStarColor={starColor}
              starStyle={{ marginHorizontal: 2 }}
            />
          </View>
          <Text.Body numberOfLines={2} style={{ color: "darkgray" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </Text.Body>
        </View>
        <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 10 }}>
          <Text.Body style={{ color: Assets.Styles.AppPrimaryColor }}>Xem thêm</Text.Body>
        </TouchableOpacity>
      </View>
    );
  }

  private _renderRelatedShoes(): JSX.Element {
    const { shoes, routeIndex } = this.props;
    const shoesData = shoes.length === 0 ? [] : shoes.slice(0, 5);
    return (
      <View>
        <Text.Heading style={[styles.ratingTitle, { margin: 20 }]}>
          {"Sản phẩm liên quan".toUpperCase()}
        </Text.Heading>
        <FlatList
          horizontal={true}
          data={shoesData}
          keyExtractor={(shoe: Shoe, _idx: number) => shoe.title}
          renderItem={({ item }) => (
            <ShoeCard
              shoe={item}
              onPress={() => this.props.navigateToShoeDetailWithReset(routeIndex, item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  private _renderBuyerSection(): JSX.Element {
    const price = [{ condition: "mới", price: 1800000 }, { condition: "cũ", price: 1200000 }];
    return (
      <View
        style={!this.state.isBuyTabClicked ? styles.buyerContainer : styles.buyerContainerFull}
      >
        <TouchableOpacity
          style={styles.pullHandle}
          onPress={() => this.setState({ isBuyTabClicked: !this.state.isBuyTabClicked })}
        />
        <FlatList
          bounces={false}
          data={price}
          keyExtractor={(_itm, idx) => idx.toString()}
          horizontal={true}
          renderItem={({ item, index }) => this._renderBuyListItem(item, index)}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  private _renderBuyListItem(item: { condition: string; price: number }, index: number) {
    return (
      <View
        style={styles.priceListItem}
        onLayout={event =>
          this.setState({
            bottomBuyerHeight: event.nativeEvent.layout.height
          })
        }
      >
        <Text.Body style={{ color: "white" }}>Mua {item.condition}</Text.Body>
        <Text.Title2 style={{ color: Assets.Styles.AppPrimaryColor }}>
          {toCurrencyString(item.price.toString())}
        </Text.Title2>
        {this.state.isBuyTabClicked && index === this.state.priceListIndex && (
          <View style={styles.divider} />
        )}
        {this.state.isBuyTabClicked && this._renderAvailableSize()}
      </View>
    );
  }

  private _renderAvailableSize() {
    const sizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];
    return (
      <FlatList
        data={sizes}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Text.Body style={styles.shoeSize}>{item}</Text.Body>}
        keyExtractor={(_itm, idx) => idx.toString()}
      />
    );
  }
}
