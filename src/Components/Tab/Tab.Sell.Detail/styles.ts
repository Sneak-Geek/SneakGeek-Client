//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  shoeDetailContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    flex: 1,
    paddingHorizontal: 8,
    maxHeight: 120
  },

  shoeDetailTextContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  nextButtonStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  }
});
