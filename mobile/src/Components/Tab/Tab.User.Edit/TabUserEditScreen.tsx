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
import { View, StyleSheet } from "react-native";
import * as Text from "../../../Shared/UI/Text";
import { Icon } from "react-native-elements";
import { Account } from "../../../Reducers";
import { Assets } from "../../../Assets";

const list = [
  {
    title: "Họ",
    value: (account: Account) => account.accountNameByProvider.familyName,
    hasMarginBottom: false
  },
  {
    title: "Tên",
    value: (account: Account) => account.accountNameByProvider.givenName,
    hasMarginBottom: true
  },
  {
    title: "Giới tính",
    value: (account: Account) => account.accountGenderByProvider,
    hasMarginBottom: false
  },
  {
    title: "Cỡ giày",
    value: (_account: Account) => 8,
    hasMarginBottom: true
  },
  {
    title: "Email",
    value: (account: Account) => account.accountEmailByProvider,
    hasMarginBottom: false
  },
  {
    title: "Điện thoại",
    value: (_account: Account) => "123-456-789",
    hasMarginBottom: true
  }
];

export interface IUserEditScreenProps {
  account: Account | null;
  navigation?: NavigationScreenProp<NavigationRoute>;
}

export class TabUserEditScreen extends React.Component<IUserEditScreenProps, {}> {
  static navigationOptions = (navigationConfig: BottomTabBarProps) => ({
    title: "Thông tin cá nhân",
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
  }

  public /** override */ render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* {this._renderProfilePic()} */}
        {this._renderSettings()}
      </ScrollView>
    );
  }

  private _renderSettings() {
    const { account } = this.props;
    return (
      <View>
        {list.map((item, i) => (
          <View
            key={i}
            style={[
              styles.listItem,
              item.hasMarginBottom ? styles.listItemStyleWithMarginBottom : {}
            ]}
          >
            <Text.Display style={{ flex: 1 }}>{item.title.toUpperCase()}</Text.Display>
            <Text.Subhead style={{ flex: 2 }}>
              {account ? item.value(account) : ""}
            </Text.Subhead>
          </View>
        ))}
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
  }
});
