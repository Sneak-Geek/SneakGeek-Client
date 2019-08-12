//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { handleActions, Action } from "redux-actions";
import { ModalTypes } from "../Components/Modal/ModalTypes";
import { displayModal, dismissModal, ModalPayload } from "../Actions";

export interface IModalState {
  modalType: ModalTypes;
  modalData?: any;
}

const initialState: IModalState = {
  modalType: ModalTypes.None,
  modalData: null
};

export const ModalReducers = handleActions<IModalState, any>(
  {
    [`${displayModal}`]: (state: IModalState, action: Action<ModalPayload>) => {
      return {
        ...state,
        modalType: action.payload.modalType,
        modalData: action.payload.data
      };
    },
    [`${dismissModal}`]: (state: IModalState, _action: Action<string>) => {
      return { ...state, modalType: ModalTypes.None, modalData: null };
    }
  },
  initialState
);
