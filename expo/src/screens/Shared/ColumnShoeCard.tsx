import React from 'react';
import { Shoe } from 'business';
import { View, Image, StyleSheet } from 'react-native';
import { AppText } from './Text';
import { themes } from '@resources';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginVertical: 10,
    marginHorizontal: 5,
    position: 'relative',
    borderRadius: themes.ButtonBorderRadius,
    borderWidth: 1,
    borderColor: themes.DisabledColor,
  },
  cardImage: {
    width: 120,
    height: 80,
    marginTop: 15,
    alignSelf: 'center',
  },
  priceContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: themes.AppPrimaryColor,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: themes.ButtonBorderRadius,
  },
  titleContainer: {
    backgroundColor: themes.DisabledTheme,
    paddingHorizontal: 5,
    flex: 1,
    paddingVertical: 10,
    minHeight: 52
  },
});

export const ColumnShoeCard = (props: {
  shoe: Shoe;
  onPress: () => void;
}): JSX.Element => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={styles.container}>
    <Image
      source={{ uri: props.shoe.imageUrl }}
      style={styles.cardImage}
      resizeMode={'center'}
    />
    <View style={styles.titleContainer}>
      <AppText.Subhead
        numberOfLines={2}
        textBreakStrategy={'highQuality'}
        ellipsizeMode={'tail'}
      >
        {props.shoe.title}
      </AppText.Subhead>
    </View>
    {props.shoe.retailPrice && (
      <View style={styles.priceContainer}>
        <AppText.Footnote style={{ color: 'white' }}>
          ${props.shoe.retailPrice}
        </AppText.Footnote>
      </View>
    )}
  </View>
  </TouchableOpacity>
);
