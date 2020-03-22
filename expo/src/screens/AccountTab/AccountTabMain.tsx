import React from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';
import { connect } from 'utilities/ReduxUtilities';
import { IAppState } from '@store/AppStore';
import { Profile, Account } from 'business';
import { themes, strings } from '@resources';
import { AppText, BottomButton } from '@screens/Shared';
import { ListItem, Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {
  ActionSheetProps,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import RouteNames from 'navigations/RouteNames';

type Props = {
  account: Account;
  profile: Profile;
  navigation: StackNavigationProp<any>;
};

type Setting = {
  title: string;
  onClick: () => void;
  leftIcon: string;
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: themes.AppDisabledColor,
  },
  avatarContainer: {
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  name: {
    marginTop: 25,
    textAlign: 'right',
  },
});

@connect((state: IAppState) => ({
  account: state.UserState.accountState.account,
  profile: state.UserState.profileState.profile,
}))
class UnconnectedAccountTabMain extends React.Component<Props & ActionSheetProps> {
  private settings: Setting[] = [
    {
      title: strings.AccountInfo,
      onClick: () =>
        this.props.navigation.push(RouteNames.Tab.AccountTab.EditProfile),
      leftIcon: 'person',
    },
    {
      title: strings.NotificationSettings,
      onClick: () => {},
      leftIcon: 'notifications-active',
    },
    {
      title: strings.ShareApplication,
      onClick: () => {},
      leftIcon: 'share',
    },
    {
      title: strings.InfoAppSetting,
      onClick: () => {},
      leftIcon: 'info',
    },
    {
      title: strings.AppContact,
      onClick: () => {},
      leftIcon: 'phone',
    },
  ];

  public render(): JSX.Element {
    return (
      <SafeAreaView style={{ backgroundColor: themes.AppAccentColor, flex: 1 }}>
        <StatusBar barStyle={'dark-content'} />
        <View style={{ flex: 1, position: 'relative' }}>
          {this._renderBasicUserData()}
          {this._renderSettingsList()}
          {this._renderLogoutButton()}
        </View>
      </SafeAreaView>
    );
  }

  private _renderBasicUserData(): JSX.Element {
    const { account, profile } = this.props;
    const { firstName, lastName } = profile.userProvidedName;

    // check name
    const name = profile.userProvidedName ? `${firstName} ${lastName}` : undefined;

    // check avatar
    const avatarUri =
      profile.userProvidedProfilePic || account.accountProfilePicByProvider;
    const avatar = avatarUri
      ? { source: { uri: avatarUri } }
      : { icon: { name: 'person' } };

    return (
      <View style={styles.headerContainer}>
        <Avatar
          {...avatar}
          rounded={true}
          size={'large'}
          containerStyle={styles.avatarContainer}
          onPress={this._takePicture.bind(this)}
        />
        {!name && (
          <AppText.Headline style={styles.name}>
            {`${firstName} ${lastName}`}
          </AppText.Headline>
        )}
      </View>
    );
  }

  private _renderSettingsList(): JSX.Element[] {
    return this.settings.map(setting => (
      <ListItem
        key={setting.title}
        chevron={true}
        title={setting.title}
        bottomDivider={true}
        titleStyle={themes.TextStyle.body}
        leftIcon={{ name: setting.leftIcon, color: themes.AppPrimaryColor }}
        onPress={setting.onClick}
      />
    ));
  }

  private _renderLogoutButton(): JSX.Element {
    return (
      <BottomButton
        title={strings.LogOut}
        onPress={() => {}}
        style={{ backgroundColor: themes.AppErrorColor }}
      />
    );
  }

  private _takePicture(): void {
    const options = [
      {
        name: strings.ChoosePictureLocal,
        action: (): Promise<void> => this._choosePictureLocal(),
      },
      {
        name: strings.TakePicture,
        action: (): Promise<void> => this._takeCameraPhoto(),
      },
      { name: strings.Cancel, action: (): void => null },
    ];
    this.props.showActionSheetWithOptions(
      {
        options: options.map(t => t.name),
        cancelButtonIndex: 2,
        destructiveButtonIndex: -1,
      },
      btnIdx => options[btnIdx].action(),
    );
  }

  private async _takeCameraPhoto(): Promise<void> {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
    }
  }

  private async _choosePictureLocal(): Promise<void> {
    const permission = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permission.granted) {
      ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
    }
  }
}

export const AccountTabMain = connectActionSheet(UnconnectedAccountTabMain);
