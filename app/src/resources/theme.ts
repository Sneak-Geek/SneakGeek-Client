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
  NotificationBackground: '#D8F2ED',
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
      fontFamily: 'RobotoCondensed-Bold',
      fontSize: 34,
    },

    title1: {
      fontFamily: 'RobotoCondensed-Bold',
      fontSize: 26,
    },

    title2: {
      fontSize: 22,
      fontFamily: 'RobotoCondensed-Bold',
    },

    title3: {
      fontSize: 20,
      fontFamily: 'RobotoCondensed-Bold',
    },

    headline: {
      fontSize: 17,
      fontFamily: 'RobotoCondensed-Bold',
    },

    body: {
      fontSize: 17,
      fontFamily: 'RobotoCondensed-Regular',
    },

    callout: {
      fontSize: 16,
      fontFamily: 'RobotoCondensed-Regular',
    },

    subhead: {
      fontSize: 15,
      fontFamily: 'RobotoCondensed-Light',
    },

    footnote: {
      fontSize: 13,
      fontFamily: 'RobotoCondensed-Light',
    },

    footnoteRegular: {
      fontSize: 13,
      fontFamily: 'RobotoCondensed-Regular',
    },

    caption1: {
      fontSize: 12,
      fontFamily: 'RobotoCondensed-Light',
    },

    caption2: {
      fontSize: 11,
      fontFamily: 'RobotoCondensed-Light',
    },
  }),

  headerStyle: {
    headerBackTitleVisible: false,
    headerTintColor: '#000',
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: 'RobotoCondensed-Bold',
    },
  },
  TabTopHeader: {
    labelStyle: {
      fontFamily: 'RobotoCondensed-Regular',
      fontSize: 17,
    },
    indicatorStyle: {
      backgroundColor: '#000',
    },
  },
  avatarSize: 100,
};
