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
import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import { Input, Icon } from "react-native-elements";
import { BlurView } from "@react-native-community/blur";
import { Shoe } from "../../../Reducers";
import { ShoeCard } from "../../Shared";

export interface ISearchScreenProps {
  shoes: Shoe[];
  onShoeClick: (forSell: boolean, shoe: Shoe) => void;
  navigation?: NavigationScreenProp<NavigationRoute>;
}

interface ISearchScreenState {
  searchFocus: boolean;
  searchResult: Shoe[];
}

export default class TabSearch extends React.Component<ISearchScreenProps, ISearchScreenState> {
  static navigationOptions: NavigationScreenOptions = {
    tabBarIcon: ({ tintColor }) => {
      tintColor = tintColor as string;
      return <Icon type={"ionicon"} name="md-search" size={28} color={tintColor} />;
    }
  };

  private _searchInputComponent: Input | null = null;

  public constructor /** override */(props: any) {
    super(props);
    this.state = {
      searchFocus: false,
      searchResult: []
    };
  }

  public /** override */ render(): React.ReactNode {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this._renderSearchBar()}
        <View style={styles.contentContainer}>
          {this.state.searchFocus && this._renderSearchContent()}
          <ScrollView>
            {this._renderKeywordHeaderAndFilter()}
            {this._renderHotKeywords()}
            {this._renderTopShoes()}
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
      />
    );
  }

  private _renderSearchContent(): React.ReactNode {
    return (
      <BlurView
        blurType={"light"}
        blurAmount={80}
        style={[
          StyleSheet.absoluteFill,
          { zIndex: 100, paddingHorizontal: 25, paddingTop: 20 }
        ]}
      >
        <FlatList
          data={this.state.searchResult}
          keyExtractor={(shoe, _index) => shoe.title}
          renderItem={({ item }) => <Text style={styles.searchResult}>{item.title}</Text>}
          showsVerticalScrollIndicator={false}
        />
      </BlurView>
    );
  }

  private _renderKeywordHeaderAndFilter(): React.ReactNode {
    return (
      <View style={styles.keywordContainer}>
        <Text style={styles.keywordLabel}>Từ khoá hot</Text>
        <Icon type={"ionicon"} name={"md-options"} size={25} />
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
        <Text style={styles.keywordStyle}>{k}</Text>
      </View>
    ));

    return <View style={styles.buttonContainer}>{buttons}</View>;
  }

  private _toggleSearchFocus(): void {
    this.setState((prevState: ISearchScreenState) => {
      if (prevState.searchFocus && this._searchInputComponent) {
        this._searchInputComponent.blur();
        this._searchInputComponent.clear();
      }

      return {
        ...prevState,
        searchFocus: !prevState.searchFocus,
        searchResult: []
      };
    });
  }

  private _search(searchInput: string): void {
    if (this.props.shoes.length == 0) {
      return;
    }

    this.setState((prevState: ISearchScreenState) => ({
      ...prevState,
      searchResult: this.props.shoes.filter(s => s.title.indexOf(searchInput) >= 0).slice(0, 10)
    }));
  }

  private _renderTopShoes(): React.ReactNode {
    const { onShoeClick, navigation, shoes } = this.props;
    const topShoes: Shoe[] = shoes.length > 0 ? shoes.splice(0, 10) : [];
    const isForSell = navigation ? navigation.getParam("isForSell") === true : false;
    return (
      <FlatList
        data={topShoes}
        keyExtractor={(_data, index) => index.toString()}
        renderItem={({ item }) => (
          <ShoeCard shoe={item} onPress={() => onShoeClick(isForSell, item)} />
        )}
        contentContainerStyle={styles.gridContainer}
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

  keywordLabel: {
    fontSize: 16
  },

  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },

  keywordWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    marginLeft: 20,
    marginBottom: 15
  },

  keywordStyle: {
    textAlign: "center",
    fontSize: 14
  },

  searchResult: {
    marginVertical: 15,
    fontSize: 14
  },

  gridContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
