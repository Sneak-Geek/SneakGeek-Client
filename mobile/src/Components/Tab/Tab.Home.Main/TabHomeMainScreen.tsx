// !
// ! Copyright (c) 2019 - SneakGeek. All rights reserved
// !

import * as React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItemInfo,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Shoe } from "../../../Reducers";
import { ShoeCard, Text } from "../../../Shared/UI";
import * as Assets from "../../../Assets";

export interface ITabHomeMainScreenProps {
  shoes: Shoe[];
  fetchShoes: () => void;
  navigateToShoeDetail: (shoe: Shoe) => void;
}

export class TabHomeMainScreen extends React.Component<ITabHomeMainScreenProps> {
  public /** override */ componentDidMount() {
    this.props.shoes.length === 0 && this.props.fetchShoes();
  }

  public /** override */ render() {
    if (this.props.shoes.length === 0) {
      return (
        <SafeAreaView style={StyleSheet.absoluteFill}>
          <ActivityIndicator />
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this._renderTrendingShoes()}
          {this._renderUserCustomizeFeed()}
          {this._renderByBrand("Nike")}
          {this._renderByBrand("adidas")}
          {this._renderByBrand("Jordan", false)}
        </ScrollView>
      </SafeAreaView>
    );
  }

  private _renderTrendingShoes() {
    const shoesData = this.props.shoes.length > 8 ? this.props.shoes.slice(0, 8) : [];
    return (
      <View style={{ flex: 1 }}>
        <Text.LargeTitle style={styles.sectionTitle}>Đang hot</Text.LargeTitle>
        <FlatList
          horizontal={true}
          data={shoesData}
          keyExtractor={(shoe: Shoe, _idx: number) => shoe.title}
          renderItem={this._renderTrendingShoe.bind(this)}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        />
        {this._renderDivider()}
      </View>
    );
  }

  private _renderDivider() {
    return <View style={styles.divider} />;
  }

  private _renderUserCustomizeFeed() {
    const { shoes } = this.props;
    const shoesData = shoes.length > 22 ? shoes.slice(15, 22) : [];

    return (
      <View style={{ flex: 1 }}>
        <Text.Title2 style={styles.subtitle}>Dành cho bạn</Text.Title2>
        <FlatList
          horizontal={true}
          data={shoesData}
          keyExtractor={(shoe: Shoe, _idx: number) => shoe.title}
          renderItem={({ item }) => (
            <ShoeCard shoe={item} onPress={() => this.props.navigateToShoeDetail(item)} />
          )}
          showsHorizontalScrollIndicator={false}
        />
        {this._renderDivider()}
      </View>
    );
  }

  private _renderByBrand(brandName: string, shouldRenderDivider: boolean = true) {
    const shoesData =
      this.props.shoes.length > 0
        ? this.props.shoes
            .filter(s => s.brand.toLowerCase() === brandName.toLowerCase())
            .splice(0, 5)
        : [];

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => {}}>
          <Text.Title2 style={styles.subtitle}>{brandName} - Nổi bật</Text.Title2>
        </TouchableOpacity>
        <FlatList
          horizontal={true}
          data={shoesData}
          keyExtractor={(shoe: Shoe, _idx: number) => shoe.title}
          renderItem={({ item }) => (
            <ShoeCard shoe={item} onPress={() => this.props.navigateToShoeDetail(item)} />
          )}
          showsHorizontalScrollIndicator={false}
        />
        {shouldRenderDivider && this._renderDivider()}
      </View>
    );
  }

  private _renderTrendingShoe(listData: ListRenderItemInfo<Shoe>) {
    const shoe = listData.item;

    return (
      <View style={styles.shoeCardListItem}>
        <View style={styles.shoeCardContainer}>
          <Image
            source={{ uri: shoe.imageUrl, cache: "default" }}
            style={styles.shoeCard}
            resizeMode={"center"}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigateToShoeDetail(shoe);
            }}
          >
            <Text.Headline numberOfLines={2} style={styles.shoeTitle} ellipsizeMode={"tail"}>
              {shoe.title}
            </Text.Headline>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  divider: {
    flex: 1,
    height: 0.5,
    backgroundColor: "#BCBBC1",
    marginVertical: 20,
    marginHorizontal: 17
  },
  sectionTitle: {
    fontSize: 28,
    marginLeft: 15,
    marginVertical: 25
  },

  shoeCardListItem: {
    width: Dimensions.get("window").width
  },

  shoeCardContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Assets.Styles.ButtonBorderRadius,
    paddingBottom: 10
  },

  shoeCard: {
    flex: 1,
    width: 200,
    height: 100,
    marginVertical: 25
  },
  shoeTitle: {
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 25
  },

  subtitle: {
    fontSize: 20,
    marginLeft: 20,
    marginVertical: 25
  }
});
