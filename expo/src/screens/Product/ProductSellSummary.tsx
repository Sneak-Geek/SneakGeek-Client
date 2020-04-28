import * as React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {} from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { AppText } from '@screens/Shared';
import { SellOrder } from 'business';
import { toCurrencyString } from 'utilities';
import { images } from '@resources';

type Props = {
  orderSummary: Partial<SellOrder>;
  onShoePictureAdded: (picUri: string) => void;
};

export class ProductSellSummary extends React.Component<Props> {
  private readonly imagePickerOptions = {
    allowsEditing: true,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: false,
    quality: 0.5,
  };

  public /** override */ render(): JSX.Element {
    return (
      <ScrollView style={{ flex: 1, width: Dimensions.get('screen').width }}>
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {this._renderPriceSummary()}
          {this._renderDescription()}
          {this._renderPictures()}
        </View>
      </ScrollView>
    );
  }

  private _renderPriceSummary(): JSX.Element {
    const price = this.props.orderSummary.sellNowPrice || '';

    return (
      <View style={styles.sectionContainer}>
        <AppText.Callout>Giá bán</AppText.Callout>
        <AppText.Body style={styles.detail}>
          {toCurrencyString(price as string)}
        </AppText.Body>
      </View>
    );
  }

  private _renderDescription(): JSX.Element {
    const { orderSummary } = this.props;
    return (
      <View style={styles.sectionContainer}>
        <AppText.Callout>Miêu tả</AppText.Callout>
        <AppText.Body style={styles.detail}>
          Cỡ {orderSummary.shoeSize}, {orderSummary.isNewShoe ? 'Mới' : 'Cũ'},{' '}
          {orderSummary.productCondition.boxCondition}
        </AppText.Body>
      </View>
    );
  }

  private _renderPictures(): JSX.Element {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <AppText.Body>Ảnh sản phẩm</AppText.Body>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity onPress={this._launchSystemImagePicker.bind(this)}>
              <Image
                source={images.CameraPlaceholder}
                style={styles.imageContainer}
              />
            </TouchableOpacity>
            {this.props.orderSummary?.pictures?.map((item, index) => (
              <Image
                key={index}
                source={{ uri: item }}
                style={styles.imageContainer}
                resizeMode={'cover'}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  private async _launchSystemImagePicker(): Promise<void> {
    const response = await ImagePicker.launchImageLibraryAsync(
      this.imagePickerOptions,
    );

    if (!response.cancelled) {
      const info = response as { uri: string; type: string };
      this.props.onShoePictureAdded(info.uri);
    }
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 30,
  },

  detail: {
    color: '#1ABC9C',
    marginTop: 10,
  },

  imageContainer: {
    width: 95,
    aspectRatio: 1,
    marginRight: 12,
  },
});
