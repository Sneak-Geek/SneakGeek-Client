//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { StyleSheet, ViewStyle } from "react-native";
import { Assets } from "../../Assets";

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 42,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between"
  } as ViewStyle,

  socialContainer: {
    height: "45%",
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "flex-end"
  } as ViewStyle,

  socialButton: {
    height: Assets.Styles.ButtonHeight,
    backgroundColor: Assets.Styles.ButtonPrimaryColor,
    borderRadius: Assets.Styles.ButtonBorderRadius,
    marginVertical: 5
  },

  socialButtonInner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Assets.Styles.ButtonPadding
  },

  socialButtonText: {
    color: Assets.Styles.TextSecondaryColor,
    marginLeft: 20
  },

  label: {
    fontSize: 18
  } as ViewStyle,

  socialLabel: {
    marginBottom: 20
  } as ViewStyle,

  buttonContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "flex-start"
  } as ViewStyle,

  buttonText: {
    fontSize: 20
  },

  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },

  emailBasedContainer: {
    height: "40%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  } as ViewStyle,

  separator: {
    backgroundColor: "#BCBBC1",
    height: 1,
    alignSelf: "stretch"
  } as ViewStyle,

  emailContainerStyle: {
    borderRadius: Assets.Styles.ButtonBorderRadius,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "flex-start",
    marginTop: 20,
    height: Assets.Styles.ButtonHeight
  } as ViewStyle,

  emailInputStyle: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "normal"
  } as ViewStyle,

  authButtonContainer: {
    position: "absolute",
    bottom: "10%",
    left: 0,
    right: 0,
    alignItems: "center"
  },

  authButton: {
    width: 169,
    height: Assets.Styles.ButtonHeight
  } as ViewStyle
});
