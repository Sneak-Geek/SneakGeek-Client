//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import * as React from "react";
import { NavigationScreenOptions } from "react-navigation";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { Image } from "react-native-elements";
import { Text } from "../../../Shared/UI";
import * as Assets from "../../../Assets";
import { Account, Profile } from "../../../Shared/Model";
import ActionSheet from "react-native-actionsheet";

export interface IUserTabMainProps {
  account: Account;
  profile: Profile;
  navigateToUserEdit: () => void;
  navigateToPayments: () => void;
  navigateToShoeSize: () => void;
  navigateToChangePassword: () => void;
  navigateToContactInfo: () => void;
  navigateToSearch: () => void;
  navigateToUserKind: () => void;
  navigateToNotiSetting: () => void;
  navigateToShare: () => void;
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
      onClick: () => this.props.navigateToChangePassword()
    },
    {
      title: "Thông tin thanh toán",
      hasMarginBottom: false,
      onClick: () => this.props.navigateToPayments()
    },
    {
      title: "Địa chỉ",
      hasMarginBottom: true,
      onClick: () => this.props.navigateToUserKind()
    },
    {
      title: "Tiêu chuẩn size",
      hasMarginBottom: false,
      onClick: () => this.props.navigateToShoeSize()
    },
    {
      title: "Cài đặt thông báo",
      hasMarginBottom: true,
      onClick: () => this.props.navigateToNotiSetting()
    },
    {
      title: "Chia sẻ ứng dụng",
      hasMarginBottom: false,
      onClick: () => this.props.navigateToShare()
    },
    {
      title: "Thông tin phiên bản",
      hasMarginBottom: false,
      onClick: () => this.props.navigateToSearch()
    },
    {
      title: "Liên hệ",
      hasMarginBottom: true,
      onClick: () => this.props.navigateToContactInfo()
    }
  ];

  private actionSheet: ActionSheet | null = null;

  public constructor /** override */(props: any) {
    super(props);
    this.state = {
      profile: {}
    };
  }

  public componentDidMount = async () => {
    // let res = await this.props.getUserProfile();
  };

  public actionSheetOpress = (index: number) => {
    if (index === 0) {
      Alert.alert("Chọn ảnh từ thư viện");
    }
    if (index === 1) {
      Alert.alert("Chụp ảnh");
    }
  };
  public /** override */ render(): React.ReactNode {
    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {this._renderPageTitle()}
            {this._renderBasicUserData()}
            {this._renderSettingsList()}
            {this._renderLogoutButton()}
            {this._renderActionSheet()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  private _renderPageTitle(): JSX.Element {
    return <Text.Title1 style={{ textAlign: "center" }}>Cá nhân</Text.Title1>;
  }

  private _renderBasicUserData(): JSX.Element {
    // const { account } = this.props;
    // const { accountNameByProvider } = account;
    // const photo = account.accountProfilePicByProvider;

    return (
      <View style={styles.headerContainer}>
        <View style={{ position: "relative" }}>
          {/* <Image source={{ uri: photo }} style={styles.avatarContainer} /> */}
          <Image
            source={{ uri: "https://saokpop.com/wp-content/uploads/2018/11/tuzy.jpg" }}
            style={styles.avatarContainer}
          />
          <TouchableOpacity
            style={styles.cameraButtonContainer}
            onPress={() => this.actionSheet && this.actionSheet.show()}
          >
            <Image source={Assets.Icons.ProfileCamera} style={{ width: 22, height: 18 }} />
          </TouchableOpacity>
        </View>
        <View>
          <Text.Headline style={styles.name}>
            {/* {accountNameByProvider.familyName} {accountNameByProvider.givenName} */}
            Trung Deps
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
        <Text.Callout style={{ fontWeight: "bold", fontSize: 16, opacity: 0.6 }}>
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
      <TouchableOpacity style={[styles.settingsContainer, styles.signOutContainer]}>
        <Text.Body
          style={{ color: "white", fontSize: 14, fontFamily: "RobotoCondensed-Bold" }}
        >
          Đăng xuất
        </Text.Body>
      </TouchableOpacity>
    );
  }

  private _renderActionSheet() {
    return (
      <ActionSheet
        ref={(ref: ActionSheet) => (this.actionSheet = ref)}
        options={["Đăng ảnh từ Thư Viện", "Chụp từ Camera", "Cancel"]}
        cancelButtonIndex={2}
        onPress={(index: number) => this.actionSheetOpress(index)}
      />
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
    fontSize: 17,
    textAlign: "right",
    paddingBottom: 9
  },

  address: {
    fontSize: 14,
    fontFamily: "RobotoCondensed-Bold",
    opacity: 0.4,
    textAlign: "right"
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
    backgroundColor: Assets.Styles.AppErrorColor,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30
  }
});
