// !
// ! Copyright (c) 2019 - SneakGeek. All rights reserved
// !

import * as React from 'react';
import { Dimensions, Switch, View, StyleSheet } from 'react-native';
import { AppText } from '@screens/Shared';
import { themes } from '@resources';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
  settingContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  otherDetailContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical: 15,
  },
});

interface IShoeConditionExtraInfoState {
  tainted: boolean; // ố vàng
  soleWorn: boolean; // đế mòn
  heavilyTorn: boolean; // rách
  other: boolean;
  otherDetails: string;

  // indexing purposes
  [key: string]: any;
}

interface IShoeConditionExtraInfoProps {
  onSetShoeTainted: (tainted: boolean) => void;
  onSetShoeOutsoleWorn: (outsoleWorn: boolean) => void;
  onSetShoeInsoleWorn: (insoleWorn: boolean) => void;
  onSetShoeHeavilyTorn: (heavilyTorn: boolean) => void;
  onSetShoeOtherDetail: (otherDetail: string) => void;
}

interface ISetting {
  stateName: string;
  title: string;
  onValueChange: (currentValue: boolean) => void;
}

export class ProductConditionExtra extends React.PureComponent<
  IShoeConditionExtraInfoProps,
  IShoeConditionExtraInfoState
> {
  private settingsAndOptions: ISetting[] = [
    {
      stateName: 'tainted',
      title: 'Ố vàng',
      onValueChange: this.props.onSetShoeTainted,
    },
    {
      stateName: 'outsoleWorn',
      title: 'Đế mòn',
      onValueChange: this.props.onSetShoeOutsoleWorn,
    },
    {
      stateName: 'insoleWorn',
      title: 'Lót giày có vấn đề',
      onValueChange: this.props.onSetShoeInsoleWorn,
    },
    {
      stateName: 'heavilyTorn',
      title: 'Vết rách',
      onValueChange: this.props.onSetShoeHeavilyTorn,
    },
  ];

  public constructor(props: any) {
    super(props);

    this.state = {
      tainted: false,
      soleWorn: false,
      heavilyTorn: false,
      other: false,
      otherDetails: '',
    };
  }

  public /** override */ render(): JSX.Element {
    return (
      <View style={{ flex: 1, width: Dimensions.get('screen').width }}>
        <View style={{ flexDirection: 'column' }}>
          {this.settingsAndOptions.map(setting =>
            this._renderSettingAndOptions(setting),
          )}
          {this._renderOtherDetail()}
        </View>
      </View>
    );
  }

  private _renderSettingAndOptions(setting: ISetting): JSX.Element {
    return (
      <View key={setting.stateName} style={styles.settingContainer}>
        <AppText.Body>{setting.title}</AppText.Body>
        <Switch
          trackColor={{
            true: themes.AppPrimaryColor,
            false: themes.AppDisabledColor,
          }}
          value={this.state[setting.stateName]}
          onValueChange={value =>
            this.setState(prevState => {
              setting.onValueChange(value);
              return {
                ...prevState,
                [setting.stateName]: value,
              };
            })
          }
        />
      </View>
    );
  }

  private _renderOtherDetail() {
    // TODO: Research on underline for iOS
    return (
      <View style={styles.otherDetailContainer}>
        <AppText.Body>Các vấn đề khác:</AppText.Body>
        <Input
          style={{ marginTop: 30 }}
          inputStyle={themes.TextStyle.callout}
          placeholder={'Các chi tiết khác của sản phẩm'}
          onChangeText={value => this.props.onSetShoeOtherDetail(value)}
        />
      </View>
    );
  }
}
