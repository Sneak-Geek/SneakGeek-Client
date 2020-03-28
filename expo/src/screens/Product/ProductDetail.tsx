import React from 'react';
import { StackNavigationProp, HeaderHeightContext } from '@react-navigation/stack';
import { RootStackParams } from 'navigations/RootStack';
import { RouteProp } from '@react-navigation/native';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { AppText, LiteShoeCard } from '@screens/Shared';
import { strings, themes, images } from '@resources';
import { Icon, Avatar, Rating } from 'react-native-elements';
import { connect, toVnDateFormat } from 'utilities';
import Humanize from 'humanize-plus';
import { IAppState } from '@store/AppStore';
import {
  NetworkRequestState,
  Review,
  getReviews,
  Profile,
  getShoeInfo,
  Shoe,
  SellOrder,
  BuyOrder,
  PriceData,
} from 'business';
import RouteNames from 'navigations/RouteNames';

type Props = {
  profile: Profile;
  route: RouteProp<RootStackParams, 'ProductDetail'>;
  navigation: StackNavigationProp<RootStackParams, 'ProductDetail'>;
  reviewState: {
    state: NetworkRequestState;
    reviews: Review[];
    error?: any;
  };
  shoeInfoState: {
    state: NetworkRequestState;
    error?: any;
    relatedShoes: Shoe[];
    lowestSellOrder?: SellOrder;
    highestBuyOrder?: BuyOrder;
  };
  getReviews: (shoeId: string) => void;
  getShoeInfo: (shoeId: string) => void;
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white',
    flex: 1,
    position: 'relative',
  },
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
  },
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
    marginHorizontal: '15%',
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  detailKey: {
    minWidth: '25%',
  },
  detailValue: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 8,
  },
  noReview: {
    textAlign: 'left',
    marginVertical: 10,
  },
  ratingHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewContent: { flexDirection: 'row', marginBottom: 8 },
  reviewAvatar: { borderWidth: 0.5, borderColor: themes.DisabledColor },
  reviewAuthor: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  bottomContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  bottomButtonStyle: {
    height: themes.ButtonHeight,
    width: Dimensions.get('window').width * 0.45,
    alignItems: 'center',
    borderRadius: themes.ButtonBorderRadius,
    flexDirection: 'row',
  },
});

const ReviewItem = (props: { review: Review }): JSX.Element => {
  const { review } = props;
  const profile = review.reviewedBy.profile as Partial<Profile>;
  const { userProvidedName, userProvidedProfilePic } = profile;
  const avatar = userProvidedProfilePic
    ? { uri: userProvidedProfilePic }
    : images.Profile;

  return (
    <View style={{ marginVertical: 8 }}>
      <View style={styles.reviewContent}>
        <Avatar
          rounded
          source={avatar}
          size={'small'}
          containerStyle={styles.reviewAvatar}
        />
        <View style={styles.reviewAuthor}>
          <AppText.Body>
            {userProvidedName.firstName} {userProvidedName.lastName}
          </AppText.Body>
          <AppText.Footnote>{toVnDateFormat(review.updatedAt)}</AppText.Footnote>
        </View>
        <Rating
          startingValue={review.rating}
          readonly
          imageSize={themes.IconSize / 1.5}
        />
      </View>
      <AppText.Subhead>{review.description}</AppText.Subhead>
    </View>
  );
};

@connect(
  (state: IAppState) => ({
    reviewState: state.ProductState.reviewState,
    shoeInfoState: state.ProductState.infoState,
    profile: state.UserState.profileState.profile,
  }),
  (dispatch: Function) => ({
    getReviews: (shoeId: string) => dispatch(getReviews(shoeId)),
    getShoeInfo: (shoeId: string) => dispatch(getShoeInfo(shoeId)),
  }),
)
export class ProductDetail extends React.Component<Props> {
  private _shoe = this.props.route.params.shoe;

  public componentDidMount() {
    this.props.getReviews(this._shoe._id);
    this.props.getShoeInfo(this._shoe._id);
  }

  public render(): JSX.Element {
    return (
      <SafeAreaConsumer>
        {(insets): JSX.Element => (
          <View
            style={{
              paddingTop: insets.top,
              ...styles.rootContainer,
            }}
          >
            {this._renderHeader(insets.top)}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <View
                style={{
                  ...styles.pageContainer,
                  marginBottom: insets.bottom + themes.ButtonHeight,
                }}
              >
                {this._renderProductImage()}
                {this._renderProductTitle()}
                {this._renderProductDescription()}
                {this._renderProductDetail()}
                {this._renderProductReviews()}
                {this._renderRelatedShoes()}
              </View>
            </ScrollView>
            {this._renderActionButtons(insets.bottom)}
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
            style={{ ...styles.headerContainer, height: headerHeight + topInsets }}
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
      [this._shoe.title, strings.ProductName],
      [this._shoe.colorway.join(', '), strings.Colorway],
      [this._shoe.brand, strings.Brand],
      [this._shoe.category, strings.Category],
      [toVnDateFormat(this._shoe.releaseDate), strings.ReleaseDate],
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

  private _renderProductReviews(): JSX.Element {
    const { reviewState } = this.props;
    const { state, reviews } = reviewState;

    let content: JSX.Element;
    if (state === NetworkRequestState.REQUESTING) {
      content = <ActivityIndicator />;
    } else if (state === NetworkRequestState.FAILED) {
    }

    if (state === NetworkRequestState.SUCCESS && reviews.length === 0) {
      content = (
        <AppText.Subhead style={styles.noReview}>{strings.NoReview}</AppText.Subhead>
      );
    } else {
      content = (
        <View style={{ marginTop: 10 }}>
          {reviews.slice(0, 2).map(review => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </View>
      );
    }

    return (
      <View style={{ flex: 1, padding: 20 }}>
        <View style={styles.ratingHeaderContainer}>
          <AppText.Title2>{strings.Rating}</AppText.Title2>
          <Icon
            name={'edit'}
            size={themes.IconSize}
            color={themes.AppPrimaryColor}
            onPress={this._onEditReview.bind(this)}
          />
        </View>
        {content}
      </View>
    );
  }

  private _onEditReview() {
    const { profile, navigation } = this.props;
    if (
      profile.userProvidedName &&
      profile.userProvidedName.firstName &&
      profile.userProvidedName.lastName
    ) {
      // @ts-ignore
      navigation.push(RouteNames.Product.NewReview, { shoe: this._shoe });
    } else {
      Alert.alert(strings.AccountInfo, strings.MissingInfoForReview, [
        {
          text: strings.AddInfoForReview,
          onPress: () =>
            // @ts-ignore
            navigation.navigate(RouteNames.Tab.AccountTab.Name, {
              screen: RouteNames.Tab.AccountTab.EditProfile,
            }),
        },
        {
          text: strings.Cancel,
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    }
  }

  private _renderRelatedShoes() {
    let content: JSX.Element;
    const { shoeInfoState } = this.props;

    if (shoeInfoState.state === NetworkRequestState.REQUESTING) {
      content = <ActivityIndicator size={'large'} />;
    } else if (shoeInfoState.state === NetworkRequestState.SUCCESS) {
      content = (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20, paddingBottom: 10 }}
          data={shoeInfoState.relatedShoes}
          keyExtractor={itm => itm._id}
          renderItem={({ item }) => (
            <LiteShoeCard
              shoe={item}
              onPress={() =>
                // @ts-ignore
                this.props.navigation.push(RouteNames.Product.ProductDetail, {
                  shoe: item,
                })
              }
              style={{ marginRight: 20, paddingBottom: 8 }}
            />
          )}
        />
      );
    }

    return (
      <View style={{ flex: 1, padding: 20 }}>
        <View style={styles.ratingHeaderContainer}>
          <AppText.Title2>{strings.RelatedProducts}</AppText.Title2>
        </View>
        {content}
      </View>
    );
  }

  private _renderActionButtons(bottom: number) {
    const { highestBuyOrder, lowestSellOrder } = this.props.shoeInfoState;
    return (
      <View style={{ bottom, ...styles.bottomContainer }}>
        {this._renderSingleActionButton(
          'Bán',
          `Cao: ${highestBuyOrder ? highestBuyOrder.buyPrice : '-'}`,
          'cart-arrow-up',
          themes.AppSellColor,
          () => {
            // @ts-ignore
            this.props.navigation.push(RouteNames.Product.NewSellOrder, {
              shoe: this._shoe,
            });
          },
        )}
        {this._renderSingleActionButton(
          'Mua',
          `Thấp: ${
            lowestSellOrder
              ? Humanize.compactInteger((lowestSellOrder.sellNowPrice as PriceData).price, 2)
              : '-'
          }`,
          'cart-arrow-down',
          themes.AppPrimaryColor,
          () => {
            // @ts-ignore
            this.props.navigation.push(RouteNames.Product.SizeSelection, {
              shoe: this._shoe,
            });
          },
        )}
      </View>
    );
  }

  private _renderSingleActionButton(
    title: string,
    subtitle: string,
    iconName: string,
    backgroundColor: string,
    onPress: () => void,
  ) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            backgroundColor,
            ...styles.bottomButtonStyle,
            ...themes.ButtonShadow,
          }}
        >
          <Icon
            name={iconName}
            size={themes.IconSize}
            color={themes.AppAccentColor}
            type={'material-community'}
            containerStyle={{ marginHorizontal: 10 }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <AppText.Title3 style={{ color: themes.AppAccentColor }}>
              {title}
            </AppText.Title3>
            <AppText.Callout style={{ color: themes.AppAccentColor }}>
              {subtitle}
            </AppText.Callout>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
