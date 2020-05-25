import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../store';
import { NetworkRequestState, Account } from 'business';
import { History } from 'history';

type Props = {
  history: History;
  accountState: {
    state: NetworkRequestState;
    account?: Account;
  };
};

const UnconnectedSecuredScreen = (props: React.PropsWithChildren<Props>) => {
  useEffect(() => {
    const { account, state } = props.accountState;
    if (!account || state === NetworkRequestState.FAILED) {
      props.history.replace('/login');
    }
  });

  return (<>{props.children}</>) as React.ReactElement;
};

export const SecuredScreen: React.PropsWithChildren<any> = connect((state: IAppState) => ({
  accountState: state.UserState.accountState,
}))(UnconnectedSecuredScreen);
