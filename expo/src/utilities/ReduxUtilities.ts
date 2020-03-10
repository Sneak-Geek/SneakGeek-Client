import { ReducerMap, ReduxCompatibleReducer, handleActions, Action } from 'redux-actions';
import { BaseActions } from 'actions';

export function handleActionsWithReset<State, Payload>(
  reducerMap: ReducerMap<State, Payload>,
  initialState: State
): ReduxCompatibleReducer<State, Payload> {
  const originalReducer = handleActions(reducerMap, initialState);

  return (state: State | undefined, action: Action<Payload>): State => {
    if (action.type === BaseActions.RESET) {
      return initialState;
    }

    return originalReducer(state, action);
  };
}