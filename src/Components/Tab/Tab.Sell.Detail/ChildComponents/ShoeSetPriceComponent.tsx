//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Modal,
  Picker,
  SafeAreaView
} from "react-native";
import { Button } from "react-native-elements";
import { LineChart, Grid, YAxis } from "react-native-svg-charts";
import * as StringUtil from "../../../../Utilities/StringFormatterUtil";

interface State {
  isModalOpen: boolean;
  selectedDuration: string;
  shoePrice: string;
}

interface Props {
  onSetShoePrice: (price: number) => void;
  onSetSellDuration: (sellDuration: { duration: number; unit: string }) => void;
}

export class ShoeSetPriceComponent extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedDuration: "",
      shoePrice: ""
    };
  }

  public /** override */ render(): JSX.Element {
    return (
      <ScrollView style={{ flex: 1, width: Dimensions.get("screen").width }}>
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {this._renderPickerModal()}
          {this._renderSetPrice()}
          {this._renderPriceChart()}
          {this._renderPriceLoHi()}
          {this._renderSellDuration()}
        </View>
      </ScrollView>
    );
  }

  private _renderSetPrice(): JSX.Element {
    return (
      <View style={[styles.rowSeparatedContainer, { marginVertical: 15 }]}>
        <Text style={[styles.fontTitle, { textAlignVertical: "center" }]}>Đặt giá bán</Text>
        <View style={styles.rowSeparatedContainer}>
          <Text style={{ textAlign: "center" }}>VND</Text>
          <TextInput
            keyboardType={"numeric"}
            onChangeText={text =>
              this.setState({
                shoePrice: text
              })
            }
            value={this.state.shoePrice}
            onEndEditing={() => {
              const shoePrice = this.state.shoePrice;
              this.props.onSetShoePrice(parseInt(shoePrice));
              this.setState({
                shoePrice: StringUtil.toCurrencyString(shoePrice)
              });
            }}
            onFocus={() => {
              this.setState({ shoePrice: "" });
            }}
            placeholder={StringUtil.toCurrencyString("1000000")}
            style={[{ marginLeft: 5 }, styles.fontTitle]}
          />
        </View>
      </View>
    );
  }

  private _renderPriceChart(): JSX.Element | null {
    const data = [50, 40, 95, 85, 100];
    const contentInset = { top: 20, bottom: 20 };

    return (
      <View style={{ height: 200, flexDirection: "row" }}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{
            fill: "grey",
            fontSize: 10
          }}
          numberOfTicks={5}
        />
        <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={data}
          svg={{ stroke: "#1ABC9C", strokeWidth: 3, strokeLinecap: "round" }}
          contentInset={contentInset}
          numberOfTicks={5}
        >
          <Grid />
        </LineChart>
      </View>
    );
  }

  private _renderPriceLoHi(): JSX.Element {
    return (
      <View style={[styles.rowSeparatedContainer, { marginVertical: 15 }]}>
        <View>
          <Text style={styles.fontSubtitle}>Giá thấp nhất</Text>
          <Text>
            VND
            <Text style={styles.fontTitle}> 1,200,000</Text>
          </Text>
        </View>
        <View>
          <Text style={[styles.fontSubtitle, { textAlign: "right" }]}>Giá cao nhất</Text>
          <Text style={{ textAlign: "right" }}>
            VND
            <Text style={styles.fontTitle}> 1,800,000</Text>
          </Text>
        </View>
      </View>
    );
  }

  private _renderSellDuration(): JSX.Element {
    return (
      <View style={[styles.rowSeparatedContainer, { marginVertical: 15 }]}>
        <Text style={styles.fontTitle}>Thời gian đăng</Text>
        <TouchableOpacity onPress={() => this.setState({ isModalOpen: true })}>
          <Text style={styles.textPicker}>{this.state.selectedDuration || "Lựa chọn"}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private _renderPickerModal() {
    // TODO: Get config from server and set proper duration unit/duration
    const options = ["24 tiếng", "48 tiếng", "72 tiếng", "7 ngày", "1 tháng"];
    return (
      <Modal
        presentationStyle={"overFullScreen"}
        visible={this.state.isModalOpen}
        transparent={true}
        animationType={"fade"}
        animated={true}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Button
              title={"OK"}
              type={"clear"}
              onPress={() => this.setState({ isModalOpen: false })}
              containerStyle={{ alignSelf: "flex-end", marginRight: 20 }}
            />
            <Picker
              selectedValue={this.state.selectedDuration}
              onValueChange={item =>
                this.setState({ selectedDuration: item }, () => {
                  const duration = (item as string).split(" ");
                  this.props.onSetSellDuration({
                    duration: parseInt(duration[0]),
                    unit: duration[1]
                  });
                })
              }
              itemStyle={{ backgroundColor: "white" }}
            >
              {options.map((option, idx) => (
                <Picker.Item key={idx.toString()} label={option} value={option} />
              ))}
            </Picker>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  rowSeparatedContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  fontTitle: {
    fontSize: 20
  },

  fontSubtitle: {
    fontSize: 16,
    color: "rgba(0.0, 0.0, 0.0, 0.6)"
  },

  textPicker: {
    color: "#1ABC9C",
    fontSize: 17
  },

  modalContainer: {
    backgroundColor: "rgba(0.0, 0.0, 0.0, 0.3)",
    flex: 1,
    position: "relative"
  },

  pickerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent"
  }
});
