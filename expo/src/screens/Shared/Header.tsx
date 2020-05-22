import React from 'react';
import { HeaderHeightContext } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { themes } from '@resources';
import { AppText } from './Text';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: themes.DisabledColor,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  backHitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  }
});

export const Header = (props): JSX.Element => {
  return (
    <HeaderHeightContext.Consumer>
      {
        headerHeight => (
          <View style={{ ...styles.headerContainer, height: headerHeight + props.topInsets, }}>
            <Icon
              name={'ios-arrow-back'}
              type={'ionicon'}
              size={themes.IconSize}
              hitSlop={styles.backHitSlop}
              onPress={() => this.props.navigation.goBack()}
            />
            <AppText.Title3>{props.headerText}</AppText.Title3>
            <Icon
              color="white"
              name={'ios-arrow-back'}
              type={'ionicon'}
              size={themes.IconSize}
              hitSlop={styles.backHitSlop}
            />
          </View>
        )
      }
    </HeaderHeightContext.Consumer>
  );
}