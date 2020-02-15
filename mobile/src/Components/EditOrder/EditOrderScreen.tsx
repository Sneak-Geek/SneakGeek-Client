import * as React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { NavigationRoute, NavigationScreenProp, NavigationScreenProps, StackActions } from "react-navigation";
import * as Assets from "../../Assets";
import { SellOrder } from "../../Shared/Model";
import { ShoeConditionExtraInfoComponent, ShoeConditionRequiredInfoComponent } from "../SellDetail/ChildComponents";

export interface IEditOrderScreenProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  navigateToTrackingSell: (sellOrder: SellOrder) => void;
}

export interface IEditOrderScreenState {
  sellOrderInfo: SellOrder;
}

export class EditOrderScreen extends React.Component<IEditOrderScreenProps, IEditOrderScreenState> {
  public static navigationOptions = (transitionProp: NavigationScreenProps) => ({
    title: "Sửa đơn hàng",
    headerLeft: (
      <Icon
        type={"ionicon"}
        name={"ios-arrow-back"}
        size={28}
        containerStyle={{ marginLeft: 10 }}
        onPress={() => transitionProp.navigation.dispatch(StackActions.pop({ n: 1 }))}
      />
    )
  });

  private sellOrder: SellOrder;

  public constructor(props: IEditOrderScreenProps) {
    super(props);
    this.sellOrder = this.props.navigation.getParam("sellOrder");
    this.state = {
      sellOrderInfo: this.props.navigation.getParam("sellOrder")
    };
  }

  public render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          {this.renderShoe()}
          <ScrollView
            style={{ paddingTop: 28 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            <ShoeConditionRequiredInfoComponent
              onSetShoeSize={this._setShoeSize.bind(this)}
              onSetShoeCondition={this._setShoeCondition.bind(this)}
              onSetBoxCondition={this._setBoxCondition.bind(this)}
            />
            <ShoeConditionExtraInfoComponent
              onSetShoeHeavilyTorn={this._setShoeHeavilyTorn.bind(this)}
              onSetShoeInsoleWorn={this._setShoeInsoleWorn.bind(this)}
              onSetShoeOutsoleWorn={this._setShoeOutsoleWorn.bind(this)}
              onSetShoeTainted={this._setShoeTainted.bind(this)}
              onSetShoeOtherDetail={this._setShoeOtherDetail.bind(this)}
            />
          </ScrollView>
        </View>
        {this.renderButton()}
      </SafeAreaView>
    );
  }

  private renderShoe() {
    const shoe = this.sellOrder.shoe?.[0];
    return (
      <TouchableOpacity style={styles.topContentContainer}>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri: shoe!.imageUrl }} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {shoe!.title}
          </Text>
          <Text style={[styles.title, { fontSize: 16 }]}>SKU: {this.sellOrder.shoeId}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  private _setShoeSize(shoeSize: string) {
    this.setState(prevState => ({
      sellOrderInfo: {
        shoeSize,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setBoxCondition(boxCondition: string) {
    this.setState(prevState => ({
      sellOrderInfo: {
        boxCondition,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setShoeCondition(shoeCondition: string) {
    this.setState(prevState => ({
      sellOrderInfo: {
        shoeCondition,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setShoeHeavilyTorn(isHeavilyTorn: boolean) {
    this.setState(prevState => ({
      sellOrderInfo: {
        isHeavilyTorn,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setShoeInsoleWorn(isInsoleWorn: boolean) {
    this.setState(prevState => ({
      sellOrderInfo: {
        isInsoleWorn,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setShoeOutsoleWorn(isOutsoleWorn: boolean) {
    this.setState(prevState => ({
      sellOrderInfo: {
        isOutsoleWorn,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setShoeTainted(isShoeTainted: boolean) {
    this.setState(prevState => ({
      sellOrderInfo: {
        isShoeTainted,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private _setShoeOtherDetail(otherDetail: string) {
    this.setState(prevState => ({
      sellOrderInfo: {
        otherDetail,
        ...prevState.sellOrderInfo
      }
    }));
  }

  private renderButton() {
    return (
      <Button
        title="Xác nhận"
        buttonStyle={styles.authButtonContainer}
        titleStyle={{
          fontSize: 20,
          fontFamily: "RobotoCondensed-Regular"
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  contentContainer: {
    flex: 1
  },
  topContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 14
  },
  imgContainer: {
    width: 78,
    height: 78,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 78,
    height: 78,
    resizeMode: "contain"
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 17,
    paddingBottom: 7
  },
  title: {
    fontFamily: "RobotoCondensed-Regular",
    fontSize: 14,
    paddingTop: 20
  },
  middleContainer: {
    paddingTop: 30,
    paddingHorizontal: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 17
  },
  subTitle: {
    fontFamily: "RobotoCondensed-Regular",
    fontSize: 16,
    opacity: 0.6
  },
  descrip: {
    fontFamily: "RobotoCondensed-Regular",
    fontSize: 20,
    paddingTop: 8
  },
  authButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: Assets.Styles.ButtonHeight,
    backgroundColor: "#FF2D55"
  }
});
