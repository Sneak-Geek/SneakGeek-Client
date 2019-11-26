import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  StackActions,
  NavigationScreenProps
} from "react-navigation";
import * as Assets from "../../Assets";
import { ScrollView } from 'react-native-gesture-handler';

export interface IShoeRequireScreenProps {
  navigateToRequireSuccess: () => void;
}

export class ShoeRequireScreen extends React.Component<IShoeRequireScreenProps> {
  static navigationOptions = (transitionProp: NavigationScreenProps) => ({
    headerStyle: ({
      borderBottomWidth: 0,
    })
    ,
    title: "Yêu cầu sản phẩm",
    headerLeft: (
      <Icon
        type={"ionicon"}
        name={"ios-arrow-back"}
        size={28}
        containerStyle={{ marginLeft: 10 }}
        onPress={() => transitionProp.navigation.dispatch(StackActions.popToTop())}
      />
    ),
    headerRight: (
      <Icon
        type={"ionicon"}
        name={"ios-share"}
        size={28}
        containerStyle={{ marginRight: 10 }}
      />
    )
  });
  public render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          position: "relative",
          backgroundColor: 'white'
        }}
      >
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            {this.renderUpImage()}
            {this.renderBrand()}
            {this.renderGender()}
            {this.renderSize()}
            {this.renderColor()}
            {this.renderCondition()}
          </ScrollView>
          {this.renderButton()}
        </View>
      </SafeAreaView>
    )
  }

  private renderUpImage() {
    return (
      <View style={styles.row}>
        <TouchableOpacity style={{ paddingRight: 20 }}>
          <Image source={Assets.Icons.ContainerCamera} style={styles.containerCamera} />
        </TouchableOpacity>
        <Text style={styles.name}>NMD 'Americana'</Text>
      </View>
    )
  }

  private renderBrand() {
    return (
      <TouchableOpacity style={[styles.itemContainer, { paddingTop: 17 }]} activeOpacity={0.9}>
        <Text style={styles.title}>THƯƠNG HIỆU</Text>
        <Text style={styles.descrip}>Lựa chọn</Text>
      </TouchableOpacity>
    )
  }

  private renderGender() {
    return (
      <TouchableOpacity style={[styles.itemContainer, { paddingTop: 17 }]} activeOpacity={0.9}>
        <Text style={styles.title}>GIỚI TÍNH</Text>
        <Text style={styles.descrip}>Lựa chọn</Text>
      </TouchableOpacity>
    )
  }

  private renderSize() {
    return (
      <TouchableOpacity style={[styles.itemContainer, { paddingTop: 17 }]} activeOpacity={0.9}>
        <Text style={styles.title}>KÍCH CỠ</Text>
        <Text style={styles.descrip}>Lựa chọn</Text>
      </TouchableOpacity>
    )
  }

  private renderColor() {
    return (
      <TouchableOpacity style={[styles.itemContainer, { paddingTop: 17 }]} activeOpacity={0.9}>
        <Text style={styles.title}>MÀU SẮC</Text>
        <Text style={styles.descrip}>Lựa chọn</Text>
      </TouchableOpacity>
    )
  }

  private renderCondition() {
    return (
      <TouchableOpacity style={[styles.itemContainer, { paddingTop: 17 }]} activeOpacity={0.9}>
        <Text style={styles.title}>TÌNH TRẠNG</Text>
        <Text style={styles.descrip}>Lựa chọn</Text>
      </TouchableOpacity>
    )
  }

  private renderButton() {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={this.props.navigateToRequireSuccess}>
        <Text style={styles.titleButton}>TIẾP TỤC</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
  },
  containerCamera: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 37,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 14,
    fontFamily: 'RobotoCondensed-Bold',
    opacity: 0.6
  },
  descrip: {
    fontSize: 17,
    fontFamily: 'RobotoCondensed-Regular',
    color: Assets.Styles.AppPrimaryColor,
  },
  buttonContainer: {
    backgroundColor: 'black',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleButton: {
    fontSize: 17,
    fontFamily: 'RobotoCondensed-Bold',
    color: 'white',
  }
})