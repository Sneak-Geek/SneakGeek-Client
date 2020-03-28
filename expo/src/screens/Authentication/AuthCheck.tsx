import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'utilities';
import { IAppState } from '@store/AppStore';
import { Account, getCurrentUser, NetworkRequestState } from 'business';
import RouteNames from 'navigations/RouteNames';
import { SplashScreen } from 'expo';

type Props = {
  navigation: StackNavigationProp<any>;
  accountState: {
    state: NetworkRequestState;
    error?: any;
    account?: Account;
  };
  getCurrentUser: () => void;
};

@connect(
  (state: IAppState) => ({
    accountState: state.UserState.accountState,
  }),
  (dispatch: Function) => ({
    getCurrentUser: (): void => {
      dispatch(getCurrentUser());
    },
  }),
)
export class AuthCheck extends React.Component<Props> {
  public componentDidMount(): void {
    SplashScreen.preventAutoHide();
    this.props.getCurrentUser();
  }

  public componentDidUpdate(prev: Props): void {
    const { accountState, navigation } = this.props;
    if (accountState.state === prev.accountState.state) return;

    if (accountState.state === NetworkRequestState.FAILED) {
      navigation.push(RouteNames.Auth.Login);
      SplashScreen.hide();
    } else if (
      accountState.state === NetworkRequestState.SUCCESS &&
      accountState.account
    ) {
      navigation.push(RouteNames.Tab.Name);
      SplashScreen.hide();
    }
  }

  public render(): JSX.Element {
    return <></>;
  }
}
