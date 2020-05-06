import {
  ReducerMap,
  ReduxCompatibleReducer,
  handleActions,
  Action,
} from 'redux-actions';
import {BaseActions} from 'actions';
import {
  connect as originalConnect,
  MapDispatchToPropsParam,
  MapStateToPropsParam,
  MergeProps,
  Options,
} from 'react-redux';
import {IAppState} from 'store/AppStore';

export function handleActionsWithReset<State, Payload>(
  reducerMap: ReducerMap<State, Payload>,
  initialState: State,
): ReduxCompatibleReducer<State, Payload> {
  const originalReducer = handleActions(reducerMap, initialState);

  return (state: State | undefined, action: Action<Payload>): State => {
    if (action.type === BaseActions.RESET) {
      console.log('HIT!');
      console.log(initialState);
      return initialState;
    }

    return originalReducer(state, action);
  };
}

export type InferableComponentEnhancerWithProps<IInjectedProps, INeedsProps> = <
  IComponent extends React.ComponentType<IInjectedProps & INeedsProps>
>(
  component: IComponent,
) => IComponent;

export interface IConnect {
  <IStateProps = {}, IDispatchProps = {}, IOwnProps = {}>(
    mapStateToProps?: MapStateToPropsParam<IStateProps, IOwnProps, IAppState>,
    mapDispatchToProps?: MapDispatchToPropsParam<IDispatchProps, IOwnProps>,
  ): InferableComponentEnhancerWithProps<
    IStateProps & IDispatchProps,
    IOwnProps
  >;

  <IStateProps = {}, IDispatchProps = {}, IOwnProps = {}, IMergedProps = {}>(
    mapStateToProps?: MapStateToPropsParam<IStateProps, IOwnProps, IAppState>,
    mapDispatchToProps?: MapDispatchToPropsParam<IDispatchProps, IOwnProps>,
    mergeProps?: MergeProps<
      IStateProps,
      IDispatchProps,
      IOwnProps,
      IMergedProps
    >,
    options?: Options<IStateProps, IOwnProps, IMergedProps>,
  ): InferableComponentEnhancerWithProps<IMergedProps, IOwnProps>;
}

export const connect = originalConnect as IConnect;
