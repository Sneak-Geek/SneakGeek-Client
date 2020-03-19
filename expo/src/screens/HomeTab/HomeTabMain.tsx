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
import { strings } from '@resources';
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

  toggleLoadingIndicator: (isLoading: boolean, message: string) => void;
  getHomepageCatalogs(): void;
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
      <View>
        <AppText.Title1 style={styles.sectionTitle}>
          {hotCatalog.title}
        </AppText.Title1>
        <FlatList
          horizontal={true}
          keyExtractor={(itm, _) => itm._id}
          data={hotCatalog.products}
          renderItem={({ item }) => <HotShoe shoe={item} />}
          contentContainerStyle={{ paddingBottom: 15 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  private _renderByBrand(brand: 'Nike' | 'adidas' | 'Jordan') {
    const catalog = this.props.homeCatalogState.catalogs[brand];
  }
}

const HotShoe = ({ shoe }: { shoe: Shoe }): JSX.Element => (
  <View style={styles.hotShoeContainer}>
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
);

const styles = StyleSheet.create({
  hotShoeContainer: {
    width: Dimensions.get('window').width,
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  shoeImage: {
    flex: 1,
    width: 300,
    height: 200,
    marginVertical: 5,
  },
  hotShoeTitle: {
    textAlign: 'center',
    maxWidth: '85%',
  },
  sectionTitle: {
    margin: 15,
  },
});
