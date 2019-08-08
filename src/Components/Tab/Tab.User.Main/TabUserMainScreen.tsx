//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import * as React from "react";
import { NavigationScreenOptions, ScrollView } from "react-navigation";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Button, Image, Icon } from "react-native-elements";

const list = [
  {
    title: "Thông tin cá nhân",
    hasMarginBottom: true
  },
  {
    title: "Đổi mật khẩu",
    hasMarginBottom: true
  },
  {
    title: "Thông tin thanh toán",
    hasMarginBottom: false
  },
  {
    title: "Địa chỉ",
    hasMarginBottom: true
  },
  {
    title: "Cài đặt thông báo",
    hasMarginBottom: true
  },
  {
    title: "Chia sẻ ứng dụng",
    hasMarginBottom: false
  },
  {
    title: "Thông tin phiên bản",
    hasMarginBottom: false
  },
  {
    title: "Liên hệ",
    hasMarginBottom: true
  }
];

export interface IUserTabMainProps {
  // shoes: Shoe[];
  navigateToUserEdit: () => void;
}

export default class TabUserMainScreen extends React.Component<IUserTabMainProps> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: "Cá nhân"
  };

  public constructor /** override */(props: any) {
    super(props);
  }

  public /** override */ render(): React.ReactNode {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          {this._renderAvatarContainer()}
          {this._renderName()}
          {this._renderAddress()}
        </View>
        {this._renderSettingsList()}
        {this._renderLogoutButton()}
      </ScrollView>
    );
  }

  private _renderAvatarContainer(): React.ReactNode {
    return (
      <View style={{ position: "relative" }}>
        <Image
          source={{
            uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
          }}
          style={styles.avatarContainer}
        />
        <Icon
          type={"ionicon"}
          name={"md-camera"}
          size={28}
          containerStyle={{ position: "absolute", zIndex: 100, bottom: 0, right: 5 }}
        />
      </View>
    );
  }

  private _renderName(): React.ReactNode {
    return (
      <View>
        <Text style={styles.name}>PHẠM MINH</Text>
      </View>
    );
  }

  private _renderAddress(): React.ReactNode {
    return (
      <View>
        <Text style={styles.address}>Hà Nội, VN</Text>
      </View>
    );
  }

  private _renderSettingsList(): React.ReactNode {
    return (
      <TouchableWithoutFeedback onPress={this.props.navigateToUserEdit.bind(this)}>
        <View style={{ marginTop: 34 }}>
          {list.map(item => (
            <View
              key={item.title}
              style={[
                item.hasMarginBottom ? styles.listItemStyleWithMarginBottom : null,
                styles.settingsContainer
              ]}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.title}</Text>
              <Icon type={"ionicon"} name={"md-arrow-dropright"} size={28} />
            </View>
          ))}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  private _renderLogoutButton(): React.ReactNode {
    return (
      <Button
        title="Đăng xuất"
        titleStyle={styles.logoutText}
        buttonStyle={styles.logoutButton}
      />
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
    width: 130,
    height: 130,
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
    marginBottom: 50
  },

  logoutText: {
    fontSize: 16,
    color: "red"
  },

  logoutButton: {
    backgroundColor: "rgba(196,196,196, 0.1)",
    padding: 20,
    marginBottom: 30
  },

  settingsContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(196,196,196, 0.1)",
    padding: 20
  }
});
