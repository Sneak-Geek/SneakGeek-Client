import React from "react";
import { Table, Header, Grid, Search, Label } from "semantic-ui-react";
import { ShoeAuthentication, FactoryKeys, SettingsKey } from "business";
import { History } from "history";
import { ObjectFactory, IShoeAuthenticationTransactionService, ISettingsProvider } from "business";

type Props = {
  history: History
};

type State = {
  shoeAuthentications?: ShoeAuthentication[];
  isLoading: boolean;
  value: string;
  searchResults: object[];
  searchTextInput: string;
};

export enum TrackingStatusEnum {
  PENDING_PICKUP_FROM_SELLER = "PENDING_PICKUP_FROM_SELLER",
  DELIVERING_TO_SNEAKGEEK = "DELIVERING_TO_SNEAKGEEK",
  DELIVERED_TO_SNEAKGEEK = "DELIVERED_TO_SNEAKGEEK",
  APPROVED_BY_SNEAKGEEK = "APPROVED_BY_SNEAKGEEK",
  REJECTED_BY_SNEAKGEEK = "REJECTED_BY_SNEAKGEEK",
  PENDING_PICKUP_FROM_SNEAKGEEK = "PENDING_PICKUP_FROM_SNEAKGEEK",
  DELIVERING_TO_BUYER = "DELIVERING_TO_BUYER",
  DELIVERED_TO_BUYER = "DELIVERED_TO_BUYER"
}

export class SneakersCheckingScreen extends React.Component<Props, State> {
  private readonly _shoeAuthenticationTransactionService = ObjectFactory.getObjectInstance<IShoeAuthenticationTransactionService>(FactoryKeys.IShoeAuthenticationTransactionService);

  private readonly _settingsProvider = ObjectFactory.getObjectInstance<ISettingsProvider>(
    FactoryKeys.ISettingsProvider
  );

  constructor(props: Props) {
    super(props);
    this.getPendingAuthenticationTransaction();
    this.state = {
      searchTextInput: "",
      searchResults: [],
      isLoading: false,
      value: "",
    };
  }

  render(): JSX.Element {
    return (
      <div>
        <Header as="h2">Check giày</Header>
        {this._renderSearchReviewProducts()}
        <Table compact celled selectable>
          {this._renderTableHeader()}
          {this._renderTableBody(this.state.shoeAuthentications)}
        </Table>
      </div>
    );
  }


  private _handleSearchChange(event: any, data: any) {
    const { value } = data;
    this.setState({ isLoading: true, searchTextInput: value });
    //TO DO: Need to Implement a Searching Algorithm
    const results = this.state.shoeAuthentications!.map((shoeAu: ShoeAuthentication) => {
      return {
        image: shoeAu.imageUrl,
        ...shoeAu,
        title: shoeAu.trackingId
      };
    });
    this.setState({ isLoading: false, searchResults: results });
  }

  private _linkToAuthAndRepSneakerScreen(data: ShoeAuthentication) {
    //TO DO: Link to a new screen that allow admins to shoe authentication
    this.props.history.push(`/shoe-authentication/${data.trackingId}`, {
      shoeAuthentication: data
    });
  }

  private _onSearchSelect(event: any, data: any) {
    const { result } = data;
    this._linkToAuthAndRepSneakerScreen(data);
  }

  private async getPendingAuthenticationTransaction() {
    const token = this._settingsProvider.getValue(SettingsKey.CurrentAccessToken);
    const response = await this._shoeAuthenticationTransactionService.getPendingAuthenticationTransaction(token);

    this.setState({ shoeAuthentications: response });
    console.log(response);
  }

  private _renderSearchReviewProducts() {
    return (
      <Grid>
        <Grid.Column width={5}>
          <Search
            fluid
            placeholder="Nhập mã chuyển hàng"
            loading={this.state.isLoading}
            onSearchChange={this._handleSearchChange.bind(this)}
            onResultSelect={this._onSearchSelect.bind(this)}
            results={this.state.searchResults}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    );
  }

  private _renderTableHeader() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Trạng thái</Table.HeaderCell>
          <Table.HeaderCell>Mã chuyển hàng</Table.HeaderCell>
          <Table.HeaderCell>Ảnh giày</Table.HeaderCell>
          <Table.HeaderCell>Tên giày</Table.HeaderCell>
          <Table.HeaderCell>Hãng giày</Table.HeaderCell>
          <Table.HeaderCell>Mới/Cũ</Table.HeaderCell>
          <Table.HeaderCell>Ngày nhận đơn hàng</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }

  private _renderShoeAuthStatus(shoeAuthentication: ShoeAuthentication) {
    if (shoeAuthentication.status === TrackingStatusEnum.DELIVERED_TO_SNEAKGEEK) {
      return (<Label color="yellow" circular empty />);
    } else if (shoeAuthentication.status === TrackingStatusEnum.APPROVED_BY_SNEAKGEEK) {
      return (<Label color="green" circular empty />);
    } else if (shoeAuthentication.status === TrackingStatusEnum.REJECTED_BY_SNEAKGEEK) {
      return (<Label color="red" circular empty />);
    } else {
      return (<Label color="black" circular empty />);
    }
  }

  private _renderTableBody(shoeAuthentications?: ShoeAuthentication[]) {
    if (shoeAuthentications)
      return (
        <Table.Body>
          {shoeAuthentications.map((shoeAuthentication: ShoeAuthentication) => {
            return (
              <Table.Row
                onClick={() => {
                  if (shoeAuthentication.status === TrackingStatusEnum.DELIVERED_TO_SNEAKGEEK) {
                    this._linkToAuthAndRepSneakerScreen(shoeAuthentication);
                  }
                }}
              >
                <Table.Cell textAlign="center" verticalAlign="middle">{this._renderShoeAuthStatus(shoeAuthentication)}</Table.Cell>
                <Table.Cell>
                  {shoeAuthentication.trackingId}
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  <img className="image" src={shoeAuthentication.imageUrl} />
                </Table.Cell>
                <Table.Cell>{shoeAuthentication.title}</Table.Cell>
                <Table.Cell>{shoeAuthentication.brand}</Table.Cell>
                <Table.Cell>{shoeAuthentication.isNew ? "Mới" : "Cũ"}</Table.Cell>
                <Table.Cell>{shoeAuthentication.uploadDate}</Table.Cell>
              </Table.Row>
            );
          })
          }
        </Table.Body >
      );
    else return <></>;
  }
}
