// !
// ! Copyright (c) 2019 - SneakGeek. All rights reserved
// !

import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Shoe } from "../../../Shared/Model";
import { ShoeCard, Text } from "../../../Shared/UI";
import * as Assets from "../../../Assets";
import ViewPager from "@react-native-community/viewpager";

export interface ITabHomeMainScreenProps {
  shoes: Shoe[];
  fetchShoes: () => void;
  navigateToShoeDetail: (shoe: Shoe) => void;
}

export class TabHomeMainScreen extends React.Component<ITabHomeMainScreenProps> {
  public /** override */ componentDidMount() {
    if (this.props.shoes.length === 0) {
      this.props.fetchShoes();
    }
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
        <ViewPager
          initialPage={0}
          scrollEnabled={true}
          showPageIndicator={true}
          style={{ flex: 1, width: "100%", minHeight: 300 }}
          pageMargin={10}
          orientation={"horizontal"}
          transitionStyle={"scroll"}
        >
          {shoesData.map((t, i) => this._renderTrendingShoe(t, i))}
        </ViewPager>
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
          renderItem={({ item }) => <ShoeCard shoe={item} onPress={() => this.props.navigateToShoeDetail(item)} />}
          showsHorizontalScrollIndicator={false}
        />
        {this._renderDivider()}
      </View>
    );
  }

  private _renderByBrand(brandName: string, shouldRenderDivider: boolean = true) {
    const shoesData =
      this.props.shoes.length > 0
        ? this.props.shoes.filter(s => s.brand.toLowerCase() === brandName.toLowerCase()).splice(0, 5)
        : [];

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => {}}>
          <Text.Title2 style={styles.subtitle}>{brandName} - Nổi bật</Text.Title2>
        </TouchableOpacity>
        <FlatList
          horizontal={true}
          data={shoesData}
          keyExtractor={(shoe: Shoe, _: number) => shoe.title}
          renderItem={({ item }) => <ShoeCard shoe={item} onPress={() => this.props.navigateToShoeDetail(item)} />}
          showsHorizontalScrollIndicator={false}
        />
        {shouldRenderDivider && this._renderDivider()}
      </View>
    );
  }

  private _renderTrendingShoe(shoe: Shoe, index: number) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigateToShoeDetail(shoe);
        }}
        style={styles.shoeCardListItem}
        key={index + 1}
      >
        <Image source={{ uri: shoe.imageUrl, cache: "default" }} style={styles.shoeCard} resizeMode={"center"} />
        <Text.Headline numberOfLines={2} style={styles.shoeTitle} ellipsizeMode={"tail"}>
          {shoe.title}
        </Text.Headline>
      </TouchableOpacity>
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
    marginHorizontal: 5
  },
  sectionTitle: {
    fontSize: 28,
    marginLeft: 15,
    marginVertical: 15
  },

  shoeCardListItem: {
    width: Dimensions.get("window").width,
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Assets.Styles.ButtonBorderRadius
  },

  shoeCard: {
    flex: 1,
    width: 300,
    height: 150,
    marginVertical: 5
  },
  shoeTitle: {
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 25,
    marginTop: 15
  },

  subtitle: {
    fontSize: 20,
    marginLeft: 20
  }
});
