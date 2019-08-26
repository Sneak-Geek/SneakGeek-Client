// !
// ! Copyright (c) 2019 - SneakGeek. All rights reserved
// !

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItemInfo,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TextProps,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Shoe } from "../../../Reducers";
import { ShoeCard } from "../../Shared";

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
        <ScrollView>
          {this._renderTrendingShoes()}
          {this._renderUserCustomizeFeed()}
          {this._renderByBrand("Nike")}
          {this._renderByBrand("adidas")}
          {this._renderByBrand("Jordan")}
        </ScrollView>
      </SafeAreaView>
    );
  }

  private _renderTrendingShoes() {
    const shoesData = this.props.shoes.length > 8 ? this.props.shoes.slice(0, 8) : [];
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>Đang hot</Text>
        <FlatList
          horizontal={true}
          data={shoesData}
          keyExtractor={(shoe: Shoe, _idx: number) => shoe.title}
          renderItem={this._renderTrendingShoesCard.bind(this)}
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
        <Text style={styles.subtitle}>Dành cho bạn</Text>
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

  private _renderByBrand(brandName: string) {
    const shoesData =
      this.props.shoes.length > 0
        ? this.props.shoes
            .filter(s => s.brand.toLowerCase() === brandName.toLowerCase())
            .splice(0, 5)
        : [];

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.subtitle}>{brandName} - Nổi bật</Text>
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
        {this._renderDivider()}
      </View>
    );
  }

  private _renderTrendingShoesCard(listData: ListRenderItemInfo<Shoe>) {
    const shoe = listData.item;

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigateToShoeDetail(shoe);
        }}
      >
        <View style={styles.shoeCardContainer}>
          <Image
            source={{ uri: shoe.imageUrl, cache: "default" }}
            style={styles.shoeCard}
            resizeMode={"contain"}
          />
          <Text style={styles.shoeTitle} numberOfLines={1} ellipsizeMode={"tail"}>
            {shoe.title}
          </Text>
        </View>
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
    marginVertical: 20
  },
  sectionTitle: {
    fontSize: 28,
    marginLeft: 15,
    marginVertical: 25
  },
  shoeCardContainer: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  shoeCard: {
    flex: 1,
    width: 300,
    height: 150,
    marginVertical: 25
  },
  shoeTitle: {
    fontSize: 20
  } as TextProps,

  subtitle: {
    fontSize: 20,
    marginLeft: 20,
    marginVertical: 25
  }
});
