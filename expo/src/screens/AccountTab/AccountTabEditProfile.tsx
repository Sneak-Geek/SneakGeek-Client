import React from 'react';
import { AppText, BottomButton } from '@screens/Shared';
import {
  Profile,
  NetworkRequestState,
  IAccountService,
  ObjectFactory,
  FactoryKeys,
  ISettingsProvider,
  SettingsKey,
  updateProfile,
} from 'business';
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Keyboard,
  EmitterSubscription,
} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp, HeaderHeightContext } from '@react-navigation/stack';
import { themes, strings } from '@resources';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { connect } from 'utilities/ReduxUtilities';
import { IAppState } from '@store/AppStore';
import { showErrorNotification, showSuccessNotification } from 'actions';
import { getToken } from 'utilities';

const optionsList = [
  {
    title: 'Họ',
    placeholder: 'Họ',
    value: (profile: Profile) =>
      profile.userProvidedName ? profile.userProvidedName.lastName : '',
    onUpdate: (value: string, profile: Profile) => {
      return Object.assign(profile, {
        userProvidedName: {
          ...profile.userProvidedName,
          lastName: value,
        },
      });
    },
  },
  {
    title: 'Tên',
    placeholder: 'Tên',
    value: (profile: Profile) =>
      profile.userProvidedName ? profile.userProvidedName.firstName : '',
    onUpdate: (value: string, profile: Profile) => {
      return Object.assign(profile, {
        userProvidedName: {
          ...profile.userProvidedName,
          firstName: value,
        },
      });
    },
  },
  {
    title: 'Địa chỉ',
    placeholder: 'Địa chỉ',
    value: (profile: Profile) => profile.userProvidedAddress ?? '',
    onUpdate: (value: string, profile: Profile) => {
      return Object.assign(profile, {
        userProvidedAddress: value,
      });
    },
  },
  {
    title: 'Giới tính',
    placeholder: 'Giới tính',
    value: (profile: Profile) => profile.userProvidedGender,
    onUpdate: (value: string, profile: Profile) => {
      return Object.assign(profile, {
        userProvidedGender: value,
      });
    },
  },
  {
    title: 'Cỡ giày',
    placeholder: 'Cỡ giày',
    value: (profile: Profile) => profile.userProvidedShoeSize,
    onUpdate: (value: string, profile: Profile) => {
      return Object.assign(profile, {
        userProvidedShoeSize: value,
      });
    },
  },
  {
    title: 'Email',
    placeholder: 'Email',
    value: (profile: Profile) => profile.userProvidedEmail,
    onUpdate: (value: string, profile: Profile) => {
      return Object.assign(profile, {
        userProvidedEmail: value,
      });
    },
  },
  {
    title: 'Điện thoại',
    placeholder: 'Điện thoại',
    value: (profile: Profile) => profile.userProvidedPhoneNumber,
    onUpdate: (value: string, profile: Profile) => {
      return Object.assign(profile, {
        userProvidedPhoneNumber: value,
      });
    },
  },
];

type Props = {
  profile: Profile;
  navigation?: StackNavigationProp<any>;

  updateProfile: (profile: Profile) => void;
  showNotification: (message: string) => void;
};

type State = {
  editMode: boolean;
  updatedInfo?: Partial<Profile>;
  shouldShowConfirm: boolean;
};

@connect(
  (state: IAppState) => ({
    profile: state.UserState.profileState.profile,
  }),
  (dispatch: Function) => ({
    updateProfile: (profile: Profile) => dispatch(updateProfile(profile)),
    showNotification: (message: string) => dispatch(showSuccessNotification(message)),
  }),
)
export class AccountTabEditProfile extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      editMode: false,
      updatedInfo: Object.assign({}, props.profile),
      shouldShowConfirm: true,
    };
  }

  private _keyboardShowListener: EmitterSubscription;
  private _keyboardHideListener: EmitterSubscription;
  private readonly _settings: ISettingsProvider = ObjectFactory.getObjectInstance<
    ISettingsProvider
  >(FactoryKeys.ISettingsProvider);
  private readonly _accountService: IAccountService = ObjectFactory.getObjectInstance<
    IAccountService
  >(FactoryKeys.IAccountService);

  public render(): JSX.Element {
    return (
      <SafeAreaConsumer>
        {(insets): JSX.Element => (
          <KeyboardAvoidingView
            behavior={'height'}
            style={{
              paddingTop: insets.top,
              ...styles.rootContainer,
            }}
          >
            {this._renderHeader(insets.top)}
            <ScrollView showsVerticalScrollIndicator={false}>
              {this._renderSettings()}
            </ScrollView>
            {this._renderUpdateButton()}
          </KeyboardAvoidingView>
        )}
      </SafeAreaConsumer>
    );
  }

  public componentDidMount() {
    this._keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ shouldShowConfirm: false });
    });

    this._keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ shouldShowConfirm: true });
    });
  }

  public componentWillUnmount() {
    this._keyboardHideListener.remove();
    this._keyboardShowListener.remove();
  }

  private _renderHeader(topInsets: number) {
    return (
      <HeaderHeightContext.Consumer>
        {headerHeight => (
          <View
            style={{ ...styles.headerContainer, height: headerHeight + topInsets }}
          >
            <Icon
              name={'ios-arrow-back'}
              type={'ionicon'}
              size={themes.IconSize}
              onPress={() => this.props.navigation.goBack()}
              hitSlop={styles.backHitSlop}
            />
            <AppText.Title3>{strings.AccountInfo}</AppText.Title3>
            <Icon
              name={this.state.editMode ? 'x' : 'edit'}
              type={'feather'}
              size={themes.IconSize}
              onPress={() => this.setState({ editMode: !this.state.editMode })}
            />
          </View>
        )}
      </HeaderHeightContext.Consumer>
    );
  }

  private _renderSettings() {
    return (
      <View style={styles.settingContainer}>
        {optionsList.map((item, i) => (
          <View key={i} style={styles.listItem}>
            <AppText.Headline style={{ flex: 1 }}>{item.title}</AppText.Headline>
            {this._renderInfo(item)}
          </View>
        ))}
      </View>
    );
  }

  private _renderInfo(item) {
    const { updatedInfo, editMode } = this.state;
    const { profile } = this.props;
    if (editMode) {
      return (
        <TextInput
          value={
            updatedInfo && item.value(updatedInfo)
              ? item.value(updatedInfo).toString()
              : ''
          }
          placeholder={item.placeholder}
          onChangeText={value => {
            if (updatedInfo) {
              const newProfile = item.onUpdate(value, updatedInfo);
              this.setState({ updatedInfo: newProfile });
            }
          }}
          style={[styles.input, themes.TextStyle.subhead]}
        />
      );
    }

    return (
      <AppText.Subhead style={styles.input}>{item.value(profile)}</AppText.Subhead>
    );
  }

  private _renderUpdateButton(): JSX.Element | null {
    const { shouldShowConfirm, editMode } = this.state;

    if (!shouldShowConfirm || !editMode) {
      return null;
    }

    return (
      <BottomButton
        onPress={this._updateProfile.bind(this)}
        title={'Xác nhận'}
        style={styles.bottomButtonContainer}
      />
    );
  }

  private async _updateProfile() {
    try {
      const profile = await this._accountService.updateProfile(
        getToken(),
        this.state.updatedInfo,
      );
      this.props.showNotification(`Cập nhật thông tin cá nhân thành công`);
      this.props.updateProfile(profile);
    } catch (error) {
      this.props.showNotification(`Đã có lỗi khi xảy ra, xin vui lòng thử lại`);
    } finally {
      this.setState({ updatedInfo: this.props.profile, editMode: false });
    }
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  title: {
    marginVertical: 50,
    fontSize: 24,
  },

  contentContainer: {
    marginVertical: 100,
  },

  passwordContainer: {
    marginVertical: 50,
  },

  addressContainer: {
    marginVertical: 50,
  },

  infoButton: {
    backgroundColor: '#E5E5E5',
    color: '#FFFFFF',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  listItem: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: themes.ButtonHeight,
    borderTopWidth: 0.5,
    borderTopColor: themes.DisabledColor,
  },

  logoutText: {
    fontSize: 16,
    color: 'red',
  },

  bottomButtonContainer: {
    backgroundColor: themes.AppPrimaryColor,
  },

  input: {
    flex: 2,
    textAlign: 'left',
  },

  backHitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  settingContainer: {
    borderBottomColor: themes.DisabledColor,
    borderBottomWidth: 0.5,
  },
  rootContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});
