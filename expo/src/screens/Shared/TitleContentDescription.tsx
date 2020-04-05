import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './Text';

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  content: {
    marginTop: 10,
  },
});

export const TitleContentDescription = (props: {
  title: string;
  content: string | number;
  emphasizeTitle?: boolean;
}): JSX.Element => (
  <View style={styles.sectionContainer}>
    <AppText.Subhead>
      {props.emphasizeTitle ? props.title.toUpperCase() : props.title}
    </AppText.Subhead>
    <AppText.Body style={styles.content}>{props.content}</AppText.Body>
  </View>
);
