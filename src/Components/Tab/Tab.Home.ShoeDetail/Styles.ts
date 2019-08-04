//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import { StyleSheet, Dimensions, ViewStyle, TextStyle } from "react-native";

const dimension = Dimensions.get("window");

export default StyleSheet.create({
  shoeImageContainer: {
    height: dimension.height * 0.3,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "black"
  } as ViewStyle,

  userButtonContainer: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20
  } as ViewStyle,

  buttonStyle: {
    paddingHorizontal: 20,
    paddingVertical: 4
  },

  shoeTitle: {
    fontSize: 22,
    marginVertical: 20,
    marginHorizontal: 65,
    textAlign: "center"
  } as TextStyle,

  infoRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  },

  ratingTitle: {
    fontSize: 24
  },

  ratingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },

  reviewTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  }
});
