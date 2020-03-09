import React from "react";
import {
  Header,
  Input,
  Table,
  Icon,
  Button,
  Modal,
  Search,
  Grid,
  Popup
} from "semantic-ui-react";
import "./CatalogManagementScreen.css";
import axios from "axios";
import {
  Catalog,
  Shoe,
  ObjectFactory,
  FactoryKeys,
  ISettingsProvider,
  SettingsKey
} from "business";
import { History } from "history";
import { Link } from "react-router-dom";

type Props = {
  history: History;
  location: any;
};

type State = {
  error: any;
  isLoading: boolean;
  searchResults: object[];
  searchTextInput: string;
  catalog: Catalog;
};

export class CatalogManagementScreen extends React.Component<Props, State> {
  readonly FIND_SHOE_URL = "http://localhost:8080/api/v1/shoe/find";
  readonly UPDATE_CATALOG_URL = "http://localhost:8080/api/v1/catalogue";

  constructor(props: Props) {
    super(props);

    this.state = {
      error: undefined,
      isLoading: false,
      catalog: this.props.location.state.catalog,
      searchResults: [],
      searchTextInput: ""
    };
  }

  render() {
    return (
      <div>
        {this._renderCatalogInfo()}
        <Table celled selectable>
          {this._renderTableHeader()}
          {this._renderTableBody(this.state.catalog)}
          {this._renderTableFooter()}
        </Table>
        {this._renderSaveAndCancelButtons()}
      </div>
    );
  }

  private _renderCatalogInfo() {
    return (
      <Popup
        content="Thay đổi tên Catalog"
        position="bottom left"
        trigger={
          <Input
            className="input-catalog-style"
            icon="pencil"
            iconPosition="left"
            compact
            size="massive"
            transparent
            placeholder={this.state.catalog.title}
            onChange={this._handleInputCatalogTitleChange.bind(this)}
          />
        }
      />
    );
  }

  private _handleInputCatalogTitleChange(e: any, data: any) {
    const { value } = data;
    this.setState({
      catalog: {
        ...this.state.catalog,
        title: value
      }
    });
    console.log(data);
  }

  private _renderTableHeader(): JSX.Element {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Ảnh giày</Table.HeaderCell>
          <Table.HeaderCell>Tên giày</Table.HeaderCell>
          <Table.HeaderCell>Thương hiệu</Table.HeaderCell>
          <Table.HeaderCell>Mô tả</Table.HeaderCell>
          <Table.HeaderCell>Xoá giày</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }

  private _deleteButtonHandler(id: string) {
    this.setState({
      catalog: {
        ...this.state.catalog,
        shoes: this.state.catalog.shoes.filter(t => t._id !== id)
      }
    });
  }

  private _renderTableBody(catalog?: Catalog): JSX.Element {
    if (catalog!.shoes)
      return (
        <Table.Body>
          {catalog!.shoes.map((shoe: Shoe) => {
            return (
              <Table.Row>
                <Table.Cell>
                  <img className="image" src={shoe.imageUrl} />
                </Table.Cell>
                <Table.Cell>{shoe.title}</Table.Cell>
                <Table.Cell>{shoe.brand}</Table.Cell>
                <Table.Cell>{shoe.description}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    id={shoe._id}
                    onClick={() => {
                      this._deleteButtonHandler(shoe._id);
                    }}
                    icon
                    circular
                  >
                    <Icon name="minus" color="red" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      );
    else return <></>;
  }

  private async _handleSearchChange(error: any, data: any) {
    const { value } = data;
    this.setState({ isLoading: true, searchTextInput: value });
    const response = await axios.get(`${this.FIND_SHOE_URL}?title=${value}`);
    const searchResults = response.data.slice(0, 5);
    const formattedSearchResults = searchResults.map((e: Shoe) => {
      return {
        image: e.imageUrl,
        ...e
      };
    });
    this.setState({ isLoading: false, searchResults: formattedSearchResults });
  }

  private async _onSearchSelect(e: any, data: any) {
    const { result } = data;

    this.setState({
      catalog: {
        ...this.state.catalog,
        shoes: [...this.state.catalog.shoes, result]
      }
    });
  }

  private _renderAddSneakersModal = () => (
    <Modal
      trigger={
        <Button floated="right" icon labelPosition="left" size="small" color="orange">
          <Icon name="plus" /> Thêm giày
        </Button>
      }
    >
      <Modal.Header>Tìm giày</Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Column width={16}>
            <Search
              fluid
              placeholder="Tìm giày"
              loading={this.state.isLoading}
              onSearchChange={this._handleSearchChange.bind(this)}
              onResultSelect={this._onSearchSelect.bind(this)}
              results={this.state.searchResults}
              {...this.props}
            />
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  );

  private _renderTableFooter(): JSX.Element {
    return (
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="10">{this._renderAddSneakersModal()}</Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    );
  }

  private async _saveProducts() {
    const token = ObjectFactory.getObjectInstance<ISettingsProvider>(
      FactoryKeys.ISettingsProvider
    ).getValue(SettingsKey.CurrentAccessToken);

    const catalog = {
      ...this.state.catalog,
      products: this.state.catalog.shoes.map(shoe => shoe._id)
    };
    delete catalog.shoes;

    await axios.put(`${this.UPDATE_CATALOG_URL}/${this.state.catalog._id}`, catalog, {
      headers: {
        authorization_token: token
      }
    });

    this.props.history.goBack();
  }

  private _renderSaveAndCancelButtons(): JSX.Element {
    return (
      <div>
        <Button
          onClick={() => {
            this._saveProducts();
          }}
          floated="right"
          icon
          labelPosition="left"
          size="small"
          color="blue"
        >
          <Icon name="save outline" /> Lưu
        </Button>
        <Button
          onClick={() => this.props.history.goBack()}
          floated="right"
          icon
          labelPosition="left"
          size="small"
        >
          <Icon name="cancel" /> Huỷ
        </Button>
      </div>
    );
  }
}
