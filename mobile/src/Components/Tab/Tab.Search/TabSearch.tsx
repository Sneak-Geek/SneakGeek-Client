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
  TouchableOpacity,
  Keyboard,
  Modal,
  Image
} from "react-native";
import { Input, Icon } from "react-native-elements";
import { BlurView } from "@react-native-community/blur";
import { Shoe } from "../../../Shared/Model";
import { ShoeCard, Text } from "../../../Shared/UI";
import { SearchShoePayload } from "../../../Shared/Payload";
import * as Assets from "../../../Assets";

export interface ISearchScreenProps {
  shoes: Shoe[];
  searchResult: SearchShoePayload;
  navigation?: NavigationScreenProp<NavigationRoute>;

  onShoeClick: (forSell: boolean, shoe: Shoe) => void;
  search: (key: string) => void;
  test: () => void;
}

interface ISearchScreenState {
  searchKey: string;
  searchFocus: boolean;
  shouldRenderTopShoes: boolean;
  shouldOpenSell: boolean;
  showModal: boolean;
  fillPrice: string;
  fillGender: string;
  fillCondition: string;
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
    this.isForSell = this.props.navigation
      ? this.props.navigation.getParam("isForSell") === true
      : false;
    this.state = {
      searchKey: "",
      searchFocus: false,
      shouldRenderTopShoes: true,
      shouldOpenSell: this.isForSell,
      showModal: false,
      fillPrice: "highToLow",
      fillGender: 'male',
      fillCondition: 'new'
    };
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
            <View>
              {this._renderHotKeywords()}
              {isSearchReady ? this._renderSearchResult() : this._renderTopShoes()}
              {this.state.showModal && this._renderModal()}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  public componentDidUpdate(prevProps: ISearchScreenProps) {
    const isForSell = prevProps.navigation ? prevProps.navigation.getParam("isForSell") : false;
    if (typeof isForSell === "boolean" && isForSell !== this.state.shouldOpenSell) {
      this.setState({
        shouldOpenSell: isForSell
      });
    }
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
        onSubmitEditing={this._onEndEditing.bind(this)}
      />
    );
  }

  private _renderSearchContent(): React.ReactNode {
    const { searchResult } = this.props;
    return (
      <BlurView blurType={"light"} blurAmount={20} style={styles.searchContainer}>
        {searchResult.shoes && (
          <FlatList
            onScroll={_evt => Keyboard.dismiss()}
            keyboardShouldPersistTaps={"always"}
            style={{ borderBottomWidth: 1, borderBottomColor: "black" }}
            data={searchResult.shoes}
            keyExtractor={(shoe, _index) => shoe.title}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.props.onShoeClick(this.state.shouldOpenSell, item)}
              >
                <Text.Callout style={styles.searchResult}>{item.title}</Text.Callout>
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
        <Icon type={"ionicon"} name={"md-options"} size={20}
          // onPress={() => this.setState({ showModal: !this.state.showModal })}
          onPress={() => this.props.test()}
        />
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
          <ShoeCard shoe={item} onPress={() => onShoeClick(this.state.shouldOpenSell, item)} />
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
          <ShoeCard
            shoe={item}
            onPress={() => this.props.onShoeClick(this.state.shouldOpenSell, item)}
          />
        )}
        numColumns={2}
        style={{ marginTop: 30 }}
      />
    );
  }

  private _renderModal(): React.ReactNode {
    return (
      <Modal
        presentationStyle={"overFullScreen"}
        visible={this.state.showModal}
        transparent={true}
        animationType={"fade"}
        animated={true}
      >
        <View style={{ flex: 1, }}>
          <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ showModal: false })} style={{ height: 140, backgroundColor: 'transparent' }} />
          <ScrollView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)' }}>
            <View style={{ paddingHorizontal: 20, paddingTop: 37, flex: 1 }}>
              {this._renderFillPrice()}
              {this._renderFillGender()}
              {this._renderFillCondition()}
              <View style={{ paddingTop: 30, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <Text.Title1 style={{ color: 'white', fontSize: 14 }}>LOẠI GIÀY</Text.Title1>
                <Image source={Assets.Icons.RightArrow} style={{ width: 12, height: 20, resizeMode: 'contain' }} />
              </View>
              <View style={{ paddingTop: 30, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <Text.Title1 style={{ color: 'white', fontSize: 14 }}>MÀU SẮC</Text.Title1>
                <View>
                  <Text.Body style={{ color: Assets.Styles.AppPrimaryColor }}>Xanh lá, đen, trắng</Text.Body>
                </View>
              </View>
              <View style={{ paddingTop: 30, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <Text.Title1 style={{ color: 'white', fontSize: 14 }}>CỠ GIÀY</Text.Title1>
                <View>
                  <Text.Body style={{ color: Assets.Styles.AppPrimaryColor }}>8.0, 8.5, 9, 9.5</Text.Body>
                </View>
              </View>
              <View style={{ paddingTop: 30, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <Text.Title1 style={{ color: 'white', fontSize: 14 }}>THƯƠNG HIỆU</Text.Title1>
                <View>
                  <Text.Body style={{ color: Assets.Styles.AppPrimaryColor }}>Nike, Adidas, Puma</Text.Body>
                </View>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity style={{ paddingBottom: 23, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.85)' }} activeOpacity={1}>
            <Text.Body style={{ fontSize: 20, color: 'white' }}>Xem kết quả</Text.Body>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  _renderFillPrice() {
    let { fillPrice } = this.state;
    return (
      <View>
        <Text.Title1 style={{ color: 'white', fontSize: 14 }}>SẮP XẾP THEO</Text.Title1>
        <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 37 }}>
          <TouchableOpacity
            style={[fillPrice === "lowToHigh" ? styles.buttonSelected : styles.button, { marginRight: 7.5 }]}
            onPress={() => this.setState({ fillPrice: "lowToHigh" })}
          >
            <Text.Body style={fillPrice === "lowToHigh" ? styles.titleSelected : styles.title}>Giá (Thấp - Cao)</Text.Body>
            {fillPrice === "lowToHigh" &&
              <Image source={Assets.Icons.CheckMark} style={styles.icon} />
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={[fillPrice === "highToLow" ? styles.buttonSelected : styles.button, { marginLeft: 7.5 }]}
            onPress={() => this.setState({ fillPrice: "highToLow" })}
          >
            <Text.Body style={fillPrice === "highToLow" ? styles.titleSelected : styles.title}>Giá (Cao - Thấp)</Text.Body>
            {fillPrice === "highToLow" &&
              <Image source={Assets.Icons.CheckMark} style={styles.icon} />
            }
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _renderFillGender() {
    let { fillGender } = this.state;
    return (
      <View>
        <Text.Title1 style={{ color: 'white', fontSize: 14 }}>GIỚI TÍNH</Text.Title1>
        <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 37 }}>
          <TouchableOpacity
            style={[fillGender === "male" ? styles.buttonSelected : styles.button, { marginRight: 7.5 }]}
            onPress={() => this.setState({ fillGender: "male" })}
          >
            <Text.Body style={fillGender === "male" ? styles.titleSelected : styles.title}>Nam</Text.Body>
            {fillGender === "male" &&
              <Image source={Assets.Icons.CheckMark} style={styles.icon} />
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={[fillGender === "female" ? styles.buttonSelected : styles.button, { marginLeft: 7.5 }]}
            onPress={() => this.setState({ fillGender: "female" })}
          >
            <Text.Body style={fillGender === "female" ? styles.titleSelected : styles.title}>Nữ</Text.Body>
            {fillGender === "female" &&
              <Image source={Assets.Icons.CheckMark} style={styles.icon} />
            }
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _renderFillCondition() {
    let { fillCondition } = this.state;
    return (
      <View>
        <Text.Title1 style={{ color: 'white', fontSize: 14 }}>TÌNH TRẠNG</Text.Title1>
        <View style={{ flexDirection: 'row', paddingTop: 20 }}>
          <TouchableOpacity
            style={[fillCondition === "new" ? styles.buttonSelected : styles.button, { marginRight: 7.5 }]}
            onPress={() => this.setState({ fillCondition: "new" })}
          >
            <Text.Body style={fillCondition === "new" ? styles.titleSelected : styles.title}>Mới</Text.Body>
            {fillCondition === "new" &&
              <Image source={Assets.Icons.CheckMark} style={styles.icon} />
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={[fillCondition === "old" ? styles.buttonSelected : styles.button, { marginLeft: 7.5 }]}
            onPress={() => this.setState({ fillCondition: "old" })}
          >
            <Text.Body style={fillCondition === "old" ? styles.titleSelected : styles.title}>VSNKRS xác nhận</Text.Body>
            {fillCondition === "old" &&
              <Image source={Assets.Icons.CheckMark} style={styles.icon} />
            }
          </TouchableOpacity>
        </View>
      </View>
    )
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
  },

  buttonSelected: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 2,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSelected: {
    color: 'black',
    fontSize: 14
  },
  button: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 2,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 14
  },
  icon: {
    position: 'absolute',
    right: 6,
    width: 17,
    height: 13,
    resizeMode: 'contain'
  }
});
