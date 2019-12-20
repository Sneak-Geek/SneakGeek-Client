import * as React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { ScrollView } from "react-navigation";
import { Input, Icon } from "react-native-elements";
import * as Assets from "../../../Assets";

interface ITabUserSearchProps {
  back: () => void;
}

interface ITabUserSearchState {
  modeRender: string;
  searchFocus: boolean;
}
export class TabUserSearchScreen extends React.Component<
  ITabUserSearchProps,
  ITabUserSearchState
> {
  static navigationOptions = {
    header: null
  };

  constructor(props: ITabUserSearchProps) {
    super(props);

    this.state = {
      modeRender: "listHelper",
      searchFocus: false
    };
  }

  listHelp = [
    {
      title: "Tổng quan",
      onPress: () => {
        this.setState({ modeRender: "overviewQ" });
      }
    },
    {
      title: "Đặt mua, vận chuyển, trả",
      onPress: () => {
        this.setState({ modeRender: "transportQ" });
      }
    },
    {
      title: "Bán hàng"
    }
  ];

  listOverview = [
    {
      title: "SneakGeek là gì?",
      onPress: () => {
        this.setState({ modeRender: "overviewA" });
      }
    },
    {
      title: "SneakGeek hoạt động như thế nào?"
    },
    {
      title: "Làm thế  nào để liên hệ với chúng tôi?"
    }
  ];

  listTransport = [
    {
      title: "Làm thế  nào để mua hàng?",
      onPress: () => {
        this.setState({ modeRender: "transportA" });
      }
    },
    {
      title: "Các phương thức thanh toán"
    },
    {
      title: "Tôi có thể làm gì nếu gặp các vấn đề về thanh toán?"
    },
    {
      title: "Tôi có thể huỷ giao dịch mua của mình được không?"
    },
    {
      title: "Làm thế nào để tôi biết món đồ tôi nhận được là chính hãng?"
    },
    {
      title: "Người mua sẽ phải chịu phí giao dịch trên SneakGeek?"
    },
    {
      title: "Chi phí vận chuyển là bao nhiêu?"
    },
    {
      title: "Bao giờ thì tôi nhận được sản phẩm?"
    },
    {
      title: "Làm thế nào để tôi theo dõi sẩn phẩm đã đặt mua của mình?"
    },
    {
      title: "Tôi có thể thay đổi địa chỉ sau khi đặt mua không?"
    },
    {
      title: "Tôi không nhận được sản phẩm của mình?"
    }
  ];

  goBack = () => {
    switch (this.state.modeRender) {
      case "listHelper":
        this.props.back();
        break;
      case "overviewQ":
        this.setState({ modeRender: "listHelper" });
        break;
      case "transportQ":
        this.setState({ modeRender: "listHelper" });
        break;
      case "overviewA":
        this.setState({ modeRender: "overviewQ" });
        break;
      case "transportA":
        this.setState({ modeRender: "overviewQ" });
        break;
      default:
        break;
    }
  };
  public render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
          {this.renderSearchBar()}
          {this.state.modeRender === "listHelper" && this.renderListHelp()}
          {this.state.modeRender === "overviewQ" && this.renderOverview()}
          {this.state.modeRender === "transportQ" && this.renderTransport()}
        </View>
      </SafeAreaView>
    );
  }

  private renderSearchBar() {
    return (
      <View style={styles.containerSearch}>
        <Icon
          type={"ionicon"}
          name={"ios-arrow-back"}
          size={28}
          containerStyle={{ marginLeft: 10 }}
          onPress={this.goBack}
        />
        <Input
          // ref={refInput => (this._searchInputComponent = refInput)}
          onFocus={_event => this.setState({ searchFocus: true })}
          placeholder={"Bạn muốn giúp gì"}
          leftIcon={
            <Icon
              type={"ionicon"}
              name={"md-search"}
              size={25}
              color="rgba(0, 0, 0, 0.54)"
            />
          }
          leftIconContainerStyle={{ marginRight: 20 }}
          // rightIcon={
          //     this.state.searchFocus && (
          //         <Icon
          //             type={"ionicon"}
          //             name={"md-close"}
          //             size={25}
          //             onPress={this._toggleSearchFocus.bind(this)}
          //         />
          //     )
          // }
          inputStyle={{ fontSize: 17, fontFamily: "RobotoCondensed-Regular" }}
          // onChangeText={this._search.bind(this)}
          // onSubmitEditing={this._onEndEditing.bind(this)}
        />
      </View>
    );
  }

  private renderListHelp() {
    return this.listHelp.map((item, index) => {
      return (
        <TouchableOpacity key={index} style={styles.item} onPress={item.onPress}>
          <Text style={styles.titleItem}>{item.title}</Text>
        </TouchableOpacity>
      );
    });
  }

  private renderOverview() {
    return (
      <View>
        <View style={[styles.item, { paddingBottom: 30 }]}>
          <Text style={styles.titleItem}>Tổng quan</Text>
        </View>
        <View style={{ paddingLeft: 20, paddingRight: 17 }}>
          {this.listOverview.map((item, index) => {
            return (
              <TouchableOpacity key={index} style={styles.row} onPress={item.onPress}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.question}>Q: {item.title}</Text>
                </View>
                <Image source={Assets.Icons.ChevronLeft} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  private renderTransport() {
    return (
      <View>
        <View style={[styles.item, { paddingBottom: 30 }]}>
          <Text style={styles.titleItem}>Đặt mua, vận chuyển, trả</Text>
        </View>
        <ScrollView style={{ paddingLeft: 20, paddingRight: 17 }}>
          <View style={{ paddingBottom: 200 }}>
            {this.listTransport.map((item, index) => {
              return (
                <TouchableOpacity key={index} style={styles.row} onPress={item.onPress}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.question}>Q: {item.title}</Text>
                  </View>
                  <Image source={Assets.Icons.ChevronLeft} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  containerSearch: {
    flexDirection: "row",
    alignItems: "center"
  },
  item: {
    paddingTop: 40,
    paddingHorizontal: 20
  },
  titleItem: {
    fontSize: 34,
    fontFamily: "RobotoCondensed-Bold",
    opacity: 0.3
  },
  question: {
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 22
  },
  row: {
    paddingBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 14
  }
});
