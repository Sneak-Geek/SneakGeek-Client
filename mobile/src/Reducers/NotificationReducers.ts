//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { handleActions, Action } from "redux-actions";
import { showNotification, dismissNotification } from "../Actions";
import uuid from "uuid";

export interface INotificationState {
  notifications: {
    id: string;
    message: string;
    timeout: number;
  }[];
}

const initialState: INotificationState = {
  notifications: []
};

export const NotificationReducers = handleActions<INotificationState, any>(
  {
    [`${showNotification}`]: (state: INotificationState, action: Action<string>) => ({
      ...state,
      notifications: [
        ...state.notifications,
        { id: uuid.v1(), message: action.payload, timeout: 5 }
      ]
    }),
    [`${dismissNotification}`]: (state: INotificationState, action: Action<string>) => ({
      ...state,
      notifications: state.notifications.filter(t => t.id !== action.payload)
    })
  },
  initialState
);
