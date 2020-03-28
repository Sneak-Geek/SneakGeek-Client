//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { AppText } from '@screens/Shared';
import { themes } from '@resources';
import { TextInput } from 'react-native-gesture-handler';
import { toCurrencyString } from 'utilities';

type State = {
  isModalOpen: boolean;
  selectedDuration?: string;
  shoePrice: string;
};

type Props = {
  onSetShoePrice: (price: number) => void;
};

export class ProductSetPrice extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalOpen: false,
      shoePrice: '',
    };
  }

  public render(): JSX.Element {
    return (
      <ScrollView style={{ flex: 1, width: Dimensions.get('screen').width }}>
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {this._renderSetPrice()}
        </View>
      </ScrollView>
    );
  }

  private _renderSetPrice(): JSX.Element {
    return (
      <View style={[styles.rowSeparatedContainer, { marginVertical: 15 }]}>
        <AppText.Headline>Đặt giá bán</AppText.Headline>
        <View style={styles.inputContainer}>
          <TextInput
            keyboardType={'numeric'}
            onChangeText={shoePrice => this.setState({ shoePrice })}
            value={this.state.shoePrice}
            onEndEditing={() => {
              const shoePrice = this.state.shoePrice;
              this.props.onSetShoePrice(parseInt(shoePrice));
              this.setState({ shoePrice: toCurrencyString(shoePrice) });
            }}
            onFocus={() => {
              this.setState({ shoePrice: '' });
            }}
            placeholder={'1000000'}
            style={themes.TextStyle.body}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowSeparatedContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  fontSubtitle: {
    fontSize: 16,
    color: 'rgba(0.0, 0.0, 0.0, 0.6)',
  },

  textPicker: {
    color: '#1ABC9C',
  },

  modalContainer: {
    backgroundColor: 'rgba(0.0, 0.0, 0.0, 0.3)',
    flex: 1,
    position: 'relative',
  },

  pickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    borderColor: themes.DisabledColor,
    borderWidth: 1,
    borderRadius: themes.ButtonBorderRadius,
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 5,
    minHeight: themes.ButtonHeight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
