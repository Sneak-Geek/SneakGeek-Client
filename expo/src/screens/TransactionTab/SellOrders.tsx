import React, { useState, useEffect } from 'react';
import {
  NetworkRequestState,
  SellOrder,
  PriceData,
  OrderStatus,
  getOrders,
  Shoe,
} from 'business';
import { connect, toCurrencyString } from 'utilities';
import { IAppState } from '@store/AppStore';
import { FlatList } from 'react-native-gesture-handler';
import Shimmer from 'react-native-shimmer-placeholder';
import {
  View,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { themes, strings } from '@resources';
import { AppText } from '@screens/Shared';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from 'navigations/RootStack';
import RouteNames from 'navigations/RouteNames';

const styles = StyleSheet.create({
  orderContainer: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: themes.DisabledColor,
  },
});

type Props = {
  sellOrdersState: {
    state: NetworkRequestState;
    orders: SellOrder[];
    error?: any;
  };

  // dispatch props
  getOrders: () => void;

  // navigation
  navigation: StackNavigationProp<RootStackParams, 'TransactionSellOrder'>;
};

@connect(
  (state: IAppState) => ({
    sellOrdersState: state.OrderState.sellOrdersState,
  }),
  (dispatch: Function) => ({
    getOrders: (): void => dispatch(getOrders('sell')),
  }),
)
export class SellOrders extends React.Component<Props> {
  public componentDidMount(): void {
    this.props.getOrders();
  }

  public render(): JSX.Element {
    const { orders, state } = this.props.sellOrdersState;
    if (state === NetworkRequestState.REQUESTING) {
      return <Shimmer autoRun={true} />;
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={orders}
          keyExtractor={(item): string => item._id}
          renderItem={({ item }): JSX.Element => this._renderOrder(item)}
        />
      </SafeAreaView>
    );
  }

  private _renderOrder(order: SellOrder): JSX.Element {
    const shoe = order.shoeId as Shoe;
    let status: string;
    let color: string;

    switch (order.status) {
      case OrderStatus.PENDING:
        status = strings.Pending;
        color = themes.AppPendingColor;
        break;
      case OrderStatus.APPROVED:
        status = strings.Selling;
        color = themes.AppDisabledColor;
        break;
      case OrderStatus.DENIED:
        status = strings.Denied;
        color = themes.AppErrorColor;
        break;
      default:
        status = strings.Sold;
        color = themes.AppPrimaryColor;
        break;
    }

    return (
      <TouchableWithoutFeedback onPress={this._onOrderPress.bind(this, order)}>
        <View style={styles.orderContainer}>
          <Image
            source={{ uri: shoe.imageUrl }}
            style={{ width: 100, aspectRatio: 1 }}
            resizeMode={'contain'}
          />
          <View style={{ flex: 1, flexDirection: 'column', marginLeft: 20 }}>
            <AppText.Subhead style={{ flexWrap: 'wrap', marginBottom: 10 }}>
              {shoe.title}
            </AppText.Subhead>
            <AppText.Subhead style={{ marginBottom: 5 }}>
              {strings.Price}:{' '}
              <AppText.Body>
                {toCurrencyString((order.sellNowPrice as PriceData).price)}
              </AppText.Body>
            </AppText.Subhead>
            <AppText.Subhead style={{ marginBottom: 5 }}>
              {strings.ShoeSize}: <AppText.Body>{order.shoeSize}</AppText.Body>
            </AppText.Subhead>
            <AppText.Subhead style={{ marginBottom: 5 }}>
              {strings.Condition}:{' '}
              <AppText.Body style={{ color }}>{status}</AppText.Body>
            </AppText.Subhead>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  private _onOrderPress(order: SellOrder): void {
    this.props.navigation.navigate(RouteNames.Tab.TransactionTab.Detail, {
      sellOrder: order,
    });
  }
}
