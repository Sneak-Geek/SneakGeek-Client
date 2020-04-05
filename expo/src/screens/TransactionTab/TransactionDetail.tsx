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
  TransactionStatus,
  OrderStatus,
} from 'business';
import { strings } from '@resources';
import { ScrollView } from 'react-native-gesture-handler';
import { toCurrencyString, getService, getToken, connect } from 'utilities';
import { toggleIndicator } from 'actions';

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
  private sellOrder: SellOrder;

  public constructor(props: Props) {
    super(props);
    this.sellOrder = this.props.route.params.sellOrder;
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
          <ShoeHeaderSummary shoe={this.sellOrder.shoeId as Shoe} />
          <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
            <TitleContentDescription
              emphasizeTitle={true}
              title={strings.Price}
              content={toCurrencyString(
                (this.sellOrder.sellNowPrice as PriceData).price,
              )}
            />
            <TitleContentDescription
              emphasizeTitle={true}
              title={strings.ShoeSize}
              content={this.sellOrder.shoeSize}
            />
            <TitleContentDescription
              emphasizeTitle={true}
              title={strings.Description}
              content={this._getProductDescription()}
            />
            {this._shouldGetTransaction() && (
              <TitleContentDescription
                emphasizeTitle={true}
                title={strings.Status}
                content={this._getTransactionStatus()}
              />
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  private _getProductDescription(): string {
    const { isNewShoe, productCondition } = this.sellOrder;

    const condition = isNewShoe ? strings.NewCondition : strings.OldCondition;
    const tainted = productCondition.isTainted ? strings.Tainted : '';
    const outsoleWorn = productCondition.isOutsoleWorn ? strings.OutsoleWorn : '';

    return [condition, productCondition.boxCondition, tainted, outsoleWorn]
      .filter(t => t !== '')
      .join(', ');
  }

  private _getTransactionStatus(): string {
    const { status } = this.state.transaction;
    switch (status) {
      case TransactionStatus.CANCELED:
        return strings.Cancel;
      case TransactionStatus.PENDING:
        return strings.TransactionPending;
      case TransactionStatus.PROCESSED:
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
        this.sellOrder._id,
      );

      this.setState({ transaction });
    } catch (error) {
      console.log(error);
    } finally {
      this.props.toggleLoading(false);
    }
  }

  private _shouldGetTransaction(): boolean {
    return this.sellOrder.status === OrderStatus.COMPLETED;
  }
}
