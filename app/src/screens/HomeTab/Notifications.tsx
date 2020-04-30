import React from 'react';
import {connect} from 'utilities';
import {IAppState} from 'store/AppStore';
import {Notification, getUserProfile, NetworkRequestState} from 'business';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {themes} from 'resources';
import Humanize from 'humanize-plus';

type Props = {
  notifications: Notification[];
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

const NotificationItem = (props: {item: Notification}) => (
  <ListItem
    title={props.item.title}
    subtitle={Intl.DateTimeFormat('vi').format(new Date(props.item.createdAt))}
    titleStyle={{...themes.TextStyle.body}}
    subtitleStyle={styles.subTitle}
    bottomDivider
    containerStyle={!props.item.isRead ? styles.notificationContainer : {}}
    leftAvatar={{source: {uri: props.item.imageUrl}}}
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
        renderItem={({item}) => <NotificationItem item={item} />}
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
