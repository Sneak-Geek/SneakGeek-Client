import { StyleSheet } from "react-native";

export const themes = {
  FacebookThemeColor: "#3B5998",
  IconSize: 24,
  ButtonHeight: 54,
  ButtonBorderRadius: 4,
  DisabledColor: "#DADADA",
  AppPrimaryColor: "#1ABC9C",
  AppSecondaryColor: "#000",
  AppAccentColor: "#FFF",
  AppErrorColor: "#FF2D55",
  AppModalBackground: 'rgba(0.0, 0.0, 0.0, 0.5)',
  DisabledTheme: 'rgba(0, 0, 0, 0.05)',
  AppDisabledColor: '#DADADA',
  TextStyle: StyleSheet.create({
    largeTitle: {
      fontFamily: 'RobotoBold',
      fontSize: 34,
    },

    title1: {
      fontFamily: 'RobotoBold',
      fontSize: 28,
    },

    title2: {
      fontSize: 22,
      fontFamily: 'RobotoBold',
    },

    title3: {
      fontSize: 20,
      fontFamily: 'RobotoBold',
    },

    headline: {
      fontSize: 17,
      fontFamily: 'RobotoBold',
    },

    body: {
      fontSize: 17,
      fontFamily: 'Roboto',
    },

    callout: {
      fontSize: 16,
      fontFamily: 'Roboto',
    },

    subhead: {
      fontSize: 15,
      fontFamily: 'RobotoLight',
    },

    footnote: {
      fontSize: 13,
      fontFamily: 'RobotoLight',
    },

    caption1: {
      fontSize: 12,
      fontFamily: 'RobotoLight',
    },

    caption2: {
      fontSize: 11,
      fontFamily: 'RobotoLight',
    },
  }),

  headerStyle: {
    headerBackTitleVisible: false,
    headerTintColor: '#000',
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: 'RobotoBold',
    }
  },
  avatarSize: 100
}