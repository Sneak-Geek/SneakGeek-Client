import React from 'react';
import { AppText } from '@screens/Shared';
import {
  StatusBar,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { connect } from 'utilities';
import { IAppState } from '@store/AppStore';
import { NetworkRequestState, Catalog, getHomeCatalogs, Shoe } from 'business';
import { toggleIndicator } from 'actions';
import { strings, themes } from '@resources';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from 'navigations/RootStack';
import RouteNames from 'navigations/RouteNames';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  homeCatalogState: {
    state: NetworkRequestState;
    error?: any;
    catalogs?: {
      Nike: Catalog;
      Jordan: Catalog;
      adidas: Catalog;
      hot: Catalog;
    };
  };
  navigation: StackNavigationProp<RootStackParams, 'HomeTabMain'>;

  toggleLoadingIndicator: (isLoading: boolean, message: string) => void;
  getHomepageCatalogs(): void;
};

type ShoeCardProps = {
  shoe: Shoe;
  onPress: () => void;
};

@connect(
  (state: IAppState) => ({
    homeCatalogState: state.CatalogState.homepageCatalogState,
  }),
  (dispatch: Function) => ({
    toggleLoadingIndicator: (isLoading: boolean, message: string) => {
      dispatch(toggleIndicator({ isLoading, message }));
    },
    getHomepageCatalogs: () => {
      dispatch(getHomeCatalogs());
    },
  }),
)
export class HomeTabMain extends React.Component<Props> {
  public componentDidMount() {
    this.props.getHomepageCatalogs();
  }

  public componentDidUpdate(prevProps: Props) {
    const prevState = prevProps.homeCatalogState.state;
    const { homeCatalogState, toggleLoadingIndicator } = this.props;

    if (prevState === homeCatalogState.state) {
      return;
    }

    switch (homeCatalogState.state) {
      case NetworkRequestState.NOT_STARTED:
        break;
      case NetworkRequestState.REQUESTING:
        toggleLoadingIndicator(true, strings.PleaseWait);
        break;
      case NetworkRequestState.FAILED:
      case NetworkRequestState.SUCCESS:
      default:
        toggleLoadingIndicator(false, '');
        break;
    }
  }

  public render(): JSX.Element {
    const { homeCatalogState } = this.props;
    const { state } = homeCatalogState;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar barStyle={'dark-content'} />
        {state === NetworkRequestState.SUCCESS && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, marginBottom: 15 }}>
              {this._renderTrendingShoes()}
              {this._renderByBrand('Nike')}
              {this._renderByBrand('adidas')}
              {this._renderByBrand('Jordan')}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }

  private _renderTrendingShoes() {
    const hotCatalog = this.props.homeCatalogState.catalogs.hot;
    return (
      <View style={{ marginBottom: 20 }}>
        <AppText.Title1 style={styles.sectionTitle}>
          {hotCatalog.title}
        </AppText.Title1>
        <FlatList
          horizontal={true}
          keyExtractor={(itm, _) => itm._id}
          data={hotCatalog.products}
          renderItem={({ item }) => (
            <HotShoeLarge
              shoe={item}
              onPress={this._navigateToProductDetail.bind(this, item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        />
      </View>
    );
  }

  private _renderByBrand(brand: 'Nike' | 'adidas' | 'Jordan') {
    const catalog = this.props.homeCatalogState.catalogs[brand];
    return (
      <View style={{ marginVertical: 10 }}>
        <View style={styles.brandTitleContainer}>
          <AppText.Title2>{catalog.title}</AppText.Title2>
          <AppText.Footnote
            style={{ textDecorationLine: 'underline' }}
            onPress={this._seeMore.bind(this, catalog)}
          >
            {strings.SeeMore}
          </AppText.Footnote>
        </View>
        <FlatList
          horizontal={true}
          keyExtractor={(itm, _) => itm._id}
          data={catalog.products.slice(0, 10)}
          style={{ marginVertical: 20, paddingLeft: 20 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <HotShoeRegular
              shoe={item}
              onPress={this._navigateToProductDetail.bind(this, item)}
            />
          )}
        />
      </View>
    );
  }

  private _navigateToProductDetail(shoe: Shoe) {
    this.props.navigation.push(RouteNames.Product.Name, {
      screen: RouteNames.Product.ProductDetail,
      params: { shoe },
    });
  }

  private _seeMore(catalog: Catalog) {
    this.props.navigation.push(RouteNames.Tab.HomeTab.SeeMore, { catalog });
  }
}

const HotShoeLarge = ({ shoe, onPress }: ShoeCardProps): JSX.Element => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.hotShoeContainer}>
      <View style={styles.hotShoeContentContainer}>
        <Image
          source={{ uri: shoe.imageUrl, cache: 'default' }}
          style={styles.shoeImage}
          resizeMode={'contain'}
        />
        <AppText.Title3
          numberOfLines={2}
          style={styles.hotShoeTitle}
          ellipsizeMode={'tail'}
        >
          {shoe.title}
        </AppText.Title3>
      </View>
    </View>
  </TouchableOpacity>
);

const HotShoeRegular = ({ shoe, onPress }: ShoeCardProps): JSX.Element => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ width: 145, marginRight: 30 }}>
      <Image
        source={{ uri: shoe.imageUrl }}
        style={{ width: 140, height: 120 }}
        resizeMode={'contain'}
      />
      <AppText.Subhead
        numberOfLines={2}
        ellipsizeMode={'tail'}
        style={{ marginTop: 25 }}
      >
        {shoe.title}
      </AppText.Subhead>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  hotShoeContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  hotShoeContentContainer: {
    borderColor: themes.DisabledColor,
    borderWidth: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height * 0.3,
    paddingBottom: 8,
    borderRadius: 20,
  },
  shoeImage: {
    flex: 1,
    width: 250,
    height: 200,
    marginVertical: 5,
  },
  hotShoeTitle: {
    textAlign: 'center',
    maxWidth: '85%',
  },
  sectionTitle: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  brandTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
