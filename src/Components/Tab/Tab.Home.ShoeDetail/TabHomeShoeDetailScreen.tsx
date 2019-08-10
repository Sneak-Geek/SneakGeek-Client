//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import * as React from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import { Shoe } from "../../../Reducers";
import {
  StackActions,
  NavigationScreenProp,
  NavigationRoute,
  NavigationScreenProps
} from "react-navigation";
import { Icon } from "react-native-elements";
import Styles from "./Styles";
import { AppButton, ShoeCard } from "../../../Common/ui";
import StarRating from "react-native-star-rating";
// import { LineChart } from "react-native-svg-charts";

export interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
  shoes: Shoe[];
  routeIndex: number;
  navigateToShoeDetailWithReset: (index: number, shoe: Shoe) => void;
}

interface State {
  favorited: boolean;
}

export class TabHomeShoeDetailScreen extends React.Component<Props, State> {
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
      favorited: false
    };
  }

  public /** override */ render(): JSX.Element {
    return (
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}>
          {this._renderShoeImages()}
          {this._renderUserBehaviorButtons()}
          {this._renderShoeTitle()}
          {this._renderShoeDescription()}
          {this._renderPriceGraph()}
          {this._renderShoeDetail()}
          {this._renderShoeRatings()}
          {this._renderRelatedShoes()}
        </SafeAreaView>
      </ScrollView>
    );
  }

  private _renderShoeImages(): JSX.Element {
    return (
      <View style={Styles.shoeImageContainer}>
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
      <View style={Styles.userButtonContainer}>
        <Icon
          type={"ionicon"}
          name={this.state.favorited ? "ios-heart" : "ios-heart-empty"}
          size={28}
          onPress={() => this.setState(s => ({ ...s, favorited: !s.favorited }))}
        />
        <View style={{ flexDirection: "row" }}>
          <AppButton
            title={"Đã có"}
            containerStyle={[Styles.buttonStyle, { marginRight: 10 }]}
          />
          <AppButton title={"Bán"} containerStyle={Styles.buttonStyle} />
        </View>
      </View>
    );
  }

  private _renderShoeTitle(): JSX.Element {
    return (
      <Text style={Styles.shoeTitle} numberOfLines={2}>
        {this.shoe.title}
      </Text>
    );
  }

  private _renderShoeDescription(): JSX.Element | null {
    if (!this.shoe.description) {
      return null;
    }

    return <Text style={{ marginHorizontal: 30 }}>{this.shoe.description}</Text>;
  }

  private _renderPriceGraph(): JSX.Element | null {
    return null;
    // const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
    // return (
    //   <LineChart
    //     style={{ height: 200 }}
    //     data={data}
    //     svg={{ stroke: "#1CFACE" }}
    //     contentInset={{ top: 20, bottom: 20 }}
    //   />
    // );
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
        <View style={Styles.infoRow}>
          <Text style={{ color: "gray" }}>{value}</Text>
          <Text style={{ maxWidth: "60%", textAlign: "right" }} numberOfLines={2}>
            {this.shoe[key]}
          </Text>
        </View>
      )
    );
    return <View style={{ paddingHorizontal: 20 }}>{views}</View>;
  }

  private _renderShoeRatings(): JSX.Element {
    const starColor: string = "#E2C115";
    return (
      <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 40 }}>
        <View style={Styles.ratingContainer}>
          <Text style={Styles.ratingTitle}>Đánh giá sản phẩm</Text>
          <Text style={Styles.ratingTitle}>3.5/5</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={Styles.reviewTitleContainer}>
            <Text style={{ textAlign: "center", fontSize: 16 }}>Hoàng Phạm</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              starSize={25}
              rating={3.5}
              emptyStarColor={starColor}
              fullStarColor={starColor}
              starStyle={{ marginHorizontal: 2 }}
            />
          </View>
          <Text numberOfLines={2} style={{ color: "darkgray" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </Text>
        </View>
        <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 10 }}>
          <Text>Xem thêm</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private _renderRelatedShoes(): JSX.Element {
    const { shoes, routeIndex } = this.props;
    const shoesData = shoes.length === 0 ? [] : shoes.slice(0, 5);
    return (
      <View>
        <Text style={[Styles.ratingTitle, { margin: 20 }]}>Sản phẩm liên quan</Text>
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
}
