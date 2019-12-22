//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import * as Assets from "../../Assets";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  data: {
    question?: string;
    answer?: string;
  }
}

interface State {
  showAnswer: boolean,
}
export class FaqItem extends React.Component<Props, State> {

  constructor(props: any) {
    super(props)
    this.state = {
      showAnswer: false,
    }
  }

  onPress = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }
  render() {
    let { data } = this.props;
    let { showAnswer } = this.state;
    return (
      <View>
        <TouchableOpacity style={[styles.row, {paddingBottom: showAnswer ? 9 : 30}]} onPress={this.onPress}>
          <View style={{ flex: 1, paddingRight: 14, paddingLeft: 20 }}>
            <Text style={styles.question}>Q: {data.question}</Text>
          </View>
          {Boolean(showAnswer) ?
            <Image source={Assets.Icons.ChevronDown} />
            :
            <Image source={Assets.Icons.ChevronLeft} />
          }
        </TouchableOpacity>
        {Boolean(showAnswer) &&
          <View style={styles.answerContainer}>
            <Text style={styles.answerTitle}>
              {data.answer}
            </Text>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 14
  },
  question: {
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 22
  },
  answerContainer: {
    backgroundColor: '#E9E9E9',
     paddingHorizontal: 20,
    paddingVertical: 22,
    marginBottom: 33,
    flex: 1,
  },
  answerTitle: {
    fontSize: 17, 
    fontFamily: "RobotoCondensed-Regular"
  }
});
