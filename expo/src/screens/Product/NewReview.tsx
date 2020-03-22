import React, { useState } from 'react';
import { SafeAreaView, View, Image, StyleSheet, Alert } from 'react-native';
import { AppText, BottomButton } from '@screens/Shared';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from 'navigations/RootStack';
import { RouteProp } from '@react-navigation/native';
import {
  Shoe,
  ObjectFactory,
  IShoeService,
  FactoryKeys,
  ISettingsProvider,
  SettingsKey,
  Review,
} from 'business';
import { Rating, Input } from 'react-native-elements';
import { themes, strings } from '@resources';
import { connect } from 'utilities/ReduxUtilities';
import {
  toggleIndicator,
  showErrorNotification,
  showSuccessNotification,
} from 'actions';
import { IAppState } from '@store/AppStore';

type Props = {
  route: RouteProp<RootStackParams, 'ProductNewReview'>;
  navigation: StackNavigationProp<RootStackParams, 'ProductNewReview'>;

  showSuccessNotification: (msg: string) => void;
  showErrorNotification: (msg: string) => void;
  toggleLoadingIndicator: (isLoading: boolean, message?: string) => void;
};

type State = {
  rating: number;
  description: string;
};

const styles = StyleSheet.create({
  summaryContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomColor: themes.DisabledColor,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  shoeImage: {
    width: 120,
    aspectRatio: 2,
  },
});

@connect(
  (_: IAppState) => ({}),
  (dispatch: Function) => ({
    showSuccessNotification: (message: string) => {
      dispatch(showSuccessNotification(message));
    },
    showErrorNotification: (message: string) => {
      dispatch(showErrorNotification(message));
    },
    toggleLoadingIndicator: (isLoading: boolean, message?: string) => {
      dispatch(toggleIndicator({ isLoading, message }));
    },
  }),
)
export class NewReview extends React.Component<Props, State> {
  private shoe: Shoe = this.props.route.params.shoe;
  private unmountTimeout: number = 0;

  state = {
    description: '',
    rating: 0,
  };

  public render(): JSX.Element {
    const { rating } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, position: 'relative' }}>
          {this._rendershoeSummary()}
          <View style={{ padding: 20 }}>
            {this._renderRatingView()}
            {this._renderDescriptionView()}
          </View>
          <BottomButton
            style={{ backgroundColor: themes.AppPrimaryColor }}
            title={strings.PostRating}
            onPress={() => this._postReview()}
          />
        </View>
      </SafeAreaView>
    );
  }

  public componentWillUnmount() {
    clearTimeout(this.unmountTimeout);
  }

  private _rendershoeSummary() {
    return (
      <View style={styles.summaryContainer}>
        <Image
          source={{ uri: this.shoe.imageUrl }}
          style={styles.shoeImage}
          resizeMode={'contain'}
        />
        <View style={styles.titleContainer}>
          <AppText.Body style={{ flex: 1 }}>{this.shoe.title}</AppText.Body>
          <AppText.Subhead>{this.shoe.colorway.join(', ')}</AppText.Subhead>
        </View>
      </View>
    );
  }

  private _renderRatingView(): JSX.Element {
    const { rating } = this.state;

    return (
      <View>
        <AppText.Body style={{ marginBottom: 10 }}>
          {strings.RatingTitle}
          <AppText.Headline style={{ color: themes.AppPrimaryColor }}>
            {' ' + rating.toString()}/5
          </AppText.Headline>
        </AppText.Body>
        <Rating
          ratingCount={5}
          startingValue={rating}
          type={'custom'}
          imageSize={themes.IconSize + 10}
          onFinishRating={rating => this.setState({ rating })}
          fractions={0}
        />
      </View>
    );
  }

  private _renderDescriptionView(): JSX.Element {
    const { description } = this.state;

    return (
      <View style={{ marginTop: 20 }}>
        <AppText.Body>{strings.Detail}</AppText.Body>
        <Input
          value={description}
          onChangeText={description => this.setState({ description })}
          placeholder={strings.RatingPlaceHolder}
          inputStyle={themes.TextStyle.body}
          multiline={true}
          numberOfLines={5}
          underlineColorAndroid={'transparent'}
          containerStyle={{ marginTop: 10 }}
        />
      </View>
    );
  }

  private async _postReview() {
    const { rating, description } = this.state;
    const { toggleLoadingIndicator, navigation, showErrorNotification } = this.props;

    const shoeService = ObjectFactory.getObjectInstance<IShoeService>(
      FactoryKeys.IShoeService,
    );
    const settings = ObjectFactory.getObjectInstance<ISettingsProvider>(
      FactoryKeys.ISettingsProvider,
    );
    const token = settings.getValue(SettingsKey.CurrentAccessToken);

    toggleLoadingIndicator(true);
    try {
      await shoeService.addReview(token, {
        shoeId: this.shoe._id,
        rating,
        description,
        imageUrls: [],
      } as Review);

      showSuccessNotification('Đã đánh giá sản phẩm thành công');
      
      this.unmountTimeout = setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error) {
      showErrorNotification('Đã có lỗi xảy ra');
    } finally {
      toggleLoadingIndicator(false);
    }
  }
}
