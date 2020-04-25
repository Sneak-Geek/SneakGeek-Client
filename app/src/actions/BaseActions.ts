import {createAction} from 'redux-actions';

export const BaseActions = {
  RESET: 'RESET',
};

export const reset = createAction(BaseActions.RESET);
