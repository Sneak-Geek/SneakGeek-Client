import { Action } from "redux-actions";
import { dismissNotification, showErrorNotification } from "actions";
import { handleActionsWithReset } from "utilities/ReduxUtilities";

export type Notifcation = {
  id: string;
  type: 'error' | 'regular';
  message: string;
  timeout: number;
};

export interface INotificationState {
  notifications: Array<Notifcation>;
}

const initialState: INotificationState = {
  notifications: []
};

export const NotificationReducers = handleActionsWithReset<INotificationState, any>(
  {
    [`${showErrorNotification}`]: (state: INotificationState, action: Action<string>) => ({
      ...state,
      notifications: [...state.notifications, {
        id: new Date().getTime().toString(),
        type: 'error',
        message: action.payload,
        timeout: 5
      }]
    }),
    [`${dismissNotification}`]: (state: INotificationState, action: Action<string>) => ({
      ...state,
      notifications: state.notifications.filter(t => t.id !== action.payload)
    })
  },
  initialState
);
