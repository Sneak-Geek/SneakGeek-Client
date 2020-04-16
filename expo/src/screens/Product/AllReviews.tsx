import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { AppText, BottomButton } from '@screens/Shared';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from 'navigations/RootStack';
import { StackNavigationProp, HeaderHeightContext } from '@react-navigation/stack';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { themes, strings } from '@resources';
import { Icon, Rating } from 'react-native-elements';
import { Review, Shoe } from 'business';
import { ReviewItem } from './ProductDetail';
import "../Shared/BottomButton";
import RouteNames from 'navigations/RouteNames';

type Props = {
  navigation: StackNavigationProp<RootStackParams, 'ProductAllReviews'>;
  route: RouteProp<RootStackParams, 'ProductAllReviews'>;
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white',
    flex: 1,
    position: 'relative',
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
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  backHitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  sortingContainer: {
    flexDirection: "row"
  }
  ,
  reviewStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
  },
})

export class AllReviews extends React.Component<Props>{
  private reviews: Review[] = this.props.route.params.reviews;
  private shoe: Shoe = this.props.route.params.shoe;

  public render(): JSX.Element {
    return (
      <SafeAreaConsumer >
        {(insets): JSX.Element => (
          <View
            style={{
              paddingTop: insets.top,
              ...styles.rootContainer,
            }}>
            {this._renderHeader(insets.top)}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <View
                style={{
                  ...styles.pageContainer,
                  marginBottom: insets.bottom + themes.ButtonHeight,
                }}
              >
                {this._renderStats()}
                {this._renderSortingBar()}
                {this._renderReviews(this.reviews)}
              </View>
            </ScrollView>
            {this._renderAddReviewButton(insets.bottom)}
          </View>
        )
        }
      </SafeAreaConsumer>
    );
  }

  private _renderHeader(topInsets: number): JSX.Element {
    return (
      <HeaderHeightContext.Consumer>
        {
          headerHeight => (
            <View style={{ ...styles.headerContainer, height: headerHeight + topInsets, }}>
              <Icon
                name={'ios-arrow-back'}
                type={'ionicon'}
                size={themes.IconSize}
                hitSlop={styles.backHitSlop}
                onPress={() => this.props.navigation.goBack()}
              />
              <AppText.Title3>{strings.AllReviews}</AppText.Title3>
              <Icon
                color="white"
                name={'ios-arrow-back'}
                type={'ionicon'}
                size={themes.IconSize}
                hitSlop={styles.backHitSlop}
              />
            </View>
          )
        }
      </HeaderHeightContext.Consumer>
    );
  }

  private _renderSortingBar(): JSX.Element {
    return (
      <View style={{ ...styles.sortingContainer, paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
        <Icon
          name={'tune'}
          size={themes.IconSize * 0.95}
          hitSlop={styles.backHitSlop}
          onPress={() => { }}
        />
        <AppText.Body style={{ paddingLeft: 5 }}>
          {strings.SortByDate}
        </AppText.Body>
      </View>
    );
  }

  private _renderStats(): JSX.Element {
    const reviewStats = this.shoe.reviewStats;

    let stars = [5, 4, 3, 2, 1]
    let numStars = [reviewStats.oneStarReviews, reviewStats.twoStarReviews, reviewStats.threeStarReviews, reviewStats.fourStarReviews, reviewStats.fiveStarReviews,]

    return (
      <View style={{ ...styles.reviewStatsContainer, padding: 20 }}>
        <View>
          <AppText.Title1 style={{ color: '#1ABC9C', textAlign: "center" }}>
            {reviewStats.avgRating === 0 ? '- /5' : <AppText.LargeTitle>{reviewStats.avgRating}</AppText.LargeTitle> + ` /5`}
          </AppText.Title1>
          <AppText.Title2 style={{ fontSize: 20, textAlign: "center" }}>
            Tổng quan
        </AppText.Title2>
          <AppText.Caption1 style={{ fontSize: 16, marginVertical: 5, textAlign: "center" }}>
            {this.shoe.reviewStats.totalReviews} đánh giá
          </AppText.Caption1>
        </View>

        <View>
          {stars.map(star => {
            return (
              <View style={{ flexDirection: "row" }}>
                <AppText.Body style={{ paddingRight: 10 }}>
                  {numStars[star - 1]} người
              </AppText.Body>
                <Rating
                  ratingColor={themes.AppPrimaryColor}
                  startingValue={star}
                  readonly
                  imageSize={themes.IconSize / 1.5}
                />
              </View>
            );
          })
          }
        </View>
      </View >
    );
  }
  private _renderReviews(reviews: Review[]): JSX.Element {
    if (this.shoe.reviewStats.totalReviews === 0)
      return (
        <AppText.Body style={{ textAlign: "center", paddingVertical: 150 }}>{strings.NoRating}</AppText.Body>
      );
    return (
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }} showsVerticalScrollIndicator={false}>
        {reviews.map(review => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </ScrollView>
    );
  }

  private _renderAddReviewButton(bottom: number): JSX.Element {
    const newOnPress = (): void => {
      const { profile } = this.props.route.params;
      if (
        profile.userProvidedName &&
        profile.userProvidedName.firstName &&
        profile.userProvidedName.lastName
      ) {
        // @ts-ignore
        this.props.navigation.push(RouteNames.Product.NewReview, { shoe: this.shoe });
      } else {
        this.alertMissingInfo(strings.MissingInfoForReview);
      }
    }
    return (
      <BottomButton
        style={{ bottom, backgroundColor: themes.AppSecondaryColor }}
        title={strings.AddReview}
        onPress={newOnPress}
      />
    );
  }

  private alertMissingInfo = (message: string): void => {
    const { navigation } = this.props;
    Alert.alert(strings.AccountInfo, message, [
      {
        text: strings.AddInfoForReview,
        onPress: (): void =>
          // @ts-ignore
          navigation.navigate(RouteNames.Tab.AccountTab.Name, {
            // @ts-ignore
            screen: RouteNames.Tab.AccountTab.EditProfile,
          }),
      },
      {
        text: strings.Cancel,
        onPress: null,
        style: 'cancel',
      },
    ]);
  }
};
