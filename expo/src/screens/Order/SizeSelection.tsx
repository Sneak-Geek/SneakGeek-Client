import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SizePricePicker } from '@screens/Shared/SizePricePicker';
import { getService, connect } from 'utilities';
import {
  ISettingsProvider,
  FactoryKeys,
  SettingsKey,
  Shoe,
  IShoeService,
} from 'business';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';
import { RootStackParams } from 'navigations/RootStack';
import { ShoeHeaderSummary, BottomButton } from '@screens/Shared';
import { strings, themes } from '@resources';
import { toggleIndicator, showErrorNotification } from 'actions';
import RouteNames from 'navigations/RouteNames';

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});

type Props = {
  navigation: StackNavigationProp<RootStackParams>;
  route: RouteProp<RootStackParams, 'SizeSelection'>;

  toggleLoading: (isLoading: boolean) => void;
  showErrorMessage: (msg: string) => void;
};

type State = {
  priceMap: Map<string, number>;
  selectedSize: string;
};

@connect(
  _ => ({}),
  (dispatch: Function) => ({
    toggleLoading: (isLoading: boolean) => {
      dispatch(toggleIndicator({ isLoading, message: 'Xin chờ' }));
    },
    showErrorMessage: (message: string) => {
      dispatch(showErrorNotification(message));
    },
  }),
)
export class SizeSelection extends React.Component<Props, State> {
  private shoeSizes: string[] = [];
  private shoe: Shoe;

  public constructor(props: any) {
    super(props);

    const settings = getService<ISettingsProvider>(FactoryKeys.ISettingsProvider);
    this.shoeSizes = settings.getValue(SettingsKey.RemoteSettings).shoeSizes.Adult;
    this.shoe = this.props.route.params.shoe;

    this.state = {
      priceMap: new Map(),
      selectedSize: '',
    };
  }

  public componentDidMount() {
    this._getPriceMap();
  }

  public render(): JSX.Element {
    return (
      <SafeAreaView style={styles.rootContainer}>
        <View style={{ flex: 1 }}>
          <ShoeHeaderSummary shoe={this.shoe} />
          <SizePricePicker
            sizes={this.shoeSizes}
            style={{ marginTop: 15 }}
            priceMap={this.state.priceMap}
            onSizeSelected={this._onSizeSelected.bind(this)}
          />
          <BottomButton
            onPress={() => this.props.navigation.goBack()}
            title={strings.Cancel}
            style={{
              backgroundColor: themes.AppErrorColor,
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  private async _getPriceMap() {
    const settings = getService<ISettingsProvider>(FactoryKeys.ISettingsProvider);
    const shoeService = getService<IShoeService>(FactoryKeys.IShoeService);

    this.props.toggleLoading(true);

    try {
      const priceData: {
        minPrice: number;
        size: string;
      }[] = await shoeService.getLowestSellPrices(
        settings.getValue(SettingsKey.CurrentAccessToken),
        this.shoe._id,
      );

      const priceMap = new Map<string, number>();
      priceData.forEach(({ minPrice, size }) => priceMap.set(size, minPrice));

      this.setState({ priceMap });
    } catch (error) {
      this.props.showErrorMessage(strings.ErrorPleaseTryAgain);
    } finally {
      this.props.toggleLoading(false);
    }
  }

  private _onSizeSelected(size: string): void {
    this.setState({ selectedSize: size }, () => {
      this.props.navigation.push(RouteNames.Order.BuyConfirmation, {
        shoe: this.shoe,
      });
    });
  }
}
