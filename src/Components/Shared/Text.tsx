//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

type TextProps = {
  style?: StyleProp<TextStyle>;
};

export class Title1 extends React.PureComponent<TextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[this.props.style, styles.title1]} />;
  }
}

export class Title2 extends React.PureComponent<TextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[this.props.style, styles.title2]} />;
  }
}

export class Heading extends React.PureComponent<TextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[this.props.style, styles.heading]} />;
  }
}

export class Display extends React.PureComponent<TextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[this.props.style, styles.display]} />;
  }
}

export class Subhead extends React.PureComponent<TextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[this.props.style, styles.subhead]} />;
  }
}

export class Body extends React.PureComponent<TextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[this.props.style, styles.body]} />;
  }
}

export class Caption extends React.PureComponent<TextProps> {
  public /** override */ render(): JSX.Element {
    return <Text {...this.props} style={[this.props.style, styles.caption]} />;
  }
}

const styles = StyleSheet.create({
  title1: {
    fontSize: 34,
    fontWeight: "bold"
  },

  title2: {
    fontSize: 22,
    fontWeight: "bold"
  },

  heading: {
    fontSize: 17,
    fontWeight: "bold"
  },

  display: {
    fontSize: 14,
    fontWeight: "600"
  },

  subhead: {
    fontSize: 14,
    fontWeight: "normal",
    color: "rgba(0, 0, 0, 0.6)"
  },

  body: {
    fontSize: 17,
    fontWeight: "normal"
  },

  caption: {
    fontSize: 13,
    fontWeight: "600"
  }
});
