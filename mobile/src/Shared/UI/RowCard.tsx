//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Assets from "../../Assets";

interface Props {
  title?: string;
  descrip?: string;
  border?: boolean;
  green?: boolean;
  descripStyle?: any;
}

export class RowCard extends React.Component<Props, {}> {
  render() {
    let { title, descrip, border, green, descripStyle } = this.props;
    return (
      <View style={border ? styles.rowBorder : styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.boldText}>{title}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[green ? styles.regularTextGreen : styles.regularText, descripStyle]} numberOfLines={2} ellipsizeMode="tail">
            {descrip}
          </Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  rowBorder: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 30,
    borderBottomWidth: 1,
    borderColor: '#BCBBC1',
    paddingBottom: 20
  },
  boldText: {
    opacity: 0.6,
    fontSize: 14,
    fontFamily: 'RobotoCondensed-Bold',
  },
  regularText: {
    fontSize: 17,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'right',
  },
  regularTextGreen: {
    fontSize: 17,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'right',
    color: Assets.Styles.AppPrimaryColor,
  }
});
