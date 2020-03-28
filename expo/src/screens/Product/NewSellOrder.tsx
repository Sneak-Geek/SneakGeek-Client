import React from 'react';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { HeaderHeightContext, StackNavigationProp } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { themes, strings } from '@resources';
import { AppText, ShoeHeaderSummary, BottomButton } from '@screens/Shared';
import { Shoe, SellOrder, IOrderService, FactoryKeys } from 'business';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from 'navigations/RootStack';
import { ProductSetPrice } from './ProductSetPrice';
import { ProductConditionExtra } from './ProductConditionExtra';
import { ProductSellSummary } from './ProductSellSummary';
import { ProductRequiredInfo } from './ProductRequiredInfo';
import { connect, getToken, getService } from 'utilities';
import { IAppState } from '@store/AppStore';
import { showErrorNotification, showSuccessNotification } from 'actions';

type Props = {
  route: RouteProp<RootStackParams, 'NewSellOrder'>;
  navigation: StackNavigationProp<RootStackParams, 'NewSellOrder'>;

  showErrorNotification: (message: string) => void;
  showSuccessNotification: (message: string) => void;
};

type SellDetailChild = {
  render: () => JSX.Element;
  canProceed: () => boolean;
};

type State = {
  sellOrder: Partial<SellOrder>;
  currentIndex: number;
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: themes.DisabledColor,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  shoeDetailContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flex: 1,
    paddingHorizontal: 8,
    maxHeight: 100,
  },
  shoeDetailTextContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: 5,
  },
});

@connect(
  (_: IAppState) => ({}),
  (dispatch: Function) => ({
    showErrorNotification: (message: string) => {
      dispatch(showErrorNotification(message));
    },
    showSuccessNotification: (message: string) => {
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
      },
      currentIndex: 0,
    };
    this.childComponents = [
      {
        render: () => (
          <ProductRequiredInfo
            key={0}
            onSetShoeSize={this._setShoeSize.bind(this)}
            onSetShoeCondition={this._setShoeCondition.bind(this)}
            onSetBoxCondition={this._setBoxCondition.bind(this)}
          />
        ),
        canProceed: () => {
          const { sellOrder } = this.state;
          return Boolean(
            sellOrder.shoeSize &&
              sellOrder.isNewShoe !== undefined &&
              sellOrder.productCondition.boxCondition,
          );
        },
      },
      {
        render: () => (
          <ProductConditionExtra
            key={1}
            onSetShoeHeavilyTorn={this._setShoeHeavilyTorn.bind(this)}
            onSetShoeInsoleWorn={this._setShoeOutsoleWorn.bind(this)}
            onSetShoeOutsoleWorn={this._setShoeOutsoleWorn.bind(this)}
            onSetShoeTainted={this._setShoeTainted.bind(this)}
            onSetShoeOtherDetail={this._setShoeOtherDetail.bind(this)}
          />
        ),
        canProceed: () => {
          return true;
        },
      },
      {
        render: () => (
          <ProductSetPrice key={2} onSetShoePrice={this._setShoePrice.bind(this)} />
        ),
        canProceed: () => {
          const { sellOrder } = this.state;
          return sellOrder.sellNowPrice !== undefined;
        },
      },
      {
        render: () => (
          <ProductSellSummary
            key={3}
            orderSummary={this.state.sellOrder}
            onShoePictureAdded={(picUri: string) => this._onPictureAdded(picUri)}
          />
        ),
        canProceed: () => {
          return true;
        },
      },
    ];
  }

  public componentWillUnmount() {
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
    const orderService = getService<IOrderService>(FactoryKeys.IOrderService);

    try {
      await orderService.createSellOrder(token, this.state.sellOrder as SellOrder);
      this.props.showSuccessNotification('Đã bán thành công sản phẩm!');
      this._goBackTimeout = setTimeout(() => {
        this.props.navigation.goBack();
      }, 500);
    } catch (error) {
      this.props.showErrorNotification('Đã có lỗi xảy ra, xin vui lòng thử lại');
    }
  }

  private _onListScroll(forward: boolean = true) {
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

  private _setShoeSize(shoeSize: string) {
    this.setState({ sellOrder: { ...this.state.sellOrder, shoeSize } });
  }

  private _setBoxCondition(boxCondition: string) {
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

  private _setShoeCondition(shoeCondition: string) {
    this.setState({
      sellOrder: {
        ...this.state.sellOrder,
        isNewShoe: shoeCondition === 'Mới',
      },
    });
  }

  private _setShoeHeavilyTorn(isTorn: boolean) {
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

  private _setShoeOutsoleWorn(isOutsoleWorn: boolean) {
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

  private _setShoeTainted(isTainted: boolean) {
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

  private _setShoeOtherDetail(otherDetail: string) {
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

  private _setShoePrice(sellNowPrice: number) {
    this.setState(prevState => ({
      ...prevState,
      sellOrder: { ...prevState.sellOrder, sellNowPrice },
    }));
  }

  private _onPictureAdded(picUri: string) {
    this.setState(prevState => {
      let pictures: string[] = prevState.sellOrder.pictures || [];
      pictures = [...pictures, picUri];
      return {
        ...prevState,
        sellOrder: {
          ...prevState.sellOrder,
          shoePictures: pictures,
        },
      };
    });
  }
}
