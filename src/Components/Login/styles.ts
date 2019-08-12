//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { StyleSheet, ViewStyle } from "react-native";

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 42,
    backgroundColor: "white",
    flexDirection: "column"
  } as ViewStyle,

  socialContainer: {
    marginTop: 127
  } as ViewStyle,

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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  } as ViewStyle,

  separator: {
    backgroundColor: "#BCBBC1",
    height: 1,
    marginTop: 83,
    marginBottom: 70,
    alignSelf: "stretch"
  } as ViewStyle,

  emailContainerStyle: {
    borderRadius: 4,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "flex-start",
    alignSelf: "stretch",
    marginTop: 20,
    height: 52
  } as ViewStyle,

  emailInputStyle: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "normal"
  } as ViewStyle,

  authButton: {
    marginTop: 80,
    width: 169,
    height: 50,
    backgroundColor: "#C7C7C7",
    alignSelf: "center"
  } as ViewStyle,

  debugDialogButton: {
    position: "absolute",
    bottom: 30,
    right: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});
