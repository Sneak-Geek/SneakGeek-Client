import * as React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {} from 'react-native-gesture-handler';
import ImagePicker, {ImagePickerOptions} from 'react-native-image-picker';
import {AppText} from 'screens/Shared';
import {SellOrder} from 'business';
import {toCurrencyString} from 'utilities';
import {images, strings} from 'resources';

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

type Props = {
  orderSummary: Partial<SellOrder>;
  onShoePictureAdded: (picUri: string) => void;
};

export class ProductSellSummary extends React.Component<Props> {
  private readonly imagePickerOptions: ImagePickerOptions = {
    allowsEditing: true,
    mediaType: 'photo',
    quality: 0.75,
  };

  public /** override */ render(): JSX.Element {
    return (
      <ScrollView style={{flex: 1, width: Dimensions.get('screen').width}}>
        <View style={{flex: 1, paddingHorizontal: 20}}>
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
        <AppText.Callout>{strings.SellPrice}</AppText.Callout>
        <AppText.Body style={styles.detail}>
          {toCurrencyString(price as string)}
        </AppText.Body>
      </View>
    );
  }

  private _renderDescription(): JSX.Element {
    const {orderSummary} = this.props;
    return (
      <View style={styles.sectionContainer}>
        <AppText.Callout>{strings.OrderDescription}</AppText.Callout>
        <AppText.Body style={styles.detail}>
          Cỡ {orderSummary.shoeSize}, {orderSummary.isNewShoe ? 'Mới' : 'Cũ'},{' '}
          {orderSummary.productCondition.boxCondition}
        </AppText.Body>
      </View>
    );
  }

  private _renderPictures(): JSX.Element {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <AppText.Body>{strings.ProductPictures}</AppText.Body>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity onPress={this._launchImagePicker.bind(this)}>
              <Image
                source={images.CameraPlaceholder}
                style={styles.imageContainer}
              />
            </TouchableOpacity>
            {this.props.orderSummary?.pictures?.map((item, index) => (
              <Image
                key={index}
                source={{uri: item}}
                style={styles.imageContainer}
                resizeMode={'cover'}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  private _launchImagePicker(): void {
    ImagePicker.launchImageLibrary(this.imagePickerOptions, (result) => {
      if (!result.didCancel) {
        this.props.onShoePictureAdded(result.uri);
      }
    });
  }
}
