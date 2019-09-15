//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
  TextStyle
} from "react-native";
import { Shoe } from "../../../Shared/Model";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "../../../Shared/UI";
import PurchaseComponent from "../PurchaseComponent";
import { Icon } from "react-native-elements";
import {
  NavigationScreenOptions,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import * as Assets from "../../../Assets";
import { Transaction } from "../../../Shared/Model";
import { NetworkRequestState } from "../../../Shared/State";
import ProgressCircle from "react-native-progress-circle";
import { StringUtils } from "../../../Utilities";
import humanizeDuration from "humanize-duration";

export interface ISellTabMainProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  shoes: Shoe[];
  sellHistory: {
    state: NetworkRequestState;
    sellHistory: Transaction[];
    shoes: Shoe[];
    error?: any;
  };

  navigateToSearch: () => void;
  getSellHistory: () => void;
}

interface ISellTabState {
  shouldRenderSuccessToast: boolean;
  currentTimeInMs: number;
}

export class TabSellMainScreen extends PurchaseComponent<ISellTabMainProps, ISellTabState> {
  static navigationOptions: NavigationScreenOptions = {
    header: null
  };

  private currentTimeInterval: NodeJS.Timeout;

  public constructor(props: ISellTabMainProps) {
    super(props);
    this.state = {
      shouldRenderSuccessToast: true,
      currentTimeInMs: new Date().getTime()
    };
    this.currentTimeInterval = setInterval(() => {
      this.setState({
        currentTimeInMs: new Date().getTime()
      });
    }, 10 * 1000);
  }

  public /** override */ componentDidMount() {
    this.props.getSellHistory();
  }

  public /** override */ componentWillUnmount() {
    if (this.currentTimeInterval) {
      clearInterval(this.currentTimeInterval);
    }

    this.props.navigation.setParams({ isSellSuccess: false });
  }

  public /** override */ render(): React.ReactNode {
    return (
      <SafeAreaView style={{ position: "relative" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this._renderCurrentSelling()}
          {this._renderInventory()}
          {this._renderHistory()}
        </ScrollView>
        {this._renderSellNewShoeButton()}
      </SafeAreaView>
    );
  }

  private _renderCurrentSelling(): JSX.Element {
    const { sellHistory } = this.props;
    let view: JSX.Element | null;
    const textStyle: TextStyle = { alignSelf: "center", marginTop: 5 };

    switch (sellHistory.state) {
      case NetworkRequestState.REQUESTING:
        view = <ActivityIndicator size={"small"} />;
        break;
      case NetworkRequestState.SUCCESS:
        if (sellHistory.sellHistory.length === 0) {
          view = (
            <Text.Subhead style={textStyle}>Hiện tại bạn chưa bán đôi giày nào</Text.Subhead>
          );
        } else {
          view = (
            <FlatList
              style={{ marginVertical: 20 }}
              keyExtractor={(_itm, idx) => idx.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={sellHistory.sellHistory}
              renderItem={({ item }) => this._renderCurrentlySellingShoeItem(item)}
            />
          );
        }
        break;
      case NetworkRequestState.FAILED:
        view = (
          <Text.Subhead style={textStyle}>Đã có lỗi xảy ra. Vui lòng thử lại</Text.Subhead>
        );
        break;
      default:
        view = null;
        break;
    }

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        {this.renderTitleWithSeeMore("Đang bán")}
        {view}
      </View>
    );
  }

  private _renderCurrentlySellingShoeItem(sellHistory: Transaction): JSX.Element | null {
    if (sellHistory.sellDeadline && sellHistory.createdAt) {
      const correspondingShoe: Shoe = this.props.sellHistory.shoes.filter(
        s => s._id === sellHistory.shoeId
      )[0];

      const current = new Date(this.state.currentTimeInMs);
      const start = new Date(sellHistory.createdAt);
      const expiration = new Date(sellHistory.sellDeadline);
      const percentage =
        (current.getTime() - start.getTime()) / (expiration.getTime() - current.getTime());

      return (
        <View style={{ alignItems: "center", justifyContent: "center", marginRight: 10 }}>
          <ProgressCircle
            percent={percentage * 100}
            radius={50}
            borderWidth={2}
            color={Assets.Styles.TextWarningColor}
            shadowColor={Assets.Styles.AppShadowColor}
            bgColor={"white"}
            outerCircleStyle={{ marginLeft: 12, marginBottom: 15 }}
          >
            <Image
              source={{ uri: correspondingShoe.imageUrl }}
              style={{ width: 80, aspectRatio: 1 }}
              resizeMode={"contain"}
            />
          </ProgressCircle>
          <Text.Subhead>
            {sellHistory.currentPrice
              ? StringUtils.toCurrencyString(sellHistory.currentPrice.toString())
              : ""}
          </Text.Subhead>
          <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
            <Image source={Assets.Icons.Clock} style={{ width: 16, aspectRatio: 1 }} />
            <Text.Subhead style={{ color: Assets.Styles.TextWarningColor, marginLeft: 3 }}>
              {humanizeDuration(expiration.getTime() - current.getTime(), {
                language: "vi",
                largest: 2
              })}
            </Text.Subhead>
          </View>
        </View>
      );
    }

    return null;
  }

  private _renderInventory(): React.ReactNode {
    const shoes = this.props.shoes.length > 0 ? this.props.shoes.slice(10, 14) : [];
    return this.renderShoesList("Tủ đồ", shoes, false);
  }

  private _renderHistory(): React.ReactNode {
    const shoes = this.props.shoes.length > 0 ? this.props.shoes.slice(20, 24) : [];
    return this.renderShoesList("Lịch sử bán", shoes, true);
  }

  private _renderSellNewShoeButton() {
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
}
