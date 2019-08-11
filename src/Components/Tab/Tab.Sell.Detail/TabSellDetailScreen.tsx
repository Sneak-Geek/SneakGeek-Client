//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import * as React from "react";
import { Shoe } from "../../../Reducers";
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import {
  NavigationScreenProp,
  NavigationRoute,
  StackActions,
  FlatList,
  BottomTabBarProps
} from "react-navigation";
import {
  ShoeConditionRequiredInfoComponent,
  ShoeConditionExtraInfoComponent,
  ShoeSetPriceComponent,
  ShoeSellOrderSummaryComponent
} from "./ChildComponents";
import { Icon } from "react-native-elements";
import styles from "./styles";

export interface ISellDetailScreenProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export type SellOrder = {
  shoeSize?: number;
  shoeCondition?: string;
  boxCondition?: string;
  isShoeTainted?: boolean;
  isOutSoleWorn?: boolean;
  isInsoleWorn?: boolean;
  isHeavilyTorn?: boolean;
  otherDetail?: string;
  price?: number;
  sellDuration?: { duration: number; unit: string };
};

interface State {
  sellOrderInfo: SellOrder;
  currentChildComponentIndex: number;
}

type SellDetailChildren = {
  render: () => JSX.Element;
  canProceed: () => boolean;
};

export class TabSellDetailScreen extends React.Component<ISellDetailScreenProps, State> {
  static navigationOptions = (navigationConfig: BottomTabBarProps) => ({
    title: "Đăng sản phẩm",
    headerLeft: (
      <Icon
        type={"ionicon"}
        name={"ios-arrow-back"}
        size={28}
        containerStyle={{ marginLeft: 10 }}
        onPress={() => navigationConfig.navigation.dispatch(StackActions.pop({ n: 1 }))}
      />
    )
  });

  private shoe: Shoe;
  private detailComponentList: FlatList<SellDetailChildren> | null = null;
  private childComponents: SellDetailChildren[] = [];

  public constructor /** override */(props: ISellDetailScreenProps) {
    super(props);
    this.shoe = this.props.navigation.getParam("shoeForSell");
    this.state = {
      sellOrderInfo: {},
      currentChildComponentIndex: 0
    };

    this.childComponents = [
      {
        render: () => (
          <ShoeConditionRequiredInfoComponent
            key={0}
            onSetShoeSize={this._setShoeSize.bind(this)}
            onSetShoeCondition={this._setShoeCondition.bind(this)}
            onSetBoxCondition={this._setBoxCondition.bind(this)}
          />
        ),
        canProceed: () => {
          const { sellOrderInfo } = this.state;
          return (
            sellOrderInfo.shoeSize !== undefined &&
            sellOrderInfo.shoeCondition !== undefined &&
            sellOrderInfo.boxCondition !== undefined
          );
        }
      },
      {
        render: () => (
          <ShoeConditionExtraInfoComponent
            key={1}
            onSetShoeHeavilyTorn={this._setShoeHeavilyTorn.bind(this)}
            onSetShoeInsoleWorn={this._setShoeInsoleWorn.bind(this)}
            onSetShoeOutsoleWorn={this._setShoeOutsoleWorn.bind(this)}
            onSetShoeTainted={this._setShoeTainted.bind(this)}
            onSetShoeOtherDetail={this._setShoeOtherDetail.bind(this)}
          />
        ),
        canProceed: () => {
          return true;
        }
      },
      {
        render: () => (
          <ShoeSetPriceComponent
            key={2}
            onSetShoePrice={this._setShoePrice.bind(this)}
            onSetSellDuration={this._setSellDuration.bind(this)}
          />
        ),
        canProceed: () => {
          const { sellOrderInfo } = this.state;
          return sellOrderInfo.price !== undefined && sellOrderInfo.sellDuration !== undefined;
        }
      },
      {
        render: () => (
          <ShoeSellOrderSummaryComponent key={3} orderSummary={this.state.sellOrderInfo} />
        ),
        canProceed: () => {
          return false;
        }
      }
    ];
  }

  public /** override */ render(): JSX.Element {
    console.log(this.state.sellOrderInfo);
    return (
      <View style={StyleSheet.absoluteFill}>
        {this._renderShoeDetail()}
        {this._renderSellerContent()}
        {this._renderNextButton()}
      </View>
    );
  }

  private _renderShoeDetail() {
    return (
      <View style={styles.shoeDetailContainer}>
        <Image
          source={{ uri: this.shoe.imageUrl, cache: "default" }}
          style={{ width: 120, aspectRatio: 2 }}
          resizeMode={"contain"}
        />
        <View style={styles.shoeDetailTextContainer}>
          <Text style={{ fontSize: 18 }}>{this.shoe.title}</Text>
          <Text style={{ fontSize: 13, marginTop: 3 }} numberOfLines={1} ellipsizeMode={"tail"}>
            Colorway: {this.shoe.colorway.join(", ")}
          </Text>
        </View>
      </View>
    );
  }
  private _renderSellerContent() {
    return (
      <FlatList
        ref={ref => (this.detailComponentList = ref)}
        bounces={false}
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        data={this.childComponents}
        renderItem={({ item }) => item.render()}
        alwaysBounceHorizontal={false}
        scrollEnabled={false}
      />
    );
  }

  private _setShoeSize(shoeSize: number) {
    this.setState(prevState => ({
      sellOrderInfo: {
        shoeSize,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setBoxCondition(boxCondition: string) {
    this.setState(prevState => ({
      sellOrderInfo: {
        boxCondition,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setShoeCondition(shoeCondition: string) {
    this.setState(prevState => ({
      sellOrderInfo: {
        shoeCondition,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setShoeHeavilyTorn(isHeavilyTorn: boolean) {
    this.setState(prevState => ({
      sellOrderInfo: {
        isHeavilyTorn,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setShoeInsoleWorn(isInsoleWorn: boolean) {
    this.setState(prevState => ({
      sellOrderInfo: {
        isInsoleWorn,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setShoeOutsoleWorn(isOutsoleWorn: boolean) {
    this.setState(prevState => ({
      sellOrderInfo: {
        isOutsoleWorn,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setShoeTainted(isShoeTainted: boolean) {
    this.setState(prevState => ({
      sellOrderInfo: {
        isShoeTainted,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setShoeOtherDetail(otherDetail: string) {
    this.setState(prevState => ({
      sellOrderInfo: {
        otherDetail,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setSellDuration(sellDuration: { duration: number; unit: string }) {
    this.setState(prevState => ({
      sellOrderInfo: {
        sellDuration,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setShoePrice(price: number) {
    this.setState(prevState => ({
      sellOrderInfo: {
        price,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _renderNextButton() {
    const { width } = Dimensions.get("window");
    const fullWidth = { width };
    const halftWidth = { width: width / 2 };

    return (
      <View style={styles.bottomButtonContainer}>
        {this.state.currentChildComponentIndex > 0 && (
          <TouchableOpacity
            style={[styles.backButtonStyle, halftWidth]}
            onPress={() => this._scrollToNext(false)}
          >
            <Text style={{ textAlign: "center", color: "black", fontSize: 18 }}>Quay lại</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.nextButtonStyle,
            this.state.currentChildComponentIndex === 0 ? fullWidth : halftWidth
          ]}
          onPress={() => this._scrollToNext(true)}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private _scrollToNext(isNext: boolean) {
    const currentChildComponent = this.childComponents[this.state.currentChildComponentIndex];
    if (isNext && !currentChildComponent.canProceed()) return;

    if (this.detailComponentList) {
      const nextIndex = isNext
        ? Math.min(this.state.currentChildComponentIndex + 1, this.childComponents.length - 1)
        : Math.max(this.state.currentChildComponentIndex - 1, 0);

      this.detailComponentList.scrollToIndex({
        index: nextIndex,
        animated: true
      });
      this.setState({
        currentChildComponentIndex: nextIndex
      });
    }
  }
}
