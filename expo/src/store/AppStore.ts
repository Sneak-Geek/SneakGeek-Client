import { createStore, applyMiddleware, combineReducers, compose, Store, AnyAction } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { UserReducers } from '../reducers';
import {
  IUserState,
  IProductState,
  ICatalogState,
  ProductReducers, 
  CatalogReducers
} from 'business';
import { NotificationReducers, INotificationState } from 'reducers/NotificationReducers';
import { ILoadingIndicatorState, LoadingIndicatorReducers } from 'reducers/LoadingIndicatorReducers';

export type IAppState = {
  UserState: IUserState,
  ProductState: IProductState,
  NotificationState: INotificationState,
  LoadingIndicatorState: ILoadingIndicatorState,
  CatalogState: ICatalogState
}

const rootReducers = combineReducers({
  UserState: UserReducers,
  ProductState: ProductReducers,
  NotificationState: NotificationReducers,
  LoadingIndicatorState: LoadingIndicatorReducers,
  CatalogState: CatalogReducers
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (): Store<IAppState, AnyAction> => {
  return createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
};

export const AppStore = configureStore();
