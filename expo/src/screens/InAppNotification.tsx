//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AppText } from '@screens/Shared';
import { themes } from '@resources';
import { connect } from 'react-redux';
import { IAppState } from '@store/AppStore';
import { Notifcation } from 'reducers/NotificationReducers';
import { dismissNotification } from 'actions';

type Props = {
  notifications: Notifcation[];
  dismissNotification: (id: string) => void;
};

const ToastItem = ({ item, onPress }: { item: Notifcation; onPress: () => void }) => {
  const toastContainer =
    item.type === 'error' ? styles.toastError : styles.toastRegular;

  return (
    <TouchableWithoutFeedback
      style={[styles.toastContainer, toastContainer]}
      onPress={onPress}
    >
      <AppText.Body style={styles.toastTitle}>{item.message}</AppText.Body>
    </TouchableWithoutFeedback>
  );
};

@connect(
  (state: IAppState) => ({
    notifications: state.NotificationState.notifications,
  }),
  (dispatch: Function) => ({
    dismissNotification: (id: string) => dispatch(dismissNotification(id)),
  }),
)
export class InAppNotification extends React.Component<Props> {
  private timeouts: number[] = [];

  public render(): JSX.Element {
    return (
      <SafeAreaView style={styles.root}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={styles.toastListContainer}
            keyExtractor={(_itm, idx) => idx.toString()}
            data={this.props.notifications}
            renderItem={({ item }) => {
              this._onNotificationAdded(item);
              return (
                <ToastItem
                  item={item}
                  onPress={() => this.props.dismissNotification(item.id)}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  private _onNotificationAdded(item: Notifcation) {
    const timeout = setTimeout(() => {
      this.props.dismissNotification(item.id);
      clearTimeout(timeout);
    }, item.timeout * 1000);

    this.timeouts.push(timeout);
  }

  public componentWillUnmount() {
    this.timeouts.forEach(t => clearTimeout(t));
  }
}

const styles = StyleSheet.create({
  root: {
    zIndex: 1000,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  toastListContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  toastContainer: {
    width: '100%',
    height: themes.ButtonHeight,
    justifyContent: 'center',
  },
  toastRegular: {
    backgroundColor: themes.AppSecondaryColor,
  },
  toastError: {
    backgroundColor: themes.AppErrorColor,
  },
  toastTitle: {
    color: themes.AppAccentColor,
    marginLeft: 20,
  },
});