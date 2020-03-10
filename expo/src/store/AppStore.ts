import { createStore, applyMiddleware, combineReducers, compose, Store, AnyAction } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { UserReducers } from '../reducers';
import { IUserState } from 'business';
import { NotificationReducers, INotificationState } from 'reducers/NotificationReducers';
import { ILoadingIndicatorState, LoadingIndicatorReducers } from 'reducers/LoadingIndicatorReducers';

export interface IAppState {
  UserState: IUserState;
  NotificationState: INotificationState,
  LoadingIndicatorState: ILoadingIndicatorState
}

const rootReducers = combineReducers({
  UserState: UserReducers,
  NotificationState: NotificationReducers,
  LoadingIndicatorState: LoadingIndicatorReducers
});

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const configureStore = (): Store<IAppState, AnyAction> => {
  return createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
};

export const AppStore = configureStore();
