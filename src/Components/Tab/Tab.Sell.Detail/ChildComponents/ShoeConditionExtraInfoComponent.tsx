//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import * as React from "react";
import { View, Dimensions, Switch, Text, StyleSheet } from "react-native";

type State = {
  tainted: boolean; // ố vàng
  soleWorn: boolean; // đế mòn
  heavyTear: boolean; // rách
  other: boolean;
  otherDetails: string;

  // indexing purposes
  [key: string]: any;
};

type Setting = { stateName: string; title: string };

export class ShoeConditionExtraInfoComponent extends React.PureComponent<{}, State> {
  private settingsAndOptions: Setting[] = [
    { stateName: "tainted", title: "Ố vàng" },
    { stateName: "soleWorn", title: "Đế mòn" },
    { stateName: "heavyTear", title: "Rách" },
    { stateName: "other", title: "Các vấn đề khác" }
  ];

  public constructor(props: any) {
    super(props);

    this.state = {
      tainted: false,
      soleWorn: false,
      heavyTear: false,
      other: false,
      otherDetails: ""
    };
  }

  public /** override */ render(): JSX.Element {
    return (
      <View style={{ flex: 1, width: Dimensions.get("screen").width }}>
        <View style={{ flexDirection: "column" }}>
          {this.settingsAndOptions.map(setting => this._renderSettingAndOptions(setting))}
        </View>
      </View>
    );
  }

  private _renderSettingAndOptions(setting: Setting): JSX.Element {
    return (
      <View key={setting.stateName} style={styles.settingContainer}>
        <Text style={{ fontSize: 16 }}>{setting.title}</Text>
        <Switch
          trackColor={{ true: "#1ABC9C", false: "gainsboro" }}
          value={this.state[setting.stateName]}
          onValueChange={value =>
            this.setState(prevState => ({
              ...prevState,
              [setting.stateName]: value
            }))
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "space-between"
  }
});
