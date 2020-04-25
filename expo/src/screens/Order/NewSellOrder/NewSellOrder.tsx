import React from 'react';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { View, ScrollView, FlatList } from 'react-native';
import { HeaderHeightContext, StackNavigationProp } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { themes, strings } from '@resources';
import { AppText, ShoeHeaderSummary, BottomButton } from '@screens/Shared';
import { Shoe, SellOrder, IOrderService, FactoryKeys } from 'business';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from 'navigations/RootStack';
import { ProductSetPrice } from '../../Product/ProductSetPrice';
import { ProductConditionExtra } from '../../Product/ProductConditionExtra';
import { ProductSellSummary } from '../../Product/ProductSellSummary';
import { ProductRequiredInfo } from '../../Product/ProductRequiredInfo';
import { connect, getToken, getService } from 'utilities';
import { showErrorNotification, showSuccessNotification, toggleIndicator } from 'actions';
import { styles } from './styles';
import { CdnService } from 'business/src';

type Props = {
  route: RouteProp<RootStackParams, 'NewSellOrder'>;
  navigation: StackNavigationProp<RootStackParams, 'NewSellOrder'>;

  showErrorNotification: (message: string) => void;
  showSuccessNotification: (message: string) => void;
  toggleLoading: (isLoading: boolean) => void;
};

type SellDetailChild = {
  render: () => JSX.Element;
  canProceed: () => boolean;
};

type State = {
  sellOrder: Partial<SellOrder>;
  currentIndex: number;
};

@connect(
  () => ({}),
  (dispatch: Function) => ({
    toggleLoading: (isLoading: boolean) => {
      dispatch(toggleIndicator({ isLoading, message: strings.PleaseWait }))
    },
    showErrorNotification: (message: string): void => {
      dispatch(showErrorNotification(message));
    },
    showSuccessNotification: (message: string): void => {
      dispatch(showSuccessNotification(message));
    },
  }),
)
export class NewSellOrder extends React.Component<Props, State> {
  private _shoe: Shoe;
  private childComponents: SellDetailChild[];
  private _childFlatList: FlatList<SellDetailChild>;
  private _goBackTimeout: number;

  public constructor(props: Props) {
    super(props);

    this._shoe = this.props.route.params.shoe;
    this.state = {
      sellOrder: {
        shoeId: this._shoe._id,
        shoeSize: undefined,
        isNewShoe: undefined,
        productCondition: {
          boxCondition: undefined,
          isTainted: false,
          isOutsoleWorn: false,
          otherDetail: '',
          isTorn: false,
        },
        pictures: []
      },
      currentIndex: 0,
    };
    this.childComponents = [
      {
        render: (): JSX.Element => (
          <ProductRequiredInfo
            key={0}
            onSetShoeSize={this._setShoeSize.bind(this)}
            onSetShoeCondition={this._setShoeCondition.bind(this)}
            onSetBoxCondition={this._setBoxCondition.bind(this)}
          />
        ),
        canProceed: (): boolean => {
          const { sellOrder } = this.state;
          return Boolean(
            sellOrder.shoeSize &&
              sellOrder.isNewShoe !== undefined &&
              sellOrder.productCondition.boxCondition,
          );
        },
      },
      {
        render: (): JSX.Element => (
          <ProductConditionExtra
            key={1}
            onSetShoeHeavilyTorn={this._setShoeHeavilyTorn.bind(this)}
            onSetShoeOutsoleWorn={this._setShoeOutsoleWorn.bind(this)}
            onSetShoeTainted={this._setShoeTainted.bind(this)}
            onSetShoeInsoleWorn={this._setShoeInsoleWorn.bind(this)}
            onSetShoeOtherDetail={this._setShoeOtherDetail.bind(this)}
          />
        ),
        canProceed: (): boolean => {
          return true;
        },
      },
      {
        render: (): JSX.Element => (
          <ProductSetPrice key={2} onSetShoePrice={this._setShoePrice.bind(this)} />
        ),
        canProceed: (): boolean => {
          const { sellOrder } = this.state;
          return sellOrder.sellNowPrice !== undefined;
        },
      },
      {
        render: (): JSX.Element => (
          <ProductSellSummary
            key={3}
            orderSummary={this.state.sellOrder}
            onShoePictureAdded={(picUri: string): void =>
              this._onPictureAdded(picUri)
            }
          />
        ),
        canProceed: (): boolean => {
          return true;
        },
      },
    ];
  }

  public componentWillUnmount(): void {
    clearTimeout(this._goBackTimeout);
  }

  public render(): JSX.Element {
    return (
      <SafeAreaConsumer>
        {(insets): JSX.Element => (
          <View style={{ paddingTop: insets.top, backgroundColor: 'white', flex: 1 }}>
            {this._renderHeader(insets.top)}
            <ShoeHeaderSummary shoe={this._shoe} />
            <ScrollView style={{ flex: 1 }}>{this._renderSellerContent()}</ScrollView>
            {this._renderBottomButton(insets.bottom)}
          </View>
        )}
      </SafeAreaConsumer>
    );
  }

  private _renderHeader(topInset: number): JSX.Element {
    return (
      <HeaderHeightContext.Consumer>
        {headerHeight => (
          <View
            style={{ ...styles.headerContainer, height: headerHeight + topInset }}
          >
            {this.state.currentIndex > 0 ? (
              <Icon
                name={'ios-arrow-back'}
                type={'ionicon'}
                size={themes.IconSize}
                onPress={() => this._onListScroll(false)}
                hitSlop={{}}
              />
            ) : (
              <View style={{ width: themes.IconSize, height: themes.IconSize }} />
            )}
            <AppText.Title3>{strings.NewSell}</AppText.Title3>
            <Icon
              name={'x'}
              type={'feather'}
              size={themes.IconSize}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        )}
      </HeaderHeightContext.Consumer>
    );
  }

  private _renderSellerContent(): JSX.Element {
    return (
      <FlatList
        ref={ref => (this._childFlatList = ref)}
        bounces={false}
        style={{ flex: 1, marginTop: 10, height: '100%' }}
        horizontal={true}
        pagingEnabled={true}
        data={this.childComponents}
        renderItem={({ item }) => item.render()}
        alwaysBounceHorizontal={false}
        scrollEnabled={false}
        keyExtractor={(_item, idx) => idx.toString()}
      />
    );
  }

  private _renderBottomButton(bottom: number) {
    const shouldSellShoe =
      this.state.currentIndex === this.childComponents.length - 1;
    const shouldContinue = this.childComponents[this.state.currentIndex].canProceed();

    return (
      <BottomButton
        title={shouldSellShoe ? strings.SellShoe : strings.Continue}
        onPress={() => (shouldSellShoe ? this._sellShoe() : this._onListScroll())}
        style={{
          bottom,
          backgroundColor: shouldContinue
            ? themes.AppSecondaryColor
            : themes.AppDisabledColor,
        }}
      />
    );
  }

  private async _sellShoe() {
    const token = getToken();
    const order = this.state.sellOrder;

    const orderService = getService<IOrderService>(FactoryKeys.IOrderService);
    const cdnService = getService<CdnService>(FactoryKeys.ICdnService);
    let uploadedPictures: string[] = [];
    this.props.toggleLoading(true);
    
    try {
      uploadedPictures = await cdnService.uploadImages(token, order?.pictures.map(i => ({
        uri: i,
        type: "image/png"
      })));
      order.pictures = uploadedPictures;
    } catch (error) {
      this.props.showErrorNotification(strings.ErrorPleaseTryAgain);
      this.props.toggleLoading(false);
      return;
    }

    try {
      await orderService.createSellOrder(token, order as SellOrder);
      this.props.showSuccessNotification('Đã bán thành công sản phẩm!');
      this._goBackTimeout = setTimeout(() => {
        this.props.navigation.goBack();
      }, 500);
    } catch (error) {
      this.props.showErrorNotification('Đã có lỗi xảy ra, xin vui lòng thử lại');
    } finally {
      this.props.toggleLoading(false);
    }
  }

  private _onListScroll(forward = true): void {
    const shouldContinue = this.childComponents[this.state.currentIndex].canProceed();
    const canGoNext =
      shouldContinue &&
      forward &&
      this.state.currentIndex < this.childComponents.length - 1;
    const canGoBack = !forward && this.state.currentIndex >= 1;
    const nextIndex = forward
      ? this.state.currentIndex + 1
      : this.state.currentIndex - 1;

    if (canGoNext || canGoBack) {
      this.setState({ currentIndex: nextIndex }, () => {
        this._childFlatList.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      });
    }
  }

  private _setShoeSize(shoeSize: string): void {
    this.setState({ sellOrder: { ...this.state.sellOrder, shoeSize } });
  }

  private _setBoxCondition(boxCondition: string): void {
    this.setState({
      sellOrder: {
        ...this.state.sellOrder,
        productCondition: {
          ...this.state.sellOrder.productCondition,
          boxCondition,
        },
      },
    });
  }

  private _setShoeCondition(shoeCondition: string): void {
    this.setState({
      sellOrder: {
        ...this.state.sellOrder,
        isNewShoe: shoeCondition === 'Mới',
      },
    });
  }

  private _setShoeHeavilyTorn(isTorn: boolean): void {
    this.setState(prevState => ({
      ...prevState,
      sellOrder: {
        ...prevState.sellOrder,
        productCondition: {
          ...prevState.sellOrder.productCondition,
          isTorn,
        },
      },
    }));
  }

  private _setShoeOutsoleWorn(isOutsoleWorn: boolean): void {
    this.setState(prevState => ({
      ...prevState,
      sellOrder: {
        ...prevState.sellOrder,
        productCondition: {
          ...prevState.sellOrder.productCondition,
          isOutsoleWorn,
        },
      },
    }));
  }

  private _setShoeInsoleWorn(isInsoleWorn: boolean): void {
    this.setState(prevState => ({
      ...prevState,
      sellOrder: {
        ...prevState.sellOrder,
        productCondition: {
          ...prevState.sellOrder.productCondition,
          isInsoleWorn,
        },
      },
    }));
  }

  private _setShoeTainted(isTainted: boolean): void {
    this.setState(prevState => ({
      ...prevState,
      sellOrder: {
        ...prevState.sellOrder,
        productCondition: {
          ...prevState.sellOrder.productCondition,
          isTainted,
        },
      },
    }));
  }

  private _setShoeOtherDetail(otherDetail: string): void {
    this.setState(prevState => ({
      ...prevState,
      sellOrder: {
        ...prevState.sellOrder,
        productCondition: {
          ...prevState.sellOrder.productCondition,
          otherDetail,
        },
      },
    }));
  }

  private _setShoePrice(sellNowPrice: number): void {
    this.setState(prevState => ({
      ...prevState,
      sellOrder: { ...prevState.sellOrder, sellNowPrice },
    }));
  }

  private _onPictureAdded(picUri: string): void {
    this.setState(prevState => {
      return {
        ...prevState,
        sellOrder: {
          ...prevState.sellOrder,
          pictures: (this.state.sellOrder.pictures || []).concat(picUri),
        },
      };
    });
  }
}