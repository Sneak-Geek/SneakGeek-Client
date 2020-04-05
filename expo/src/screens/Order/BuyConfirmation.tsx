import React from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import { BottomButton, ShoeHeaderSummary, AppText } from '@screens/Shared';
import { themes, strings } from '@resources';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from 'navigations/RootStack';
import { Shoe, Profile, SellOrder } from 'business';
import { connect, getService, getToken, toCurrencyString } from 'utilities';
import { IAppState } from '@store/AppStore';
import { FactoryKeys, IOrderService, PaymentType } from 'business/src';
import { toggleIndicator } from 'actions';
import { Divider } from 'react-native-elements';
import {
  ActionSheetProps,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import * as WebBrowser from 'expo-web-browser';
import { StackNavigationProp } from '@react-navigation/stack';
import RouteNames from 'navigations/RouteNames';

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  sectionTitle: {
    marginBottom: 8,
  },
});

type Props = {
  profile: Profile;
  route: RouteProp<RootStackParams, 'OrderBuyConfirmation'>;
  navigation: StackNavigationProp<RootStackParams, 'OrderBuyConfirmation'>;

  toggleLoading: (isLoading: boolean) => void;
} & ActionSheetProps;

type State = {
  matchingSellOrder: SellOrder;
  totalFee: {
    shippingFee: number;
    shoePrice: number;
  };
};

@connect(
  (state: IAppState) => ({
    profile: state.UserState.profileState.profile,
  }),
  (dispatch: Function) => ({
    toggleLoading: (isLoading: boolean): void => {
      dispatch(toggleIndicator({ isLoading, message: strings.PleaseWait }));
    },
  }),
)
class UnconnectedBuyConfirmation extends React.Component<Props, State> {
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
      matchingSellOrder: null,
      totalFee: {
        shippingFee: 0,
        shoePrice: 0,
      },
    };

    this.orderService = getService<IOrderService>(FactoryKeys.IOrderService);
  }

  public componentDidMount(): void {
    if (this.minPrice) {
      this._getMatchingSellOrder();
    }
  }

  private async _getMatchingSellOrder(): Promise<void> {
    const token = getToken();

    this.props.toggleLoading(true);
    const matchingSellOrder = await this.orderService.getMatchingSellOrder(
      token,
      this.shoe._id,
      this.size,
    );
    this.props.toggleLoading(false);
    this.setState({ matchingSellOrder }, this._getTotalFee.bind(this));
  }

  private async _getTotalFee(): Promise<void> {
    this.props.toggleLoading(true);

    const { shippingFee, shoePrice } = await this.orderService.getTotalFee(
      getToken(),
      this.state.matchingSellOrder._id,
    );
    this.props.toggleLoading(false);
    this.setState({
      totalFee: { shippingFee, shoePrice },
    });
  }

  public render(): JSX.Element {
    if (
      !this.state.matchingSellOrder ||
      !this.state.totalFee.shippingFee ||
      !this.state.totalFee.shoePrice
    ) {
      return null;
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <ShoeHeaderSummary shoe={this.shoe} />
          <ScrollView>
            <View style={{ padding: 20 }}>
              {this._renderShoeOrderDetail()}
              {this._renderReceipient()}
              {this._renderShippingAddress()}
              <Divider style={{ marginBottom: 10 }} />
              {this._renderPrice()}
            </View>
          </ScrollView>
          <BottomButton
            style={{ backgroundColor: themes.AppSecondaryColor }}
            onPress={this._onPurchaseButtonClicked.bind(this)}
            title={strings.BuyProduct}
          />
        </View>
      </SafeAreaView>
    );
  }

  private _renderShoeOrderDetail(): JSX.Element {
    return (
      <View style={styles.sectionContainer}>
        <AppText.Subhead style={styles.sectionTitle}>
          {strings.ShoeSize.toUpperCase()}
        </AppText.Subhead>
        <AppText.Body>{this.size}</AppText.Body>
      </View>
    );
  }

  private _renderReceipient(): JSX.Element {
    const { profile } = this.props;
    const { userProvidedName } = profile;

    return (
      <View style={styles.sectionContainer}>
        <AppText.Subhead style={styles.sectionTitle}>
          {strings.Receipient.toUpperCase()}
        </AppText.Subhead>
        <AppText.Body>
          {userProvidedName.firstName} {userProvidedName.lastName}
        </AppText.Body>
      </View>
    );
  }

  private _renderShippingAddress(): JSX.Element {
    const { profile } = this.props;
    const { userProvidedAddress } = profile;

    return (
      <View style={styles.sectionContainer}>
        <AppText.Subhead style={styles.sectionTitle}>
          {strings.Address.toUpperCase()}
        </AppText.Subhead>
        <AppText.Body>
          {userProvidedAddress.streetAddress}
          {'\n'}
          {userProvidedAddress.ward}
          {'\n'}
          {userProvidedAddress.district}
          {'\n'}
          {userProvidedAddress.city}
        </AppText.Body>
      </View>
    );
  }

  private _renderPrice(): JSX.Element {
    const { shippingFee, shoePrice } = this.state.totalFee;
    return (
      <View>
        <View style={styles.sectionContainer}>
          <AppText.Subhead style={styles.sectionTitle}>
            {strings.ProductPrice.toUpperCase()}
          </AppText.Subhead>
          <AppText.Body>{toCurrencyString(shoePrice)}</AppText.Body>
        </View>

        <View style={styles.sectionContainer}>
          <AppText.Subhead style={styles.sectionTitle}>
            {strings.ShippingFee.toUpperCase()}
          </AppText.Subhead>
          <AppText.Body>{toCurrencyString(shippingFee)}</AppText.Body>
        </View>

        <Divider style={{ marginBottom: 10 }} />

        <View style={styles.sectionContainer}>
          <AppText.Subhead style={styles.sectionTitle}>
            {strings.TotalFee.toUpperCase()}
          </AppText.Subhead>
          <AppText.Body>{toCurrencyString(shippingFee + shoePrice)}</AppText.Body>
        </View>
      </View>
    );
  }

  private _onPurchaseButtonClicked(): void {
    const options = [
      {
        name: strings.DomesticPayment,
        action: (): void => this._purchaseProduct('domestic'),
      },
      {
        name: strings.IntlPayment,
        action: (): void => this._purchaseProduct('intl'),
      },
      { name: strings.Cancel, action: (): void => null },
    ];

    this.props.showActionSheetWithOptions(
      {
        options: options.map(t => t.name),
        cancelButtonIndex: 2,
        destructiveButtonIndex: -1,
      },
      btnIdx => options[btnIdx].action(),
    );
  }

  private _purchaseProduct(paymentType: PaymentType): void {
    this.props.navigation.push(RouteNames.Order.Payment, {
      paymentType,
      sellOrder: this.state.matchingSellOrder,
    });
  }
}

export const BuyConfirmation = connectActionSheet(UnconnectedBuyConfirmation);
