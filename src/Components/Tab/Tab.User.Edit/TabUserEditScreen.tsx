//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
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
import { ListItem, Icon } from "react-native-elements";

const list = [
  {
    title: "Họ",
    value: "Phạm",
    hasMarginBottom: false
  },
  {
    title: "Tên",
    value: "Minh",
    hasMarginBottom: true
  },
  {
    title: "Giới tính",
    value: "Nam",
    hasMarginBottom: false
  },
  {
    title: "Cỡ giày",
    value: "8",
    hasMarginBottom: true
  },
  {
    title: "Email",
    value: "minh.phamle91@gmail.com",
    hasMarginBottom: false
  },
  {
    title: "Số điện thoại",
    value: "617-372-0511",
    hasMarginBottom: true
  }
];

export interface IUserEditScreenProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export class TabUserEditScreen extends React.Component<IUserEditScreenProps, {}> {
  static navigationOptions = (navigationConfig: BottomTabBarProps) => ({
    title: "Thông tin cá nhân",
    headerLeft: (
      <Icon
        name={"ios-arrow-back"}
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
      <ScrollView showsVerticalScrollIndicator={false}>{this._renderSettings()}</ScrollView>
    );
  }

  private _renderSettings() {
    return (
      <View>
        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            titleStyle={{ flex: 1, fontWeight: "bold", padding: 0 }}
            containerStyle={
              item.hasMarginBottom
                ? styles.listItemStyleWithMarginBottom
                : styles.listItemStyleWithoutMarginBottom
            }
            bottomDivider={false}
            input={{
              defaultValue: item.value,
              inputStyle: { textAlign: "left" },
              containerStyle: { flex: 2, padding: 0 },
              inputContainerStyle: { padding: 0, margin: 0 }
            }}
          />
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

  listItemStyleWithMarginBottom: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    // fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50
  },

  listItemStyleWithoutMarginBottom: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    // fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center"
  },

  logoutText: {
    fontSize: 16,
    color: "red"
  }
});
