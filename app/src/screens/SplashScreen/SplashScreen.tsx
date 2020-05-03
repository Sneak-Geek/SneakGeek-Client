import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'utilities';
import { IAppState } from 'store/AppStore';
import { Account, getCurrentUser, NetworkRequestState } from 'business';
import RouteNames from 'navigations/RouteNames';
import RNSplashScreen from 'react-native-splash-screen';

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
export class SplashScreen extends React.Component<Props> {
  public componentDidMount(): void {
    this.props.getCurrentUser();
  }

  public componentDidUpdate(prev: Props): void {
    const { accountState, navigation } = this.props;
    if (accountState.state === prev.accountState.state) {
      return;
    }

    if (accountState.state === NetworkRequestState.FAILED) {
      navigation.navigate(RouteNames.Auth.Name, {
        screen: RouteNames.Auth.Login,
      });
      RNSplashScreen.hide();
    } else if (
      accountState.state === NetworkRequestState.SUCCESS &&
      accountState.account
    ) {
      navigation.navigate(RouteNames.Tab.Name);
      RNSplashScreen.hide();
    } else {
      RNSplashScreen.hide();
    }
  }

  public render(): JSX.Element {
    return <></>;
  }
}
