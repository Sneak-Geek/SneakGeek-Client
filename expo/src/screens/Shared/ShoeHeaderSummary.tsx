import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { AppText } from './Text';
import { themes } from '@resources';
import { Shoe } from 'business';

const styles = StyleSheet.create({
  summaryContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomColor: themes.DisabledColor,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  shoeImage: {
    width: 120,
    aspectRatio: 2,
  },
});

export const ShoeHeaderSummary = (props: { shoe: Shoe }): JSX.Element => (
  <View style={styles.summaryContainer}>
    <Image
      source={{ uri: props.shoe.imageUrl }}
      style={styles.shoeImage}
      resizeMode={'contain'}
    />
    <View style={styles.titleContainer}>
      <AppText.Body style={{ flex: 1 }}>{props.shoe.title}</AppText.Body>
      <AppText.Subhead>{props.shoe.colorway.join(', ')}</AppText.Subhead>
    </View>
  </View>
);
