//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import {
  ScrollView,
  StackActions,
  NavigationScreenProp,
  NavigationRoute,
  BottomTabBarProps
} from "react-navigation";
import { View, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, ActionSheetIOS } from "react-native";
import { Icon } from "react-native-elements";
import { Profile } from "../../../Shared/Model";
import * as Assets from "../../../Assets";
import { NetworkRequestState } from "../../../Shared/State";
import { IAppSettingsService } from "../../../Service/AppSettingsService";
import { container, Types } from "../../../Config/Inversify";
import { Text, ShoeSizePicker } from "../../../Shared/UI";

const optionsList = [
  {
    title: "Họ",
    placeholder: "Họ",
    value: (profile: Profile) =>
      profile.userProvidedName ? profile.userProvidedName.lastName : "",
    onUpdate: (value: string, profile: Profile) => {
      return Object.assign(profile, {
        userProvidedName: {
          ...profile.userProvidedName,
          lastName: value
        }
      });
    },
    hasMarginBottom: false
  },
  {
    title: "Tên",
    placeholder: "Tên",
    value: (profile: Profile) =>
      profile.userProvidedName ? profile.userProvidedName.firstName : "",
    onUpdate: (value: string, profile: Profile) => {
      return Object.assign(profile, {
        userProvidedName: {
          ...profile.userProvidedName,
          firstName: value
        }
      });
    },
    hasMarginBottom: true
  },
];

const optionsList2 = [
  {
    title: "Email",
    email: "Email",
    value: (profile: Profile) => profile.userProvidedEmail,
    onUpdate: (value: string, profile: Profile) => {
      return Object.assign(profile, {
        userProvidedEmail: value
      });
    },
    hasMarginBottom: false
  },
  {
    title: "Số Điện thoại",
    placeholder: "Số Điện thoại",
    value: (profile: Profile) => profile.userProvidedPhoneNumber,
    onUpdate: (value: string, profile: Profile) => {
      return Object.assign(profile, {
        userProvidedPhoneNumber: value
      });
    },
    hasMarginBottom: true
  }
]
export interface IUserEditScreenProps {
  profile?: Profile;
  updateProfileState: { state: NetworkRequestState };
  navigation?: NavigationScreenProp<NavigationRoute>;
  updateProfile: (data: Partial<Profile>) => void;
}

export interface IUserEditState {
  editMode: boolean;
  updatedInfo?: Profile;
  isSelectingShoeSize: boolean;
  shoeSize: string;
}

export class TabUserEditScreen extends React.Component<IUserEditScreenProps, IUserEditState> {
  static navigationOptions = (navigationConfig: BottomTabBarProps) => ({
    title: "Thông tin cá nhân",
    headerTitleStyle: Text.TextStyle.headline,
    headerLeft: (
      <Icon
        name={"ios-arrow-back"}
        type={"ionicon"}
        size={28}
        containerStyle={{ marginLeft: 10 }}
        onPress={() => navigationConfig.navigation.dispatch(StackActions.pop({ n: 1 }))}
      />
    )
  });

  public constructor /** override */(props: IUserEditScreenProps) {
    super(props);
    this.state = {
      editMode: false,
      updatedInfo: this.props.profile,
      isSelectingShoeSize: false,
      shoeSize: '',
    };
  }

  private appSettings: IAppSettingsService = container.get<IAppSettingsService>(
    Types.IAppSettingsService
  );
  private remoteSettings = this.appSettings.getSettings().RemoteSettings;
  public componentDidMount = () => {
    console.log('thong tin setting', this.remoteSettings)

  }

  public pickGender = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Man', 'Women', 'Unisex'],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          let newProfile = Object.assign(this.state.updatedInfo, {
            userProvidedGender: 'Man'
          });
          this.setState({ updatedInfo: newProfile, editMode: true });
        }
        if (buttonIndex === 2) {
          let newProfile = Object.assign(this.state.updatedInfo, {
            userProvidedGender: 'Women'
          });
          this.setState({ updatedInfo: newProfile, editMode: true });
        }
        if (buttonIndex === 3) {
          let newProfile = Object.assign(this.state.updatedInfo, {
            userProvidedGender: 'Unisex'
          });
          this.setState({ updatedInfo: newProfile, editMode: true });
        }
      },
    )
  }

  public pickSize = () => {
    this.setState({ isSelectingShoeSize: true })
  }

  public onSetShoeSize = (shoeSize: string) => {
    let newProfile = Object.assign(this.state.updatedInfo, {
      userProvidedShoeSize: shoeSize
    });
    this.setState({ updatedInfo: newProfile, editMode: true });
  }


  public /** override */ render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>{this._renderSettings()}</ScrollView>
        <View style={{ flex: 1 }}>
          {this._renderSettings()}
          {this._renderShoeSelectionModal()}
        </View>
        {this._renderUpdateButton()}
      </SafeAreaView>
    );
  }

  public /** override */ shouldComponentUpdate(prevProps: IUserEditScreenProps) {
    if (
      prevProps.updateProfileState.state !== this.props.updateProfileState.state &&
      this.props.updateProfileState.state === NetworkRequestState.SUCCESS
    ) {
      this.setState({ editMode: false });
    }
    return true;
  }

  private _renderSettings() {
    const { updatedInfo } = this.state;
    const { profile } = this.props;
    return (
      <View style={{ paddingTop: 34 }}>
        {optionsList.map((item, i) => (
          <View
            key={i}
            style={[
              styles.listItem,
              item.hasMarginBottom ? styles.listItemStyleWithMarginBottom : {}
            ]}
          >
            <Text.Headline style={{ flex: 1, fontSize: 14, fontFamily: 'RobotoCondensed-Bold' }}>{item.title.toUpperCase()}</Text.Headline>
            <TextInput
              placeholderTextColor='#999999'
              value={
                updatedInfo && item.value(updatedInfo)
                  ? (item.value(updatedInfo) as any).toString()
                  : ""
              }
              placeholder={item.placeholder}
              onChangeText={value => {
                if (updatedInfo) {
                  const newProfile = item.onUpdate(value, updatedInfo);
                  this.setState({ updatedInfo: newProfile, editMode: true });
                }
              }}
              style={styles.input}
            />
          </View>
        ))}
        <TouchableOpacity
          style={styles.listItem}
          onPress={this.pickGender}
        >
          <Text.Headline style={{ flex: 1, fontSize: 14, fontFamily: 'RobotoCondensed-Bold' }}>GIỚI TÍNH</Text.Headline>
          {profile && profile.userProvidedGender ?
            <Text.Body style={[styles.input, { flex: 2 }]}>{profile.userProvidedGender}</Text.Body>
            :
            <Text.Body style={[styles.input, { flex: 2, color: '#999999' }]}>Giới tính</Text.Body>
          }
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.listItem, styles.listItemStyleWithMarginBottom]}
          onPress={this.pickSize}
        >
          <Text.Headline style={{ flex: 1, fontSize: 14, fontFamily: 'RobotoCondensed-Bold' }}>CỠ GIÀY</Text.Headline>
          {profile && profile.userProvidedShoeSize ?
            <Text.Body style={[styles.input, { flex: 2 }]}>{profile.userProvidedShoeSize}</Text.Body>
            :
            <Text.Body style={[styles.input, { flex: 2, color: '#999999' }]}>Cỡ giày</Text.Body>
          }
        </TouchableOpacity>
        {optionsList2.map((item, i) => (
          <View
            key={i}
            style={[
              styles.listItem,
              item.hasMarginBottom ? styles.listItemStyleWithMarginBottom : {}
            ]}
          >
            <Text.Headline style={{ flex: 1, fontSize: 14, fontFamily: 'RobotoCondensed-Bold' }}>{item.title.toUpperCase()}</Text.Headline>
            <TextInput
              placeholderTextColor='#999999'
              value={
                updatedInfo && item.value(updatedInfo)
                  ? (item.value(updatedInfo) as any).toString()
                  : ""
              }
              placeholder={item.placeholder}
              onChangeText={value => {
                if (updatedInfo) {
                  const newProfile = item.onUpdate(value, updatedInfo);
                  this.setState({ updatedInfo: newProfile, editMode: true });
                }
              }}
              style={styles.input}
            />
          </View>
        ))}
      </View>
    );
  }

  private _renderShoeSelectionModal(): JSX.Element {
    return (
      <ShoeSizePicker
        shouldRenderCounter={false}
        pickerTitle={"Cỡ giày của bạn"}
        visible={this.state.isSelectingShoeSize}
        onTogglePicker={(
          exiting: boolean,
          owned: string | Array<{ shoeSize: string; number: number }>
        ) => {
          typeof owned === "string" &&
            this.setState(
              {
                shoeSize: owned,
                isSelectingShoeSize: false
              },
              () => {
                !exiting && this.onSetShoeSize(owned);
              }
            );
        }}
      />
    );
  }

  private _renderUpdateButton(): JSX.Element | null {
    if (!this.state.editMode) {
      return null;
    }

    return (
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            const newProfile = this.state.updatedInfo as Profile;
            this.props.updateProfile(newProfile);
          }}
        >
          <Text.Body style={{ color: Assets.Styles.TextSecondaryColor }}>
            Xác nhận
          </Text.Body>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 20,
    alignItems: "center"
  },

  title: {
    marginVertical: 50,
    fontSize: 24
  },

  avatarContainer: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 100
  },

  contentContainer: {
    marginVertical: 100
  },

  passwordContainer: {
    marginVertical: 50
  },

  addressContainer: {
    marginVertical: 50
  },

  infoButton: {
    backgroundColor: "#E5E5E5",
    color: "#FFFFFF"
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold"
  },

  listItem: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: "rgba(196,196,196, 0.1)",
    alignItems: "center",
    justifyContent: "flex-start",
    height: Assets.Styles.ButtonHeight
  },

  listItemStyleWithMarginBottom: {
    marginBottom: 50
  },

  logoutText: {
    fontSize: 16,
    color: "red"
  },

  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Assets.Styles.ButtonHeight,
    backgroundColor: Assets.Styles.ButtonPrimaryColor,
    alignItems: "center",
    justifyContent: "center"
  },

  input: {
    fontSize: 17,
    color: Assets.Styles.AppPrimaryColor,
    flex: 2,
    fontFamily: 'RobotoCondensed-Regular',
  }
});
