import * as React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import {
  StackActions,
  NavigationScreenProps,
} from "react-navigation";
import { Icon } from 'react-native-elements';
import * as Assets from "../../Assets";
import { RowCard } from '../../Shared/UI';

interface IPaymentScreenState {

}

interface IPaymentScreenProps {

}

export class PaymentScreen extends React.Component<IPaymentScreenProps, IPaymentScreenState> {

  static navigationOptions = (transitionProp: NavigationScreenProps) => ({
    title: "Thanh toán",
    headerTitleStyle: { fontSize: 17, fontFamily: 'RobotoCondensed-Regular', },
    headerLeft: (
      <Icon
        type={"ionicon"}
        name={"ios-arrow-back"}
        size={28}
        containerStyle={{ marginLeft: 10 }}
        onPress={() => transitionProp.navigation.dispatch(StackActions.pop({ n: 1 }))}
      />
    ),
    headerRight: (
      <TouchableOpacity style={{ paddingRight: 20 }}>
        <Image source={Assets.Icons.Share} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
      </TouchableOpacity>
    ),
  });

  public render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <ScrollView>
            {this._renderShoe()}
            {this._renderContent()}
          </ScrollView>
        </View>
        {this._renderButton()}
      </SafeAreaView>
    )
  }

  private _renderShoe() {
    return (
      <View style={styles.topContentContainer}>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri: 'https://images.timberland.com/is/image/timberland/A228P001-HERO?$PDP-FULL-IMAGE$' }} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            PHARELL X BILLIONAIRE BOYS CLUB X NMD HUMAN RACE TRAIL BLUEE PLAID
          </Text>
          <Text style={styles.code}>
            SKU: EF3326
          </Text>
        </View>
      </View>
    )
  }

  private _renderContent() {
    return (
      <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
        <RowCard
          title='CỠ GIÀY'
          descrip='Cỡ 8.5'
        />
        <RowCard
          title='TÌNH TRẠNG'
          descrip='Có hộp, mới'
          border
        />
        <RowCard
          title='ĐỊA CHỈ GIAO HÀNG'
          descrip='Số 20 phố huế, quận hai bà trưng, hà nội'
          green
        />
        <RowCard
          title='HÌNH THỨC GIAO HÀNG'
          descrip='Chuyển phát nhanh'
          green
        />
        <RowCard
          title='THANH TOÁN'
          descrip='Lựa chọn'
          border
          descripStyle={{ opacity: 0.3 }}
        />
        <RowCard
          title='GIÁ MUA'
          descrip='VND 1,800,000'
          green
        />
        <RowCard
          title='PHÍ GIAO HÀNG'
          descrip='VND 1,800,000'
        />
        <RowCard
          title='TỔNG CỘNG'
          descrip='VND 1,800,000'
        />
      </View>
    )
  }

  private _renderButton() {
    return (
      <TouchableOpacity style={styles.containerButton} >
        <Text style={styles.titleButton}>MUA SẢN PHẨM</Text>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  topContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 14,
  },
  imgContainer: {
    width: 78,
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 73,
    height: 73,
    resizeMode: 'cover',
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 17,
    paddingBottom: 7,
  },
  title: {
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 17,
    paddingTop: 17
  },
  code: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 14,
    paddingTop: 5,
  },
  boldText: {
    opacity: 0.6,
    fontSize: 14,
    fontFamily: 'RobotoCondensed-Bold',
  },
  regularText: {
    fontSize: 17,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'right',
  },
  containerButton: {
    height: Assets.Styles.ButtonHeight,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleButton: {
    fontSize: 17,
    fontFamily: 'RobotoCondensed-Bold',
    color: 'white'
  }
})