//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  Dimensions,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { getInset } from "react-native-safe-area-view";
import { Button } from "react-native-elements";
import { CustomPicker, Text } from "../../../Shared/UI";
import * as Assets from "../../../Assets";

enum PickerType {
  ShoeCondition = "ShoeCondition",
  BoxCondition = "BoxCondition"
}

type Props = {
  onSetShoeSize: (shoeSize: number) => void;
  onSetShoeCondition: (shoeCondition: string) => void;
  onSetBoxCondition: (boxCondition: string) => void;
};

type State = {
  shoeSize?: number;
  shoeCondition: string;
  boxCondition: string;
  isSelectingShoeSize: boolean;
  isShowingPicker: boolean;
  pickerVisible: boolean;
  currentPicker?: PickerType;

  // indexing purpose
  [key: string]: any;
};

type Setting = {
  readonly stateName: string;
  readonly title: string;
  readonly options: string[];
  readonly onLaunchOptionChooser: () => void;
};

export class ShoeConditionRequiredInfoComponent extends React.PureComponent<Props, State> {
  private settingsAndOptions: Setting[] = [
    {
      stateName: "shoeSize",
      title: "Cỡ giày",
      options: this._getShoeSizesOptions(),
      onLaunchOptionChooser: () => {
        this.setState({ isSelectingShoeSize: true });
      }
    },
    {
      stateName: "shoeCondition",
      title: "Tình trạng",
      options: this._getShoeConditionOptions(),
      onLaunchOptionChooser: () => {
        this.setState({ pickerVisible: true, currentPicker: PickerType.ShoeCondition });
      }
    },
    {
      stateName: "boxCondition",
      title: "Hộp",
      options: this._getShoeBoxConditionOptions(),
      onLaunchOptionChooser: () => {
        this.setState({ pickerVisible: true, currentPicker: PickerType.BoxCondition });
      }
    }
  ];

  public constructor(props: any) {
    super(props);
    this.state = {
      pickerVisible: false,
      shoeSize: undefined,
      shoeCondition: "",
      boxCondition: "",
      isSelectingShoeSize: false,
      isShowingPicker: false,
      currentPicker: undefined
    };
  }

  public /** override */ render(): JSX.Element {
    return (
      <SafeAreaView style={{ flex: 1, width: Dimensions.get("screen").width }}>
        {this._renderShoeSelectionModal()}
        <View style={{ flexDirection: "column" }}>
          {this.settingsAndOptions.map((setting, index) =>
            this._renderSettingWithOptions(setting, index)
          )}
        </View>
        {this._renderPicker()}
      </SafeAreaView>
    );
  }

  private _getShoeSizesOptions(): string[] {
    let start = 5;
    let end = 14.5;
    let result = [];

    while (start <= end) {
      result.push(start);
      start += 0.5;
    }

    return result.map(size => size.toString());
  }

  private _getShoeConditionOptions(): string[] {
    return ["Mới", "Đã qua sử dụng"];
  }

  private _getShoeBoxConditionOptions(): string[] {
    return ["Nguyên hộp", "Không hộp"];
  }

  private _renderSettingWithOptions(setting: Setting, index: number): JSX.Element {
    const defaultOption = "Lựa chọn";

    return (
      <View style={styles.settingContainer} key={index}>
        <Text.Body>{setting.title}</Text.Body>
        <TouchableOpacity onPress={() => setting.onLaunchOptionChooser()}>
          <Text.Body style={{ color: Assets.Styles.AppPrimaryColor }}>
            {this.state[setting.stateName] || defaultOption}
          </Text.Body>
        </TouchableOpacity>
      </View>
    );
  }

  private _renderShoeSelectionModal(): JSX.Element {
    return (
      <Modal
        presentationStyle={"overFullScreen"}
        visible={this.state.isSelectingShoeSize}
        transparent={true}
        animationType={"fade"}
        animated={true}
      >
        <SafeAreaView style={styles.shoeSizesContainer}>
          <Text.Body style={{ color: Assets.Styles.AppSecondaryColor, marginVertical: 20 }}>
            Bạn đang sở hữu giày
          </Tex.Bodyt>
          {this._renderShoeSizesContainer()}
          {this._renderShoeSizeSelectionButtons()}
        </SafeAreaView>
      </Modal>
    );
  }

  private _renderShoeSizesContainer(): JSX.Element {
    return (
      <FlatList
        data={this.settingsAndOptions[0].options}
        keyExtractor={(_item, idx) => idx.toString()}
        numColumns={4}
        columnWrapperStyle={{ flex: 1, justifyContent: "space-around" }}
        renderItem={({ item }) => (
          <Button
            key={item}
            title={item}
            type={"clear"}
            style={[
              styles.buttonContainer,
              this.state.shoeSize && this.state.shoeSize.toString() === item
                ? styles.buttonSelected
                : {}
            ]}
            onPress={() => {
              const shoeSize = parseFloat(item);
              this.setState({ shoeSize }, () => {
                this.props.onSetShoeSize(shoeSize);
              });
            }}
            titleStyle={{ fontSize: 14, color: "black" }}
          />
        )}
      />
    );
  }

  private _renderShoeSizeSelectionButtons(): JSX.Element {
    return (
      <View style={styles.footerContainer}>
        <Button
          buttonStyle={{ backgroundColor: "white", ...styles.footerButton }}
          title={"Đóng"}
          titleStyle={{ color: "black" }}
          onPress={() => this.setState({ isSelectingShoeSize: false })}
        />
        <Button
          buttonStyle={{ backgroundColor: "#1ABC9C", ...styles.footerButton }}
          title={"Xác nhận"}
          onPress={() => this.setState({ isSelectingShoeSize: false })}
        />
      </View>
    );
  }

  private _renderPicker(): JSX.Element | null {
    let currentPickedSettings: Setting | null = null;
    let onPickerSelected: (pickerOption: string) => void;
    switch (this.state.currentPicker) {
      case PickerType.BoxCondition:
        currentPickedSettings = this.settingsAndOptions[2];
        onPickerSelected = (pickerOption: string) => {
          this.props.onSetBoxCondition(pickerOption);
        };
        break;
      case PickerType.ShoeCondition:
        currentPickedSettings = this.settingsAndOptions[1];
        onPickerSelected = (pickerOption: string) => {
          this.props.onSetShoeCondition(pickerOption);
        };
        break;
      default:
        break;
    }

    if (currentPickedSettings !== null) {
      const { stateName, options } = currentPickedSettings;
      return (
        <CustomPicker
          options={options}
          visible={this.state.pickerVisible}
          optionLabelToString={item => item}
          onSelectPickerOK={(selectedValue: string) => {
            this.setState(prevState => {
              onPickerSelected(selectedValue);
              return {
                ...prevState,
                [stateName]: selectedValue,
                currentPicker: undefined
              };
            });
          }}
          onSelectPickerCancel={() => this.setState({ pickerVisible: false })}
        />
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },

  buttonSelected: {
    backgroundColor: "#1ABC9C"
  },

  settingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
    marginHorizontal: 20
  },

  shoeSizesContainer: {
    position: "relative",
    flex: 1,
    backgroundColor: "rgba(0.0, 0.0, 0.0, 0.9)",
    paddingHorizontal: 20
  },

  footerButton: {
    width: Dimensions.get("window").width / 2,
    borderRadius: 0,
    height: 52
  },

  footerContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    paddingBottom: getInset("bottom")
  }
});
