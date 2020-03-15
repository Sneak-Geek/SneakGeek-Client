import React from 'react';
import { ColumnShoeCard } from '@screens/Shared';
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  EmitterSubscription,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { SearchBar, Icon, ListItem, Button } from 'react-native-elements';
import { themes, strings } from '@resources';
import { IShoeService, ObjectFactory, FactoryKeys, Shoe } from 'business';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import RouteNames from 'navigations/RouteNames';

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
    padding: 20,
    position: 'relative',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  dropDownContainer: {
    position: 'absolute',
    top: 0,
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
});

type Props = {
  navigation: StackNavigationProp<any>;
};

type State = {
  searchText: string;
  isSearching: boolean;
  shoes: Shoe[];
  showDropDown: boolean;
  currentSearchPage: number;
  shouldSearchScrollEnd: boolean;
};

export class SearchTabMain extends React.Component<Props, State> {
  private _shoeService: IShoeService = ObjectFactory.getObjectInstance(
    FactoryKeys.IShoeService,
  );
  private _keyboardHideListener: EmitterSubscription;
  private _hotKeyWords = ['Nike', 'adidas', 'Jordan', 'Off-White'];

  state = {
    searchText: '',
    isSearching: false,
    shoes: [],
    showDropDown: false,
    currentSearchPage: 0,
    shouldSearchScrollEnd: true,
  };

  public componentDidMount() {
    this._keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.state.showDropDown && this.setState({ showDropDown: false });
    });
  }

  public componentWillUnmount() {
    this._keyboardHideListener.remove();
  }

  public render(): JSX.Element {
    return (
      <SafeAreaConsumer>
        {(insets): JSX.Element => (
          <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            {this._renderSearchHeader()}
            <View style={styles.pageContainer}>
              {this._renderSearchDropDown()}
              {this._renderHotKeywords()}
              {this._renderSearchResults()}
            </View>
          </View>
        )}
      </SafeAreaConsumer>
    );
  }

  private _renderSearchHeader(): JSX.Element {
    return (
      <View style={styles.searchBarRoot}>
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
          onCancel={() =>
            this.setState({ showDropDown: false, shouldSearchScrollEnd: true })
          }
          onClear={() =>
            this.setState({
              showDropDown: false,
              shoes: [],
              shouldSearchScrollEnd: true,
            })
          }
          onSubmitEditing={() => this.setState({ showDropDown: false })}
        />
        <Icon name={'sort'} size={themes.IconSize} />
      </View>
    );
  }

  private _renderHotKeywords(): JSX.Element {
    if (this.state.shoes.length > 0 && !this.state.showDropDown) {
      return null;
    }

    return (
      <View>
        <ScrollView horizontal style={{ flex: 1 }}>
          {this._hotKeyWords.map(k => (
            <Button
              type={'outline'}
              title={k}
              key={k}
              containerStyle={{ marginRight: 8 }}
              buttonStyle={{ borderColor: themes.AppSecondaryColor, borderWidth: 1 }}
              titleStyle={[
                themes.TextStyle.body,
                { color: themes.AppSecondaryColor },
              ]}
              onPress={() => {}}
            />
          ))}
        </ScrollView>
      </View>
    );
  }

  private _renderSearchDropDown(): JSX.Element {
    if (!this.state.showDropDown) {
      return null;
    }

    const renderLeftAvatar = (s: Shoe) => (
      <Image
        source={{ uri: s.imageUrl }}
        style={styles.thumbnail}
        resizeMode={'contain'}
      />
    );

    return (
      <View style={styles.dropDownContainer}>
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
      <View style={StyleSheet.absoluteFill} onTouchStart={() => Keyboard.dismiss()}>
        <FlatList
          data={this.state.shoes}
          keyExtractor={(item: Shoe, _: number) => item._id}
          renderItem={({ item }) => (
            <ColumnShoeCard shoe={item} onPress={() => this._goToProduct(item)} />
          )}
          numColumns={2}
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
          onEndReached={_ => this._search(this.state.searchText, true)}
        />
        {this.state.isSearching && <ActivityIndicator size={'small'} />}
      </View>
    );
  }

  private _search(text: string, scrollEnd: boolean = false): void {
    const {
      searchText,
      currentSearchPage,
      shoes,
      shouldSearchScrollEnd,
    } = this.state;
    const shouldSearch = text.length > searchText.length && text.length >= 3;

    this.setState(
      {
        showDropDown: shouldSearch,
        searchText: text,
        isSearching: shouldSearch,
        currentSearchPage: currentSearchPage + 1,
      },
      async () => {
        if (shouldSearch || (scrollEnd && shouldSearchScrollEnd)) {
          let newShoes = await this._shoeService.searchShoes(
            searchText,
            currentSearchPage,
          );
          const shouldSearchScrollEnd = !(
            newShoes.length === 0 && currentSearchPage > 0
          );
          newShoes = newShoes.filter(t => !shoes.some(old => old._id === t._id));
          this.setState({
            isSearching: false,
            shoes: [...shoes, ...newShoes],
            shouldSearchScrollEnd,
          });
        }
      },
    );
  }

  private _goToProduct(shoe: Shoe) {
    this.props.navigation.push(RouteNames.Product.Name, {
      screen: RouteNames.Product.ProductDetail,
      params: { shoe },
    });
  }
}
