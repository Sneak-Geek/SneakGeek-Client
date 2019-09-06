//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { Text, StyleSheet, TextProps } from "react-native";

type CustomTextProps = TextProps;

export class Title1 extends React.PureComponent<CustomTextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[this.props.style, styles.title1]} />;
  }
}

export class Title2 extends React.PureComponent<CustomTextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[this.props.style, styles.title2]} />;
  }
}

export class Heading extends React.PureComponent<CustomTextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[this.props.style, styles.heading]} />;
  }
}

export class Display extends React.PureComponent<CustomTextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[this.props.style, styles.display]} />;
  }
}

export class Subhead extends React.PureComponent<CustomTextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[styles.subhead, this.props.style]} />;
  }
}

export class Body extends React.PureComponent<CustomTextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[this.props.style, styles.body]} />;
  }
}

export class Caption extends React.PureComponent<CustomTextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[styles.caption, this.props.style]} />;
  }
}

const styles = StyleSheet.create({
  title1: {
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 34
  },

  title2: {
    fontSize: 22,
    fontFamily: "RobotoCondensed-Bold"
  },

  heading: {
    fontSize: 17,
    fontFamily: "RobotoCondensed-Bold"
  },

  display: {
    fontSize: 14,
    fontFamily: "RobotoCondensed-Bold"
  },

  subhead: {
    fontSize: 14,
    fontFamily: "RobotoCondensed-Regular",
    color: "rgba(0, 0, 0, 0.6)"
  },

  body: {
    fontSize: 17,
    fontFamily: "RobotoCondensed-Regular"
  },

  caption: {
    fontSize: 13,
    fontFamily: "RobotCondensed-Light"
  }
});
