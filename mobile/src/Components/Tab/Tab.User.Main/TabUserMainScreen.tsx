//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { NavigationScreenOptions, ScrollView } from "react-navigation";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { Text } from "../../../Shared/UI";
import * as Assets from "../../../Assets";
import { Account } from "../../../Shared/Model";

export interface IUserTabMainProps {
  account: Account;
  navigateToUserEdit: () => void;
  navigateToPayments: () => void;
  navigateToLoginScreen: () => void;
}

type UserListOption = {
  title: string;
  hasMarginBottom: boolean;
  onClick: () => void;
};

export default class TabUserMainScreen extends React.Component<IUserTabMainProps> {
  static navigationOptions: NavigationScreenOptions = {
    header: null
  };

  private optionsList: Array<UserListOption> = [
    {
      title: "Thông tin cá nhân",
      hasMarginBottom: true,
      onClick: () => this.props.navigateToUserEdit()
    },
    {
      title: "Đổi mật khẩu",
      hasMarginBottom: true,
      onClick: () => {}
    },
    {
      title: "Thông tin thanh toán",
      hasMarginBottom: false,
      onClick: () => this.props.navigateToPayments()
    },
    {
      title: "Địa chỉ",
      hasMarginBottom: true,
      onClick: () => {}
    },
    {
      title: "Cài đặt thông báo",
      hasMarginBottom: true,
      onClick: () => {}
    },
    {
      title: "Chia sẻ ứng dụng",
      hasMarginBottom: false,
      onClick: () => {}
    },
    {
      title: "Thông tin phiên bản",
      hasMarginBottom: false,
      onClick: () => {}
    },
    {
      title: "Liên hệ",
      hasMarginBottom: true,
      onClick: () => {}
    }
  ];

  public constructor /** override */(props: any) {
    super(props);
  }

  public /** override */ render(): React.ReactNode {
    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {this._renderPageTitle()}
            {this._renderBasicUserData()}
            {this._renderSettingsList()}
            {this._renderLogoutButton()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  private _renderPageTitle(): JSX.Element {
    return <Text.Title1 style={{ margin: 20 }}>Cá nhân</Text.Title1>;
  }

  private _renderBasicUserData(): JSX.Element {
    const { account } = this.props;
    const { accountNameByProvider } = account;
    const photo = account.accountProfilePicByProvider;

    return (
      <View style={styles.headerContainer}>
        <View style={{ position: "relative" }}>
          <Image source={{ uri: photo }} style={styles.avatarContainer} />
          <TouchableOpacity style={styles.cameraButtonContainer}>
            <Image source={Assets.Icons.ProfileCamera} style={{ width: 22, height: 18 }} />
          </TouchableOpacity>
        </View>
        <View>
          <Text.Headline style={styles.name}>
            {accountNameByProvider.familyName} {accountNameByProvider.givenName}
          </Text.Headline>
          <Text.Callout style={styles.address}>Hà Nội, VN</Text.Callout>
        </View>
      </View>
    );
  }

  private _renderSettingsList(): React.ReactNode {
    return <View>{this.optionsList.map(this._renderOptionItem.bind(this))}</View>;
  }

  private _renderOptionItem(item: UserListOption) {
    return (
      <View
        key={item.title}
        style={[
          item.hasMarginBottom ? styles.listItemStyleWithMarginBottom : null,
          styles.settingsContainer
        ]}
      >
        <Text.Callout style={{ fontWeight: "bold", fontSize: 16 }}>
          {item.title.toUpperCase()}
        </Text.Callout>
        <TouchableOpacity onPress={item.onClick.bind(this)}>
          <Image source={Assets.Icons.ChevronLeft} />
        </TouchableOpacity>
      </View>
    );
  }

  private _renderLogoutButton(): React.ReactNode {
    return (
      <TouchableOpacity style={[styles.settingsContainer, styles.signOutContainer]} onPress={()=>this.props.navigateToLoginScreen()}>
        <Text.Body style={{ color: Assets.Styles.AppErrorColor }}>Đăng xuất</Text.Body>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    margin: 30,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  title: {
    marginVertical: 50,
    fontSize: 24
  },

  cameraButtonContainer: {
    position: "absolute",
    bottom: -10,
    right: 0,
    backgroundColor: "lightgrey",
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },

  avatarContainer: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 65
  },

  name: {
    marginTop: 25,
    fontWeight: "bold",
    fontSize: 18
  },

  address: {
    fontSize: 14,
    color: "gray"
  },

  contentContainer: {
    marginVertical: 50
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

  listItemStyleWithMarginBottom: {
    marginBottom: 20
  },

  logoutText: {
    fontSize: 16,
    color: "red"
  },

  logoutButton: {
    backgroundColor: "rgba(196,196,196, 0.1)",
    height: Assets.Styles.ButtonHeight,
    marginBottom: 30
  },

  settingsContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Assets.Styles.ListItemBackgroundColor,
    height: Assets.Styles.ButtonHeight
  },

  signOutContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30
  }
});
