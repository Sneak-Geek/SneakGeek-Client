import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { ShoeHeaderSummary, TitleContentDescription } from '@screens/Shared';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from 'navigations/RootStack';
import {
  SellOrder,
  Shoe,
  Transaction,
  PriceData,
  IOrderService,
  FactoryKeys,
  PaymentStatus,
  OrderStatus,
  BuyOrder,
  OrderType,
} from 'business';
import { strings, themes } from '@resources';
import { ScrollView } from 'react-native-gesture-handler';
import { toCurrencyString, getService, getToken, connect } from 'utilities';
import { toggleIndicator } from 'actions';
import Timeline from 'react-native-timeline-flatlist';

type Props = {
  route: RouteProp<RootStackParams, 'TransactionDetail'>;
  toggleLoading: (isLoading: boolean) => void;
};

type State = {
  transaction?: Transaction;
};

@connect(
  () => ({}),
  (dispatch: Function) => ({
    toggleLoading: (isLoading: boolean): void =>
      dispatch(toggleIndicator({ isLoading, message: strings.PleaseWait })),
  }),
)
export class TransactionDetail extends React.Component<Props, State> {
  private order: SellOrder | BuyOrder;
  private orderType: OrderType;

  public constructor(props: Props) {
    super(props);
    this.order = this.props.route.params.order;
    this.orderType = this.props.route.params.orderType;
    this.state = {
      transaction: null,
    };
  }

  public componentDidMount(): void {
    this._getTransaction();
  }

  public render(): JSX.Element {
    if (!this.state.transaction && this._shouldGetTransaction()) {
      return null;
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ShoeHeaderSummary shoe={this._getShoe()} />
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: 'white',
              padding: 20,
              paddingBottom: 40,
            }}
          >
            <TitleContentDescription
              emphasizeTitle={true}
              title={strings.Price}
              content={toCurrencyString(this._getShoePrice().price)}
            />
            <TitleContentDescription
              emphasizeTitle={true}
              title={strings.ShoeSize}
              content={this.order.shoeSize}
            />
            {this.orderType === 'SellOrder' && (
              <TitleContentDescription
                emphasizeTitle={true}
                title={strings.Description}
                content={this._getProductDescription()}
              />
            )}
            {this._shouldGetTransaction() && (
              <TitleContentDescription
                emphasizeTitle={true}
                title={strings.Status}
                content={this._getTransactionStatus()}
                renderCollapsibleIndicator={true}
                renderCollapsibleContent={this._renderTimeline.bind(this)}
              />
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  private _getShoe(): Shoe {
    return this.orderType === 'BuyOrder'
      ? ((this.order as BuyOrder).shoe as Shoe)
      : ((this.order as SellOrder).shoeId as Shoe);
  }

  private _getShoePrice(): PriceData {
    return this.orderType === 'BuyOrder'
      ? ((this.order as BuyOrder).buyPrice as PriceData)
      : ((this.order as SellOrder).sellNowPrice as PriceData);
  }

  private _getProductDescription(): string {
    if (this.orderType === 'BuyOrder') {
      return null;
    }

    const { isNewShoe, productCondition } = this.order as SellOrder;

    const condition = isNewShoe ? strings.NewCondition : strings.OldCondition;
    const tainted = productCondition.isTainted ? strings.Tainted : '';
    const outsoleWorn = productCondition.isOutsoleWorn ? strings.OutsoleWorn : '';

    return [condition, productCondition.boxCondition, tainted, outsoleWorn]
      .filter(t => t !== '')
      .join(', ');
  }

  private _getTransactionStatus(): string {
    const { paymentStatus } = this.state.transaction;
    switch (paymentStatus.status) {
      case PaymentStatus.CANCELED:
        return strings.Cancel;
      case PaymentStatus.PENDING:
        return strings.TransactionPending;
      case PaymentStatus.PROCESSED:
        return strings.TransactionProcessed;
      default:
        return '';
    }
  }

  private async _getTransaction(): Promise<void> {
    this.props.toggleLoading(true);
    try {
      const orderService = getService<IOrderService>(FactoryKeys.IOrderService);
      const transaction = await orderService.getTransactionBySellOrder(
        getToken(),
        this.order._id,
      );

      this.setState({ transaction });
    } catch (error) {
      console.log(error);
    } finally {
      this.props.toggleLoading(false);
    }
  }

  private _shouldGetTransaction(): boolean {
    return this.order.status === OrderStatus.COMPLETED;
  }

  /**
   * Potential warning: This will show a warning that VirtualizedLists
   * should never be nested inside plain ScrollView.
   *
   * FlatLists inside of ScrollViews with the same direction
   * will render all of the items at once and can’t be virtualized.
   * So you can have a FlatList inside a ScrollView,
   * but all the performance benefits will be worthless as they’re not working.
   *
   * Given the number of data is limited, this will not cause much performance issue
   */
  private _renderTimeline(): JSX.Element {
    return (
      <View>
        <Timeline
          data={this._getShippingData()}
          lineColor={themes.AppPrimaryColor}
          circleColor={themes.AppPrimaryColor}
          titleStyle={themes.TextStyle.body}
          innerCircle={'dot'}
          timeStyle={themes.TextStyle.subhead}
          descriptionStyle={themes.TextStyle.subhead}
          options={{
            style: { marginBottom: 20 },
          }}
        />
      </View>
    );
  }

  private _getShippingData(): Array<any> {
    // TODO: Return with real shipping data
    return [
      { time: '9:00', title: 'Event 1', description: 'Event 1' },
      { time: '10:00', title: 'Event 2', description: 'Event 2' },
      { time: '10:30', title: 'Event 3', description: 'Event 3' },
      { time: '9:00', title: 'Event 1', description: 'Event 1' },
      { time: '10:00', title: 'Event 2', description: 'Event 2' },
      { time: '10:30', title: 'Event 3', description: 'Event 3' },
    ];
  }
}
