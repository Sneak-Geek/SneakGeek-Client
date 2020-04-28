import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
  Store,
  AnyAction,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  IUserState,
  IProductState,
  ICatalogState,
  ProductReducers,
  CatalogReducers,
  UserReducers,
} from 'business';
import {
  NotificationReducers,
  INotificationState,
  LoadingIndicatorReducers,
  ILoadingIndicatorState,
} from 'reducers';
import {IOrderState, OrderReducers} from 'business/src';

export type IAppState = {
  UserState: IUserState;
  ProductState: IProductState;
  NotificationState: INotificationState;
  LoadingIndicatorState: ILoadingIndicatorState;
  CatalogState: ICatalogState;
  OrderState: IOrderState;
};

const rootReducers = combineReducers({
  UserState: UserReducers,
  ProductState: ProductReducers,
  NotificationState: NotificationReducers,
  LoadingIndicatorState: LoadingIndicatorReducers,
  CatalogState: CatalogReducers,
  OrderState: OrderReducers,
});

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const configureStore = (): Store<IAppState, AnyAction> => {
  return createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
  );
};

export const AppStore = configureStore();
