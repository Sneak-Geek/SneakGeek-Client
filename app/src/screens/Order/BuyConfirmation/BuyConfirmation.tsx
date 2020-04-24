import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {BottomButton, ShoeHeaderSummary, AppText} from 'screens/Shared';
import {themes, strings} from 'resources';
import {RouteProp} from '@react-navigation/native';
import {RootStackParams} from 'navigations/RootStack';
import {Shoe, Profile, SellOrder, BuyOrder} from 'business';
import {connect, getService, getToken, toCurrencyString} from 'utilities';
import {IAppState} from 'store/AppStore';
import {FactoryKeys, IOrderService, PaymentType, PriceData} from 'business/src';
import {toggleIndicator, showSuccessNotification} from 'actions';
import {Divider, Tooltip, Icon} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import RouteNames from 'navigations/RouteNames';
import {styles} from './styles';
import ActionSheet from 'react-native-action-sheet';

const OrderSectionWithTitle = (props: {
  title: string;
  value: string;
  tooltip?: string;
}): JSX.Element => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionTitleContainer}>
      <AppText.Subhead style={styles.sectionTitle}>
        {props.title.toUpperCase()}
      </AppText.Subhead>
      {props.tooltip && (
        <Tooltip
          popover={<AppText.Subhead>{props.tooltip}</AppText.Subhead>}
          pointerColor={themes.AppDisabledColor}
          backgroundColor={themes.AppDisabledColor}
          height={null}>
          <Icon
            name={'info'}
            size={themes.IconSize}
            color={themes.AppDisabledColor}
            containerStyle={{marginBottom: 10, marginLeft: 10}}
          />
        </Tooltip>
      )}
    </View>
    <AppText.Body>{props.value}</AppText.Body>
  </View>
);

type Props = {
  profile: Profile;
  route: RouteProp<RootStackParams, 'OrderBuyConfirmation'>;
  navigation: StackNavigationProp<RootStackParams, 'OrderBuyConfirmation'>;

  toggleLoading: (isLoading: boolean) => void;
  showNotification: (message: string) => void;
};

type State = {
  lowestSellOrder?: SellOrder;
  highestBuyOrderPrice?: number;
  totalFee: {
    shippingFee: number;
    shoePrice: number;
  };
  newBuyOrder?: Partial<BuyOrder>;
  isBuyNow: boolean;
  displayBuyOrderPrice: string;
};

@connect(
  (state: IAppState) => ({
    profile: state.UserState.profileState.profile,
  }),
  (dispatch: Function) => ({
    toggleLoading: (isLoading: boolean): void => {
      dispatch(toggleIndicator({isLoading, message: strings.PleaseWait}));
    },
    showNotification: (message: string): void => {
      dispatch(showSuccessNotification(message));
    },
  }),
)
export class BuyConfirmation extends React.Component<Props, State> {
  private shoe: Shoe;
  private size: string;
  private minPrice: number;
  private orderService: IOrderService;

  public constructor(props: Props) {
    super(props);
    this.shoe = this.props.route.params.shoe;
    this.size = this.props.route.params.size;
    this.minPrice = this.props.route.params.minPrice;

    this.state = {
      lowestSellOrder: null,
      highestBuyOrderPrice: null,
      totalFee: {
        shippingFee: 0,
        shoePrice: 0,
      },
      newBuyOrder: {
        shoe: this.shoe._id,
        shoeSize: this.size,
      },
      isBuyNow: this._shouldRenderBuyNow(),
      displayBuyOrderPrice: '',
    };

    this.orderService = getService<IOrderService>(FactoryKeys.IOrderService);
  }

  public componentDidMount(): void {
    this._getMatchingSellOrder();
  }

  private _shouldRenderBuyNow(): boolean {
    return typeof this.minPrice !== 'undefined' && this.minPrice > 0;
  }

  private async _getMatchingSellOrder(): Promise<void> {
    this.props.toggleLoading(true);
    try {
      const {
        lowestSellOrder,
        highestBuyOrderPrice,
      } = await this.orderService.getSellOrderInfoForBuy(
        getToken(),
        this.shoe._id,
        this.size,
      );

      this.setState(
        {lowestSellOrder, highestBuyOrderPrice},
        this._getTotalFee.bind(this),
      );
    } catch (error) {
      console.warn(error);
    } finally {
      this.props.toggleLoading(false);
    }
  }

  private async _getTotalFee(): Promise<void> {
    if (!this.state.lowestSellOrder) {
      return;
    }

    this.props.toggleLoading(true);

    try {
      const {shippingFee, shoePrice} = await this.orderService.getTotalFee(
        getToken(),
        this.state.lowestSellOrder._id,
      );

      this.setState({
        totalFee: {shippingFee, shoePrice},
      });
    } catch (error) {
      console.warn(error);
    } finally {
      this.props.toggleLoading(false);
    }
  }

  public render(): JSX.Element {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ShoeHeaderSummary shoe={this.shoe} />
          <View style={styles.orderTypeOutterContainer}>
            {this._renderOrderTypeSelector()}
          </View>
          <ScrollView style={{flex: 1}}>
            <View style={{padding: 20}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <OrderSectionWithTitle
                  title={strings.ShoeSize}
                  value={this.size}
                />
                {this._renderOrderCondition()}
                {this._renderOrderConfirmationDetail()}
              </View>
            </View>
          </ScrollView>
          <BottomButton
            style={{backgroundColor: themes.AppSecondaryColor}}
            onPress={this._onPurchaseButtonClicked.bind(this)}
            title={
              this.state.isBuyNow ? strings.BuyProduct : strings.SetBuyPrice
            }
          />
        </View>
      </SafeAreaView>
    );
  }

  private _renderOrderConfirmationDetail(): JSX.Element {
    if (!this.state.isBuyNow) {
      return (
        <View>
          <OrderSectionWithTitle
            title={strings.HighestBuyOrderPrice}
            value={
              toCurrencyString(this.state.highestBuyOrderPrice?.toString()) ||
              '-'
            }
            tooltip={strings.HighestBuyOrderExplanation}
          />
          <OrderSectionWithTitle
            title={strings.BuyNowPrice}
            value={
              (this.state.lowestSellOrder
                ?.sellNowPrice as PriceData)?.price?.toString() || '-'
            }
          />
          {this._renderSetPriceBox()}
        </View>
      );
    }
    const {userProvidedName, userProvidedAddress} = this.props.profile;
    const address = [
      userProvidedAddress.streetAddress,
      userProvidedAddress.ward,
      userProvidedAddress.district,
      userProvidedAddress.city,
    ];
    const {shoePrice, shippingFee} = this.state.totalFee;

    return (
      <View>
        <OrderSectionWithTitle
          title={strings.Receipient}
          value={`${userProvidedName.firstName} ${userProvidedName.lastName}`}
        />
        <OrderSectionWithTitle
          title={strings.Address}
          value={address.join('\n')}
        />
        <Divider style={{marginBottom: 10}} />
        <OrderSectionWithTitle
          title={strings.ProductPrice}
          value={toCurrencyString(shoePrice)}
        />
        <OrderSectionWithTitle
          title={strings.ShippingFee}
          value={toCurrencyString(shippingFee)}
        />

        <Divider style={{marginBottom: 10}} />
        <OrderSectionWithTitle
          title={strings.TotalFee}
          value={toCurrencyString(shippingFee + shoePrice)}
        />
      </View>
    );
  }

  private _renderSetPriceBox(): JSX.Element {
    return (
      <View>
        <AppText.Subhead>{strings.SetBuyPrice.toUpperCase()}</AppText.Subhead>
        <View style={styles.inputContainer}>
          <TextInput
            keyboardType={'number-pad'}
            value={this.state.displayBuyOrderPrice}
            placeholder={this.minPrice?.toString() || strings.SetBuyPrice}
            style={themes.TextStyle.body}
            onChangeText={(text): void => {
              this.setState({
                displayBuyOrderPrice: text,
                newBuyOrder: {
                  ...this.state.newBuyOrder,
                  buyPrice: parseInt(text),
                },
              });
            }}
            onEndEditing={(): void => {
              this.setState({
                displayBuyOrderPrice: toCurrencyString(
                  this.state.displayBuyOrderPrice,
                ),
              });
            }}
            onFocus={(): void => {
              this.setState({displayBuyOrderPrice: ''});
            }}
          />
        </View>
      </View>
    );
  }

  private _renderOrderCondition(): JSX.Element {
    return null;
  }

  private _renderOrderTypeSelector(): JSX.Element {
    const {isBuyNow} = this.state;
    const isDisabled = !this._shouldRenderBuyNow();

    return (
      <View style={styles.orderTypeContainer}>
        <TouchableOpacity
          style={[
            !isBuyNow ? styles.orderTypeSelected : {},
            styles.commonOrderType,
          ]}
          onPress={(): void => {
            this.setState({isBuyNow: false});
          }}>
          <AppText.Callout
            style={[!isBuyNow ? {color: 'white'} : {}, {textAlign: 'center'}]}>
            {strings.SetBuyPrice.toUpperCase()}
          </AppText.Callout>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isDisabled}
          style={[
            isBuyNow ? styles.orderTypeSelected : {},
            styles.commonOrderType,
          ]}
          onPress={(): void => this.setState({isBuyNow: true})}>
          <AppText.Callout
            style={[
              isBuyNow || isDisabled ? {color: 'white'} : {},
              {textAlign: 'center'},
            ]}>
            {strings.BuyNow.toUpperCase()}
          </AppText.Callout>
        </TouchableOpacity>
      </View>
    );
  }

  private async _onPurchaseButtonClicked(): Promise<void> {
    if (!this.state.isBuyNow) {
      this.props.toggleLoading(true);
      try {
        await this.orderService.createBuyOrder(
          getToken(),
          this.state.newBuyOrder,
        );
        this.props.showNotification(strings.SetPriceSuccess);
        this.props.navigation.navigate(RouteNames.Product.ProductDetail);
      } catch (error) {
        console.warn(error);
        console.log(error);
      } finally {
        this.props.toggleLoading(false);
      }

      return;
    }

    const options = [
      {
        name: strings.DomesticPayment,
        action: (): void => this._purchaseProduct('domestic'),
      },
      {
        name: strings.IntlPayment,
        action: (): void => this._purchaseProduct('intl'),
      },
      {name: strings.Cancel, action: (): void => null},
    ];

    ActionSheet.showActionSheetWithOptions(
      {
        options: options.map((t) => t.name),
        cancelButtonIndex: 2,
        destructiveButtonIndex: -1,
      },
      (btnIdx) => options[btnIdx].action(),
    );
  }

  private _purchaseProduct(paymentType: PaymentType): void {
    this.props.navigation.push(RouteNames.Order.Payment, {
      paymentType,
      sellOrder: this.state.lowestSellOrder,
    });
  }
}
