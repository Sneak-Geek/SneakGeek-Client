//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import React from "react";
import { Header, Table, Button, Divider, Grid, Search, Label } from "semantic-ui-react";
import { ReviewOrder, FactoryKeys, ObjectFactory, ISettingsProvider, SettingsKey, IReviewOrdersService } from "business";

type Props = {}

type State = {
  newSellOrders: ReviewOrder[] | undefined,
  isLoading: boolean,
  searchResults: object[],
  searchTextInput: string
}

export class NewSneakerSellOrderReviewScreen extends React.Component<Props, State>{
  private readonly _reviewOrderService = ObjectFactory.getObjectInstance<IReviewOrdersService>(
    FactoryKeys.IReviewOrdersService
  );
  private readonly _settingsProvider = ObjectFactory.getObjectInstance<ISettingsProvider>(
    FactoryKeys.ISettingsProvider);

  constructor(props: any) {
    super(props);
    this.state = {
      newSellOrders: [],
      isLoading: false,
      searchResults: [],
      searchTextInput: ''
    }
  }

  async componentDidMount() {
    await this._getAllSellOrders();
  }

  private async _getAllSellOrders() {
    const token = this._settingsProvider.getValue(SettingsKey.CurrentAccessToken);
    console.log(token)
    try {
      const response = await this._reviewOrderService.getAllSellOrders(token);
      this.setState({ newSellOrders: response });
    } catch (error) {
      alert("Error in getting sell orders")
    }
  }

  private _renderTableHeader() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            Trạng Thái
          </Table.HeaderCell>
          <Table.HeaderCell>
            Ảnh giày
          </Table.HeaderCell>
          <Table.HeaderCell>
            Mã giày
          </Table.HeaderCell>
          <Table.HeaderCell>
            Cỡ giày
          </Table.HeaderCell>
          <Table.HeaderCell>
            Mới/Cũ
          </Table.HeaderCell>
          <Table.HeaderCell>
            Giá bán ngay
          </Table.HeaderCell>
          <Table.HeaderCell>
            Giá thị trường
          </Table.HeaderCell>
          <Table.HeaderCell>
            Ngày tạo
          </Table.HeaderCell>
          <Table.HeaderCell width="1">
            Duyệt
          </Table.HeaderCell>
          <Table.HeaderCell width="1">
            Từ chối
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }

  private async _updateNewSellOrderReview(order: ReviewOrder, status: string) {
    const token = this._settingsProvider.getValue(SettingsKey.CurrentAccessToken);
    try {
      await this._reviewOrderService.updateNewSellOrderReview(token, order._id, status)
      this._getAllSellOrders();
    } catch{
      alert("Error when updating order status")
    }
  }

  private _renderOrderStatus(order: ReviewOrder) {
    if (order.status === "PENDING") {
      return (<Label color="yellow" circular empty />);
    } else if (order.status === "APPROVED") {
      return (<Label color="green" circular empty />);
    } else if (order.status === "COMPLETED") {
      return (<Label color="blue" circular empty />);
    } else {
      return (<Label color="red" circular empty />);
    }
  }

  private _renderTableBody(newSellOrders?: ReviewOrder[]): JSX.Element {
    return (
      <Table.Body>
        {newSellOrders!.map(order => {
          if (order.status === "PENDING")
            return (
              <Table.Row>
                {console.log(newSellOrders)}
                <Table.Cell textAlign="center" verticalAlign="middle">{this._renderOrderStatus(order)}</Table.Cell>
                <Table.Cell>{order.picture}</Table.Cell>
                <Table.Cell>{order.shoeId}</Table.Cell>
                <Table.Cell>{order.shoeSize}</Table.Cell>
                <Table.Cell>{order.isNew === true ? "Mới" : "Cũ"}</Table.Cell>
                <Table.Cell>{order.sellNewPrice}</Table.Cell>
                <Table.Cell>{order.retailPrice}</Table.Cell>
                <Table.Cell>{order.createdAt}</Table.Cell>
                <Table.Cell textAlign='center'><Button onClick={() => this._updateNewSellOrderReview(order, "APPROVED")} circular icon="checkmark" color='green' size='mini' /></Table.Cell>
                <Table.Cell textAlign='center'><Button onClick={() => this._updateNewSellOrderReview(order, "DENIED")} circular icon="cancel" color='red' size='mini' /></Table.Cell>
              </Table.Row>
            );
        })}
      </Table.Body>
    );
  }

  private _handleSearchChange(event: any, data: any) {
    const { value } = data;
    this.setState({ isLoading: true, searchTextInput: value });
    //TO DO: Need to Implement a Searching Algorithm
    const results = this.state.newSellOrders!.map((order: ReviewOrder) => {
      return {
        //Need to test with more data
        image: "",
        ...order,
        title: order.sellOrderId
      };
    });
    this.setState({ isLoading: false, searchResults: results });
  }

  private _onSearchSelect(event: any, data: any) {
    const { results } = data;
    //TO DO: Display the search result on a new tab
  }

  private _renderSearchBar() {
    return (
      <Grid>
        <Grid.Column width={5}>
          <Search fluid
            placeholder="Nhập mã đơn hàng"
            loading={this.state.isLoading}
            onSearchChange={this._handleSearchChange.bind(this)}
            onResultSelect={this._onSearchSelect.bind(this)}
            results={this.state.searchResults}
            {...this.props} />
        </Grid.Column>
      </Grid>);
  }

  render(): JSX.Element {
    return (
      <>
        <Header as="h2">
          Duyệt đơn bán
        </Header>
        {this._renderSearchBar()}
        <Table celled compact striped>
          {this._renderTableHeader()}
          {this._renderTableBody(this.state.newSellOrders)}
        </Table>
      </>
    );
  }
}