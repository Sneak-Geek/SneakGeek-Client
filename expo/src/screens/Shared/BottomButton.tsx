import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Button } from 'react-native-elements';
import { themes } from '@resources';

const styles = StyleSheet.create({
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: themes.ButtonHeight,
  },
});

type Props = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export const BottomButton = (props: Props) => (
  <Button
    title={props.title}
    buttonStyle={[styles.bottomButton, props.style]}
    titleStyle={[themes.TextStyle.body, props.titleStyle]}
    onPress={props.onPress}
  />
);
