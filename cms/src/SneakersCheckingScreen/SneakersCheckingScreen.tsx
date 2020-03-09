import React from "react";
import { Table, Header } from "semantic-ui-react";
import { ShoeAuthentication, createShoeAuthentication } from "./ShoeAuthentication";

type Props = {};

type State = {
  shoeAuthentications?: ShoeAuthentication[];
};

export class SneakersCheckingScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shoeAuthentications: [
        {
          title: "Balenciaga",
          imageUrl: "string",
          brand: "string",
          size: 102,
          isNew: false,
          images: ["string", "string"],
          condition: {},
          trackingID: "string",
          status: "string",
          uploadDate: "17-01-2020 8PM UTC"
        },
        {
          title: "Gucci",
          imageUrl: "string",
          brand: "string",
          size: 102,
          isNew: true,
          images: ["string", "string"],
          condition: {},
          trackingID: "string",
          status: "string",
          uploadDate: "17-01-2020 8PM UTC"
        },
        {
          title: "Yeezy",
          imageUrl: "string",
          brand: "string",
          size: 102,
          isNew: false,
          images: ["string", "string"],
          condition: {},
          trackingID: "string",
          status: "string",
          uploadDate: "17-01-2020 8PM UTC"
        }
      ]
    };
  }

  render() {
    {
      console.log(this.state.shoeAuthentications);
    }
    return (
      <div>
        <Header as="h2">Quản lý đơn hàng</Header>
        {this._renderSearchReviewProducts()}
        <Table celled selectable>
          {this._renderTableHeader()}
          {this._renderTableBody(this.state.shoeAuthentications)}
        </Table>
      </div>
    );
  }

  private _renderSearchReviewProducts() {}

  private _renderTableHeader() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Mã đơn hàng</Table.HeaderCell>
          <Table.HeaderCell>Ảnh giày</Table.HeaderCell>
          <Table.HeaderCell>Tên giày</Table.HeaderCell>
          <Table.HeaderCell>Hãng giày</Table.HeaderCell>
          <Table.HeaderCell>Mới/Cũ</Table.HeaderCell>
          <Table.HeaderCell>Ngày tạo đơn hàng</Table.HeaderCell>
          <Table.HeaderCell>Trạng thái</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }

  private _renderTableBody(shoeAuthentications?: ShoeAuthentication[]) {
    if (shoeAuthentications)
      return (
        <Table.Body>
          {shoeAuthentications.map((shoeAuthentication: ShoeAuthentication) => {
            return (
              <Table.Row>
                <Table.Cell>{shoeAuthentication.trackingID}</Table.Cell>
                <Table.Cell>{shoeAuthentication.imageUrl}</Table.Cell>
                <Table.Cell>{shoeAuthentication.title}</Table.Cell>
                <Table.Cell>{shoeAuthentication.brand}</Table.Cell>
                <Table.Cell>{shoeAuthentication.isNew ? "Mới" : "Cũ"}</Table.Cell>
                <Table.Cell>{shoeAuthentication.uploadDate}</Table.Cell>
                <Table.Cell>{shoeAuthentication.status}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      );
    else return <></>;
  }
}
