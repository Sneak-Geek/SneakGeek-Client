import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { AppText } from './Text';
import { themes } from '@resources';
import Humanize from 'humanize-plus';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  priceBoxContainer: {
    flex: 1,
    aspectRatio: 1,
    padding: 8,
  },
  priceBox: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: themes.AppSecondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const PriceBox = (props: {
  size: string;
  price?: number;
  selected: string;
  onSelect: (size: string) => void;
}): JSX.Element => {
  const selected = props.size === props.selected;
  const color = selected ? themes.AppAccentColor : themes.AppSecondaryColor;

  return (
    <View style={styles.priceBoxContainer}>
      <TouchableOpacity
        style={[
          styles.priceBox,
          selected ? { backgroundColor: themes.AppSecondaryColor } : {},
        ]}
        onPress={(): void => props.onSelect(props.size)}
      >
        <View style={[styles.priceTextContainer]}>
          <AppText.Callout style={{ marginBottom: 5, color }}>
            {props.price ? Humanize.compactInteger(props.price, 2) : '-'}
          </AppText.Callout>
          <AppText.Subhead style={{ color }}>Cỡ: {props.size}</AppText.Subhead>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const SizePricePicker = (props: {
  sizes: string[];
  priceMap: Map<string, number>;
  style: StyleProp<ViewStyle>;
  onSizeSelected: (size: string) => void;
}): JSX.Element => {
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <FlatList
      style={[{ marginHorizontal: 5 }, props.style]}
      data={props.sizes}
      keyExtractor={(itm): string => itm}
      renderItem={({ item }): JSX.Element => (
        <PriceBox
          size={item}
          price={props.priceMap.get(item)}
          selected={selectedSize}
          onSelect={(size: string): void => {
            props.onSizeSelected(size);
            setSelectedSize(size);
          }}
        />
      )}
      numColumns={4}
      columnWrapperStyle={styles.row}
    />
  );
};
