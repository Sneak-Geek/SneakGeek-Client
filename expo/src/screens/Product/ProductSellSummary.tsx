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
import * as ImagePicker from 'expo-image-picker';
import { AppText } from '@screens/Shared';
import { SellOrder } from 'business';
import { toCurrencyString } from 'utilities';
import { themes } from '@resources';

type Props = {
  orderSummary: Partial<SellOrder>;
  onShoePictureAdded: (picUrl: string) => void;
};

type State = {
  pictures: Array<string | null>;
};

export class ProductSellSummary extends React.Component<Props, State> {
  public state = {
    pictures: [null],
  };

  private readonly imagePickerOptions = {
    title: 'Upload images',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
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
        <ScrollView
          style={{ flex: 1, marginTop: 12 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flexDirection: 'row' }}>
            {this.state.pictures.map((item, index) => {
              if (!item) {
                return this._renderImagePicker(index);
              }
              return this._renderPicture(item, index);
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  private _renderImagePicker(index: number): JSX.Element {
    return (
      <TouchableOpacity
        key={index}
        style={{ backgroundColor: themes.DisabledColor, ...styles.imageContainer }}
        onPress={this._launchSystemImagePicker.bind(this)}
      >
        {/* <Image source={} /> */}
      </TouchableOpacity>
    );
  }

  private _launchSystemImagePicker(): void {
    ImagePicker.launchImageLibrary(
      this.imagePickerOptions,
      (response: ImagePickerResponse) => {
        if (!response.didCancel && !response.error) {
          this.setState(prevState => {
            this.props.onShoePictureAdded(response.uri);

            return {
              pictures: [...prevState.pictures, response.uri],
            };
          });
        }
      },
    );
  }

  private _renderPicture(pictureUri: string | null, index: number) {
    pictureUri = pictureUri as string;

    return (
      <Image
        key={index}
        source={{ uri: pictureUri }}
        style={styles.imageContainer}
        resizeMode={'cover'}
      />
    );
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
    width: 93,
    aspectRatio: 1,
    marginRight: 12,
  },
});
