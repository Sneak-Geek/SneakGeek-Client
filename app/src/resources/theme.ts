import {StyleSheet, Platform} from 'react-native';

export const themes = {
  FacebookThemeColor: '#3B5998',
  IconSize: 24,
  RegularButtonHeight: 54,
  MediumButtonHeigt: 40,
  ButtonBorderRadius: 4,
  LargeBorderRadius: 40,
  DisabledColor: '#DADADA',
  AppPrimaryColor: '#1ABC9C',
  AppSecondaryColor: '#000',
  AppAccentColor: '#FFF',
  AppErrorColor: '#FF2D55',
  AppModalBackground: 'rgba(0.0, 0.0, 0.0, 0.65)',
  DisabledTheme: 'rgba(0, 0, 0, 0.05)',
  AppDisabledColor: '#DADADA',
  AppSellColor: '#E2603F',
  AppPendingColor: '#E2C115',
  AppBackgroundColor: '#f5f5f7',
  ButtonShadow: Platform.select({
    android: {elevation: 5},
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0.5, height: 0.5},
      shadowOpacity: 0.1,
      shadowRadius: 0.5,
    },
  }),
  TextStyle: StyleSheet.create({
    largeTitle: {
      // fontFamily: 'Roboto-Bold',
      fontSize: 34,
    },

    title1: {
      // fontFamily: 'Roboto-Bold',
      fontSize: 26,
    },

    title2: {
      fontSize: 22,
      // fontFamily: 'Roboto-Bold',
    },

    title3: {
      fontSize: 20,
      // fontFamily: 'Roboto-Bold',
    },

    headline: {
      fontSize: 17,
      // fontFamily: 'Roboto-Bold',
    },

    body: {
      fontSize: 17,
      // fontFamily: 'Roboto',
    },

    callout: {
      fontSize: 16,
      // fontFamily: 'Roboto',
    },

    subhead: {
      fontSize: 15,
      // fontFamily: 'Roboto-Light',
    },

    footnote: {
      fontSize: 13,
      // fontFamily: 'Roboto-Light',
    },

    footnoteRegular: {
      fontSize: 13,
      // fontFamily: 'Roboto',
    },

    caption1: {
      fontSize: 12,
      // fontFamily: 'Roboto-Light',
    },

    caption2: {
      fontSize: 11,
      // fontFamily: 'Roboto-Light',
    },
  }),

  headerStyle: {
    headerBackTitleVisible: false,
    headerTintColor: '#000',
    headerTitleStyle: {
      fontSize: 20,
      // fontFamily: 'Roboto-Bold',
    },
  },
  TabTopHeader: {
    labelStyle: {
      // fontFamily: 'Roboto',
      fontSize: 17,
    },
    indicatorStyle: {
      backgroundColor: '#000',
    },
  },
  avatarSize: 100,
};
