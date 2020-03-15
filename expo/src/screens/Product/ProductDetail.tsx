import React from 'react';
import { StackNavigationProp, HeaderHeightContext } from '@react-navigation/stack';
import { RootStackParams } from 'navigations/RootStack';
import { RouteProp } from '@react-navigation/native';
import { View, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { AppText } from '@screens/Shared';
import { strings, themes } from '@resources';
import { Icon, Rating } from 'react-native-elements';

type Props = {
  route: RouteProp<RootStackParams, 'ProductDetail'>;
  navigation: StackNavigationProp<RootStackParams, 'ProductDetail'>;
};

const styles = StyleSheet.create({
  shoeImageContainer: {
    height: Dimensions.get('window').height * 0.3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'transparent',
    borderBottomColor: 'lightgray',
  },
  headerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: themes.DisabledColor,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  backHitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  shoeTitle: {
    marginVertical: 20,
    marginHorizontal: 25,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  detailKey: {
    minWidth: '25%',
  },
  detailValue: {
    flex: 1,
    textAlign: 'right',
  },
});

export class ProductDetail extends React.Component<Props> {
  private _shoe = this.props.route.params.shoe;

  public render(): JSX.Element {
    return (
      <SafeAreaConsumer>
        {(insets): JSX.Element => (
          <View style={{ paddingTop: insets.top, backgroundColor: 'white', flex: 1 }}>
            {this._renderHeader(insets.top)}
            <ScrollView style={{ flex: 1 }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                {this._renderProductImage()}
                {this._renderProductTitle()}
                {this._renderProductDescription()}
                {this._renderProductDetail()}
                {this._renderProductRatings()}
                {this._renderRelatedShoes()}
                {this._renderActionButtons()}
              </View>
            </ScrollView>
          </View>
        )}
      </SafeAreaConsumer>
    );
  }

  private _renderHeader(topInsets: number) {
    return (
      <HeaderHeightContext.Consumer>
        {headerHeight => (
          <View
            style={{ ...styles.headerContainer, height: headerHeight - topInsets }}
          >
            <Icon
              name={'ios-arrow-back'}
              type={'ionicon'}
              size={themes.IconSize}
              onPress={() => this.props.navigation.goBack()}
              hitSlop={styles.backHitSlop}
            />
            <AppText.Title3>{strings.ProductDetail}</AppText.Title3>
            <Icon name={'share'} type={'feather'} size={themes.IconSize} />
          </View>
        )}
      </HeaderHeightContext.Consumer>
    );
  }

  private _renderProductImage() {
    return (
      <View style={styles.shoeImageContainer}>
        <Image
          source={{ uri: this._shoe.imageUrl }}
          style={{ width: '100%', aspectRatio: 2 }}
          resizeMode={'contain'}
        />
      </View>
    );
  }

  private _renderProductTitle() {
    return (
      <AppText.Title2 style={styles.shoeTitle} numberOfLines={3}>
        {this._shoe.title}
      </AppText.Title2>
    );
  }

  private _renderProductDescription(): JSX.Element {
    if (!this._shoe.description) {
      return null;
    }

    return (
      <AppText.Body style={{ marginHorizontal: 30 }}>
        {this._shoe.description}
      </AppText.Body>
    );
  }

  private _renderProductDetail() {
    const fieldMapping = new Map<string, string>([
      [this._shoe.title, 'Tên sản phẩm'],
      [this._shoe.colorway.join(', '), 'Màu chủ đạo'],
      [this._shoe.brand, 'Hãng'],
      [this._shoe.category, 'Phân khúc'],
      [
        Intl.DateTimeFormat('vi').format(new Date(this._shoe.releaseDate)),
        'Ngày ra mắt',
      ],
    ]);
    const views: JSX.Element[] = [];
    fieldMapping.forEach((value: string, key: string) =>
      views.push(
        <View key={key} style={styles.detailRow}>
          <AppText.Subhead style={styles.detailKey}>
            {value.toUpperCase()}
          </AppText.Subhead>
          <AppText.Body style={styles.detailValue} numberOfLines={2}>
            {key}
          </AppText.Body>
        </View>,
      ),
    );
    return <View style={{ paddingHorizontal: 20 }}>{views}</View>;
  }

  private _renderProductRatings() {}

  private _renderRelatedShoes() {}

  private _renderActionButtons() {}
}
