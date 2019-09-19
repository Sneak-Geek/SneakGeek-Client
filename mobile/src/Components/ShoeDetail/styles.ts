//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { StyleSheet, Dimensions, ViewStyle, TextStyle } from "react-native";
import * as Assets from "../../Assets";

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
    marginVertical: 20,
    marginHorizontal: 25,
    textAlign: "center"
  } as TextStyle,

  infoRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15
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
    marginBottom: 5
  },

  buyerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Assets.Styles.AppSecondaryColorBlurred
  },

  buyerContainerFull: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Assets.Styles.AppSecondaryColorBlurred
  },

  priceListItem: {
    width: (Dimensions.get("window").width * 5) / 7,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    flexDirection: "column"
  },

  pullHandle: {
    width: 60,
    height: 3,
    borderRadius: Assets.Styles.ButtonBorderRadius,
    backgroundColor: Assets.Styles.AppSecondaryColor,
    marginTop: 12
  },

  divider: {
    width: 130,
    marginHorizontal: 35,
    height: 1,
    backgroundColor: Assets.Styles.AppSecondaryColor,
    marginVertical: 15
  },

  shoeSize: {
    color: Assets.Styles.AppSecondaryColor,
    marginVertical: 35
  },

  smallButtonBorder: {
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 2
  }
});
