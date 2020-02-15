import * as React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { NavigationRoute, NavigationScreenProp, NavigationScreenProps, StackActions } from "react-navigation";
import * as Assets from "../../Assets";
import { SellOrder } from "../../Shared/Model";
import { StringUtils } from "../../Utilities";
import { TextInput } from "react-native-gesture-handler";
import { container, Types } from "../../Config/Inversify";
import { IAppSettingsService } from "../../Service/AppSettingsService";
import { CustomPicker } from "../../Shared/UI";

export interface IOrderSellScreenProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  navigateToTrackingSell: (sellOrder: SellOrder) => void;
  navigateToEditOrder: (sellOrder: SellOrder) => void;
}

export interface IOrderSellScreenState {
  edit: boolean;
  isModalOpen: boolean;
  selectedDuration?: string;
}
export class OrderSellScreen extends React.Component<IOrderSellScreenProps, IOrderSellScreenState> {
  public static navigationOptions = (transitionProp: NavigationScreenProps) => ({
    title: "Bán sản phẩm",
    headerLeft: (
      <Icon
        type={"ionicon"}
        name={"ios-arrow-back"}
        size={28}
        containerStyle={{ marginLeft: 10 }}
        onPress={() => transitionProp.navigation.dispatch(StackActions.pop({ n: 1 }))}
      />
    ),
    headerRight: (
      <TouchableOpacity style={{ paddingRight: 20 }}>
        <Image source={Assets.Icons.Edit} style={{ width: 24, height: 24, resizeMode: "contain" }} />
      </TouchableOpacity>
    )
  });

  private sellOrder: SellOrder;

  public constructor(props: IOrderSellScreenProps) {
    super(props);
    this.sellOrder = this.props.navigation.getParam("sellOrder");
    this.state = {
      edit: false,
      isModalOpen: false
    };
  }

  public render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <ScrollView>
            {this.renderShoe()}
            {this.renderInfo()}
          </ScrollView>
          {this.renderButton()}
          {this._renderPickerModal()}
        </View>
      </SafeAreaView>
    );
  }

  private renderShoe() {
    const shoe = this.sellOrder.shoe?.[0];
    return (
      <TouchableOpacity style={styles.topContentContainer} onPress={() => this.setState({ edit: !this.state.edit })}>
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

  private renderInfo() {
    const latestPrice = this.sellOrder.priceHistory!.sort(
      (x, y) => new Date(y.updatedAt).getTime() - new Date(x.updatedAt).getTime()
    )[0].price;
    const price = this.sellOrder.priceHistory![0].price;
    const { shoeSize, shoeCondition, otherDetail, sellDuration } = this.sellOrder;
    return (
      <View style={styles.middleContainer}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.subTitle}>Giá đăng</Text>
            {this.state.edit ? (
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(196,196,196,0.1)",
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  paddingLeft: 5,
                  flex: 1
                }}
              >
                <Text style={[styles.descrip, { paddingRight: 5 }]}>VND</Text>
                <TextInput
                  keyboardType={"numeric"}
                  placeholder={StringUtils.toCurrencyString(price.toString())}
                  style={{ flex: 1, fontSize: 22, fontFamily: "RobotoCondensed-Regular" }}
                />
              </View>
            ) : (
              <Text style={styles.descrip}>VND {StringUtils.toCurrencyString(price.toString())}</Text>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.subTitle, { textAlign: "right" }]}>Giá đề nghị</Text>
            <Text style={[styles.descrip, { textAlign: "right" }]}>
              VND {StringUtils.toCurrencyString(latestPrice!.toString())}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.subTitle}>Thời gian đăng</Text>
            {this.state.edit ? (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(196,196,196,0.1)",
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  flex: 1
                }}
                onPress={() => this.setState({ isModalOpen: true })}
              >
                <Text style={styles.descrip}>
                  {sellDuration?.duration} {sellDuration?.unit}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.descrip}>
                {sellDuration?.duration} {sellDuration?.unit}
              </Text>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.subTitle, { textAlign: "right" }]}>Tình trạng</Text>
            <TouchableOpacity onPress={() => this.props.navigateToTrackingSell(this.sellOrder)}>
              <Text style={[styles.descrip, { textAlign: "right", color: "#007AFF" }]}>Đã xác thực</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.subTitle}>Mã đơn hàng</Text>
            <Text style={styles.descrip}>{this.sellOrder._id}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.subTitle}>Miêu tả</Text>
            {this.state.edit ? (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(196,196,196,0.1)",
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  paddingLeft: 5,
                  flex: 1
                }}
                activeOpacity={1}
                onPress={() => this.props.navigateToEditOrder(this.sellOrder)}
              >
                <Text style={styles.descrip}>
                  Cỡ {shoeSize}, {shoeCondition}, {otherDetail}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.descrip}>
                Cỡ {shoeSize}, {shoeCondition}, {otherDetail}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  }

  private renderButton() {
    return this.state.edit ? (
      <Button
        title="Xác nhận"
        buttonStyle={styles.authButtonContainer}
        titleStyle={{
          fontSize: 20,
          fontFamily: "RobotoCondensed-Regular"
        }}
      />
    ) : (
      <Button
        title="Huỷ giao dịch"
        buttonStyle={styles.authButtonContainer}
        titleStyle={{
          fontSize: 20,
          fontFamily: "RobotoCondensed-Regular"
        }}
      />
    );
  }

  private _renderPickerModal() {
    const settings = container.get<IAppSettingsService>(Types.IAppSettingsService).getSettings().RemoteSettings;

    const options = settings ? settings.sellDuration : [];

    return (
      <CustomPicker
        visible={this.state.isModalOpen}
        options={options.map(t => `${t.duration} ${t.unit}`)}
        optionLabelToString={item => item}
        onSelectPickerOK={(selectedValue: string) => {
          this.setState({ selectedDuration: selectedValue, isModalOpen: false }, () => {
            // const [duration, unit] = selectedValue.split(" ");
            // this.props.onSetSellDuration({ duration: parseInt(duration, 10), unit });
          });
        }}
        onSelectPickerCancel={() => this.setState({ isModalOpen: false })}
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
    paddingRight: 14,
    borderBottomColor: "black",
    borderBottomWidth: 1
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
