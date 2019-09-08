//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import {
  NavigationScreenOptions,
  ScrollView,
  FlatList,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import {
  View,
  SafeAreaView,
  StyleSheet,
  NativeSyntheticEvent,
  TouchableOpacity
} from "react-native";
import { Input, Icon } from "react-native-elements";
import { BlurView } from "@react-native-community/blur";
import { Shoe } from "../../../Reducers";
import { ShoeCard } from "../../../Shared/UI";
import { SearchShoePayload } from "../../../Actions";
import * as Text from "../../../Shared/UI/Text";
import { Assets } from "../../../Assets";

export interface ISearchScreenProps {
  shoes: Shoe[];
  searchResult: SearchShoePayload;
  navigation?: NavigationScreenProp<NavigationRoute>;

  onShoeClick: (forSell: boolean, shoe: Shoe) => void;
  search: (key: string) => void;
}

interface ISearchScreenState {
  searchKey: string;
  searchFocus: boolean;
  shouldRenderTopShoes: boolean;
}

export default class TabSearch extends React.Component<ISearchScreenProps, ISearchScreenState> {
  static navigationOptions: NavigationScreenOptions = {
    tabBarIcon: ({ tintColor }) => {
      tintColor = tintColor as string;
      return <Icon type={"ionicon"} name="md-search" size={28} color={tintColor} />;
    }
  };

  private _searchInputComponent: Input | null = null;
  private isForSell: boolean = false;

  public constructor /** override */(props: any) {
    super(props);
    this.state = {
      searchKey: "",
      searchFocus: false,
      shouldRenderTopShoes: true
    };
    this.isForSell = this.props.navigation
      ? this.props.navigation.getParam("isForSell") === true
      : false;
  }

  public /** override */ render(): React.ReactNode {
    const { searchResult } = this.props;
    const isSearchReady = searchResult.shoes && searchResult.shoes.length > 0;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this._renderSearchBar()}
        <View style={styles.contentContainer}>
          {this.state.searchFocus &&
            searchResult.shoes &&
            searchResult.shoes.length > 0 &&
            this._renderSearchContent()}
          <ScrollView>
            {this._renderKeywordHeaderAndFilter()}
            {this._renderHotKeywords()}
            {isSearchReady ? this._renderSearchResult() : this._renderTopShoes()}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  private _renderSearchBar(): React.ReactNode {
    return (
      <Input
        ref={refInput => (this._searchInputComponent = refInput)}
        onFocus={_event => this.setState({ searchFocus: true })}
        placeholder={"Tìm kiếm"}
        leftIcon={<Icon type={"ionicon"} name={"md-search"} size={25} />}
        leftIconContainerStyle={{ marginRight: 20 }}
        rightIcon={
          this.state.searchFocus && (
            <Icon
              type={"ionicon"}
              name={"md-close"}
              size={25}
              onPress={this._toggleSearchFocus.bind(this)}
            />
          )
        }
        labelStyle={{ fontSize: 16 }}
        onChangeText={this._search.bind(this)}
        onEndEditing={this._onEndEditing.bind(this)}
      />
    );
  }

  private _renderSearchContent(): React.ReactNode {
    const { searchResult } = this.props;
    return (
      <BlurView blurType={"light"} blurAmount={20} style={styles.searchContainer}>
        {searchResult.shoes && (
          <FlatList
            keyboardShouldPersistTaps={"always"}
            style={{ borderBottomWidth: 1, borderBottomColor: "black" }}
            data={searchResult.shoes}
            keyExtractor={(shoe, _index) => shoe.title}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.props.onShoeClick(this.isForSell, item)}>
                <Text.Display style={styles.searchResult}>{item.title}</Text.Display>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </BlurView>
    );
  }

  private _renderKeywordHeaderAndFilter(): React.ReactNode {
    return (
      <View style={styles.keywordContainer}>
        <Text.Subhead>Từ khoá hot</Text.Subhead>
        <Icon type={"ionicon"} name={"md-options"} size={20} />
      </View>
    );
  }

  private _renderHotKeywords(): React.ReactNode {
    const keywords = [
      "Air Jordan",
      "Nike Air",
      "Adidas X",
      "Nike Air Max",
      "Yeezy Boost White"
    ];

    const buttons = keywords.map((k, idx) => (
      <View style={styles.keywordWrapper} key={idx}>
        <Text.Body style={styles.keywordStyle}>{k}</Text.Body>
      </View>
    ));

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {buttons}
      </ScrollView>
    );
  }

  private _toggleSearchFocus(shouldClearText: boolean = true): void {
    this.setState((prevState: ISearchScreenState) => {
      if (shouldClearText && prevState.searchFocus && this._searchInputComponent) {
        this._searchInputComponent.blur();
        this._searchInputComponent.clear();
      }

      return {
        ...prevState,
        searchFocus: !prevState.searchFocus
      };
    });
  }

  private _search(keyword: string): void {
    this.setState((prevState: ISearchScreenState) => {
      if (keyword.length > this.state.searchKey.length && keyword.length >= 3) {
        this.props.search(keyword);
      }

      return {
        ...prevState,
        searchKey: keyword,
        shouldRenderTopShoes: false
      };
    });
  }

  private _onEndEditing(_event: NativeSyntheticEvent<any>): void {
    this._toggleSearchFocus(false);
  }

  private _renderTopShoes(): React.ReactNode {
    const { onShoeClick, shoes } = this.props;
    const topShoes: Shoe[] = shoes.length > 0 ? shoes.slice(0, 10) : [];

    return (
      <FlatList
        data={topShoes}
        keyExtractor={(_data, index) => index.toString()}
        renderItem={({ item }) => (
          <ShoeCard shoe={item} onPress={() => onShoeClick(this.isForSell, item)} />
        )}
        numColumns={2}
        style={{ marginTop: 30 }}
      />
    );
  }

  private _renderSearchResult(): JSX.Element {
    const { searchResult } = this.props;
    const shoes = searchResult.shoes ? searchResult.shoes : [];
    return (
      <FlatList
        data={shoes}
        keyExtractor={(_data, index) => index.toString()}
        renderItem={({ item }) => (
          <ShoeCard shoe={item} onPress={() => this.props.onShoeClick(this.isForSell, item)} />
        )}
        numColumns={2}
        style={{ marginTop: 30 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    position: "relative",
    flex: 1
  },

  keywordContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  searchContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: 20
  },

  keywordWrapper: {
    height: Assets.Styles.ButtonHeight,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    marginLeft: 20,
    marginBottom: 15
  },

  keywordStyle: {
    textAlign: "center"
  },

  searchResult: {
    marginVertical: 15,
    marginHorizontal: 20,
    fontSize: 14
  }
});
