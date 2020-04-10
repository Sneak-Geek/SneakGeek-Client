import React from 'react';
import { ColumnShoeCard, AppText } from '@screens/Shared';
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  EmitterSubscription,
  Dimensions,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { SearchBar, Icon, ListItem, Button } from 'react-native-elements';
import { themes, strings } from '@resources';
import { IShoeService, ObjectFactory, FactoryKeys, Shoe } from 'business';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import RouteNames from 'navigations/RouteNames';
import { RootStackParams } from 'navigations/RootStack';

const styles = StyleSheet.create({
  rootContainer: { backgroundColor: 'white', flex: 1 },
  searchBarRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopColor: 'transparent',
    borderWidth: 0,
    borderBottomColor: 'transparent',
    flex: 1,
  },
  searchInputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  dropDownContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    maxHeight: Dimensions.get('window').height / 3,
    flex: 1,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: themes.DisabledColor,
    paddingBottom: 10,
    paddingHorizontal: 10,
    zIndex: 100,
    backgroundColor: 'white',
  },
  thumbnail: {
    width: 60,
    height: 40,
  },
  productNotFound: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    height: (themes.ButtonHeight * 2) / 3,
    borderTopColor: themes.AppPrimaryColor,
    borderBottomColor: themes.AppPrimaryColor,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    justifyContent: 'center',
    backgroundColor: 'white',
    zIndex: 100,
  },
});

type Props = {
  navigation: StackNavigationProp<RootStackParams, 'SearchTabMain'>;
};

type State = {
  searchText: string;
  isSearching: boolean;
  shoes: Shoe[];
  showDropDown: boolean;
  currentSearchPage: number;
  shouldSearchScrollEnd: boolean;
  searchBarYLocation?: number;
  filterVisible: boolean;
};

export class SearchTabMain extends React.Component<Props, State> {
  private _shoeService: IShoeService = ObjectFactory.getObjectInstance(
    FactoryKeys.IShoeService,
  );
  private _keyboardHideListener: EmitterSubscription;
  private _hotKeyWords = ['Nike', 'adidas', 'Jordan', 'Off-White'];

  state: State = {
    searchText: '',
    isSearching: false,
    shoes: [],
    showDropDown: false,
    currentSearchPage: 0,
    shouldSearchScrollEnd: true,
    filterVisible: false,
  };

  public componentDidMount(): void {
    this._keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.state.showDropDown && this.setState({ showDropDown: false });
    });
  }

  public componentWillUnmount(): void {
    this._keyboardHideListener.remove();
  }

  public render(): JSX.Element {
    return (
      <SafeAreaConsumer>
        {(insets): JSX.Element => (
          <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            {this._renderSearchHeader()}
            {this._renderSearchDropDown(insets.top)}
            <View style={styles.pageContainer}>{this._renderSearchResults()}</View>
            {this._renderProductRequest()}
            {this._renderFilterModal()}
          </View>
        )}
      </SafeAreaConsumer>
    );
  }

  private _renderSearchHeader(): JSX.Element {
    return (
      <View>
        <View
          style={styles.searchBarRoot}
          onLayout={(event: LayoutChangeEvent): void =>
            this.setState({
              searchBarYLocation: event.nativeEvent.layout.height,
            })
          }
        >
          <SearchBar
            placeholder={strings.SearchTab}
            lightTheme={true}
            round={true}
            value={this.state.searchText}
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInputContainer}
            searchIcon={{ size: themes.IconSize, name: 'search' }}
            inputStyle={themes.TextStyle.body}
            onChangeText={this._search.bind(this)}
            onCancel={(): void =>
              this.setState({ showDropDown: false, shouldSearchScrollEnd: true })
            }
            onClear={(): void =>
              this.setState({
                showDropDown: false,
                shoes: [],
                shouldSearchScrollEnd: true,
              })
            }
            onSubmitEditing={(): void => this.setState({ showDropDown: false })}
          />
          <Icon name={'sort'} size={themes.IconSize} />
        </View>
        {this._renderHotKeywords()}
      </View>
    );
  }

  private _renderHotKeywords(): JSX.Element {
    return (
      <ScrollView horizontal={true}>
        <View style={{ flexDirection: 'row', padding: 15 }}>
          {this._hotKeyWords.map(k => (
            <Button
              type={'outline'}
              title={k}
              key={k}
              containerStyle={{ marginRight: 8 }}
              buttonStyle={{
                borderColor: themes.AppSecondaryColor,
                borderWidth: 0.5,
              }}
              titleStyle={[
                themes.TextStyle.body,
                { color: themes.AppSecondaryColor },
              ]}
              onPress={(): void =>
                this.setState(
                  {
                    searchText: k,
                  },
                  () => {
                    this._search(k);
                  },
                )
              }
            />
          ))}
        </View>
      </ScrollView>
    );
  }

  private _renderSearchDropDown(topInset: number): JSX.Element {
    if (!this.state.showDropDown || !this.state.searchBarYLocation) {
      return null;
    }

    const renderLeftAvatar = (s: Shoe): JSX.Element => (
      <Image
        source={{ uri: s.imageUrl }}
        style={styles.thumbnail}
        resizeMode={'contain'}
      />
    );

    return (
      <View
        style={[
          styles.dropDownContainer,
          { top: this.state.searchBarYLocation + topInset },
        ]}
      >
        {this.state.isSearching && (
          <View style={{ marginVertical: 20 }}>
            <ActivityIndicator />
          </View>
        )}
        {this.state.shoes.length > 0 && (
          <ScrollView keyboardShouldPersistTaps={'always'}>
            {this.state.shoes.map((s: Shoe) => (
              <ListItem
                key={s._id}
                leftAvatar={renderLeftAvatar(s)}
                title={s.title}
                titleStyle={themes.TextStyle.subhead}
                accessible={true}
                onPress={() => this._goToProduct(s)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    );
  }

  private _renderSearchResults(): JSX.Element {
    if (this.state.showDropDown) {
      return null;
    }

    return (
      <View onTouchStart={(): void => Keyboard.dismiss()}>
        <FlatList
          data={this.state.shoes}
          keyExtractor={(item: Shoe): string => item._id}
          renderItem={({ item }): JSX.Element => (
            <ColumnShoeCard
              shoe={item}
              onPress={(): void => this._goToProduct(item)}
            />
          )}
          columnWrapperStyle={{ flex: 1, justifyContent: 'space-around' }}
          numColumns={2}
          onEndReached={(): Promise<void> =>
            this._search(this.state.searchText, true)
          }
          style={{ marginHorizontal: 5 }}
        />
        {this.state.isSearching && <ActivityIndicator size={'small'} />}
      </View>
    );
  }

  private async _search(text: string, scrollEnd = false): Promise<void> {
    const {
      searchText,
      currentSearchPage,
      shoes,
      shouldSearchScrollEnd,
    } = this.state;
    const shouldSearch = text.length >= searchText.length && text.length >= 3;

    this.setState({
      showDropDown: shouldSearch,
      searchText: text,
      isSearching: shouldSearch,
      currentSearchPage: currentSearchPage + 1,
    });

    if (shouldSearch || (scrollEnd && shouldSearchScrollEnd)) {
      let newShoes = await this._shoeService.searchShoes(
        searchText,
        currentSearchPage,
      );
      const shouldSearchScrollEnd = !(newShoes.length === 0 && currentSearchPage > 0);
      newShoes = newShoes.filter(t => !shoes.some(old => old._id === t._id));
      this.setState({
        isSearching: false,
        shoes: [...shoes, ...newShoes],
        shouldSearchScrollEnd,
      });
    }
  }

  private _goToProduct(shoe: Shoe): void {
    this.props.navigation.push(RouteNames.Product.Name, {
      screen: RouteNames.Product.ProductDetail,
      params: { shoe },
    });
  }

  private _renderProductRequest(): JSX.Element {
    return (
      <TouchableWithoutFeedback
        onPress={(): void =>
          this.props.navigation.push(RouteNames.Tab.SearchTab.ProductRequest)
        }
      >
        <View style={styles.productNotFound}>
          <AppText.Callout style={{ color: themes.AppPrimaryColor }}>
            {strings.ProductNotFound}
          </AppText.Callout>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  private _renderFilterModal(): JSX.Element {
    return (
      <Modal visible={this.state.filterVisible}>// TODO: render search here</Modal>
    );
  }
}
