import React from 'react';
import {connect} from 'utilities';
import {IAppState} from 'store/AppStore';
import {Notification, getUserProfile, NetworkRequestState} from 'business';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {themes} from 'resources';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from 'navigations/RootStack';
import RouteNames from 'navigations/RouteNames';

type Props = {
  notifications: Notification[];
  navigation: StackNavigationProp<RootStackParams, 'HomeTabNotification'>;
  getProfileState: NetworkRequestState;
  getProfile: () => void;
};

const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: themes.NotificationBackground,
  },
  subTitle: {
    ...themes.TextStyle.subhead,
    marginTop: 8,
  },
});

const NotificationItem = (props: {item: Notification; onPress: () => void}) => (
  <ListItem
    title={props.item.title}
    subtitle={Intl.DateTimeFormat('vi').format(new Date(props.item.createdAt))}
    titleStyle={{...themes.TextStyle.body}}
    subtitleStyle={styles.subTitle}
    bottomDivider
    containerStyle={!props.item.isRead ? styles.notificationContainer : {}}
    leftAvatar={{source: {uri: props.item.imageUrl}}}
    onPress={props.onPress}
  />
);

@connect(
  (state: IAppState) => ({
    notifications: state.UserState.profileState.profile?.notifications || [],
    getProfileState: state.UserState.profileState.state,
  }),
  (dispatch: Function) => ({
    getProfile: () => {
      dispatch(getUserProfile());
    },
  }),
)
export class NotificationsScreen extends React.Component<Props> {
  public render(): JSX.Element {
    return (
      <FlatList
        data={this.props.notifications}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <NotificationItem
            item={item}
            onPress={() =>
              this.props.navigation.navigate(
                RouteNames.Tab.TransactionTab.Name,
                {
                  screen: RouteNames.Tab.TransactionTab.Detail,
                  params: {
                    orderId: item.order,
                    orderType: item.orderType,
                  },
                },
              )
            }
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={
              this.props.getProfileState === NetworkRequestState.REQUESTING
            }
            onRefresh={() => this.props.getProfile()}
          />
        }
      />
    );
  }
}
