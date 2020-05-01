import React from 'react';
import {
  View,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  ShoeHeaderSummary,
  TitleContentDescription,
  AppText,
  BottomButton,
} from 'screens/Shared';
import {RouteProp} from '@react-navigation/native';
import {RootStackParams} from 'navigations/RootStack';
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
  getOrders,
} from 'business';
import {strings, themes} from 'resources';
import {
  toCurrencyString,
  getDependency,
  getToken,
  connect,
  getOrderStatusStringAndColor,
} from 'utilities';
import {toggleIndicator} from 'actions';
import Timeline from 'react-native-timeline-flatlist';
import {SafeAreaConsumer} from 'react-native-safe-area-context';
import {
  HeaderHeightContext,
  StackNavigationProp,
} from '@react-navigation/stack';
import {styles} from 'screens/SearchTab/SearchTabMain/styles';
import {Icon} from 'react-native-elements';
import {SellOrderEdit} from './SellOrderEdit';
import {SellOrderEditInput} from 'business/src';

type Props = {
  route: RouteProp<RootStackParams, 'TransactionDetail'>;
  navigation: StackNavigationProp<RootStackParams, 'TransactionDetail'>;
  toggleLoading: (isLoading: boolean) => void;
  getSellOrders: () => void;
};

type State = {
  transaction?: Transaction;
  currentOrder: SellOrder | BuyOrder;
  isEditMode?: boolean;
};

@connect(
  () => ({}),
  (dispatch: Function) => ({
    toggleLoading: (isLoading: boolean): void =>
      dispatch(toggleIndicator({isLoading, message: strings.PleaseWait})),
    getSellOrders: (): void => dispatch(getOrders('SellOrder')),
  }),
)
export class TransactionDetail extends React.Component<Props, State> {
  private order?: SellOrder | BuyOrder;
  private orderId?: string;
  private orderType: OrderType;

  public constructor(props: Props) {
    super(props);
    this.order = this.props.route.params.order;
    this.orderType = this.props.route.params.orderType;
    this.orderId = this.props.route.params.orderId;
    this.state = {
      currentOrder: this.order || undefined,
      transaction: null,
      isEditMode: false,
    };
  }

  public componentDidMount(): void {
    if (this.order) {
      this._getTransaction();
    } else if (this.orderId) {
      this._getCurrentOrder(this.orderId)
        .then((newOrder) => this.setState({currentOrder: newOrder}))
        .then(() => {
          this._getTransaction();
        });
    }
  }

  public render(): JSX.Element {
    return (
      <SafeAreaConsumer>
        {(insets): JSX.Element => (
          <KeyboardAvoidingView
            style={{flex: 1, paddingTop: insets.top, backgroundColor: 'white'}}
            behavior={'padding'}>
            {this.state.currentOrder ? (
              <>
                {this._renderHeader(insets.top)}

                <ShoeHeaderSummary shoe={this._getShoe()} />
                <View style={styles.contentContainer}>
                  {!this.state.isEditMode && this._renderOrderDetail()}
                  {this.state.isEditMode && this._renderOrderEdit()}
                  {this._renderCancelOrder()}
                </View>
              </>
            ) : (
              <ActivityIndicator />
            )}
          </KeyboardAvoidingView>
        )}
      </SafeAreaConsumer>
    );
  }

  private _renderCancelOrder(): JSX.Element {
    if (
      this.state.currentOrder.status !== OrderStatus.PENDING ||
      this.state.isEditMode
    ) {
      return null;
    }

    return (
      <BottomButton
        onPress={this._onOrderCanceled.bind(this)}
        title={strings.CancelOrder}
        style={{backgroundColor: themes.AppErrorColor}}
      />
    );
  }

  private _renderHeader(top: number): JSX.Element {
    return (
      <HeaderHeightContext.Consumer>
        {(headerHeight): JSX.Element => (
          <View style={{...styles.headerContainer, height: headerHeight + top}}>
            <Icon
              name={'ios-arrow-back'}
              type={'ionicon'}
              size={themes.IconSize}
              onPress={(): void => this.props.navigation.goBack()}
            />
            <AppText.Title3>
              {this.orderType === 'SellOrder'
                ? strings.TransactionSellDetail
                : strings.TransactionBuyDetail}
            </AppText.Title3>
            {this.state.currentOrder.status !== OrderStatus.COMPLETED &&
            this.state.currentOrder.status !== OrderStatus.DENIED ? (
              <Icon
                name={this.state.isEditMode ? 'x' : 'edit'}
                type={'feather'}
                size={themes.IconSize}
                onPress={this._onEditOrder.bind(this)}
              />
            ) : (
              <View style={{height: themes.IconSize, aspectRatio: 1}} />
            )}
          </View>
        )}
      </HeaderHeightContext.Consumer>
    );
  }

  private _onEditOrder(): void {
    this.setState({isEditMode: !this.state.isEditMode});
  }

  private _renderOrderEdit(): JSX.Element {
    if (this.orderType === 'SellOrder') {
      return (
        <SellOrderEdit
          order={this.order as SellOrder}
          onUpdateOrder={(sellOrder: SellOrderEditInput) => {
            this._onUpdateOrder(sellOrder);
          }}
        />
      );
    }

    return null;
  }

  private _renderOrderDetail(): JSX.Element {
    const {color, status} = getOrderStatusStringAndColor(
      this.state.currentOrder,
      this.orderType,
    );
    const shouldRenderImage =
      this.orderType === 'SellOrder' &&
      (this.state.currentOrder as SellOrder).pictures.length > 0;

    return (
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, padding: 20}}>
          <TitleContentDescription
            emphasizeTitle={true}
            title={strings.Price}
            content={toCurrencyString(this._getShoePrice().price)}
          />
          <TitleContentDescription
            emphasizeTitle={true}
            title={strings.ShoeSize}
            content={this.state.currentOrder.shoeSize}
          />
          <TitleContentDescription
            emphasizeTitle={true}
            title={strings.OrderStatus}
            content={status}
            subtitleStyle={{color}}
          />
          {this.orderType === 'SellOrder' && (
            <TitleContentDescription
              emphasizeTitle={true}
              title={strings.OrderDescription}
              content={this._getProductDescription()}
            />
          )}
          {shouldRenderImage && (
            <TitleContentDescription
              emphasizeTitle={true}
              title={strings.ProductPictures}
              content={
                <FlatList
                  style={{marginTop: 15}}
                  horizontal={true}
                  data={(this.state.currentOrder as SellOrder).pictures}
                  keyExtractor={(_, index): string => index.toString()}
                  renderItem={({item}): JSX.Element => (
                    <Image
                      source={{uri: item}}
                      style={{width: 95, aspectRatio: 1, marginRight: 10}}
                    />
                  )}
                />
              }
            />
          )}
          {this._shouldGetTransaction() && (
            <TitleContentDescription
              emphasizeTitle={true}
              title={strings.CheckingStatus}
              content={this._getTransactionStatus()}
              renderCollapsibleIndicator={true}
              renderCollapsibleContent={this._renderTimeline.bind(this)}
            />
          )}
        </View>
      </ScrollView>
    );
  }

  private _getShoe(): Shoe {
    return this.orderType === 'BuyOrder'
      ? ((this.state.currentOrder as BuyOrder).shoe as Shoe)
      : ((this.state.currentOrder as SellOrder).shoeId as Shoe);
  }

  private _getShoePrice(): PriceData {
    return this.orderType === 'BuyOrder'
      ? ((this.state.currentOrder as BuyOrder).buyPrice as PriceData)
      : ((this.state.currentOrder as SellOrder).sellNowPrice as PriceData);
  }

  private _getProductDescription(): string {
    if (this.orderType === 'BuyOrder') {
      return null;
    }

    const {isNewShoe, productCondition} = this.state.currentOrder as SellOrder;

    const condition = isNewShoe ? strings.NewCondition : strings.OldCondition;
    const tainted = productCondition.isTainted ? strings.Tainted : '';
    const outsoleWorn = productCondition.isOutsoleWorn
      ? strings.OutsoleWorn
      : '';

    return [condition, productCondition.boxCondition, tainted, outsoleWorn]
      .filter((t) => t !== '')
      .join(', ');
  }

  private _getTransactionStatus(): string {
    if (!this.state.transaction || !this.state.transaction?.paymentStatus) {
      return null;
    }

    const {paymentStatus} = this.state.transaction;
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
      const orderService = getDependency<IOrderService>(
        FactoryKeys.IOrderService,
      );
      const transaction = await orderService.getTransactionBySellOrder(
        getToken(),
        this.state.currentOrder._id,
      );

      this.setState({transaction});
    } catch (error) {
      console.log(error);
    } finally {
      this.props.toggleLoading(false);
    }
  }

  private _shouldGetTransaction(): boolean {
    return this.state.currentOrder.status === OrderStatus.COMPLETED;
  }

  private async _onOrderCanceled(): Promise<void> {
    const orderService = getDependency<IOrderService>(
      FactoryKeys.IOrderService,
    );
    this.props.toggleLoading(true);
    try {
      await orderService.cancelSellOrder(
        getToken(),
        this.state.currentOrder._id,
      );
      this.props.navigation.goBack();
      this.props.getSellOrders();
    } catch (error) {
      console.log('Error cancel sell order');
    } finally {
      this.props.toggleLoading(false);
    }
  }

  private async _onUpdateOrder(
    updatedOrder: SellOrderEditInput,
  ): Promise<void> {
    const orderService = getDependency<IOrderService>(
      FactoryKeys.IOrderService,
    );
    this.props.toggleLoading(true);
    try {
      await orderService.updateSellOrder(getToken(), updatedOrder);
      const newOrder = await this._getCurrentOrder();
      this.setState({
        currentOrder: newOrder,
        isEditMode: false,
      });
      this.props.getSellOrders();
    } catch (error) {
      console.log('Error updating sell order');
    } finally {
      this.props.toggleLoading(false);
    }
  }

  private async _getCurrentOrder(
    id: string = this.order?._id,
  ): Promise<SellOrder> {
    const orderService = getDependency<IOrderService>(
      FactoryKeys.IOrderService,
    );
    return await orderService.getSellOrderById(getToken(), id);
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
            style: {marginBottom: 20},
          }}
        />
      </View>
    );
  }

  private _getShippingData(): Array<any> {
    // TODO: Return with real shipping data
    return [
      {time: '9:00', title: 'Event 1', description: 'Event 1'},
      {time: '10:00', title: 'Event 2', description: 'Event 2'},
      {time: '10:30', title: 'Event 3', description: 'Event 3'},
      {time: '9:00', title: 'Event 1', description: 'Event 1'},
      {time: '10:00', title: 'Event 2', description: 'Event 2'},
      {time: '10:30', title: 'Event 3', description: 'Event 3'},
    ];
  }
}
